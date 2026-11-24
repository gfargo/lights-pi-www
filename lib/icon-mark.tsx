import { SCENES } from "@/lib/scenes";

/** The swatch mark for app icons: the Sunset scene's eight cells on ink. */
export function IconMark({ size }: { size: number }) {
  const pad = Math.round(size * 0.14);
  const gap = Math.max(1, Math.round(size * 0.03));
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0A0A",
        padding: `${Math.round(size * 0.22)}px ${pad}px`,
        gap: `${gap}px`,
      }}
    >
      {SCENES[0].cells.map((c, i) => (
        <div key={i} style={{ flex: 1, height: "100%", background: c }} />
      ))}
    </div>
  );
}
