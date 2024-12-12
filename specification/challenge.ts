/** Contains the interface for the challenge json format */

import { AircraftCode } from './aircraft_types';
import { Waypoint } from './waypoint';

/** Enabled tools are the tools that are available to Shirley.
 * Empty object / undefined tools indicates no preference compared to default. */
export interface EnabledTools {
  /**[default] Lets pilots look up a current US METAR. */
  weatherLookup?: boolean;
  /** [default] When enabled, Shirley must be said for responses to be allowed after periods of silence.  */
  toggleAssistantMode?: boolean;
  /** [default] lets pilots disable Shirley from replying.  */
  muteAndStandby?: boolean;
  /** Lets pilots look up an airport code by name.  */
  airportCodeLookup?: boolean;
  /** [default] For supported aircraft provides a POH lookup functionality.  */
  pohLookup?: boolean;
  /** [default] For supported aircraft provides a checklist lookup functionality.  */
  checklists?: boolean;
  /** [default] Lets pilots take notes that appear until the end of the call.  */
  pilotNotes?: boolean;
  /** [default] Resets the call context.  */
  resetContext?: boolean;
  /** Will eventually deliver feedback to challenge creators and FlyShirley's authors.  */
  feedback?: boolean;
  /** Sets a startpoint for the pilot that then they can get distance from
   * via `distanceFromStartpoint` in `EnabledState`. */
  setUserWaypoint?: boolean;
  /** [default] Starts / restarts a timer so the pilot can check the elapsed time.  */
  startUserTimer?: boolean;
  /** [default] Applies various setpoints to control the simulation.  */
  setSimulatorSetpoints?: boolean;
  /** Generates analysis of a specific maneuver from flight data that has been recorded.
   * Specific analysis types are available and known by Shirley.
   * @see: `EnabledState.recordFlightData` */
  analyzeFlightData?: boolean;
  /** Resets the recorded flight data.  */
  resetFlightData?: boolean;
}

/** Enable state gives Shirley the ability to know certain information or have
 * certain behaviors taken for it. */
export interface EnabledState {
  /** When not empty, Shirley will know how to navigate to these waypoints. */
  navigateToStateWaypoints?: Waypoint[];
  /** When set true, Shirley will know how to navigate to this next waypoint.  */
  navigateToUserWaypoint?: boolean;
  /** When set true, the state will get the distance from the user waypoint.
   * When true, flight data will be recorded for Shirley future analysis. */
  distanceFromUserWaypoint?: boolean;
  /** When set true flight data is recorded for Shirley until no longer true.
   * When set true, any pre-existing data is discarded.
   * When true or after being set true, Shirley can use `analyzeFlightData`
   * to get information about the flight. */
  recordFlightData?: boolean;
}

/** Takes Shirley from one phase to the next. */
export interface PhaseTransition {
  /** Name of phase to transition to from Challenge.phases. */
  toPhaseName: string;
  /** Condition to consider before transitioning to this phase.  */
  conditions?: string;
  /** Whether to encourage automatic transition to this phase when able to evaluate
   * the above conditions. */
  automaticTransition?: boolean;
}

/** Is a portion of a challenge with its own prompt, tools, state and any transitions. */
export interface Phase {
  /** CammelCase name of the phase. */
  name: string;
  /** Prompt for the phase Shirley should refer to when explaining to the pilot.  */
  prompt: string;
  /** A brief description of the phase for Shirley when considering
   * transitioning to this phase. */
  shortDescription?: string;
  /** Available transitions from this phase.
   * When there are no transitions then the phase is an end phase for the Challenge. */
  transitions: PhaseTransition[];
  /** Override the enabled tools for this phase.
   * When option set here and on Challenge level, the phase level takes precedence. */
  enabledTools?: EnabledTools;
  /** Override the enabled state options for this phase.
   * When option set here and on Challenge level, the phase level takes precedence. */
  enabledState?: EnabledState;
}

/** Provides a curriculum for Shirley to bring users from the first phase. */
export interface Challenge {
  name: string;
  /** A brief description of the challenge Shirley can use when the pilot is considering
   * transitioning to this challenge. */
  shortDescription: string;
  /** The text that Shirley sees in regard to the whole challenge. */
  prompt: string;
  /** If null, all tools are disabled unless overridden by phase.
   * If undefined or empty object, tools are enabled per defaults (see [default] above). */
  enabledTools?: EnabledTools | null;
  /** If null, state is disabled unless overridden by phase.
   * If undefined or empty object, state is enabled per defaults (currently all off). */
  enabledState?: EnabledState | null;
  /** If specified, the Challenge is only available for the specified aircraft.  */
  limitToAircraft?: AircraftCode[];
  /** Individual portions of a challenge.
   * The first phase is the initial phase.
   * @see `Phase.transitions`. */
  phases: Phase[];
}
