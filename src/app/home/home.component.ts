import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoggerProvider } from '../core/services/logger.provider';
import { LoggerService } from '../core/services/logger.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  providers: [
    LoggerProvider,
  ]
})
export class HomeComponent implements OnInit {
  constructor(private loggerService: LoggerService) {}

  ngOnInit(): void {
    this.onUserLogin();
  }
  
  onUserLogin(): void {
    this.loggerService.logMessage('User has logged in.');
  }
}
