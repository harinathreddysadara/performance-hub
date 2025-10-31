import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './shared/sidebar/sidebar';
import { Header } from './shared/header/header';

@Component({
  selector: 'app-root',
  imports: [Sidebar, RouterOutlet,Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('performance-hub');
}
