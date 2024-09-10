# Train-A

## Project Purpose

The goal of the Train-A project is to create a platform for managing train trips efficiently. It supports different user roles: anonymous users, authorized users, and resource managers, each with distinct responsibilities. The platform provides essential functionalities for booking, trip management, and resource allocation.

## Roles

- **Anonymous User**:  
  Can search for routes and find trips, but before booking, they will be required to authorize.
- **Authorized User**:  
  Can book trips, view their booked trips, and access their trip history.
- **Resource Manager**:  
  Has permissions to create new trips, and manage routes, stations, and train schedules.

## Pages

### User Pages

- **Registration Page**:  
  New users can create an account to access booking features.
- **Login Page**:  
  Existing users can log in to access their profile and past bookings.
- **User Profile Page**:  
  Displays personal information and allows users to edit it.
- **Search Page**:  
  Allows users to search for available train trips based on various filters, and view details for each trip.
- **Order Page**:  
  Users can see their history of trips and cancel active bookings.

### Manager Pages

- **Stations Management**:  
  Allows resource managers to add, edit, or remove train stations.
- **Carriages/Cars Management**:  
  Enables managers to manage train carriages and car configurations, including capacity and train types.
- **Route Management**:  
  Allows managers to manage and configure train routes, including ride schedules and stops.

## Running the Project

### Development

To start the development server:

1. Run `ng serve`.
2. Navigate to `http://localhost:4200/` in your browser.
3. The application will automatically reload when any source files are changed.

### Production

To view the production build of the application, visit: [Train-A Deployed Version](https://uladzimir-yeudakimovich.github.io/Train-A/#/).

## Implementation Details

- This project was built using [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.
- It is based on standalone components and leverages Angular's signals feature for efficient state management.
- The project employs [Zoneless](https://angular.dev/guide/experimental/zoneless/) change detection for better performance and faster rendering.
- For state management, we use NgRx [Signal Store](https://ngrx.io/guide/signals/signal-store), introduced in NgRx 17, along with Entity Management.
- The backend of the application was developed separately, and [Mirage JS](https://miragejs.com/) is used to mock API interactions during development.

## Running Tests

### Unit Tests

Run the following command to execute unit tests using [Jest](https://jestjs.io/):
`npm run test`

### End-to-End Tests

Run end-to-end tests using [Cypress](https://www.cypress.io/):

- To execute tests locally via the Cypress platform:
  `npm run e2e`

- To run tests in a continuous integration environment via terminal:  
  `npm run e2e:ci`


## GitHub Actions

We use GitHub Actions to automatically check each pull request (PR) with the following workflows:

- **Run Lint**: Ensures code style consistency.
- **Run E2E Tests**: Verifies core user interaction scenarios.
- **Run Unit Tests**: Validates the correctness of individual components.
- **Validate Commit Messages**: Checks for conventional commit messages.

Additionally, each PR is reviewed by team members to maintain code quality and prevent conflicts.

## Authors

- [**@R-Ohman**](https://github.com/R-Ohman)
- [**@uladzimir-yeudakimovich**](https://github.com/uladzimir-yeudakimovich)
- [**@ripetchor**](https://github.com/ripetchor)
- [**@DrabantBY**](https://github.com/DrabantBY)

## License
This project is licensed under the MIT License:

```text
Copyright (c) 2024 RssAngularTeam

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```