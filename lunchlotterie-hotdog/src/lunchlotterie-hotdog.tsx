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

import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";

/**
 * React Component
 */
export interface LunchlotterieHotdogProps extends BlockAttributes {
  message: string;
}

export const LunchlotterieHotdog = ({ message, contentLanguage }: LunchlotterieHotdogProps): ReactElement => {
  return <div id="hotdog_widget" class="hotdog-lunchlotterie" style="display:none">
  <h2>Verbleibende Zeit bis zur Auslosung der Lunch Lotterie </h2>
   <svg id="hotdogSVG" viewBox="0 0 800 280">
    <defs>
      <!-- Brötchen -->
      <linearGradient id="bunGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#d8a96b"/>
        <stop offset="100%" stop-color="#b37a3d"/>
      </linearGradient>
      <!-- Wurst -->
      <linearGradient id="sausageGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#b33a3a"/>
        <stop offset="100%" stop-color="#8a2c2c"/>
      </linearGradient>
      <!-- Biss-Maske -->
      <mask id="biteMask">
        <rect x="0" y="0" width="100%" height="100%" fill="black"/>
        <rect id="remainRect" x="80" y="90" width="560" height="100" rx="50" fill="white"/>
        <g id="biteG" fill="black"></g>
      </mask>
    </defs>

    <!-- Schatten -->
    <ellipse cx="360" cy="210" rx="240" ry="16" fill="rgba(0,0,0,.10)"/>

    <!-- Hotdog unter Maske -->
    <g mask="url(#biteMask)">
      <!-- Unteres Brötchen -->
      <rect x="80" y="150" width="560" height="40" rx="20" fill="url(#bunGrad)"/>
      <!-- Wurst -->
      <rect x="80" y="120" width="560" height="30" rx="15" fill="url(#sausageGrad)"/>
      <!-- Senf -->
      <path d="M90,130 C150,140 210,120 270,130 S390,140 450,130 S570,140 620,130"
            stroke="#f6d365" stroke-width="6" fill="none" stroke-linecap="round"/>
      <!-- Ketchup -->
      <path d="M90,140 C150,150 210,130 270,140 S390,150 450,140 S570,150 620,140"
            stroke="#d43f3f" stroke-width="6" fill="none" stroke-linecap="round"/>
      <!-- Zwiebelringe -->
      <g stroke="#d8a6d8" stroke-width="3" fill="none" opacity="0.8">
        <ellipse cx="160" cy="135" rx="10" ry="6"/>
        <ellipse cx="240" cy="135" rx="10" ry="6"/>
        <ellipse cx="320" cy="135" rx="10" ry="6"/>
        <ellipse cx="400" cy="135" rx="10" ry="6"/>
        <ellipse cx="480" cy="135" rx="10" ry="6"/>
        <ellipse cx="560" cy="135" rx="10" ry="6"/>
      </g>
      <!-- Oberes Brötchen -->
      <rect x="80" y="80" width="560" height="40" rx="20" fill="url(#bunGrad)"/>
    </g>

    <!-- Dynamische Krümel -->
    <g id="crumbs"></g>
    <!-- Boden-Krümel -->
    <g id="groundCrumbs"></g>

    <!-- Prozentanzeige -->
    <text id="pctLabel" class="pct" x="86" y="64"></text>
  </svg>
  
  <a id="lunchlotterieBeitragLink" target="_blank" href="">
   Zum EBnow Beitrag
</a>

  <div style="margin-top:10px;">
    <input id="progress" type="range" min="0" max="100" value="0" />
    <button id="auto">Play</button>
  </div>
  <div id="triggers-eating-when-visible"></div>

</div>;
};

