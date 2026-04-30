# Salario Claro

Salario Claro is a React Native / Expo mobile app for Brazilian workers who want to estimate net salary and compare job offers. It consumes a payroll backend API to calculate deductions and show a clearer view of what each salary means after discounts.

The project is intentionally lightweight: screens handle user interaction, reusable components handle UI blocks, and API logic stays in small service and hook layers.

## Project status

Implemented:

- Salary simulation through the payroll API
- Job offer comparison between two gross salaries
- Deduction breakdown for INSS, IRRF, and benefit-related discounts
- Loading and readable error states for API requests
- Pull-to-reset behavior on the main flows
- Keyboard-aware mobile forms
- Shared currency formatting for Brazilian Real
- Unit tests for pure helpers and API error formatting

Planned:

- History screen
- Saving previous simulations
- More detailed explanations for payroll rules
- Store publishing preparation

## Features

- Net salary simulation from gross salary and deductions
- Job offer comparison using two salary proposals
- Dynamic comparison message showing which proposal pays more in net salary
- Deduction display for INSS, IRRF, transport, meal, health plan, and other discounts
- Typed API integration with Axios and TanStack Query mutations
- Form reset after successful API calls
- Failed requests keep the current form inputs
- Loading states that prevent duplicate submits
- Pull-to-reset on simulation and comparison screens

## Tech stack

- React Native
- Expo and Expo Router
- TypeScript
- Axios
- TanStack Query
- React Hook Form
- Zod
- NativeWind / Tailwind-style class names
- React Native Keyboard Controller
- React Navigation bottom tabs
- Jest and ts-jest
- ESLint with Expo config

## Architecture overview

The app uses a simple structure that keeps responsibilities separated without adding unnecessary layers.

- `app/`: Expo Router screens and root layout
- `src/components/`: reusable UI components such as cards, buttons, inputs, and result cards
- `src/domain/Payroll/`: payroll API service functions, payload builders, and TypeScript contracts
- `src/hooks/`: TanStack Query mutation hooks
- `src/api/`: shared Axios configuration and API error formatting
- `src/schema/`: form validation and input parsing schemas
- `src/utils/`: pure helpers such as currency formatting
- `src/navigation/`: bottom tab configuration

Screens own UI state and user interactions. Services call the backend. Hooks connect services to TanStack Query. Types describe the API contracts. Utils contain small pure functions that are easy to test.

## API integration

The app expects a backend API running on port `8080` with base path `/api`.

Main endpoints used by the app:

- `POST /payroll/calculate`
- `POST /payroll/compare`

The shared Axios instance lives in `src/api/apiConfig.ts`. Payroll-specific requests live in `src/domain/Payroll/payrollApi.ts`.

Default API URLs:

- Android Emulator: `http://10.0.2.2:8080/api`
- iOS Simulator and web: `http://localhost:8080/api`

For a physical device, use your computer LAN IP:

```bash
EXPO_PUBLIC_API_URL=http://YOUR_LAN_IP:8080/api npm start
```

If Axios shows `Network Error`, check that:

- the backend is running on port `8080`
- the URL includes `/api`
- Android Emulator uses `10.0.2.2`, not `localhost`
- the physical device and backend machine are on the same network
- firewall or VPN settings are not blocking port `8080`

## Environment and configuration

The app supports this Expo public environment variable:

```bash
EXPO_PUBLIC_API_URL=http://YOUR_API_HOST:8080/api
```

If the variable is not set, the app falls back to platform defaults defined in `src/api/apiConfig.ts`.

## Getting started

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

## Running tests

Run the unit tests:

```bash
npm test
```

Run lint:

```bash
npm run lint
```

Current tests cover currency formatting, payroll payload builders, proposal comparison messaging, and API error formatting.

## Screenshots

Screenshots will be added soon.

## Technical highlights

- Typed integration with payroll API endpoints
- Shared Axios client with platform-aware base URL handling
- TanStack Query mutations for calculate and compare flows
- Mobile-friendly forms with keyboard handling and validation
- Reusable screen, card, button, input, and result components
- Pure helper extraction for formatting, payload building, and comparison logic
- Focused unit tests for business logic that should not regress

## License

License not defined yet.
