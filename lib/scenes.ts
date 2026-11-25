/**
 * Real scenes from a Lights Pi studio workspace: eight fixtures, each scene's
 * per-fixture colour exactly as the control server renders it in the scene
 * swatch (Scenes tab). The homepage motif is built from these strips.
 */
export interface Scene {
  id: number;
  name: string;
  /** One colour per fixture, in DMX address order. */
  cells: string[];
}

export const SCENES: Scene[] = [
  { id: 16, name: "Sunset", cells: ["#ff3c00", "#ffff57", "#ff3c00", "#ff3c00", "#dc1e50", "#ff3c00", "#dc1e50", "#dc1e50"] },
  { id: 15, name: "Ocean Blue", cells: ["#1e50ff", "#f0efeb", "#1e50ff", "#1e50ff", "#1e50ff", "#1e50ff", "#1e50ff", "#1e50ff"] },
  { id: 18, name: "Golden Hour", cells: ["#c85000", "#ffff75", "#c85000", "#c85000", "#c85000", "#c85000", "#c85000", "#c85000"] },
  { id: 14, name: "Magenta", cells: ["#ff00b4", "#343433", "#ff00b4", "#ff00b4", "#ff00b4", "#ff00b4", "#ff00b4", "#ff00b4"] },
  { id: 13, name: "Teal", cells: ["#00c8b4", "#a2a29f", "#00c8b4", "#00c8b4", "#00c8b4", "#00c8b4", "#00c8b4", "#00c8b4"] },
  { id: 23, name: "Daylight", cells: ["#dcdcf0", "#ffffd3", "#dcdcf0", "#dcdcf0", "#dcdcf0", "#dcdcf0", "#dcdcf0", "#dcdcf0"] },
];

/** Colour of a black-body light source, for the Kelvin control. Tanner Helland's fit. */
export function kelvinToHex(kelvin: number): string {
  const t = kelvin / 100;
  let r: number, g: number, b: number;
  if (t <= 66) {
    r = 255;
    g = 99.4708025861 * Math.log(t) - 161.1195681661;
    b = t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  } else {
    r = 329.698727446 * Math.pow(t - 60, -0.1332047592);
    g = 288.1221695283 * Math.pow(t - 60, -0.0755148492);
    b = 255;
  }
  const c = (v: number) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}
