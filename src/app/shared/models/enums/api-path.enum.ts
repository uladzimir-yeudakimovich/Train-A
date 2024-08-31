export enum ApiPath {
  Station = 'station',
  Route = 'route',
  Carriage = 'carriage',
  Search = 'search',
  Order = 'order',
  Users = 'users',
}

export enum ErrorReason {
  OrderNotFound = 'orderNotFound',
  OrderNotActive = 'orderNotActiva',
  RideNotFound = 'rideNotFound',
  InvalidAccessToken = 'invalidAccessToken',
  InvalidStations = 'invalidStations',
  AlreadyBooked = 'alreadyBooked',
}
