import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './components/user.component/user.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('crudoperationfrontend');
}
