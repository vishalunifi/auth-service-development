# Auth Micro Service 

## Folder Structure

-   dist
-   config
-   migrations
-   types
-   src
    -   controllers
        -   test.ts
    -   dal
        -   test.ts
    -   models
        -   Test.ts
    -   index.ts
-   .env
-   Dockerfile
-   tsconfig.json
-   knexfile.ts
-   plotfile.ts
-   package.json
-   yarn.lock
-   Readme.md
-   .eslintrs
-   .prettierrc

## Migration Commands

-   npm run migrate:up
-   npm run migrate:down
-   npm run migrate:create -- `nameofmigration`

## Dev Commands

-   npm run dev

## Build Commands

-   npm run

## PROD Commands

-   npm run start

## Routes

- users/getAll - get all the Registered Users.

- users/register - To register a particular User with given details.

- users/login - To get logged in with given credential.

- users/email - To change the mail of the given user after successful login (token required);

- users/update-password - To change the password of the given user after successful login (token required);


## Features

- Create, Read and Update (email and password) operations done.

- Security - Proper hashing of password is done before sending it to DB.

- Authentication implementaion is done for update operation.

- JWT implemented for login.

## Installation and Running Project

- Clone the repo on your local system.
- npm install
- npm run build
- npm run start

