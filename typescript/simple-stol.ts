import { Challenge } from '../specification/challenge';

const challenge: Challenge = {
  name: 'StolContest',
  shortDescription: 'STOL Landing Competition',
  prompt:
    "This is a challenge to see how short a distance the pilot can land the aircraft in. In preflight, you will use `SetUserWaypoint` to mark the takeoff point. In the flight phase, you will have the pilot position for a short as possible landing. In the debrief phase, you will measure the distance from the takeoff point to the landing point.\n\nIt's important that you make this challenge fun! Encourage the pilot to try different techniques and to have fun with it. Remember, the goal is to learn and improve, not to be perfect.",
  enabledTools: {
    weatherLookup: false,
    muteAndStandby: false,
    airportCodeLookup: false,
    pohLookup: false,
    checklists: false,
    pilotNotes: false,
    feedback: false,
    resetContext: true,
    setUserWaypoint: false,
    startUserTimer: true,
  },
  limitToAircraft: ['c172p'],
  phases: [
    {
      name: 'Preflight',
      prompt:
        "Ensure you're getting telemetry via xplane. Ask the pilot to position the aircraft for takeoff, exactly where they plan to touch down back. Use `SetUserWaypoint` to mark the takeoff point.",
      enabledTools: {
        setUserWaypoint: true,
      },
      transitions: [
        {
          toPhaseName: 'Flight',
          automaticTransition: true,
          conditions:
            'You have used the `SetUserWaypoint` tool after the pilot positioned the aircraft.',
        },
      ],
    },
    {
      name: 'Flight',
      prompt:
        "Have the pilot takeoff, but since they're new give them a tutorial the first time. Position the aircraft for a short as possible landing. Remind them they are to touch down at or after the exact spot they marked in the preflight phase (otherwise they're disqualified).",
      enabledState: {
        navigateToUserWaypoint: true,
        distanceFromUserWaypoint: true,
      },
      transitions: [
        {
          toPhaseName: 'Debrief',
          automaticTransition: true,
          conditions: 'Pilot has landed the aircraft (AGL is ~0).',
        },
      ],
    },
    {
      name: 'Debrief',
      prompt:
        'Measure the distance from the takeoff point to the landing point which is visible in the Enabled State.\nYou can ask them to guess first.\nDiscuss the landing and how they would like to improve.',
      enabledTools: {
        feedback: true,
        pilotNotes: true,
      },
      enabledState: {
        distanceFromUserWaypoint: true,
      },
      transitions: [],
    },
  ],
};

const jsonString = JSON.stringify(challenge, null, 2);

import { writeFileSync } from 'fs';
const fileName = 'simple-stol.out.json';
const outputPath = 'json/' + fileName;
writeFileSync(outputPath, jsonString);

console.log(`Wrote ${fileName} to ${outputPath}`);
