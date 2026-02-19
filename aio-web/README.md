==============================
📦 AIO-WEB (Angular Frontend)
==============================

## Overview:
---------
aio-web is a modern Angular web application designed as the frontend for a full-stack project. 
It connects to a Node.js + Express backend and MongoDB Atlas database. The frontend is deployed 
using GitHub Pages.

## Live Demo:
----------
https://saurabhvacademy.github.io/aio

## Project Structure:
------------------
aio-web/
├── src/               → Angular source code
├── dist/              → Production build output
├── angular.json       → Angular CLI config
├── package.json       → Project dependencies and scripts
└── README.txt

## Features:
---------
- Angular 17+ app with SCSS styling
- Angular Material & Bootstrap integration
- REST API connectivity
- GitHub Pages deployment
- Ready for future authentication and feature modules

## Installation:
-------------
Prerequisites:
- Node.js (v16+ recommended)
- Angular CLI (Install via: npm install -g @angular/cli)

## Install dependencies:
> npm install

## Development Server:
-------------------
Run the app locally:
> ng serve

## Then open in browser:
http://localhost:4200/

## Build for Production:
---------------------
> ng build --base-href=/aio/

This will output your build files in:
dist/aio-web/browser/

## Deploy to GitHub Pages:
-----------------------
1. Install CLI deploy tool:
   > npm install -g angular-cli-ghpages

2. Build with base href:
   > ng build --base-href=/aio/

3. Deploy the correct folder:
   > npx angular-cli-ghpages --dir=dist/aio-web/browser --base-href=/aio/

## Backend API (aio-backend):
--------------------------
The frontend communicates with an Express.js backend deployed on Render.com.

Example API call:
https://aio-backend.onrender.com/api/hello

Update Angular service to use this URL in environment.ts:
export const environment = {
  production: false,
  apiBaseUrl: 'https://aio-backend.onrender.com/api'
};

## Planned Features:
-----------------
- JWT-based authentication
- Lazy-loaded feature modules
- Admin dashboard
- Internationalization (i18n)
- Unit & integration tests

## Author:
-------
Saurabh Sharma
Frontend & Full Stack Developer
Email: saurabh@example.com  (replace with your real email)

## License:
--------
This project is licensed under the MIT License.
