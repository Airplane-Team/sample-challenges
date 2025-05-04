export const HoverPractice: Challenge = {
  name: "HoverPractice",
  shortDescription: "Master hover control: pickup, hold, and set down in calm conditions.",
  limitToAircraft: ["genericSingleTurbineHelicopter"],
  enabledTools: {},
  enabledState: {
    wakeUpAfterQuietPeriodSeconds: 11,
    phaserEnabled: true,
  },
  phases: [
    {
      name: "Brief",
      shortDescription: "Challenge briefing",
      prompt:
        "Welcome to the Hover Practice challenge. You will practice picking up to a hover, holding position, and setting down in calm weather.",
      steps: [
        "Review hover fundamentals.",
        "Ensure calm weather is configured (wind < 3 knots, no gusts).",
        "Decide on desired spot and heading.",
        "Call setUserWaypoint to define the starting spot.",
      ],
    },
    {
      name: "PickupToHover",
      shortDescription: "Lift into a stable hover",
      prompt: "Begin in a landed position. Smoothly apply collective to initiate a hover pickup.",
      steps: ["Climb to 5-10 feet AGL (with vertical speed no more than 200 fpm.)"],
      goals: [
        "Smoothly increase collective while managing yaw with pedals.",
        "Vertical lift with minimal lateral movement.",
        "Stabilize with minimize drift within a 2-meter radius at hover.",
      ],
      commonErrors: ["Over-controlling and oscillating.", "Drifting during pickup."],
      enabledState: {
        recordFlightData: true,
      },
      enabledTools: {
        setUserWaypoint: true,
      },
    },
    {
      name: "HoverHold",
      shortDescription: "Maintain hover position for 30 seconds",
      prompt: "Hold position at the set hover point for 30 seconds on ChallengeTimer.",
      steps: ["Attempt to maintain a precise hover for 30 seconds"],
      goals: [
        "Use micro adjustments to maintain lateral and vertical stability.",
        "Keep heading and altitude within tight tolerances.",
        "Stay within 1.5-meter radius and ±4 feet altitude.",
        "Heading deviation < 5°.",
        "Hold for 30 seconds.",
      ],
      commonErrors: [
        "Fighting cyclic instead of anticipating drift.",
        "Losing altitude or yaw alignment.",
      ],
      enabledState: {
        challengeTimer: true,
        distanceFromUserWaypoint: true,
        recordFlightData: true,
      },
    },
    {
      name: "SetDown",
      shortDescription: "Controlled hover landing",
      prompt: "Transition from hover to touchdown.",
      steps: ["Touch down smoothly"],
      goals: [
        "Descend slowly while maintaining heading and position.",
        "Vertical descent within 1-meter drift.",
        "Touch down gently and smoothly without lateral movement or bounce.",
      ],
      commonErrors: ["Hard or uneven landing.", "Sliding during touchdown."],
      enabledState: {
        recordFlightData: true,
      },
    },
    {
      name: "Debrief",
      shortDescription: "Review your hover performance",
      prompt:
        "Well done. Let's review your hover stability and control. Shirley will analyze your data and highlight areas to improve.",
      steps: [
        "Analyze hover performance data by calling analyzeFlightData (waypoint-maneuver).",
        "Review metrics like drift radius, heading variance, and altitude stability.",
      ],
      enabledTools: {
        analyzeFlightData: true,
      },
      enabledState: {
        wakeUpAfterQuietPeriodSeconds: null,
        phaserEnabled: false,
      },
    },
  ],
};
