import { Component } from '@angular/core';
import { StationFormComponent } from './components/station-form/station-form.component';

@Component({
  selector: 'app-stations',
  standalone: true,
  imports: [StationFormComponent],
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.scss',
})
export class StationsComponent {}
