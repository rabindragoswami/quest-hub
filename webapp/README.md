# Quest Hub

A responsive web version of Math Quest and Geo Quest in one place. The website reuses the existing quiz screens and content, including Math Quest attempt history, answer explanations, and Geo Quest's maps and farming illustrations.

## Run locally

1. Install Node.js 22.13 or newer.
2. From this folder, run `npm install`.
3. Run `npm run web`.
4. Open the local URL printed by Expo.

To create a static web export, run `npm run build`. The generated site is written to `dist/`.

## Publish the website

Run `npm run build`, then deploy the contents of `dist/` to a static web host. Math Quest attempt history is stored in the visitor's browser and is not synced between devices.
