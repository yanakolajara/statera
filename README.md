## Table of Contents

1. [About the project](#about-the-project)
   - [Key Features](#key-features)
   - [Technologies / Main Stack](#technologies--main-stack)
   - [Architecture](#architecture)
2. [Getting started](#installation-and-usage)
   - [Prerequisites](#prerequisites)
   - [Installation](#Installation)
   - [Testing](#testing)
3. [Usage](#usage)
4. [Links](#Links)
5. [Used Resources](#used-resources)
6. [Contact](#Contact)

## About the project

Statera is a personal finance management app designed to help users track their income and expenses, identify spending patterns, and make informed financial decisions. By leveraging interactive visualizations and predictive analysis, Statera provides users with insights into their financial habits, helping them achieve better balance and control over their money.

### Key Features

- **Registration & Login** with **2FA** (two-factor authentication).
- **Creation and visualization** of transactions (income/expense).
- **Monthly charts** showing financial evolution.
- **Supports** multiple categories.
- **Predictive Spending Trend Graph** to help users see potential financial outcomes.

### Technologies / Main Stack

- **Frontend**: React, React Router, SCSS, Context API
- **Backend**: Node.js, Express.js, JWT authentication, Nodemailer
- **Database**: PostgreSQL, pg-promise
- **Testing**: Cypress (E2E), Jest (unit tests), Supertest (API testing)

### Architecture

1. **React**: User interface, state management, views.
2. **Node.js / Express**: API server handling users, authentication, transactions, etc.
3. **PostgreSQL**: Stores user data and transactions.

## Getting Started

### Prerequisites

Before running Statera locally, make sure you have the following installed:

- **Node.js** (v16 or later) → [Download Here](https://nodejs.org/)
- **PostgreSQL** (Database) → [Download Here](https://www.postgresql.org/)
- **Git** → [Download Here](https://git-scm.com/)
- **A package manager:** Either `npm` (included with Node.js) or `yarn` → [Yarn Installation](https://yarnpkg.com/getting-started/install)

### Installation

1. **Clone** this repository:

   ```bash
   git clone https://github.com/yanakolajara/statera
   ```

2. **Install** dependencies for the monorepo, frontend, and backend:

```bash
npm install
npm run install:client
npm run install:server
```

3. **Create** environment variables:

```bash
touch ./client/.env
touch ./server/.env
```

4. **Configure** environment variables:

```bash
# Frontend
REACT_APP_API_KEY="http://localhost:3001/"
```

```bash
# Backend
PORT=3001
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=statera
PG_USER=postgres
PG_PASSWORD=postgres
NODEMAILER_EMAIL=[your email]
NODEMAILER_PASSWORD=[your generated password]
JWT_SECRET=[your secret key]
```

5. **Start** the database:

```bash
npm run db:reset
```

6. **Run** the application:

- **Option 1:** Run the frontend and backend concurrently

```bash
npm run start
```

- **Option 2:** Run the frontend and backend separately

```bash
npm run start:client
```

```bash
npm run start:server
```

### Testing

```bash
# Front-end testing
cd client
cypress open
```

```bash
# Back-end testing
cd server
jest
```

## Usage

- Access the **frontend** at: [Statera on Netlify](https://statera-app.netlify.app/signup)
- Access the **backend API** at: [Statera API on Render](https://statera-spqq.onrender.com/)
- Users can register, log in, add transactions, and visualize data.

## Links

- **GitHub Repository:** [Statera Repo](https://github.com/yanakolajara/statera)
- **Wireframes:** [Figma](https://www.figma.com/design/4YycuFXE8ZsDLBkoYCEyxN/Wireframes?node-id=0-1&p=f&t=S8FeRw61wHiuVpu2-0)
- **Database Schema (ERDs):** [Whimsical](https://whimsical.com/erds-MCJej6MmHzw9s9pGq3dtM1)
- **Kanban Board:** [Notion Board](https://www.notion.so/joinpursuit/184d2512d7ba80cb8aeff6fedf5b5819?v=184d2512d7ba800f91da000c3ba1f89b&pvs=4)

## Used Resources

- **Frontend:** React, React Router, Context API, Chart.js, SCSS
- **Backend:** Node.js, Express.js, PostgreSQL, JWT, Nodemailer, pg-promise
- **Testing:** Cypress, Jest, Supertest
- **Other Tools:** Figma, Whimsical, Notion, Netlify, Render

## Contact

- **LinkedIn:** [Yanako Lajara](https://linkedin.com/in/yanakolajara)
- **GitHub:** [@yanakolajara](https://github.com/yanakolajara)
- **Email:** [yanakolajara@pursuit.org](mailto:yanakolajara@pursuit.org)
