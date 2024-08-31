import { Component, input } from '@angular/core';
import { RideStation } from '@home/models/search-card.model';

import { pointImports } from './point.config';

@Component({
  selector: 'app-point',
  standalone: true,
  imports: pointImports,
  templateUrl: './point.component.html',
  styleUrl: './point.component.scss',
})
export class PointComponent {
  point = input.required<RideStation>();

  isFirst = input.required<boolean>();

  isLast = input.required<boolean>();

  isStartPoint = input.required<boolean>();

  isEndPoint = input.required<boolean>();
}
