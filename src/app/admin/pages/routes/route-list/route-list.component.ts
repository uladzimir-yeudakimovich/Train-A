import { RailRoute } from '@admin/models/route.model';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  OnInit,
  Signal,
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

  pageRoutes!: Signal<RailRoute[]>;

  readonly pageSizeOptions = [10, 20, 50, 100];

  private pageEvent = signal<PageEvent>({
    length: this.pageSizeOptions[0],
    pageIndex: 0,
    pageSize: this.pageSizeOptions[0],
  });

  ngOnInit(): void {
    this.pageRoutes = computed(() => {
      const start = this.pageEvent().pageIndex * this.pageEvent().pageSize;
      const end = start + this.pageEvent().pageSize;
      return this.routes().slice(start, end);
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent.set(e);
  }
}
