import { Component, OnInit } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { LoggerProvider } from '@core/services/logger/logger.provider';
import { LoggerService } from '@core/services/logger/logger.service';

import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatFabButton, MatIcon, MatToolbar, MatToolbarRow, NavigationComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [LoggerProvider],
})
export class HeaderComponent implements OnInit {
  constructor(private loggerService: LoggerService) {}

  ngOnInit(): void {
    this.onUserLogin();
  }

  onUserLogin(): void {
    this.loggerService.logMessage('User has logged in.');
  }
}
