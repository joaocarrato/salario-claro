# Salário Claro

Salário Claro is an Expo React Native app for estimating Brazilian CLT net salary and comparing salary proposals. The app connects to a payroll backend API, applies the current calculation flow, and presents gross salary, discounts, and net salary in a clearer mobile interface.

The project is part of a portfolio focused on practical product flows: typed API integration, mobile form handling, reusable UI components, and a simple architecture that stays easy to maintain.

## Preview

| Simulator | Comparison | History | Demo |
| :-------: | :--------: | :-----: | :--: |
| <img src="./docs/media/simulador.png" width="180" alt="Salary simulator screen with calculated net salary and deductions" /> | <img src="./docs/media/comparacao.png" width="180" alt="Salary proposal comparison screen" /> | <img src="./docs/media/historico.png" width="180" alt="Saved salary simulations history screen" /> | <img src="./docs/media/video-app.gif" width="180" alt="Demo of the Salário Claro app flows" /> |

## Problem It Solves

Gross salary does not show how much a worker actually receives after INSS, IRRF, transport, meal, health plan, and other discounts. Salário Claro helps users quickly estimate their net salary and compare proposals with a more realistic view of take-home pay.

## Current Features

- CLT salary simulation from gross salary, dependents, discounts, and the default 2026 calculation year.
- Payroll result with net salary, gross salary, total discounts, INSS, IRRF, benefits, IRRF base, effective rate, and calculation year.
- Save simulation flow with a bottom sheet title form.
- History screen with the latest calculated simulation persisted locally.
- Saved simulations loaded from the backend history endpoint.
- Pull-to-refresh on history and pull-to-reset on main flows.
- Swipe-to-delete for saved simulations, with confirmation before deleting.
- Salary proposal comparison between two gross salaries.
- Loading, disabled, success, and friendly error states for API requests.
- Keyboard-aware mobile forms and responsive card layouts.

## Simulation Module

The simulation module is the main completed milestone of the app.

It currently supports two related flows:

- **Calculate salary:** sends the form to `POST /payroll/calculate`, renders the result immediately, and stores the latest calculation locally with AsyncStorage so it remains available in History after reopening the app.
- **Save simulation:** after a calculation, the user can open a bottom sheet, add a title, and persist the simulation through `POST /simulations`.

Saved simulations are listed with `GET /simulations` and can be removed with `DELETE /simulations/{id}`.

## Tech Stack

- React Native with Expo and Expo Router
- TypeScript
- Axios
- TanStack Query
- React Hook Form and Zod
- NativeWind / Tailwind-style class names
- React Native Keyboard Controller
- React Native Gesture Handler and Reanimated
- AsyncStorage
- Jest, ts-jest, and Expo ESLint

## Project Structure

- `app/`: Expo Router screens and navigation groups
- `src/components/`: reusable UI components
- `src/domain/Payroll/`: payroll API calls, payload builders, and types
- `src/domain/Simulation/`: saved simulation API calls and types
- `src/hooks/`: TanStack Query hooks
- `src/api/`: Axios configuration and API error helpers
- `src/schema/`: form validation schemas
- `src/storage/`: local persistence for the latest calculation
- `src/utils/`: formatting helpers

## API

The app uses a shared Axios client in `src/api/apiConfig.ts`.

Current endpoints used by the frontend:

- `POST /payroll/calculate`
- `POST /payroll/compare`
- `POST /simulations`
- `GET /simulations`
- `DELETE /simulations/{id}`

By default, the app points to:

```bash
https://salario-claro-backend.onrender.com/api
```

You can override it with:

```bash
EXPO_PUBLIC_API_URL=http://YOUR_API_HOST:8080/api
```

## Run Locally

Install dependencies:

```bash
npm install
```

Start the Expo dev server:

```bash
npm start
```

Run on Android:

```bash
npm run android
```

Run on iOS:

```bash
npm run ios
```

Run on web:

```bash
npm run web
```

## Checks

Run tests:

```bash
npm test
```

Run lint:

```bash
npm run lint
```

Current tests cover currency formatting, payroll payload builders, API error formatting, proposal comparison messaging, and local storage for the latest calculation.

## Status

The simulation module is implemented and integrated with the backend. The app also includes comparison and history flows, with saved simulations handled by the Simulation API.

## License

No license has been defined yet.
