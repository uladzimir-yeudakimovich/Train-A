import { Routes } from '@angular/router';
import { AdminRoleGuard } from '@core/guards/admin.guard';
import { AuthGuard } from '@core/guards/auth.guard';
import { RoutePath } from '@shared/models/enums/route-path.enum';

export const routes: Routes = [
  {
    path: RoutePath.Search,
    title: 'Search',
    loadComponent: () =>
      import('@home/pages/search/search.component').then(
        (m) => m.SearchComponent,
      ),
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
    loadComponent: () =>
      import('@auth/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: RoutePath.UserProfile,
    title: 'Profile',
    loadComponent: () =>
      import('@user/components/user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: RoutePath.TripDetails,
    title: 'Trip Details',
    loadComponent: () =>
      import('@home/pages/trip/trip.component').then((m) => m.TripComponent),
    canActivate: [AuthGuard],
  },
  {
    path: RoutePath.Orders,
    title: 'Orders',
    loadComponent: () =>
      import('@orders/orders/orders.component').then((m) => m.OrdersComponent),
    canActivate: [AuthGuard, AdminRoleGuard],
  },
  {
    path: RoutePath.UserOrders,
    title: 'My Orders',
    loadComponent: () =>
      import('@orders/user-orders/user-orders.component').then(
        (m) => m.UserOrdersComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: RoutePath.Admin,
    title: 'Admin',
    loadComponent: () =>
      import('@admin/components/sidebar/sidebar.component').then(
        (m) => m.SidebarComponent,
      ),
    canActivate: [AuthGuard, AdminRoleGuard],
    children: [
      {
        path: '',
        redirectTo: RoutePath.AdminStations,
        pathMatch: 'full',
        canActivateChild: [AuthGuard, AdminRoleGuard],
      },
      {
        path: RoutePath.AdminStations,
        title: 'Admin Stations',
        loadComponent: () =>
          import('@admin/pages/stations/stations.component').then(
            (m) => m.StationsComponent,
          ),
        canActivateChild: [AuthGuard, AdminRoleGuard],
      },
      {
        path: RoutePath.AdminCarriages,
        title: 'Admin Carriages',
        loadComponent: () =>
          import('@admin/pages/carriages/carriages.component').then(
            (m) => m.CarriagesComponent,
          ),
        canActivateChild: [AuthGuard, AdminRoleGuard],
      },
      {
        path: RoutePath.AdminRoutes,
        title: 'Admin Routes',
        loadComponent: () =>
          import('@admin/pages/routes/routes.component').then(
            (m) => m.RoutesComponent,
          ),
        canActivateChild: [AuthGuard, AdminRoleGuard],
      },
      {
        path: RoutePath.AdminRideManagement,
        title: 'Admin Ride Management',
        loadComponent: () =>
          import('@admin/pages/rides/rides.component').then(
            (m) => m.RidesComponent,
          ),
        canActivateChild: [AuthGuard, AdminRoleGuard],
      },
    ],
  },
  {
    path: RoutePath.NotFound,
    title: 'Not Found',
    loadComponent: () =>
      import('@core/pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
