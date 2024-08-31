import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toTime',
  standalone: true,
})
export class ToTimePipe implements PipeTransform {
  transform(milliseconds: number): string {
    const millisecondsInSecond = 1000;
    const secondsInMinute = 60;
    const minutesInHour = 60;
    const hoursInDay = 24;

    const days = Math.floor(
      milliseconds /
        (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay),
    );

    const hours = Math.floor(
      (milliseconds %
        (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay)) /
        (millisecondsInSecond * secondsInMinute * minutesInHour),
    );

    const minutes = Math.floor(
      (milliseconds %
        (millisecondsInSecond * secondsInMinute * minutesInHour)) /
        (millisecondsInSecond * secondsInMinute),
    );

    if (days === 0 && hours === 0) {
      return `${minutes}m`;
    }

    if (days === 0 && hours > 0) {
      return `${hours}h ${minutes}m`;
    }

    return `${days}d ${hours}h ${minutes}m`;
  }
}
