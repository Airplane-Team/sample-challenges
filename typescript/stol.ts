import { Challenge } from "../specification/challenge_schema";

const challenge: Challenge = {
  name: "PA18STOLChallenge",
  shortDescription: "PiperCub Short Field Landing Challenge",
  prompt: `# Piper Cub STOL Challenge\nThis challenge focuses on the goal of landing in the shortest distance possible.\n\nThe phases are: Approach, Landing, and Post-Flight Debrief.\n\n## Vehicle Details\n Option 1: Cessna 172P. A single-engine, four-seat, high-wing aircraft renowned for its stability and ease of handling, commonly used for training and general aviation.\n Option 2: Piper Cub\n A single engine, high wing, tailwheel aircraft known for its impressive off airport capability and commonly used by push pilots around the world.\n\n## Challenge Mission Details\nThe pilot's mission is to perform a short field landing with the shortest possible landing distance.\n Short field landings are often used by expert bush pilots to get into and out of small landing strips or even gravel riverbanks. It's a hard maneuver requiring precision control.`,
  enabledTools: {
    weatherLookup: false,
    muteAndStandby: true,
    airportCodeLookup: false,
    pohLookup: false,
    checklists: false,
    pilotNotes: false,
    feedback: false,
    setUserWaypoint: false,
    startUserTimer: true,
  },
  limitToAircraft: ["pa18"],
  phases: [
    {
      name: "Setup",
      shortDescription: "Find a fun airport for the challenge",
      prompt:
        "## Current Phase: Setup\n\n### Objectives\n Lets get you started by finding a cool airport for the challenge and select a STOL aircraft.\n ###Suggested Airports: Talkeetna (Identifier: PATK), Kokoda, Papau New Guinea (Identifier: AYKP), Johnson Creek Airport (Identifier: 3U2), Tapini (Idenitifer: AYTI) or Cavanaugh Bay (Identifier: 66S).\n ###Aircraft: Then we will need a good plane for short field landings. Try a Piper Cub like the pros.\n ###Setup Touchdown point: Make sure to tell the pilot they need to start on the runway. Once the pilot has selected their airport and aircraft and started their flight in X-Plane, they will be on the ground ready for takeoff. Ask them to set their start point. This exact point will become their landing target. They will have to land at or beyond that point for the landing to count, and it will be used to measure their landing distance",
      enabledTools: {
        setUserWaypoint: true,
      },
      transitions: [
        {
          toPhaseName: "Flight",
          automaticTransition: true,
          conditions:
            "You have used the `SetUserWaypoint` tool after the pilot positioned the aircraft.",
        },
      ],
    },
    {
      name: "Flight",
      prompt:
        "Have the pilot takeoff, but since they're new give them a tutorial the first time. Position the aircraft for a short as possible landing.",
      enabledState: {
        navigateToUserWaypoint: true,
        distanceFromUserWaypoint: true,
      },
      transitions: [
        {
          toPhaseName: "Approach",
          conditions: "Pilot has turned back toward runway and intended landing point.",
        },
      ],
    },
    {
      name: "Approach",
      shortDescription:
        "Set up for a short landing by establishing a stable approach at lowest safe airspeed.",
      prompt:
        "## Current Phase: Approach\n\n### Objectives\n1. Stable Approach. \n2. Aim for a predetermined touchdown point.  Training Material\nEstablish a stabilized final approach at the recommended short field approach speed of 55 knots(1.3 Vso).\n2. Use full flaps to control speed and aim for your predetermined touchdown point at the beginning of the runway. Remind them they are to touch down at or after the exact spot they marked in the preflight phase (otherwise they're disqualified).\n\n#### Troubleshooting\nIf the approach speed is too high or low, adjust the pitch and power accordingly to stabilize the approach.",
      enabledState: {
        navigateToUserWaypoint: true,
        distanceFromUserWaypoint: true,
      },
      transitions: [
        {
          toPhaseName: "Landing",
          automaticTransition: true,
          conditions: "Pilot is 500 feet AGL",
        },
      ],
    },
    {
      name: "Landing",
      shortDescription:
        "Execute a precise short field landing, focusing on minimizing the landing distance.",
      prompt:
        "## Current Phase: Landing\n\n### Objectives\n1. Reduce power to idle as the aircraft nears the runway.\n2. Upon touchdown, immediately apply brakes and use full back pressure for aerodynamic breaking.",
      enabledState: {
        navigateToUserWaypoint: true,
        distanceFromUserWaypoint: true,
      },
      transitions: [
        {
          toPhaseName: "Debrief",
          automaticTransition: true,
          conditions: "Aircraft is landed (AGL is ~0) and comes to a complete stop.",
        },
      ],
    },
    {
      name: "Debrief",
      prompt:
        "Tell the pilot how far they are from their takeoff point which is visible in the Enabled State.\nYou can ask them to guess first.\nDiscuss the landing and how they could improve.",
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
