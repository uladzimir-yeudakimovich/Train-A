import { RailRoute } from '@admin/models/route.model';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { RouteCardComponent } from '../route-card/route-card.component';

@Component({
  selector: 'app-route-list',
  standalone: true,
  imports: [RouteCardComponent, MatPaginatorModule],
  templateUrl: './route-list.component.html',
  styleUrl: './route-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteListComponent implements OnInit {
  routes = input.required<RailRoute[]>();

  pageRoutes = signal<RailRoute[]>([]);

  readonly pageSizeOptions = [10, 20, 50, 100];

  ngOnInit(): void {
    this.setPageRoutes(0, this.pageSizeOptions[0]);
  }

  handlePageEvent(e: PageEvent) {
    this.setPageRoutes(e.pageIndex, e.pageSize);
  }

  private setPageRoutes(pageIndex: number, pageSize: number): void {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    this.pageRoutes.set(this.routes().slice(start, end));
  }
}
