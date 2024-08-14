import { Routes } from '@angular/router';

export enum RoutePath {
  Search = '',
  Registration = 'signup',
  Login = 'signin',
  UserProfile = 'profile',
  TripDetails = 'trip/:rideId',
  Orders = 'orders',
  Admin = 'admin',
  AdminStations = 'stations',
  AdminCarriages = 'carriages',
  AdminRoutes = 'routes',
  AdminRideManagement = 'routes/:id',
  NotFound = '**',
}

export const routes: Routes = [
  {
    path: RoutePath.Search,
    title: 'Search',
    loadComponent: () =>
      import('./pages/search-page/search-page.component').then((m) => m.SearchPageComponent),
  },
  {
    path: RoutePath.Registration,
    title: 'Sign Up',
    loadComponent: () =>
      import('./pages/registration-page/registration-page.component').then(
        (m) => m.RegistrationPageComponent,
      ),
  },
  {
    path: RoutePath.Login,
    title: 'Sign In',
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then((m) => m.LoginPageComponent),
  },
  {
    path: RoutePath.UserProfile,
    title: 'Profile',
    loadComponent: () =>
      import('./pages/user-profile-page/user-profile-page.component').then(
        (m) => m.UserProfilePageComponent,
      ),
  },
  {
    path: RoutePath.TripDetails,
    title: 'Trip Details',
    loadComponent: () =>
      import('./pages/trip-details-page/trip-details-page.component').then(
        (m) => m.TripDetailsPageComponent,
      ),
  },
  {
    path: RoutePath.Orders,
    title: 'Orders',
    loadComponent: () =>
      import('./pages/order-page/order-page.component').then((m) => m.OrderPageComponent),
  },
  {
    path: RoutePath.Admin,
    title: 'Admin',
    loadComponent: () =>
      import('./pages/admin-page/admin-page.component').then((m) => m.AdminPageComponent),
    children: [
      {
        path: RoutePath.AdminStations,
        title: 'Admin Stations',
        loadComponent: () =>
          import('./pages/stations-page/stations-page.component').then(
            (m) => m.StationsPageComponent,
          ),
      },
      {
        path: RoutePath.AdminCarriages,
        title: 'Admin Carriages',
        loadComponent: () =>
          import('./pages/carriages-page/carriages-page.component').then(
            (m) => m.CarriagesPageComponent,
          ),
      },
      {
        path: RoutePath.AdminRoutes,
        title: 'Admin Routes',
        loadComponent: () =>
          import('./pages/routes-page/routes-page.component').then((m) => m.RoutesPageComponent),
      },
      {
        path: RoutePath.AdminRideManagement,
        title: 'Admin Ride Management',
        loadComponent: () =>
          import('./pages/ride-management-page/ride-management-page.component').then(
            (m) => m.RideManagementPageComponent,
          ),
      },
    ],
  },
  {
    path: RoutePath.NotFound,
    title: 'Not Found',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];
