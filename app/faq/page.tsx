"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { SwatchButton } from "@/components/home/Swatch";
import { trackEvent } from "@/lib/analytics";

const body = { fontSize: "var(--step-body)", lineHeight: 1.55 } as const;

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "Getting started",
      questions: [
        {
          q: "Do I need programming experience?",
          a: "No! The setup process is automated with simple commands. If you can follow a recipe, you can set up Lights Pi."
        },
        {
          q: "How long does setup take?",
          a: "About 10-15 minutes from start to finish. Most of that time is waiting for the Pi to boot and install software."
        },
        {
          q: "What if I don't have a Raspberry Pi?",
          a: "You'll need to purchase one. The Pi 3B+ costs around $35 and the Pi 4 costs around $55. Check our hardware guide for details."
        },
        {
          q: "Can I use this commercially?",
          a: "Yes! Lights Pi is MIT licensed, which means you can use it for any purpose, including commercial projects."
        }
      ]
    },
    {
      category: "Hardware",
      questions: [
        {
          q: "Which Raspberry Pi should I buy?",
          a: "Both Pi 3B+ and Pi 4 work great. Pi 4 offers better performance for larger setups (10+ fixtures), while Pi 3B+ is perfect for smaller setups and costs less."
        },
        {
          q: "Do I need the ENTTEC specifically?",
          a: "The ENTTEC DMX USB Pro is highly recommended as it's well-supported and reliable. Other DMX interfaces may work but aren't officially supported."
        },
        {
          q: "What fixtures are compatible?",
          a: "Any DMX-512 compatible fixture will work. This includes LED pars, moving heads, strip lights, and more from any manufacturer."
        },
        {
          q: "Can I use wireless DMX?",
          a: "Yes! Wireless DMX systems work great with Lights Pi. Just connect the wireless transmitter to the ENTTEC USB Pro."
        }
      ]
    },
    {
      category: "Software",
      questions: [
        {
          q: "Is this really free?",
          a: "Yes! Lights Pi is completely free and open source. No subscriptions, no hidden fees, no limitations."
        },
        {
          q: "How do updates work?",
          a: "Releases are published on GitHub with notes. From your laptop, pull the latest code and run bash scripts/deploy.sh: it syncs the code to the Pi, installs any new Python dependencies and restarts the control server. QLC+ keeps the current look while it restarts. (./lightsctl.sh update only updates the Pi's OS packages.)"
        },
        {
          q: "Can I customize the interface?",
          a: "Yes! The entire project is open source. You can modify anything you want. QLC+ also has extensive customization options."
        },
        {
          q: "What about security?",
          a: "The web UI can sit behind a shared password with a session cookie. The provisioning scripts set up a firewall and SSH key login, and HTTPS is available both on the LAN (https://lights.local) and over Tailscale with a real certificate that renews itself."
        },
        {
          q: "Can I use a MIDI controller or OSC?",
          a: "Yes, at the server level. Since v2.15 the control server listens for MIDI notes and CCs (mapped to actions in midi_mappings.json) and for OSC on UDP port 8000: /scene/<name>, /chase/<name>, /fixture/<id>/<channel>, /master, /cue/go and /blackout, with state sent back on /state/*. A MIDI tab with learn-to-bind and a ready-made TouchOSC layout are next on the roadmap."
        },
        {
          q: "Can I reach the rig when I'm not in the studio?",
          a: "Yes, over Tailscale. lightsctl tailscale-https install serves the control UI and QLC+ on your tailnet with a trusted certificate. Nothing is exposed to the public internet."
        },
        {
          q: "Can I keep separate setups for different shows or rooms?",
          a: "Yes. Since v2.16 you can keep several workspaces, one per production or venue, and switch between them from the Diagnostics tab. Fixture groups and the last look travel with each workspace."
        },
        {
          q: "What happens if the control server loses its link to QLC+?",
          a: "It repairs it. Since v2.16.2 a watchdog notices when commands to QLC+ stop completing, rebuilds the link and reconnects within seconds. /healthz reports qlc_bridge_ok, so a monitor can tell you when it happens."
        }
      ]
    },
    {
      category: "LLM / MCP",
      questions: [
        {
          q: "What is the MCP server?",
          a: "It's a built-in Model Context Protocol endpoint that exposes the rig to any MCP-capable LLM client — Claude Desktop, ChatGPT, Cursor, custom agents. 48 tools cover discovery, channel control, scene + group + chase + cue-list lifecycle (create / describe / rename / duplicate / delete), Kelvin white balance, palette dispatch, strobe, fades, time-based playback (chases + audio-synced cue lists with GO/STOP), safety primitives (blackout, identify_fixture), diagnostics, and batch action — all through structured tool calls instead of writing control scripts or learning per-fixture DMX addressing."
        },
        {
          q: "How do I connect Claude Desktop?",
          a: "Add { \"mcpServers\": { \"qlc-lights\": { \"url\": \"http://lights.local:5001/mcp\" } } } to your Claude Desktop MCP config. Restart, and the lighting tools appear in the tool picker. Same JSON shape works for Cursor and most other MCP clients."
        },
        {
          q: "Does this require an internet connection?",
          a: "No. The MCP server runs entirely on the Pi. Your LLM client (Claude Desktop, etc.) may make its own model calls to a cloud provider, but the lighting commands themselves never leave your network."
        },
        {
          q: "Is the MCP endpoint authenticated?",
          a: "Not by default — it's intended for LAN use, behind your existing firewall. Bearer-token auth scaffolding is plumbed through the systemd unit (MCP_BEARER_TOKEN env var) and ready to wire if you expose the endpoint off-LAN through nginx/stunnel TLS."
        },
        {
          q: "Can an agent build groups from scratch, or only use existing ones?",
          a: "Both. As of v2.3 the agent can create, rename, delete, and edit fixture groups directly via MCP — so 'group the three front pars as key-lights, then make them warm' is a single conversational turn. Same for scenes: describe, delete, rename, and duplicate are all first-class tools."
        },
        {
          q: "Is there a kill switch if the agent gets it wrong?",
          a: "Yes — blackout() is a first-class MCP tool. It zeroes every channel on every fixture instantly (or just the named groups), and clears any active strobe / macro / color state — unlike a fade to zero. You can call it from any MCP client, or hit the /api/blackout endpoint directly with curl."
        },
        {
          q: "How do I find which physical fixture is which during setup?",
          a: "Call identify_fixture(fixture_id) from any MCP client. The fixture pulses on-off four times then restores its previous state. Run it once per fixture during initial setup to map workspace IDs to physical positions on the rig."
        },
        {
          q: "Can the agent control white balance in Kelvin?",
          a: "Yes — color_temperature(kelvin, intensity?, groups?) accepts 1800K (candle) through 10000K (overcast sky) and resolves to the right channel mix per fixture automatically. WWA fixtures get a warm/cool/amber blend by Kelvin position; RGB and RGBW fixtures get a Tanner-Helland CCT-to-RGB approximation, with the white channel driven separately on RGBW to keep cool whites looking clean. Just say 'set the key to 3200K tungsten' or '5600K daylight'."
        },
        {
          q: "Can I set three-point lighting (key/fill/back) in one shot?",
          a: "Yes — the palette tool does exactly that. palette({ \"key-lights\": 3200, \"fill-lights\": 5600, \"back-lights\": \"magenta\" }) assigns different colors or Kelvin values to different groups in a single round trip. Each value can be a color preset name, a Kelvin number, or an explicit dict with intensity. Use this any time you want to 'set the room' rather than tweak a single light."
        },
        {
          q: "How does strobe work?",
          a: "strobe(rate, intensity?, groups?) is a first-class tool — no need to know which channel offset the strobe is on for each fixture model. rate is Hz (0–20, or 'off' to stop). 5–8 Hz is typical party strobe, 12–15 Hz is aggressive accent, 18–20 Hz is pulse-machine territory. Fixtures without a dedicated strobe channel get listed in the response under 'skipped' rather than failing silently."
        },
        {
          q: "Can I build time-based sequences (chases)?",
          a: "Yes — create_chase(name, steps, fade_in_ms?, hold_ms?, fade_out_ms?, direction?, run_order?) builds an ordered chase referencing existing saved scenes. Each step can be a scene name string, scene ID, or a dict with per-step timing overrides. Run order can be Loop / SingleShot / PingPong / Random; direction Forward / Backward. Once created, start_chase(name) plays it via QLC+'s native chase engine — loops forever or runs once depending on run_order. stop_chase(name) halts and the fixtures hold their last step. Use case: 'build me a 30-second sunset transition from Daylight → Warm → Amber → Off and loop it.'"
        },
        {
          q: "Can I build cue lists that sync to a music track or video timeline?",
          a: "Yes — create_cue_list(name, cues, description?) builds an ordered list of cues with absolute timestamps. Each cue has an `at` field (\"0:32\", \"1:45.500\", \"32s\", or raw at_ms) and an action — a scene name, chase name, or any execute_lighting_action call. Press go_cue_list(name) at the moment your audio starts and the server fires every cue on schedule. This is the QLab / ETC Ion 'cue stack' model. Sync-mode only for v1: run your audio in OBS / Logic / Premiere / your phone — whatever — and trigger GO at the same moment. stop_cue_list(name) halts; get_active_cue_lists() shows what's currently running with elapsed time."
        },
        {
          q: "Does the web UI expose all 48 MCP tools, or just the AI chat?",
          a: "The web UI at lights.local:5000 can do everything the MCP layer can. Tabs cover Scenes (scene tiles, quick commands and a one-line command box), Console (per-fixture sliders with Identify buttons), Chat (agentic, see below), Chases (visual scene-picker builder, tap tempo, start/stop), Cue Lists (build, Go and Stop with live elapsed time), Audio (BPM and beat detection from a USB mic), Tools (Kelvin slider, strobe rate, palette assignment) and Diagnostics (Pi health, a DMX test sweep, workspace switching, log tail). On a phone the first four sit in a bottom tab bar with the rest under More. The Groups drawer creates, renames and deletes groups inline. Blackout is always on screen: a full-width bar on phones, a button in the header on desktop. Scene tiles have a menu to rename, duplicate or delete. Nothing is API-only; everything is reachable from the browser."
        },
        {
          q: "Is there a chat interface like Claude or ChatGPT but for my lights?",
          a: "Yes — the Chat tab lets you converse with an LLM that has access to all 48 lighting tools. It plans multi-step operations autonomously: 'set up three-point lighting with tungsten key, daylight fill, magenta back, and save it as photoshoot' → the agent calls list_groups → create_group (×3) → palette → snapshot_scene → reports back. Tool calls show inline (collapsed by default, click to expand args + result). Conversations are saved, so you can come back to them later. Backed by Anthropic's tool_use API or OpenAI's function calling — set AI_PROVIDER in .env. Ollama isn't supported for chat yet because tool-calling varies too much by model."
        },
        {
          q: "Can the agent help me debug when something's wrong?",
          a: "Yes — three diagnostics tools ship with the MCP server: test_dmx runs a known-good R→G→B sweep so you can verify the DMX signal actually reaches the fixtures; get_logs pulls recent lines from any of the systemd journals (qlcplus-web, lighting-control, lighting-mcp, nginx); and get_system_info returns Pi-level health (CPU temp, load, memory, disk, uptime, USB devices, service status). Tell the agent 'why aren't the lights responding?' and it can call all three to triage."
        }
      ]
    },
    {
      category: "Troubleshooting",
      questions: [
        {
          q: "Pi won't connect to WiFi",
          a: "Double-check your WiFi credentials in the Raspberry Pi Imager. Make sure you're using 2.4GHz WiFi (5GHz may not work on older Pis)."
        },
        {
          q: "ENTTEC not detected",
          a: "Make sure it's plugged in before starting QLC+. Try unplugging and replugging it. Check that you have an authentic ENTTEC (not a counterfeit)."
        },
        {
          q: "Fixtures not responding",
          a: "Check DMX addressing, cable connections, and that fixtures are powered on. Use the DMX test command to verify output."
        },
        {
          q: "Web interface won't load",
          a: "Make sure you're on the same network as the Pi. Try accessing via IP address instead of lights.local. Check that services are running."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-ink px-[var(--gutter)] pb-[clamp(72px,9vw,140px)]">
      <PageHead
        scene={3}
        label="FAQ"
        title="Questions, answered."
        lead="Everything people ask about Lights Pi: the hardware, the software, the MCP server and what to try when something won't respond."
        aside={`${faqs.reduce((n, c) => n + c.questions.length, 0)} questions`}
      />

      <div className="space-y-[clamp(56px,6vw,96px)]">
        {faqs.map((category, catIndex) => (
          <section
            key={catIndex}
            className="grid lg:grid-cols-[minmax(0,18rem)_minmax(0,46rem)] gap-x-12 gap-y-6 border-t border-rule pt-8"
          >
            <h2
              className="font-display text-paper lg:sticky lg:top-28 self-start"
              style={{ fontSize: "var(--step-lead)", lineHeight: 1.15 }}
            >
              {category.category}
            </h2>
            <ul>
              {category.questions.map((faq, qIndex) => {
                const index = catIndex * 100 + qIndex;
                const isOpen = openIndex === index;
                const panelId = `faq-${index}`;
                return (
                  <li key={qIndex} className="border-b border-rule first:-mt-4">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => {
                        const nextOpen = !isOpen;
                        setOpenIndex(nextOpen ? index : null);
                        if (nextOpen) {
                          trackEvent.expandFaq(category.category, faq.q);
                        }
                      }}
                      className="group w-full py-4 flex items-baseline justify-between gap-6 text-left min-h-[48px]"
                      style={body}
                    >
                      <span className="font-medium text-paper group-hover:text-amber-tungsten transition-colors">
                        {faq.q}
                      </span>
                      <span aria-hidden className="text-paper/80 shrink-0 w-4 text-center">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <p id={panelId} className="pb-6 pr-10 text-paper" style={body}>
                        {faq.a}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <section className="border-t border-rule mt-[clamp(72px,8vw,120px)] pt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <h2 className="font-display text-paper" style={{ fontSize: "var(--step-head)" }}>
            Still have questions?
          </h2>
          <p className="mt-4 text-paper max-w-[36rem]" style={body}>
            Ask the community, or read the documentation.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-5">
          <SwatchButton href="/community" onClick={() => trackEvent.clickJoinCommunity("faq", "discord")}>
            Join Discord
          </SwatchButton>
          <Link href="/docs" onClick={() => trackEvent.clickViewDocs("faq")} className="link-plain">
            View documentation
          </Link>
        </div>
      </section>
    </div>
  );
}
