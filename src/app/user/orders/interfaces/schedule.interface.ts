import { OrderSegment } from './order-segment.interface';
import { RideSegment } from './ride-segment.interface';

export interface Schedule {
  segments: RideSegment[] | OrderSegment[];
}
