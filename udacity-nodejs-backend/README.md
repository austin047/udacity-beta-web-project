# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing


## Installation and setup
### Installation  Requirments
 - Git 
 - Docker and Docker compose installations 

 ### Setup steps
- Copy the `.env.example` file and rename to `.env`: NB, this file is needed for both docker and your server, use the command bellow to copy

``
cp .env.example .env
``
- Run `docker-compose up` - builds the image if the images do not exist and starts the containers. Postgres Database run in the container on port 5432 
[optional] Run `docker-compose up -d` to run docker container in the background

- Run `npm install` - to install all project dependencies

- Run Migrations  `npm migrate:up` - creates tables in the database 

[optional]  
- Run `npm run seed:db` To seed data into the database

- Run `npm start` to starts the project default port 8080 (http://localhost:8080/api)

- Run `npm run watch` - to starts the project in watch mood  on default port 8080 (http://localhost:8080/api)

### Tests steps
- Run `npm run test` - Runs all tests, runs test


## udacity-beta-web-development-capstone

