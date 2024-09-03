export enum Message {
  TripBookedSuccessfully = 'Trip booked successfully',
  TripExpired = 'Trip has expired. Please select another one',

  InvalidAccessToken = 'You cannot perform this action.',
  InvalidCredentials = 'Invalid email or password',

  RouteDeleteConfirmation = 'Are you sure you want to delete this route?',
  RouteDeleteSuccess = 'Route deleted successfully',

  OrderNotFound = 'Order is not found',
  OrderNotActive = 'Order is not active',
  OrderCancelled = 'Order has been successfully canceled',
  OrderCancelConfirmation = 'Are you sure you want to cancel this order?',

  SelectedTooManySeats = 'Please select only one seat',

  RideNotFound = 'Ride is not found. Refresh the page.',
  InvalidStations = 'The ride does not exist.',
  AlreadyBooked = 'You have already booked this trip. Cancel it in your Orders list.',
  RoutFormCannotChangeStation = 'You cannot change this station as this may break the connection with the next station.',
  DeleteStationWithActiveRides = 'Cannot delete station with active rides',

  UnexpectedError = 'Something went wrong. Please try again later',

  RouteOrRideNotFound = 'Route or ride not found',
  RideIsAlreadyUsed = 'Ride is already used',
  TimeOrPriceIrrelevant = 'Time or price is irrelevant',
  StationNotFound = 'Station not found. Try another one',

  CarriageAlreadyExists = 'Carriage already exists',
  RecordInUse = 'It is used in some order. You cannot delete it',
}
