import { z } from "zod";

/** Type describing the kind of waypoint. */
export enum WaypointType {
  /** Default. Waypoint is a location with optional altitude and name. */
  Generic = "Generic",
  /** Waypoint is an airport. */
  Airport = "Airport",
}

export const WaypointSchema = z.object({
  /** Latitude in degrees. */
  latitudeDeg: z.number().min(-90).max(90),
  /** Longitude in degrees. */
  longitudeDeg: z.number().min(-180).max(180),
  /** Optional altitude in feet MSL. */
  mslAltitudeFt: z.number().optional(),
  /** Optional name of the waypoint. */
  name: z.string().optional(),
  /** Type of waypoint. */
  type: z.nativeEnum(WaypointType).optional(),
  /** Desired magnetic heading upon arrival at the waypoint. */
  magneticHeadingDeg: z.number().min(0).max(360).optional(),
});

/** Waypoint is a location with optional altitude and name. */
export type Waypoint = z.infer<typeof WaypointSchema>;
