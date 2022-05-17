# what is this repository?
This is a jobs API using **Express, MongoDB and NodeJS**.


## Getting Started

- install all project dependencies with `npm install`
- start the development server with `npm start` OR `yarn start`

## Project Tree Structure
```bash
   ├── app.js  
   ├── package-lock.json  
   ├── package.json
   ├── README.md
   ├── controllers
   │   ├── auth.js
   │   └── jobs.js
   ├── db
   │   └── connect.js
   ├── errors
   │   ├── bad-request.js
   │   ├── custom-api.js
   │   ├── index.js
   │   ├── not-found.js
   │   └── unauthenticated.js
   ├── middleware
   │   ├── authentication.js
   │   ├── error-handler.js
   │   └── not-found.js
   ├── models
   │   ├── Job.js
   │   └── User.js
   └── routes
       ├── auth.js
       └── jobs.js
```