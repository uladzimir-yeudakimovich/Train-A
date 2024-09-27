import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeWhitespace',
  standalone: true,
})
export class RemoveWhitespacePipe implements PipeTransform {
  transform(str: string): string {
    return str.replace(/\s/g, '');
  }
}
