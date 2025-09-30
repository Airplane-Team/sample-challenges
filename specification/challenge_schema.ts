import { z } from "zod";

import { AircraftCodes } from "../aircraft_types.js";
import { WaypointSchema } from "../waypoint.js";
import { SetSimDataSchema } from "../simdata/set_simdata_schemas.js";

/** Maximum number of characters of the opening line of a challenge. */
const kMaxOpeningLineLength = 280;

/** Maximum number of characters of a tool name. */
export const kMaxToolNameLength = 64;

/** Pattern for a tool name: only letters, numbers, hyphens (-), and underscores (_). */
const kNamePattern = /^[a-zA-Z0-9_-]*$/;

/** Message for a tool name violation. */
const kNameViolationMessage =
  'Name must be one "word" containing only letters, numbers, hyphens (-), and underscores (_).';

/** Schema for the enabled state options for a challenge or phase.
 * @see EnabledState
 */
const EnabledStateSchema = z
  .object({
    /** [default] When set true, Shirley will know how to navigate to this next waypoint. */
    navigateToUserWaypoint: z.boolean().optional(),
    /** [default] When set true, the state will get the distance from the user waypoint. */
    distanceFromUserWaypoint: z.boolean().optional(),
    /** When not empty, Shirley will know how to navigate to these waypoints. */
    navigateToStateWaypoints: z.array(WaypointSchema.strict()).optional(),

    /** When set true flight data is recorded for Shirley until no longer true.
     * When true or after being set true, Shirley can use `analyzeFlightData`
     * to generate analysis graphs of the flight.
     * @remark When set true after false/undefined, any pre-existing data is discarded.
     *         I.e. any existing flight data is discarded before recording begins. */
    recordFlightData: z.boolean().optional(),

    /** When set to true, a timer is started at zero and Shirley maintains an awareness
     * of how much time has passed.
     * @remark Cleared when set false. */
    challengeTimer: z.boolean().optional(),

    /** Specifies the mean number of seconds of silence before Shirley will
     * proactively say something.
     *
     * When null'd over, or undefined at both Challenge and phase level, the feature is disabled.
     * @see OverridePropertyMap - for merging behavior.
     * */
    wakeUpAfterQuietPeriodSeconds: z.number().gt(0).nullable().optional(),

    /** When set to true, the phaser system checks the progress of the challenge steps
     * to determine whether to progress to the next phase. This occurs in the background
     * so it can continue despite either interruptions or silence. */
    phaserEnabled: z.boolean().optional(),

    /** When set to true, challenge can not be exited except in terminal (final) phases.
     * @remark this is useful for cleanups at the end of a challenges, (e.g.) via setpoints. */
    preventEarlyExit: z.boolean().optional(),

    /** When set to true, the assistant mode is enabled, waiting for the pilot to say "Shirley"
     * before responding.
     * - When set to false, the assistant mode is disabled.
     * - Undefined indicates no preference compared to default or current setting.
     * @remark If true, `wakeUpAfterQuietPeriodSeconds` still wakes up Shirley after a quiet period.
     * @remark Overrides current assistant mode state when entering the challenge phase. */
    assistantModeEnabled: z.boolean().optional(),
  })
  .strict();

/** Enable state gives Shirley the ability to know certain information or have
 * certain behaviors taken given the state during challenges. */
export type EnabledState = z.infer<typeof EnabledStateSchema>;

/** Schema for the enabled tools for a challenge or phase.
 * @see EnabledTools
 */
const EnabledToolsSchema = z
  .object({
    /** [default] Lets pilots look up a current US METAR. */
    weatherLookup: z.boolean().optional(),
    /** [default] Lets pilots look up an airport by code. */
    airportCodeLookup: z.boolean().optional(),
    /** [default] Lets pilots look up an airport by coordinate and other criteria. */
    airportLookup: z.boolean().optional(),
    /** [default] Lets pilots take notes that appear until the end of the call. */
    pilotNotes: z.boolean().optional(),
    /** [default] Will eventually deliver feedback to challenge creators and FlyShirley's authors. */
    feedback: z.boolean().optional(),

    /** [default] Sets a destination runway using airport code and runway identifier,
     * enabling phase of flight detection for training at supported airports
     * as well as the navigation calculations that setUserWaypoint provides. */
    setDestinationRunway: z.boolean().optional(),
    /** [default] Sets a start point for the pilot that they can then get distance
     * from via `distanceFromStartpoint` in `EnabledState`. */
    setUserWaypoint: z.boolean().optional(),
    /** [default] Starts / restarts a timer so the pilot can check the elapsed time.
     * @see: `challengeTimer` which is maintained by the Challenge system. */
    startUserTimer: z.boolean().optional(),

    /** [default] Applies various setpoints to control the simulation. */
    setSimulatorSetpoints: z.boolean().optional(),
    /** [default] Reads a snapshot of simulator data for Shirley. */
    readSimulatorData: z.boolean().optional(),

    /** [default] Lets pilots disable Shirley from replying. */
    muteAndStandby: z.boolean().optional(),
    /** [default] Toggles Shirley Mode- requiring "Shirley" be said for responses
     * after periods of silence. */
    toggleAssistantMode: z.boolean().optional(),
    /** Resets the call context - essentially creating a fresh flight. */
    resetContext: z.boolean().optional(),

    /** Generates analysis of a specific maneuver from flight data that has been recorded.
     * Specific analysis types are available and known by Shirley.
     * @see: `EnabledState.recordFlightData` */
    analyzeFlightData: z.boolean().optional(),
    /** Resets the recorded flight data. */
    resetFlightData: z.boolean().optional(),

    /** For supported aircraft provides a POH lookup functionality.
     *  @deprecated to be replaced by something better. */
    pohLookup: z.boolean().optional(),
    /** For supported aircraft provides a checklist lookup functionality.
     *  @deprecated to be replaced by something better. */
    checklists: z.boolean().optional(),

    /** [default] Positions the aircraft at final, base, upwind, downwind, and departure based on airport/runway. */
    setPosition: z.boolean().optional(),
    /** Resets the flight to its initial state. */
    resetFlight: z.boolean().optional(),

    /** [default] Adds a marker to the flight.
     * @see: `MarkerRecord` */
    addMarker: z.boolean().optional(),
    /** [default] Edits a marker on the flight.
     * @see: `MarkerRecord` */
    editMarker: z.boolean().optional(),
    /** [default] Deletes a marker on the flight.
     * @see: `MarkerRecord` */
    deleteMarker: z.boolean().optional(),
    /** [default] Analyzes a maneuver between two markers. */
    analyzeMarkedManeuver: z.boolean().optional(),
  })
  .strict();

/** Enabled tools are the tools that are available to Shirley.
 * Undefined indicates no preference compared to default. */
export type EnabledTools = z.infer<typeof EnabledToolsSchema>;

export const PhaseTransitionSchema = z
  .object({
    /** Name of phase to transition to from Challenge.phases. */
    toPhaseName: z
      .string()
      .min(1)
      .max(kMaxToolNameLength)
      .regex(kNamePattern, kNameViolationMessage),
    /** Condition to consider before transitioning to this phase. */
    conditions: z.string().optional(),
    /** Whether to encourage automatic transition to this phase when able to evaluate the
     * above conditions. */
    automaticTransition: z.boolean().optional(),
  })
  .strict();

/** Takes Shirley from one phase to the next. */
export type PhaseTransition = z.infer<typeof PhaseTransitionSchema>;

/** Schema for a phase of a challenge.
 *  @see Phase
 */
export const PhaseSchema = z
  .object({
    /** Upper CamelCase name of the phase
     * @remark unique within the challenge.
     * @remark length limited - less than 51 characters when combined with challenge name. */
    name: z.string().min(1).max(kMaxToolNameLength).regex(kNamePattern, kNameViolationMessage),
    /** Prompt for the phase Shirley should refer to when explaining to the pilot. */
    prompt: z.string().optional(),
    /** The steps that Shirley should take the pilot through in this phase. */
    steps: z.array(z.string()).optional(),
    /** The performance criteria for the phase. */
    goals: z.array(z.string()).optional(),
    /** Common errors that Shirley should look-out for. */
    commonErrors: z.array(z.string()).optional(),
    /** A brief description of the phase for Shirley when considering transitioning to this phase. */
    shortDescription: z.string().optional(),
    /** Available transitions from this phase, subject to the following rules:
     * - When transitions is an empty array, the phase is an end phase for the Challenge.
     * - When transitions is undefined, a default transition to the next phase in the
     * Challenge is assumed.
     * @remark The default transition is to the next phase in `Challenge.phases` order. If it's
     * the last phase, the default transition offers to restart the Challenge (non-automatically).
     * @remark If steps are defined, the default transition is automatic with the completion
     * of all steps as the criteria.
     * @remark If steps are not defined, the default transition is not automatic but there
     * is no criteria for the transition.
     * */
    transitions: z.array(PhaseTransitionSchema).optional(),
    /** Override the enabled tools for this phase.
     * When option set here and on Challenge level, the phase level takes precedence. */
    enabledTools: EnabledToolsSchema.optional(),
    /** Override the enabled state options for this phase.
     * When option set here and on Challenge level, the phase level takes precedence. */
    enabledState: EnabledStateSchema.optional(),
    /** Sim Setpoints to set when entering this phase. */
    setpoints: SetSimDataSchema.optional(),
  })
  .strict();

/** Is a portion of a challenge with its own prompt, tools, state and any transitions.
 *
 * The phase text is the combination of the phase prompt components:
 * - Phase.prompt
 * - Phase.steps
 * - Phase.goals
 * - Phase.commonErrors
 *
 * If the phase name contains 'Brief' or 'Debrief', all Challenge 'Goals' and 'Common Errors'
 * are included in the phase text:
 * - 'Challenge.phases[].goals'
 * - 'Challenge.phases[].commonErrors'
 */
export type Phase = z.infer<typeof PhaseSchema>;

/** Schema for a challenge.
 * @see Challenge
 */
export const ChallengeSchema = z
  .object({
    /** Upper CamelCase name of the challenge.
     * @remark length limited - less than 51 characters when combined with each phase name. */
    name: z.string().min(1).max(kMaxToolNameLength).regex(kNamePattern, kNameViolationMessage),
    /** A brief description of the challenge Shirley can use when the pilot is considering
     * transitioning to this challenge. */
    shortDescription: z.string(),
    /** The text that guides Shirley during all phases of the challenge. */
    prompt: z.string().optional(),
    /** The opening line of the challenge. This will be the first thing Shirley says to the pilot. */
    openingLine: z.string().min(1).max(kMaxOpeningLineLength).optional(),
    /** If null, all tools are disabled unless overridden by phase.
     * If undefined or empty object, tools are enabled per defaults (see [default] above). */
    enabledTools: EnabledToolsSchema.nullable().optional(),
    /** If null, state is disabled unless overridden by phase.
     * If undefined or empty object, state is enabled per defaults (see [default] above). */
    enabledState: EnabledStateSchema.nullable().optional(),
    /** If specified, the aircraft codes the challenge is limited to. */
    limitToAircraft: z.array(z.enum(AircraftCodes)).optional(),
    /** Individual portions of a challenge. The first phase is the initial phase.
     * @see `Phase.transitions`. */
    phases: z.array(PhaseSchema),
  })
  .strict();

/** Provides a curriculum for Shirley to train pilots.
 *
 * The overall prompt text is the combination of the challenge prompt and phase prompt components:
 * - Challenge.prompt
 * - Phase.prompt and phase text (for the active phase)
 */
export type Challenge = z.infer<typeof ChallengeSchema>;
