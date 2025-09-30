# Sample Shirley Challenges by Airplane.Team

This repository contains a collection of sample Shirley challenges created by the Airplane Team. You can use these challenges as a reference when creating your own challenges!

If you need help, you can join us on our [Discord server](https://airplane.team/discord). If you create a challenge and would like feedback, you can post it in the #shirley-challenge-creator channel!

## Folders

- **[JSON](./json)**: Sample challenges written in JSON format.
- **[TypeScript](./typescript)**: Sample challenges written in TypeScript.
- **[Specification](./specification)**: Contains the type formats and validation schema for challenges.

## Shirley Challenge Maker

The Shirley Challenge Maker is a tool that allows you to create Shirley challenges in a more user-friendly way using a GPT.

Link to Shirley "GPT":
https://chatgpt.com/g/g-678567a005d481919719e20535cf6f67-flyshirley-challenge-creator

It can be helpful to first say,

```
Let's list out and agree on the points before you create the Challenge object. Here's the background info:

(put your background info here)
```

Then, when you're happy with the list, you can create the object:

```
Looks good! Let's create a the Challenge Object in the same style as this one:
` ` `
(paste your previous challenge here)
` ` `
```

### Viewing & Editing Challenges' Source Code

Challenges can also be found & tweaked on the FlyShirley website. For instance, the ALIA challenge can be found at:

[https://airplane.team/fly/c/2-a250](https://airplane.team/fly/c/2-a250)

by clicking "Show Challenge JSON".

## Testing

The most up to date production version of the Challenge Creator can be found at:

https://airplane.team/fly/create

Copy and paste your challenge file into the Shirley Challenge Creator. The supported formats are JSON and variant of TypeScript.

For challenges in Typescript, you can copy the whole file, but it must be a single challenge object with no derived properties. There are also certain restrictions- most notably, no `//` inside a string and no strings with single quotes `' example '`.

For access to the latest features, join our [Discord server](https://airplane.team/discord) and ask to join the beta test group.

## Converting Typescript Challenges to JSON

You can add this code to convert a TS challenge to JSON, if you need to:

```typescript
const jsonString = JSON.stringify(yourChallengeName, null, 2);

import { writeFileSync } from "fs";
const fileName = "challenge.out.json";
const outputPath = "json/" + fileName;
writeFileSync(outputPath, jsonString);

console.log(`Wrote ${fileName} to ${outputPath}`);
```

You can execute this code by running `npx ts-node typescript/stol.ts` in the root directory of the repo.
