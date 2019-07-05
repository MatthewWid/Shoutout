
# Shoutout

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
* Scalable MVC application architecture
* User sessions and authentication (with Passport.js)
* Custom webpack configuration for development and production modes
* Best practice code and webpack organisation
* CSS-BEM naming and styling methodologies
* Interactive user interface web design
* Modular and single-responsibility programming patterns

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
