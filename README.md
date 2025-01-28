# Statera

> Improve your financial life in an easy way, with clear spending visualization.

## Description

Statera is an application that helps people manage their finances in a straightforward manner.  
It allows users to **add transactions** (income/expenses) and **visualize** them with graphs, providing better **control** over their cash flow.

## Technologies / Main Stack

- **Frontend**: React
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Testing**: Cypress (E2E), Jest (unit tests)

## Architecture

1. **React**: User interface, state management, views.
2. **Node.js / Express**: API server handling users, authentication, transactions, etc.
3. **PostgreSQL**: Stores user data and transactions.

## Key Features

- **Registration & Login** with **2FA** (two-factor authentication).
- **Creation and visualization** of transactions (income/expense).
- **Monthly charts** showing financial evolution.
- **Supports** multiple categories.

## Installation and Usage

1. **Clone** this repository:

   ```bash
   git clone [repo-URL]
   ```

2. Install dependencies for both frontend and backend:

```bash
cd client
npm install
cd ../server
npm install
```

3.  Configure environment variables:

- Create a .env file with your credentials (e.g., Postgres variables, ports, etc.).

4. Run the application:

- Frontend:

```bash
cd client
npm start
```

- Backend:

```bash
cd server
npm run start
```

(Adjust according to your monorepo structure.)

#### Main Scripts

    •	Frontend:
    •	npm start: Launches the React app in development mode.
    •	npm run build: Builds the production bundle.
    •	npm run cypress:open: Opens Cypress for E2E tests (if configured).
    •	Backend:
    •	npm start: Launches the Node server.
    •	npm run db:reset: (Optional) Cleans and resets the database (schema + seed).
    •	npm run cypress:open: (If configured in the server) Opens E2E tests.

#### Testing

    •	For end-to-end tests, run:

`npm run cypress:open`
• Typically, the cypress/e2e folder contains tests for users, transactions, etc.

    •	Jest:
    •	For unit tests, run:

npm test

    •	Usually used for functions or components in a __tests__ folder.

Deployment
• Frontend: Deployed on Netlify
• Backend & DB: Deployed on Render
• Frontend: https://statera-app.netlify.app/welcome
• Backend: https://statera-spqq.onrender.com/
