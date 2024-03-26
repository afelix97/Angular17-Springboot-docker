import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { User } from './interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserComponent, NavHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string = 'angular17-spring-docker';

  holdaMundo: string = "Hola Mundo en Angular!";

}
