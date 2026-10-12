
//1.Imports

// it means allow us to use angular featuresand our own classes.


// Component: it defines an angular component, using the @Component decorator


import { Component } from '@angular/core';


// Userservice:: this service handle  http request to the .net web api.
// we keep api communication to sychronize data between the frontend and backend in this service class.


// we can api communication in the service instead of the component.


import { UserService } from '../../services/user.service';



//CommonModue: it provides us common angular directtive and pipes.
// it is usedfult for feature module to use common angular features like ngIf, ngclass,, ngFor, etc.

import { CommonModule } from '@angular/common';



//FormsModule: it is REquire for template driven forms in angular. 
// it provides us features like ngModel, ngForm, etc.

// it allows input fields to sychornize
//  both with typeScript class properties and the HTML template,

//  enabling two-way data binding. This means that when a user types into an input field,
//  the corresponding property in the component
//  class is automatically updated, and vice versa. 

// It simplifies form handling and validation in Angular applications.
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-user',
  imports: [CommonModule  , FormsModule  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {



//CONSTRUCTOR
  constructor(private userService: UserService  ) {}


 }
