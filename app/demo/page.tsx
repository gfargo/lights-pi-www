"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { PageHead, SectionHead } from "@/components/PageHead";
import { SwatchButton } from "@/components/home/Swatch";

// The 3D rig is heavy (~145KB gzipped three.js). Lazy-load with no SSR.
const DemoLightingRig = dynamic(
  () =>
    import("@/components/demo/DemoLightingRig").then((m) => ({
      default: m.DemoLightingRig,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-paper/80" style={{ fontSize: "var(--step-body)" }}>
          Loading the rig…
        </span>
      </div>
    ),
  },
);

interface Fixture {
  id: number;
  name: string;
  color: string; // hex
  intensity: number; // 0..1
}

interface Preset {
  name: string;
  color: string;
  hint: string;
}

const PRESETS: Preset[] = [
  { name: "Tungsten",    color: "#FF6A1F", hint: "Warm sunset, low key" },
  { name: "Daylight",    color: "#FFF0D8", hint: "Cool clean white" },
  { name: "Arc",         color: "#7EE7FF", hint: "Stage cyan" },
  { name: "Magenta",     color: "#C84BC8", hint: "Pop accent" },
  { name: "Deep red",    color: "#B71C1C", hint: "Dramatic" },
  { name: "Acid green",  color: "#76FF03", hint: "Vivid party" },
  { name: "Royal blue",  color: "#1E3A8A", hint: "Cinematic depth" },
  { name: "Amber",       color: "#FFC107", hint: "Golden hour" },
];

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b]
    .map((c) => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

export default function DemoPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([
    { id: 1, name: "key",  color: "#FF6A1F", intensity: 0.8 },
    { id: 2, name: "fill", color: "#7EE7FF", intensity: 0.65 },
    { id: 3, name: "back", color: "#C84BC8", intensity: 0.7 },
  ]);
  const [selected, setSelected] = useState(0);

  const current = fixtures[selected];
  const rgb = useMemo(() => hexToRgb(current.color), [current.color]);

  function updateCurrent(patch: Partial<Fixture>) {
    setFixtures((prev) => prev.map((f, i) => (i === selected ? { ...f, ...patch } : f)));
  }

  function setChannel(channel: "r" | "g" | "b", value: number) {
    const next = { ...rgb, [channel]: value };
    updateCurrent({ color: rgbToHex(next.r, next.g, next.b) });
  }

  function applyPreset(p: Preset) {
    updateCurrent({ color: p.color });
  }

  // The MCP tool call the demo *would* generate against a real rig
  const mcpCall = useMemo(() => {
    // Try to map the hex to a named preset; fall back to rgb hex literal
    const matched = PRESETS.find((p) => p.color.toLowerCase() === current.color.toLowerCase());
    const colorArg = matched ? `"${matched.name.toLowerCase().replace(/\s+/g, "-")}"` : `"${current.color}"`;
    const intensityArg = `"${Math.round(current.intensity * 100)}%"`;
    const groupArg = `["${current.name}-lights"]`;
    return `adjust_color(${colorArg}, intensity: ${intensityArg}, groups: ${groupArg})`;
  }, [current]);

  return (
    <div className="min-h-screen bg-ink px-[var(--gutter)] pb-[clamp(72px,9vw,140px)]">
      <PageHead
        scene={0}
        label="Playground"
        title="Drive the rig and watch it respond."
        lead="A simulated DMX rig: three fixtures hanging from a truss. Adjust colour and intensity to see the MCP tool call it would send to a real Lights Pi."
      />

      {/* Main: rig + controls */}
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-px bg-rule border-y border-rule">
        {/* 3D rig viewport */}
        <div className="bg-ink relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[640px] overflow-hidden">
          <DemoLightingRig fixtures={fixtures} selectedIndex={selected} onSelectFixture={setSelected} />
          <div
            className="absolute top-4 left-4 text-paper font-medium flex items-center gap-2 pointer-events-none"
            style={{ fontSize: "var(--step-small)" }}
          >
            <span className="filament inline-block w-2 h-2 bg-amber-tungsten" aria-hidden />
            Live rehearsal
          </div>
          <div
            className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-between gap-2 text-paper/80 pointer-events-none"
            style={{ fontSize: "var(--step-small)" }}
          >
            <span>Click a fixture to select it</span>
            <span>
              {fixtures.length} fixtures, 1 universe
            </span>
          </div>
        </div>

        {/* Control panel */}
        <div className="bg-ink py-8 lg:p-10 flex flex-col gap-10" style={body}>
          {/* Fixture selector */}
          <div>
            <p className="text-paper font-medium">Selected fixture</p>
            <div className="mt-3 grid grid-cols-3 gap-px bg-rule border border-rule">
              {fixtures.map((f, i) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={selected === i}
                  onClick={() => setSelected(i)}
                  className={`py-3 px-3 sm:px-4 text-left transition-colors ${
                    selected === i ? "bg-steel" : "bg-ink hover:bg-steel"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span aria-hidden className="inline-block w-3 h-3 shrink-0" style={{ backgroundColor: f.color }} />
                    <span className={`font-medium capitalize ${selected === i ? "text-amber-tungsten" : "text-paper"}`}>
                      {f.name}
                    </span>
                  </span>
                  <span className="mt-1 block text-paper/80 tabular-nums" style={{ fontSize: "var(--step-small)" }}>
                    Ch <span className="font-mono">{i * 7 + 1}–{i * 7 + 7}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RGB sliders */}
          <div>
            <div className="flex items-baseline justify-between">
              <p className="text-paper font-medium">Colour</p>
              <p className="font-mono text-paper/80 tabular-nums" style={{ fontSize: "var(--step-small)" }}>
                {current.color}
              </p>
            </div>
            <div className="mt-4 space-y-4">
              <Slider label="Red" value={rgb.r} max={255} onChange={(v) => setChannel("r", v)} accent="#FF3B30" />
              <Slider label="Green" value={rgb.g} max={255} onChange={(v) => setChannel("g", v)} accent="#34C759" />
              <Slider label="Blue" value={rgb.b} max={255} onChange={(v) => setChannel("b", v)} accent="#0A84FF" />
            </div>
          </div>

          {/* Intensity */}
          <div>
            <p className="text-paper font-medium">Intensity</p>
            <div className="mt-4">
              <Slider
                label="Master"
                value={Math.round(current.intensity * 100)}
                max={100}
                unit="%"
                onChange={(v) => updateCurrent({ intensity: v / 100 })}
                accent="#FF6A1F"
              />
            </div>
          </div>

          {/* Presets */}
          <div>
            <p className="text-paper font-medium">Presets</p>
            <div className="mt-3 grid grid-cols-2 gap-px bg-rule border border-rule">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className="bg-ink px-3 sm:px-4 py-3 text-left hover:bg-steel transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <span aria-hidden className="inline-block w-3 h-3 shrink-0" style={{ backgroundColor: p.color }} />
                    <span className="font-medium text-paper group-hover:text-amber-tungsten transition-colors">
                      {p.name}
                    </span>
                  </span>
                  <span className="block text-paper/80 mt-1" style={{ fontSize: "var(--step-small)" }}>
                    {p.hint}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live MCP-call preview */}
      <section className="mt-[clamp(56px,6vw,96px)]">
        <SectionHead title="What this would do on a real rig" note="Updates as you move the sliders" />
        <div className="border border-rule bg-steel overflow-hidden max-w-[56rem]">
          <div className="px-5 py-3 border-b border-rule text-paper/80" style={{ fontSize: "var(--step-small)" }}>
            <span className="font-mono">POST /api/action</span> on <span className="font-mono">lights.local:5000</span>
          </div>
          <pre className="font-mono text-[15px] text-paper px-5 py-6 whitespace-pre-wrap break-words leading-relaxed">
{`→ ${mcpCall}`}
          </pre>
          <p className="px-5 pb-5 text-paper" style={body}>
            Would apply to {fixtures.length} fixture{fixtures.length === 1 ? "" : "s"} in real time.
          </p>
        </div>
      </section>

      {/* Next step */}
      <section className="border-t border-rule mt-[clamp(72px,8vw,120px)] pt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <p className="text-paper font-medium" style={body}>
            Ready for real fixtures?
          </p>
          <h2 className="font-display text-paper mt-3" style={{ fontSize: "var(--step-head)" }}>
            The build takes ten minutes.
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-5">
          <SwatchButton href="/quick-start">Start the build</SwatchButton>
          <Link href="/hardware" className="link-plain">
            Hardware guide
          </Link>
        </div>
      </section>
    </div>
  );
}

const body = { fontSize: "var(--step-body)", lineHeight: 1.5 } as const;

function Slider({
  label,
  value,
  max,
  unit = "",
  onChange,
  accent,
}: {
  label: string;
  value: number;
  max: number;
  unit?: string;
  onChange: (v: number) => void;
  accent: string;
}) {
  const id = `slider-${label.toLowerCase()}`;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <label htmlFor={id} className="text-paper/80">
          {label}
        </label>
        <span className="tabular-nums text-paper">
          {value}
          {unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full h-1.5 appearance-none cursor-pointer bg-rule"
        style={
          {
            // Filled track up to the current value (a fill, not a decorative gradient)
            background: `linear-gradient(to right, ${accent} 0%, ${accent} ${(value / max) * 100}%, var(--color-rule) ${(value / max) * 100}%, var(--color-rule) 100%)`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
