import { Routes } from '@angular/router';
import { RoutePath } from '@shared/models/enums/route-path.enum';

export const routes: Routes = [
  {
    path: RoutePath.Search,
    title: 'Search',
    loadComponent: () =>
      import('@home/pages/search/search.component').then((m) => m.SearchComponent),
  },
  {
    path: RoutePath.Registration,
    title: 'Sign Up',
    loadComponent: () =>
      import('@auth/pages/registration/registration.component').then(
        (m) => m.RegistrationComponent,
      ),
  },
  {
    path: RoutePath.Login,
    title: 'Sign In',
    loadComponent: () => import('@auth/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: RoutePath.UserProfile,
    title: 'Profile',
    loadComponent: () =>
      import('@user/profile/components/user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent,
      ),
  },
  {
    path: RoutePath.TripDetails,
    title: 'Trip Details',
    loadComponent: () => import('@home/pages/trip/trip.component').then((m) => m.TripComponent),
  },
  {
    path: RoutePath.Orders,
    title: 'Orders',
    loadComponent: () =>
      import('@user/orders/pages/orders/orders.component').then((m) => m.OrdersComponent),
  },
  {
    path: RoutePath.Admin,
    title: 'Admin',
    loadComponent: () =>
      import('@admin/components/sidebar/sidebar.component').then((m) => m.SidebarComponent),
    children: [
      {
        path: '',
        redirectTo: RoutePath.AdminStations,
        pathMatch: 'full',
      },
      {
        path: RoutePath.AdminStations,
        title: 'Admin Stations',
        loadComponent: () =>
          import('@admin/pages/stations/stations.component').then((m) => m.StationsComponent),
      },
      {
        path: RoutePath.AdminCarriages,
        title: 'Admin Carriages',
        loadComponent: () =>
          import('@admin/pages/carriages/carriages.component').then((m) => m.CarriagesComponent),
      },
      {
        path: RoutePath.AdminRoutes,
        title: 'Admin Routes',
        loadComponent: () =>
          import('@admin/pages/routes/routes.component').then((m) => m.RoutesComponent),
      },
      {
        path: RoutePath.AdminRideManagement,
        title: 'Admin Ride Management',
        loadComponent: () =>
          import('@admin/pages/rides/rides.component').then((m) => m.RidesComponent),
      },
    ],
  },
  {
    path: RoutePath.NotFound,
    title: 'Not Found',
    loadComponent: () =>
      import('@core/pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
