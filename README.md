# Quest Hub

Quest Hub brings Math Quest and Geo Quest together in one responsive website. The repository also contains both Expo apps, which are reused by the web app.

## Run the web app

```sh
cd webapp
npm ci
npm run web
```

Create a static web export with `npm run build` in `webapp`; the generated site is written to `webapp/dist/`.

## Run the mobile apps

Install dependencies and start Expo from either app folder:

```sh
cd pilotapp
npm ci
npx expo start
```

```sh
cd geographyapp
npm ci
npx expo start
```

## Projects

- `webapp/` — combined Quest Hub website
- `pilotapp/` — Math Quest
- `geographyapp/` — Geo Quest
