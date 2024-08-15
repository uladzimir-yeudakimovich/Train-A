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
