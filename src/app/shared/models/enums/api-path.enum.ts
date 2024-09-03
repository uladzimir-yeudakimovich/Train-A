export enum ApiPath {
  SignUp = 'signup',
  SignIn = 'signin',
  Logout = 'logout',
  Station = 'station',
  Route = 'route',
  Carriage = 'carriage',
  Search = 'search',
  Order = 'order',
  Users = 'users',
}

export enum ErrorReason {
  OrderNotFound = 'orderNotFound',
  OrderNotActive = 'orderNotActive',
  RideNotFound = 'rideNotFound',
  InvalidAccessToken = 'invalidAccessToken',
  InvalidStations = 'invalidStations',
  InvalidRide = 'invalidRide',
  AlreadyBooked = 'alreadyBooked',
  RecordNotFound = 'recordNotFound',
  RecordInUse = 'recordInUse',
  InvalidData = 'invalidData',
  StationNotFound = 'stationNotFound',
  InvalidCarriageUniqueKey = 'invalidUniqueKey',
}
