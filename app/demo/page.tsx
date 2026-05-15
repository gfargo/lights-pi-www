"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

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
        <span className="font-mono text-xs uppercase tracking-widest text-paper/30">
          Loading rig…
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
    <div className="min-h-screen bg-ink pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <header className="hairline pb-8 mb-12">
          <p className="eyebrow">Playground</p>
          <h1
            className="font-display text-paper mt-3"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            Drive the rig.
            <span className="italic text-paper/40"> Watch it respond.</span>
          </h1>
          <p className="mt-4 text-lg text-paper/60 max-w-2xl leading-relaxed">
            A simulated DMX rig — three fixtures hanging from a truss. Adjust
            color and intensity to see how an MCP tool call would render on a
            real Lights Pi setup.
          </p>
        </header>

        {/* Main: rig + controls */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-px bg-rule">
          {/* 3D rig viewport */}
          <div className="bg-ink relative aspect-[5/4] lg:aspect-auto lg:min-h-[640px] overflow-hidden">
            <DemoLightingRig
              fixtures={fixtures}
              selectedIndex={selected}
              onSelectFixture={setSelected}
            />
            {/* Viewport label */}
            <div className="absolute top-4 left-4 font-mono text-xs uppercase tracking-widest text-paper/40 flex items-center gap-3">
              <span className="filament inline-block w-1.5 h-1.5 rounded-full bg-amber-tungsten" />
              riversway · rehearsal
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-xs text-paper/30">
              Click a fixture to select
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-xs uppercase tracking-widest text-paper/30">
              {fixtures.length} fixtures · 1 universe
            </div>
          </div>

          {/* Control panel */}
          <div className="bg-ink p-8 lg:p-10 flex flex-col gap-10">
            {/* Fixture selector */}
            <div>
              <p className="eyebrow">Selected fixture</p>
              <div className="mt-3 grid grid-cols-3 gap-px bg-rule">
                {fixtures.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() => setSelected(i)}
                    className={`bg-ink py-4 transition-colors text-left px-4 ${
                      selected === i ? "" : "hover:bg-steel/40"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ backgroundColor: f.color }}
                      />
                      <span
                        className={`font-mono text-xs uppercase tracking-widest ${
                          selected === i ? "text-amber-tungsten" : "text-paper/50"
                        }`}
                      >
                        {f.name}
                      </span>
                    </div>
                    <div className="mt-2 font-mono text-[10px] text-paper/30 tabular-nums">
                      ch · {(i * 7) + 1}–{(i * 7) + 7}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* RGB sliders */}
            <div>
              <div className="flex items-baseline justify-between">
                <p className="eyebrow">Channel</p>
                <p className="font-mono text-xs text-paper/40 tabular-nums uppercase tracking-widest">
                  {current.color}
                </p>
              </div>
              <div className="mt-6 space-y-5">
                <Slider label="Red"   value={rgb.r} max={255} onChange={(v) => setChannel("r", v)} accent="#FF3B30" />
                <Slider label="Green" value={rgb.g} max={255} onChange={(v) => setChannel("g", v)} accent="#34C759" />
                <Slider label="Blue"  value={rgb.b} max={255} onChange={(v) => setChannel("b", v)} accent="#0A84FF" />
              </div>
            </div>

            {/* Intensity */}
            <div>
              <div className="flex items-baseline justify-between">
                <p className="eyebrow">Intensity</p>
                <p className="font-mono text-xs text-paper/40 tabular-nums uppercase tracking-widest">
                  {Math.round(current.intensity * 100)}%
                </p>
              </div>
              <div className="mt-6">
                <Slider
                  label="Master"
                  value={Math.round(current.intensity * 100)}
                  max={100}
                  onChange={(v) => updateCurrent({ intensity: v / 100 })}
                  accent="#FF6A1F"
                />
              </div>
            </div>

            {/* Presets */}
            <div>
              <p className="eyebrow">Presets</p>
              <div className="mt-4 grid grid-cols-2 gap-px bg-rule">
                {PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => applyPreset(p)}
                    className="bg-ink px-4 py-3 text-left hover:bg-steel/40 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-block w-3 h-3"
                        style={{ backgroundColor: p.color }}
                      />
                      <span className="font-mono text-xs uppercase tracking-widest text-paper/80 group-hover:text-amber-tungsten transition-colors">
                        {p.name}
                      </span>
                    </div>
                    <p className="font-display italic text-[13px] text-paper/30 mt-1">
                      {p.hint}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live MCP-call preview */}
        <section className="mt-16 hairline pt-12">
          <p className="eyebrow">What this would do on a real rig</p>
          <div className="mt-4 border border-rule bg-steel/30 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-rule">
              <span className="font-mono text-xs uppercase tracking-widest text-paper/50">
                POST /api/action · lights.local:5000
              </span>
              <span className="font-mono text-xs text-paper/30">live preview</span>
            </div>
            <pre className="font-mono text-sm text-paper px-5 py-6 whitespace-pre-wrap break-words leading-relaxed">
{`→ ${mcpCall}`}
            </pre>
            <div className="px-5 pb-5 font-mono text-xs text-arc-cyan flex items-center gap-3">
              <span className="text-arc-cyan/60">✓</span>
              <span>Would apply to {fixtures.length} fixture{fixtures.length === 1 ? "" : "s"} in real time</span>
              <span className="text-paper/30">· est. 47ms</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 hairline pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="eyebrow">Ready for real fixtures?</p>
            <h2
              className="font-display text-paper mt-3"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              The build is ten minutes.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-x-8 gap-y-3">
            <Link
              href="/quick-start"
              className="group inline-flex items-center gap-3 text-paper font-mono uppercase tracking-widest text-sm border-b border-paper pb-1 hover:text-amber-tungsten hover:border-amber-tungsten transition-colors"
            >
              Start the build
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/hardware"
              className="group inline-flex items-center gap-3 text-paper/60 font-mono uppercase tracking-widest text-sm hover:text-paper transition-colors"
            >
              Hardware guide
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  max,
  onChange,
  accent,
}: {
  label: string;
  value: number;
  max: number;
  onChange: (v: number) => void;
  accent: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="font-mono text-xs uppercase tracking-widest text-paper/60">
          {label}
        </label>
        <span className="font-mono text-xs tabular-nums text-paper/80">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full h-1 appearance-none cursor-pointer bg-rule"
        style={
          {
            // Track gradient — filled to the current value
            background: `linear-gradient(to right, ${accent} 0%, ${accent} ${(value / max) * 100}%, var(--color-rule) ${(value / max) * 100}%, var(--color-rule) 100%)`,
          } as React.CSSProperties
        }
        aria-label={label}
      />
    </div>
  );
}
