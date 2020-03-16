# Eclipx Coding Test

## Overview

This is an application that allows you to login using Firebase and check locations using Google Maps. The app was generated using Create React App. This project is made up of a service as an API endpoint and a React-based SPA client.

## Requirements

This application requires the following to run:

- [Node.js][node] 12.10+
- [Yarn][yarn]

[node]: https://nodejs.org/
[yarn]: https://yarnpkg.com/

## Running the application

First you will need to install dependencies. Run the following in both the `services` and `client` directories:

```sh
yarn
```

I've attached working copies of `.env` files for both `client` and `services`. I didn't commit them because including credentials in source code is bad practice.

To launch the app, go to the `services` directory and run:

```sh
yarn dev
```

This will run both the frontend and backend in development mode, and will open [http://localhost:3000](http://localhost:3000) allowing you to view the app in the browser.

## Running unit tests

To run tests, please go to `client`/`services` directories and execute the below command:

```sh
yarn test
```

This will run Cypress (E2E testing) if in `client`, and will run Jest (unit testing) if in `services`.

## Assumptions

1. I took liberty on the design and kept it simple to keep the test completion within a reasonable timeframe.
2. It was not clear which HTTP method to use for `/api/admin_only`, so I decided to use GET - that seemed appropriate.
3. I decided to use E2E testing to ensure that entire features were working fine. However, I still used unit tests for the backend as I found this to be the most appropriate.
4. I made the app entirely mobile responsive and tested it on multiple browsers and mobile phones too.
5. If the user does not have location services on, then I use default Sydney location. Also, if they select a location without enabling location services, it simply shows that location instead of showing directions from their current location.
