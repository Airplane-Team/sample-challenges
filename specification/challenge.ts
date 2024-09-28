// Contains the interface for the challenge json format

export const AircraftCodeNameTuples = [
  ['a103ulac', 'Aerolite 103 ultralight'],
  ['ask21', 'Alexander Schleicher ASK-21'],
  ['b58', 'Beechcraft Baron B58'],
  ['a250vtol', 'BETA Technologies A-250 VTOL'],
  ['a333', 'Airbus A330-300'],
  ['b738', 'Boeing 737-800'],
  ['c172p', 'Cessna Skyhawk 172P'],
  ['sf50', 'Cirrus SF50 Vision Jet'],
  ['sr22', 'Cirrus SR22'],
  ['da42', 'Diamond DA42'],
  ['f14', 'Grumman F-14 Tomcat'],
  ['l1t', 'Lancair Evolution Turbine'],
  ['pa18', 'Piper PA-18 Super Cub'],
  ['r22', 'Robinson R22'],
  ['s76c', 'Sikorsky S-76C'],
  ['rv10', "Van's RV-10"],
  ['other', 'Other Aircraft'],
] as const;

export type AircraftCode = (typeof AircraftCodeNameTuples)[number][0];
export type AircraftName = (typeof AircraftCodeNameTuples)[number][1];

export const AircraftCodes = AircraftCodeNameTuples.map(tuple => tuple[0]) as [
  AircraftCode,
  ...AircraftCode[]
];

export const AircraftNames = AircraftCodeNameTuples.map(tuple => tuple[1]) as [
  AircraftName,
  ...AircraftName[]
];

export function AircraftCodeToName(code: AircraftCode | undefined): AircraftName | undefined {
  const tuple = AircraftCodeNameTuples.find(tuple => tuple[0] === code);
  return tuple ? tuple[1] : undefined;
}

export function AircraftNameToCode(name: AircraftName | undefined): AircraftCode | undefined {
  const tuple = AircraftCodeNameTuples.find(tuple => tuple[1] === name);
  return tuple ? tuple[0] : undefined;
}

// Enabled tools are the tools that are available to Shirley.
// Empty object / undefined tools indicates no preference compared to default.
export interface EnabledTools {
  // [default] Lets pilots look up a current US METAR.
  weatherLookup?: boolean;
  // [default] lets pilots disable Shirley from replying.
  muteAndStandby?: boolean;
  // Lets pilots look up an airport code by name.
  airportCodeLookup?: boolean;
  // [default] For supported aircraft provides a POH lookup functionality.
  pohLookup?: boolean;
  // [default] For supported aircraft provides a checklist lookup functionality.
  checklists?: boolean;
  // [default] Lets pilots take notes that appear until the end of the call.
  pilotNotes?: boolean;
  // [default] Resets the call context.
  resetContext?: boolean;
  // Will eventually deliver feedback to challenge creators and FlyShirley's authors.
  feedback?: boolean;
  // Sets a startpoint for the pilot that then they can get distance from
  // via `distanceFromStartpoint` in `EnabledState`.
  setUserWaypoint?: boolean;
  // [default] Starts / restarts a timer so the pilot can check the elapsed time.
  startUserTimer?: boolean;
  // [default] Applies various simulator setpoints.
  setSimulatorSetpoints?: boolean;
  // Generates analysis of a specific maneuver from flight data that has been recorded.
  // Specific analysis types are available and known by Shirley.
  // - See also: `EnabledState.recordFlightData`
  analyzeFlightData?: boolean;
  // Resets the recorded flight data.
  resetFlightData?: boolean;
}

export type Waypoint = {
  latitudeDeg: number;
  longitudeDeg: number;
  mslAltitudeFt: number;
  name: string;
};

// Enable state gives Shirley the ability to know certain information or have
// certain behaviors taken for it.
export interface EnabledState {
  // When not empty, Shirley will know how to navigate to these waypoints.
  navigateToStateWaypoints?: Waypoint[];
  // When set true, Shirley will know how to navigate to this next waypoint.
  navigateToUserWaypoint?: boolean;
  // When set true, the state will get the distance from the user waypoint.
  // When true, flight data will be recorded for Shirley future analysis.
  distanceFromUserWaypoint?: boolean;
  // When set true flight data is recorded for Shirley until no longer true.
  // When set true, any pre-existing data is discarded.
  // When true or after being set true, Shirley can use `analyzeFlightData`
  // to get information about the flight.
  recordFlightData?: boolean;
}

// Takes Shirley from one phase to the next.
export interface PhaseTransition {
  // Name of phase to transition to from Challenge.phases.
  toPhaseName: string;
  // Condition to consider before transitioning to this phase.
  conditions?: string;
  // Whether to encourage automatic transition to this phase when able to evaluate
  // the above conditions.
  automaticTransition?: boolean;
}

// Is a portion of a challenge with its own prompt, tools, state and any transitions.
export interface Phase {
  // CammelCase name of the phase.
  name: string;
  // Prompt for the phase Shirley should refer to.
  prompt: string;
  // A brief description of the phase for Shirley when considering
  // transitioning to this phase.
  shortDescription?: string;
  // Available transitions from this phase.
  // When there are no transitions then the phase is an end phase for the Challenge.
  transitions: PhaseTransition[];
  // Override the enabled tools for this phase.
  // When option set here and on Challenge level, the phase level takes precedence.
  enabledTools?: EnabledTools;
  // Override the enabled state options for this phase.
  // When option set here and on Challenge level, the phase level takes precedence.
  enabledState?: EnabledState;
}

// Provides a curriculem for Shirley to bring users from the first phase.
export interface Challenge {
  name: string;
  shortDescription: string;
  prompt: string;
  // If null, all tools are disabled unless overridden by phase.
  // If undefined or empty object, tools are enabled per defaults (see [default] above).
  enabledTools?: EnabledTools | null;
  // If null, state is disabled unless overridden by phase.
  // If undefined or empty object, state is enabled per defaults (currently all off).
  enabledState?: EnabledState | null;
  // If specified, the Challenge is only available for the specified aircraft.
  limitToAircraft?: AircraftCode[];
  // Individual portions of a challenge.
  // The first phase is the initial phase.
  // - See also: `Phase.transitions`.
  phases: Phase[];
}
