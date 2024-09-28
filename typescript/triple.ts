import { Challenge } from '../specification/challenge';

const challenge: Challenge = {
  name: 'TripleChallenge',
  shortDescription: 'Boston Triple Challenge',
  prompt: `# Boston Triple Challenge
This is a historical challenge invented for competitions at Beta Technologies and conducted in the ALIA-250 VTOL aircraft.
You will takeoff from the helipad, land on three rooftop helipads in Boston, and fly under two bridges to complete the challenge.

Note: Pilots prefer magnetic heading for navigation.
`,
  enabledTools: {
    weatherLookup: false,
    muteAndStandby: true,
    airportCodeLookup: false,
    pohLookup: false,
    checklists: false,
    pilotNotes: false,
    feedback: false,
    startUserTimer: false,
  },
  limitToAircraft: ['a250vtol'],
  phases: [
    {
      name: 'Setup',
      shortDescription: 'Set your start point',
      prompt: `## Setup the Boston Triple Challenge
The triple challenge starts at the Boston City Hospital Helipad "0MA4", using the north facing or default starting point.
You'll need to use maximum world objects in the X-Plane settings to see the helipads in this challenge.

Start the timer before transitioning to the next phase.
`,
      enabledTools: { startUserTimer: true },
      transitions: [
        {
          toPhaseName: 'RooftopLandings',
          automaticTransition: true,
          conditions:
            'Upon takeoff or once pilot says they are ready to start the challenge... Remember to start the timer!',
        },
      ],
    },
    {
      name: 'RooftopLandings',
      shortDescription: 'Fly and land on three rooftops',
      prompt: `## Three Rooftop Landings
Pilot will Takeoff from the helipad and fly to the following rooftop helipads in Boston: Tufts Medical Center and two in the Downtown area.

The coordinates are provided in state. The pilot will land on each helipad and takeoff to the next. Read out the time at each landing.
`,
      enabledState: {
        recordFlightData: true,
        navigateToStateWaypoints: [
          {
            name: 'Tufts Medical Center',
            latitudeDeg: 42.349,
            longitudeDeg: -71.063,
            mslAltitudeFt: 139,
          },
          {
            name: 'Downtown 1: Back Bay',
            latitudeDeg: 42.353,
            longitudeDeg: -71.064,
            mslAltitudeFt: 458,
          },
          {
            name: 'Downtown 2: Financial District',
            latitudeDeg: 42.356,
            longitudeDeg: -71.052,
            mslAltitudeFt: 630,
          },
        ],
      },
      transitions: [
        {
          toPhaseName: 'Bridges',
          conditions: 'After the third rooftop helipad landing.',
          automaticTransition: true,
        },
      ],
    },
    {
      name: 'Bridges',
      shortDescription: 'Fly under two bridges',
      prompt: `## Fly under two bridges
After the third landing, fly under two bridges in Boston.
1. The Longfellow Bridge
2. MIT's "Harvard" Bridge

Read out the time after flying under each bridge. The challenge completes after flying under the second bridge.
`,
      enabledState: {
        recordFlightData: true,
        navigateToStateWaypoints: [
          {
            name: 'Longfellow Bridge',
            latitudeDeg: 42.363,
            longitudeDeg: -71.07,
            mslAltitudeFt: 50,
          },
          {
            name: 'MIT "Harvard" Bridge',
            latitudeDeg: 42.359,
            longitudeDeg: -71.09,
            mslAltitudeFt: 50,
          },
        ],
      },
      transitions: [
        {
          toPhaseName: 'Finish',
          conditions: 'After flying under the second bridge.',
          automaticTransition: true,
        },
      ],
    },
    {
      name: 'Finish',
      shortDescription: 'Challenge complete',
      prompt: `## Challenge Complete
You have completed the Boston Triple Challenge!
Record the time from the user timer and debrief the flight.
`,
      enabledTools: {},
      transitions: [],
    },
  ],
};

const jsonString = JSON.stringify(challenge, null, 2);

import { writeFileSync } from 'fs';
const fileName = 'triple.out.json';
const outputPath = 'json/' + fileName;
writeFileSync(outputPath, jsonString);

console.log(`Wrote ${fileName} to ${outputPath}`);
