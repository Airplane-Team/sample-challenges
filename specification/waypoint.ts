/** Waypoint is a location with optional altitude and name. */
export type Waypoint = {
  /** Latitude in degrees. */
  latitudeDeg: number;
  /** Longitude in degrees. */
  longitudeDeg: number;
  /** Optional altitude in feet MSL. */
  mslAltitudeFt?: number;
  /** Optional name of the waypoint. */
  name?: string;
};
