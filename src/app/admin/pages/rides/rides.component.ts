import { RideListComponent } from '@admin/components/ride-list/ride-list.component';
import { Component } from '@angular/core';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rides',
  standalone: true,
  imports: [MatButton, MatMiniFabButton, MatIcon, RideListComponent],
  templateUrl: './rides.component.html',
  styleUrl: './rides.component.scss',
})
export class RidesComponent {
  routeId = this.activatedRoute.snapshot.paramMap.get('id');

  constructor(private readonly activatedRoute: ActivatedRoute) {}
}
