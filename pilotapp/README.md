# Math Quest

A small iOS and Android maths quiz app for classes 5–7, built with Expo, React Native, and TypeScript.

## Run it on your phone

1. Install Node.js 22.13 or newer.
2. In this folder, run `npm install`.
3. Run `npx expo start`.
4. Install Expo Go on your phone and scan the QR code shown in the terminal. Your phone and computer should be on the same Wi-Fi network.

You can also press `i` to open the iOS simulator (on a Mac with Xcode installed), or `a` to open an Android emulator (with Android Studio installed).

## First version

- Pick class 5, 6, or 7.
- Answer a short multiple-choice quiz, ask for a hint, and see your score. If an answer is incorrect, the app shows the correct answer and a step-by-step hint.
- Completed Class 7 paper attempts are saved on the device with their date and score, and can be reviewed by set.
- Class 7 includes five sample-paper sets, four geometry sets, two triangle congruence sets, two 10-question practical HCF/GCF sets, a 10-question constructions and tilings set, and two 10-question “Connecting the Dots” statistics sets.
- Quiz questions are sample content stored in `App.tsx` and `samplePapers.ts` so they are easy to change while learning.

Next, we can add topic selection (fractions, geometry, algebra), more questions, and saved progress.
