export type AircraftType = 'da42' | 'c172p' | 'a250vtol' | 'ask21' | 'pa18';

// The enabled tools are the tools that are available to the user
// Empty object / undefined tools indicates no preference compared to default
export interface EnabledTools {
  weatherLookup?: boolean;
  muteAndStandby?: boolean;
  airportCodeLookup?: boolean;
  pohLookup?: boolean;
  checklists?: boolean;
  pilotNotes?: boolean;
  // resets the call context
  resetContext?: boolean;
  // lets the user deliver feedback to the Challenge maker and Airplane.team
  feedback?: boolean;
  // sets a startpoint for the user that then they can get distance from
  // via `distanceFromStartpoint` enabled state
  setUserWaypoint?: boolean;
  // starts / restarts a timer that the user can check the elapsed time
  startUserTimer?: boolean;
}

export interface EnabledState {
  // when not empty, the state will navigate to these waypoints
  navigateToStateWaypoints?: {
    latitudeDegrees: number;
    longitudeDegrees: number;
    altitudeMSL: number;
    name: string;
  }[];
  // when set true, the state will navigate to the user waypoint
  navigateToUserWaypoint?: boolean;
  // when set true, the state will get the distance from the user waypoint
  distanceFromUserWaypoint?: boolean;
}

export interface PhaseTransition {
  toPhaseName: string;
  conditions?: string;
  automaticTransition?: boolean;
}

export interface Phase {
  name: string;
  prompt: string;
  shortDescription?: string;
  transitions: PhaseTransition[];
  // override the enabled tools for this phase.
  // When option set here and on challenge level, the phase level takes precedence.
  enabledTools?: EnabledTools;
  // override the enabled state options for this phase.
  // When option set here and on challenge level, the phase level takes precedence.
  enabledState?: EnabledState;
}

export interface Challenge {
  name: string;
  shortDescription: string;
  prompt: string;
  // if null, all tools are disabled unless overridden by phase
  // if undefined or empty object, state is enabled by Shirley default (currently all off)
  enabledTools?: EnabledTools | null;
  // if null, state is disabled unless overridden by phase
  // if undefined or empty object, state is enabled by Shirley default (currently all off)
  enabledState?: EnabledState | null;
  // if specified, the challenge is only available for the specified aircraft
  limitToAircraft?: AircraftType[];
  // the first phase is the initial phase
  phases: Phase[];
}
