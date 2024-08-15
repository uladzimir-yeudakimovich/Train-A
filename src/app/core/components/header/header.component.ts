import { ChangeDetectionStrategy, Component } from '@angular/core';
import { headerImports } from './header.config';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [headerImports],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
