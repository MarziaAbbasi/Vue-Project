# Vue.js Web Application

This project is a Vue.js web application with user authentication, real-time data fetching, and a pixel-perfect UI.

## Key Features

1.  User Authentication\*\*

- Register and login functionality using Firebase Authentication.
- Only authenticated users can access the main view.

2.  Real-Time Data Fetching\*\*

- Fetch real-time energy data from the Lincoin API.
- Refresh data every 1 minute.
- Handle API errors gracefully.
- Handle API key securely.

3.  Pixel-Perfect UI\*\*

- Implement the Figma design provided.
- Follow the design system for UI components.
- **UI Framework**: Used Quasar for building the UI components.

4.  UI Design without a Figma Baseline\*\*

- Implement the design standard seen in the Figma for the login/signup forms.

## Security Best Practices

- **Cookies for Storing Data**: Used cookies to store user authentication data securely.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Live Demo

[Live Demo Link](https://master.d3coe2g8x8bek5.amplifyapp.com/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).
