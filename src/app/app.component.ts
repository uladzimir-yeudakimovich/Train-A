import { NgClass } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@core/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, NgClass, MatIcon, MatMiniFabButton],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showScrollButton = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const showScrollButtonThreshold = 1000;
    this.showScrollButton.set(window.scrollY >= showScrollButtonThreshold);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
