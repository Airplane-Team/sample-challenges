/** The aircraft types supported by the simulator.
 * The code maps to the aircraft's name as presented to the pilot. */
export const AircraftCodeNameTuples = [
  ['a103ulac', 'Aerolite 103 ultralight'],
  ['a333', 'Airbus A330-300'],
  ['ask21', 'Alexander Schleicher ASK-21'],
  ['b58', 'Beechcraft Baron B58'],
  ['c90b', 'Beechcraft King Air C90B'],
  ['a250vtol', 'BETA Technologies A-250 VTOL'],
  ['b738', 'Boeing 737-800'],
  ['c750', 'Cessna Citation X'],
  ['c172sp', 'Cessna Skyhawk 172SP'],
  ['c172spFloats', 'Cessna Skyhawk 172SP (Floats)'],
  ['sf50', 'Cirrus SF50 Vision Jet'],
  ['sr22', 'Cirrus SR22'],
  ['da42ng', 'Diamond DA42 NG'],
  ['f14', 'Grumman F-14 Tomcat'],
  ['f4', 'Grumman F-4 Phantom II'],
  ['l1t', 'Lancair Evolution Turbine'],
  ['md82', 'McDonnell Douglas MD-82'],
  ['pa18', 'Piper PA-18 Super Cub'],
  ['r22', 'Robinson R22'],
  ['r22Floats', 'Robinson R22 (Floats)'],
  ['s76c', 'Sikorsky S-76C'],
  ['l5', 'Stinson L-5 Sentinel'],
  ['rv10', "Van's RV-10"],
  ['genericSingleFixedPiston', 'Other Single-Engine Fixed Piston Aircraft'],
  ['genericSingleComplexPiston', 'Other Single-Engine Complex Piston Aircraft'],
  ['genericMultiEnginePiston', 'Other Multiengine Piston Aircraft'],
  ['genericSingleComplexTurbine', 'Other Single-Engine Complex Turbine Aircraft'],
  ['genericMultiEngineTurbine', 'Other Multiengine Turbine Aircraft'],
  ['genericSingleJet', 'Other Single-Jet Aircraft'],
  ['genericTwinJet', 'Other Twin-Jet Aircraft'],
  ['genericSingleEngineHelicopter', 'Other Single-Engine Helicopter'],
  ['genericTwinTurbineHelicopter', 'Other Twin-Turbine Helicopter'],
  ['other', 'Other Aircraft'],
] as const;

/** The code of an aircraft type supported by Shirley. */
export type AircraftCode = (typeof AircraftCodeNameTuples)[number][0];
/** The name of an aircraft type supported by Shirley. */
export type AircraftName = (typeof AircraftCodeNameTuples)[number][1];

/** These are all the aircraft codes supported by Shirley. */
export const AircraftCodes = AircraftCodeNameTuples.map(tuple => tuple[0]) as [
  AircraftCode,
  ...AircraftCode[]
];

/** These are all the aircraft names supported by Shirley. */
export const AircraftNames = AircraftCodeNameTuples.map(tuple => tuple[1]) as [
  AircraftName,
  ...AircraftName[]
];

/** Maps an aircraft code to its name. */
export function AircraftCodeToName(code: AircraftCode | undefined): AircraftName | undefined {
  const tuple = AircraftCodeNameTuples.find(tuple => tuple[0] === code);
  return tuple ? tuple[1] : undefined;
}

/** Maps an aircraft name to its code. */
export function AircraftNameToCode(name: AircraftName | undefined): AircraftCode | undefined {
  const tuple = AircraftCodeNameTuples.find(tuple => tuple[1] === name);
  return tuple ? tuple[0] : undefined;
}
