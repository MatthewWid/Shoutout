<p align="center">
  <img src="/public/images/logo/logo-maxres-text-white.png?raw=true" alt="Shoutout Logo" width="600px" />
</p>

News sharing and social media website.  
Users create posts, follow eachother to view other users' posts, add likes to posts and more.

**[Live Demo](http://shoutoutsocial.herokuapp.com)**

<p align="center">
  <img src="https://i.ibb.co/0JM0tdy/image.png" alt="Preview Screenshot of Demo" width="100%" />
</p>

**Front-End Technologies**
* **React** + Hooks and Context API
* Webpack
* Babel
* SASS
* Axios

**Back-End Technologies**
* **Node.js**
* **MongoDB**
* Mongoose
* Express
* Passport.js
* Cloudinary
* Pug

This project was started with the objective to learn:

* Full-stack development with React, Node and MongoDB
* Scalable application architecture
* REST API design, development and best practices
* User sessions and authentication with Passport.js
* Modular and single-responsibility programming patterns
* Programmatic image manipulation and CDN interaction
* Comprehensive client and server-side input validation
* Custom webpack configuration for development and production modes
* CSS-BEM naming and styling methodologies
* Interactive user interface web design
* Multi-themed colour palette design

# Installation and Usage

Run locally for development:

1. Install dependencies with `npm i` or `yarn`.
2. Copy and rename `variables.env.sample` to `variables.env` and populate with values.
3. Ensure your MongoDB server is running (mLab, Atlas or locally with `mongod`).
4. Ensure your [Cloudinary](https://cloudinary.com/) credentials are correct.
5. Run with `npm run dev` or `yarn dev`.

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
