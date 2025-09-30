# Sample Challenges and Challenge Schema Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Version numbers are assigned in Github Releases using `worker`'s version number.

## [2.14.0 beta] - 2025-09-29

The 2.14 beta is on the staging environment. See [README.md#Testing](./README.md#Testing) for more information.

### Added

- `PhaseSchema`'s `setpoints`: When set and entering this phase, system will automatically set the sim setpoints to the values in the field to a connected flight sim.

`EnabledStateSchema`:

- `preventEarlyExit` When set to true, challenge can not be exited except in terminal (final) phases.
- `assistantModeEnabled` When set to true, the assistant mode is enabled, waiting for the pilot to say "Shirley" before responding.

`EnabledToolsSchema`:

- Marker tools: `addMarker`, `editMarker`, `deleteMarker` now give a default ability to mark flight data.
- `analyzeMarkedManeuver` tool now gives a default ability to analyze a maneuver between two markers. Ask Shirley about supported analysis types.
- `resetFlight` tool provides optional ability to reset the simulation to its initial state.

## [2.12.0] - 2025-07-17

### Added

- `PositionAircraft` tool and `openingLine` to challenge schema. Brings up to date with Shirley v2.12
