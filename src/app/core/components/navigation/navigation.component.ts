import { ChangeDetectionStrategy, Component } from '@angular/core';
import { navigationImports } from './navigation.config';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [navigationImports],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {}
