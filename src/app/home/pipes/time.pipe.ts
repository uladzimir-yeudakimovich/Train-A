import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true,
})
export class TimePipe implements PipeTransform {
  transform(milliseconds: number): string {
    const hourInMs = 3_600_000;
    const minuteInMs = 60_000;
    const hours = Math.floor(milliseconds / hourInMs);
    const minutes = Math.floor((milliseconds % hourInMs) / minuteInMs);
    return `${hours}h ${minutes}m`;
  }
}
