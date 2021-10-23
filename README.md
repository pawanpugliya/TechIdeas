# TechIdeas

This is a simple practice project which captures the technical ideas which can also be voted by other logged in users. It is using a local storage as a data source, which will be later moved to some backend.

### Features
 - **PWA** (Offline support via service worker.
 - Containerized using **Docker**
 - Basic CRUD operations
 - **Vote/Un-vote** the idea on Dashboard
 - **Sort** ideas based on vote count OR creation date

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Build Docker image
Run `docker build -t TechIdeas-docker .`

## Run docker image
Run `docker run -p 8083:8080 TechIdeas-docker:latest` and open browser with `http://localhost:8083`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

**This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.5.**