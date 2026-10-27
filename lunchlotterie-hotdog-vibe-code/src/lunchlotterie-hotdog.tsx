/*!
 * Copyright 2026, Staffbase SE and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { CSSProperties, ReactElement, useEffect, useId, useMemo, useRef, useState } from "react";
import { BlockAttributes } from "widget-sdk";

export interface LunchlotterieHotdogProps extends BlockAttributes {
  /** Startdatum im Format TT.MM.JJJJ */
  startDatum?: string;
  /** Enddatum (Auslosung) im Format TT.MM.JJJJ */
  endeDatum?: string;
  /** Link zum EBnow-Beitrag */
  beitragLink?: string;
  /** "true" blendet das Widget ein, alles andere blendet es aus */
  hotdogAnzeigen?: string;
  /** Im Editor immer anzeigen, damit Redakteure eine Vorschau sehen */
  vorschau?: boolean;
}

/* Styles werden direkt in der Komponente ausgeliefert, damit sie im Intranet immer greifen */
const STYLES = `
.hotdog-lunchlotterie {
	background: #fff;
	border-radius: 14px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, .08);
	padding: 16px;
	max-width: 820px;
	width: 100%;
	box-sizing: border-box;
}
.hotdog-lunchlotterie h2 {
	margin: 0 0 8px;
	font: 600 20px system-ui, Segoe UI, Roboto, Arial, sans-serif;
	color: #5c3a19;
}
.hotdog-lunchlotterie svg {
	width: 100%;
	height: auto;
	display: block;
}
.hotdog-lunchlotterie a {
	display: inline-block;
	border: none;
	background: #b36a2e;
	color: #fff;
	padding: 8px 12px;
	border-radius: 8px;
	cursor: pointer;
	margin-top: 8px;
	text-decoration: none;
}
.hotdog-lunchlotterie a:focus-visible {
	outline: 3px solid #5c3a19;
	outline-offset: 2px;
}
.hotdog-lunchlotterie .hinweis {
	color: #5c3a19;
	margin: 8px 0;
}
.hotdog-lunchlotterie .trigger {
	height: 1px;
}
.hotdog-lunchlotterie .crumb {
	fill: #f1d3a2;
	stroke: #ddb47a;
	stroke-width: 0.6;
	opacity: 0.98;
	transform-box: fill-box;
	transform-origin: center;
	animation: crumbFall var(--dur, 900ms) cubic-bezier(0.21, 0.9, 0.31, 1) forwards;
}
@keyframes crumbFall {
	to {
		transform: translate(var(--dx, 60px), var(--dy, 140px)) rotate(var(--rot, 20deg));
		opacity: 0;
	}
}
.hotdog-lunchlotterie .ground-crumb {
	fill: #e8c590;
	stroke: #d2aa6e;
	stroke-width: 0.6;
	opacity: 0.95;
}
.hotdog-lunchlotterie .pct {
	font: 600 24px system-ui, Segoe UI, Roboto, Arial, sans-serif;
	fill: #5c3a19;
	opacity: 0.9;
}
@media (prefers-reduced-motion: reduce) {
	.hotdog-lunchlotterie .crumb {
		display: none;
	}
}
`;

/* Geometrie (identisch zur bisherigen Vanilla-Version) */
const LEFT_X = 80;
const WIDTH = 560;
const MID_Y = 140;
const FLOOR_Y = 210;
const Y_OFFSETS = [-30, -18, -6, 6, 18, 30];
const BASE_R = [20, 18, 16, 16, 18, 20];
const MAX_GROUND_CRUMBS = 8;
/** Fortschritt pro Animationsframe in Prozentpunkten */
const STEP = 0.6;
const DAY_MS = 1000 * 60 * 60 * 24;
const BITE_X = [160, 240, 320, 400, 480, 560];

interface FallingCrumb {
  id: number;
  cx: number;
  cy: number;
  r: number;
  dx: number;
  dy: number;
  rot: string;
  dur: string;
}

interface GroundCrumb {
  id: number;
  cx: number;
  cy: number;
  r: number;
}

/**
 * Parst ein deutsches Datum (TT.MM.JJJJ). Gibt null zurück, wenn das Datum ungültig ist.
 */
export function parseGermanDate(value?: string): Date | null {
  if (!value) return null;
  const match = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(value.trim());
  if (!match) return null;
  const [day, month, year] = match.slice(1).map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  return date;
}

function datediff(first: Date, second: Date): number {
  return Math.round((second.getTime() - first.getTime()) / DAY_MS);
}

/**
 * Berechnet verbleibende Tage und Fortschritt (0 bis 100) der Lotterie.
 */
export function berechneLotterieStand(
  start: Date,
  ende: Date,
  heute: Date,
): { tageUebrig: number; fortschritt: number } | null {
  const gesamt = datediff(start, ende);
  if (gesamt <= 0) return null;
  const vergangen = datediff(start, heute);
  return {
    tageUebrig: gesamt - vergangen + 1,
    fortschritt: Math.max(0, Math.min(100, (vergangen / gesamt) * 100)),
  };
}

export const LunchlotterieHotdog = ({
  startDatum,
  endeDatum,
  beitragLink,
  hotdogAnzeigen,
  vorschau = false,
}: LunchlotterieHotdogProps): ReactElement | null => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ids = {
    bunGrad: `bunGrad-${uid}`,
    sausageGrad: `sausageGrad-${uid}`,
    biteMask: `biteMask-${uid}`,
  };

  const zeigen = hotdogAnzeigen === "true" || vorschau;
  const triggerRef = useRef<HTMLDivElement>(null);

  const stand = useMemo(() => {
    const start = parseGermanDate(startDatum);
    const ende = parseGermanDate(endeDatum);
    if (!start || !ende) return null;
    return berechneLotterieStand(start, ende, new Date());
  }, [startDatum, endeDatum]);

  const target = stand?.fortschritt ?? 0;

  const [progress, setProgress] = useState(0);
  const [falling, setFalling] = useState<FallingCrumb[]>([]);
  const [ground, setGround] = useState<GroundCrumb[]>([]);
  const progressRef = useRef(0);
  const groundCountRef = useRef(0);
  const crumbIdRef = useRef(0);

  /* Animation: startet, sobald das Widget sichtbar wird, und läuft bis zum Zielwert */
  useEffect(() => {
    if (!zeigen || !triggerRef.current) return;

    const reduceMotion =
      typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const trigger = triggerRef.current;
    let frame = 0;
    let observer: IntersectionObserver | undefined;

    const applyProgress = (value: number) => {
      const previous = progressRef.current;
      progressRef.current = value;
      setProgress(value);

      const edgeX = LEFT_X + WIDTH * (1 - value / 100);

      if (value > previous && !reduceMotion) {
        const crumb: FallingCrumb = {
          id: ++crumbIdRef.current,
          cx: edgeX - (6 + Math.random() * 12),
          cy: MID_Y + (Math.random() * 20 - 10),
          r: 1.8 + Math.random() * 2.6,
          dx: 40 + Math.random() * 120,
          dy: 70 + Math.random() * 170,
          rot: `${Math.random() * 160 - 80}deg`,
          dur: `${700 + Math.random() * 1000}ms`,
        };
        setFalling((prev) => [...prev, crumb]);
      }

      const toAdd = Math.round((value / 100) * MAX_GROUND_CRUMBS) - groundCountRef.current;
      if (toAdd > 0) {
        const newOnes: GroundCrumb[] = Array.from({ length: toAdd }, () => ({
          id: ++crumbIdRef.current,
          cx: edgeX - 40 + Math.random() * 160,
          cy: FLOOR_Y + 6 + Math.random() * 10,
          r: 1.3 + Math.random() * 2.3,
        }));
        groundCountRef.current += toAdd;
        setGround((prev) => [...prev, ...newOnes]);
      }
    };

    const step = () => {
      const current = progressRef.current;
      if (current === target) return;
      const next = current < target ? Math.min(target, current + STEP) : target;
      applyProgress(next);
      if (next !== target) frame = requestAnimationFrame(step);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(step);
    };

    if (typeof IntersectionObserver === "undefined") {
      start();
    } else {
      observer = new IntersectionObserver(
        (entries, obs) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            start();
            obs.disconnect();
          }
        },
        { root: null, rootMargin: "0px", threshold: 0.1 },
      );
      observer.observe(trigger);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [zeigen, target]);

  const removeFalling = (id: number) => setFalling((prev) => prev.filter((c) => c.id !== id));

  const p = progress / 100;
  const remainingW = WIDTH * (1 - p);
  const rightX = LEFT_X + remainingW;
  const depthScale = 0.7 + 0.5 * p;

  const beissKreise = Y_OFFSETS.map((offset, i) => (
    <circle
      key={offset}
      cx={rightX - BASE_R[i] * 0.3}
      cy={MID_Y + offset}
      r={p === 0 ? 0 : BASE_R[i] * depthScale}
    />
  ));

  if (!zeigen) return null;

  return (
    <div className="hotdog-lunchlotterie" aria-label="Lunchlotterie Hotdog">
      <style>{STYLES}</style>
      <h2>Verbleibende Zeit bis zur Auslosung der Lunch Lotterie</h2>

      {stand ? (
        <svg viewBox="0 0 800 280" role="img" aria-label={`Fortschritt: ${Math.round(progress)} Prozent`}>
          <defs>
            <linearGradient id={ids.bunGrad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d8a96b" />
              <stop offset="100%" stopColor="#b37a3d" />
            </linearGradient>
            <linearGradient id={ids.sausageGrad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b33a3a" />
              <stop offset="100%" stopColor="#8a2c2c" />
            </linearGradient>
            <mask id={ids.biteMask}>
              <rect x="0" y="0" width="100%" height="100%" fill="black" />
              <rect x={LEFT_X} y="90" width={remainingW} height="100" rx="50" fill="white" />
              <g fill="black">{beissKreise}</g>
            </mask>
          </defs>

          {/* Schatten */}
          <ellipse cx="360" cy="210" rx="240" ry="16" fill="rgba(0,0,0,.10)" />

          {/* Hotdog unter Maske */}
          <g mask={`url(#${ids.biteMask})`}>
            <rect x="80" y="150" width="560" height="40" rx="20" fill={`url(#${ids.bunGrad})`} />
            <rect x="80" y="120" width="560" height="30" rx="15" fill={`url(#${ids.sausageGrad})`} />
            <path
              d="M90,130 C150,140 210,120 270,130 S390,140 450,130 S570,140 620,130"
              stroke="#f6d365"
              strokeWidth={6}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M90,140 C150,150 210,130 270,140 S390,150 450,140 S570,150 620,140"
              stroke="#d43f3f"
              strokeWidth={6}
              fill="none"
              strokeLinecap="round"
            />
            <g stroke="#d8a6d8" strokeWidth={3} fill="none" opacity={0.8}>
              {BITE_X.map((x) => (
                <ellipse key={x} cx={x} cy={135} rx={10} ry={6} />
              ))}
            </g>
            <rect x="80" y="80" width="560" height="40" rx="20" fill={`url(#${ids.bunGrad})`} />
          </g>

          {/* Fallende Krümel */}
          <g>
            {falling.map((c) => (
              <circle
                key={c.id}
                className="crumb"
                cx={c.cx}
                cy={c.cy}
                r={c.r}
                style={
                  {
                    "--dx": `${c.dx}px`,
                    "--dy": `${c.dy}px`,
                    "--rot": c.rot,
                    "--dur": c.dur,
                  } as CSSProperties
                }
                onAnimationEnd={() => removeFalling(c.id)}
              />
            ))}
          </g>

          {/* Boden-Krümel */}
          <g>
            {ground.map((c) => (
              <circle key={c.id} className="ground-crumb" cx={c.cx} cy={c.cy} r={c.r} />
            ))}
          </g>

          {/* Prozentanzeige */}
          <text className="pct" x="86" y="64">
            {`${stand.tageUebrig} Tage übrig`}
          </text>
        </svg>
      ) : (
        <p className="hinweis">
          Bitte Start- und Enddatum im Format TT.MM.JJJJ konfigurieren.
        </p>
      )}

      <a href={beitragLink || undefined} target="_blank" rel="noopener noreferrer">
        Zum EBnow Beitrag
      </a>

      {/* Sichtbarkeits-Trigger für den Start der Animation */}
      <div ref={triggerRef} className="trigger" aria-hidden="true" />
    </div>
  );
};
