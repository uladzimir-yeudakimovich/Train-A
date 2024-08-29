import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinWithDash',
  standalone: true,
})
export class JoinWithDashPipe implements PipeTransform {
  // TODO: refactor - replace with toCities pipe?
  transform(value: string[]): string {
    return value.join('  —  ');
  }
}
