<p align="center">
  <img src="/public/images/logo/logo-maxres-text-white.png?raw=true" alt="Shoutout Logo" width="600px" />
</p>

News and social media site.  
Users post to a central board and can share short messages with eachother.

**Front-End Technologies**
* React
* Webpack
* SASS

**Back-End Technologies**
* Node.js
* MongoDB
* Mongoose
* Express
* Pug

This project was started with the objective to learn:

* Full-stack development with React, Node and MongoDB
* Scalable application architecture
* REST API design, development and best practices
* User sessions and authentication with Passport.js
* Modular and single-responsibility programming patterns
* Comprehensive client and server-side input validation
* Custom webpack configuration for development and production modes
* CSS-BEM naming and styling methodologies
* Interactive user interface web design

# Installation and Usage

Run locally for development:

1. Install dependencies with `npm i` or `yarn`.
2. Copy and rename `variables.env.sample` to `variables.env` and populate with values:
```
NODE_ENV=development
PORT=8080
DATABASE_URL=<URL_TO_MONGODB_DATABASE>
```
3. Ensure your MongoDB server is running (mLab, Atlas or locally with `mongod`).
4. Run with `npm run dev` or `yarn dev`.

# API Testing

API debugging and testing is done with **Postman**.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/cdd565f02c4d6cb41066)

[(or download as JSON)](https://www.getpostman.com/collections/cdd565f02c4d6cb41066)

You will need the following environment variables:

|Variable|Example Value|
|--|--|
|`url`|`http://localhost:8080`|
|`apiurl`|`http://localhost:8080/api`|

Once the Node and MongoDB servers are up and running as outlined in the [installation and usage](#installation-and-usage) section then you are ready to consume the API with Postman.
