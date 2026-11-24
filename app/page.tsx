import { Hero } from "@/components/home/Hero";
import { Inputs } from "@/components/home/Inputs";
import { Agent } from "@/components/home/Agent";
import { Board } from "@/components/home/Board";
import { Kelvin } from "@/components/home/Kelvin";
import { Build } from "@/components/home/Build";
import { Price } from "@/components/home/Price";
import { Close } from "@/components/home/Close";

/**
 * The homepage argument, one claim per section:
 *  1. Hero    — it runs stage lights from a Pi (and you can recall a real scene).
 *  2. Inputs  — anything in the room can drive it: phone, agent, MIDI, OSC, remote.
 *  3. Agent   — hand the rig to an LLM over MCP; the setup is one JSON entry.
 *  4. Board   — it is built for real shows: cue lists, chases, console, health.
 *  5. Kelvin  — the one control that shows what fixtures do, at poster size.
 *  6. Build   — ten minutes from parts to light.
 *  7. Price   — from $125, once; the software is free.
 *  8. Close   — build it this weekend.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Inputs />
      <Agent />
      <Board />
      <Kelvin />
      <Build />
      <Price />
      <Close />
    </>
  );
}
