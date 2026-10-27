import React from "react";
import { screen, render } from "@testing-library/react";

import {
  LunchlotterieHotdog,
  parseGermanDate,
  berechneLotterieStand,
} from "./lunchlotterie-hotdog";

describe("parseGermanDate", () => {
  it("parst TT.MM.JJJJ", () => {
    expect(parseGermanDate("01.03.2026")).toEqual(new Date(2026, 2, 1));
  });

  it("lehnt ungültige Datumsangaben ab", () => {
    expect(parseGermanDate("31.02.2026")).toBeNull();
    expect(parseGermanDate("2026-03-01")).toBeNull();
    expect(parseGermanDate(undefined)).toBeNull();
  });
});

describe("berechneLotterieStand", () => {
  it("berechnet verbleibende Tage und Fortschritt", () => {
    const stand = berechneLotterieStand(new Date(2026, 0, 1), new Date(2026, 0, 11), new Date(2026, 0, 6));
    expect(stand).toEqual({ tageUebrig: 6, fortschritt: 50 });
  });

  it("begrenzt den Fortschritt auf 0 bis 100", () => {
    const vorher = berechneLotterieStand(new Date(2026, 0, 10), new Date(2026, 0, 20), new Date(2026, 0, 1));
    const nachher = berechneLotterieStand(new Date(2026, 0, 1), new Date(2026, 0, 11), new Date(2026, 1, 1));
    expect(vorher?.fortschritt).toBe(0);
    expect(nachher?.fortschritt).toBe(100);
  });

  it("gibt null bei ungültigem Zeitraum zurück", () => {
    expect(berechneLotterieStand(new Date(2026, 0, 10), new Date(2026, 0, 10), new Date())).toBeNull();
  });
});

describe("LunchlotterieHotdog", () => {
  it("rendert Überschrift und Beitragslink", () => {
    render(
      <LunchlotterieHotdog
        startDatum="01.01.2026"
        endeDatum="31.12.2026"
        beitragLink="https://example.org"
        hotdogAnzeigen="true"
      />,
    );

    expect(screen.getByText(/Verbleibende Zeit/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /EBnow/ })).toHaveAttribute("href", "https://example.org");
  });

  it("zeigt einen Hinweis bei fehlenden Daten", () => {
    render(<LunchlotterieHotdog hotdogAnzeigen="true" />);
    expect(screen.getByText(/TT\.MM\.JJJJ/)).toBeInTheDocument();
  });
});
