
//1.Imports

// it means allow us to use angular featuresand our own classes.


// Component: it defines an angular component, using the @Component decorator


import { Component, OnInit, signal } from '@angular/core';


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
import { User } from '../../models/user';




//Component Configuration
//the @Component decorator tells angular how this component works

@Component({

  // Selector: this  is custom html tag to display this component.

  //Example: <app-user></app-user> in html template will display this component.
  selector: 'app-user',


  // standalone: true: it means this component is a standalone component 
  // and it does not need to be declared in any module.
  //  It can be used directly in the application without being part of any module.
  standalone: true,

  // imports List of modules and standalone directive/pipes that this component depends on.
  //FormsModule: it is REquire for template driven forms in angular.[(ngModel)] two way data binding
  //CommonModule: it provides us common angular directtive and pipes.
  imports: [CommonModule, FormsModule],


  // templateUrl: it is the path to the html template file for this component.
  templateUrl: './user.component.html',
  // styleUrl: it is the path to the css file for this component.
  styleUrl: './user.component.css',
})


// this is our component class that contains the data and methods using by the html
//  template to display the data and handle user interactions.


export class UserComponent {

  //oninit---interface

  //ngoninit--Method that angular call


  // Signal : it store the list of user from the backend api.
  //signal<User[]>([]) means:

  //User[]: an arrany of user ojects.
  //[]: an empty array, indicating that initially there are no users in the list.
  //signal: make the data reactive,





  //FlowChart:

  //1 component class is created and initialized.

  //2 ngOnInit() method is called when the component is initialized.
  //3 userservice send http get
  //4 .net web api return the list of users to the user service.
  //5 .subscribe() method is called to handle the response from the user service.
  //6. user.set(data) method is called to update the users signal with the new list of users.
  //7. the html template is updated with the new list of users.


  users = signal<User[]>([]); // this is the property that will hold the list of users from the backend api  





  //it stores the Id entered of when the user wants to edit or delete a user. It is used to identify which user to update or delete in the backend api.
  // zero means that no existing user is selected.

  userId: number = 0; // this is the property that will hold the user id from the input field in the html template


  // store the name entered value inside the form
  //[(ngmodels=" name ")] in the html template will bind the value of the input field to this property and vice versa.

  name: string = ''; // this is the property that will hold the user name from the input field in the html template


  // store the email entered value inside the form
  //[(ngmodels=" email ")] in the html template will bind the value of the input field to this property and vice versa.
  email: string = ''; // this is the property that will hold the user email from the input field in the html template


  // this indicate whether the form is in edit mode or not.

  //false: create a new user,
  //  true: update an existing user. 
  // This property is used to determine whether to call the createUser()
  //  or updateUser() method in the user service when the form is submitted.

  isEditMode: boolean = false; // this is the property that will hold the edit mode status from the html template


  // it store the  success or error message display in the html.

  // an empty string means that there is no message to display.

  message: string = ''; // this is the property that will hold the message from the backend api to display in the html template



  // it indicate whether the form is in error mode or not.
  //true: an error occurred while processing the request, 
  // and the message property contains the error message to display in the html template.

  //false: success message
  isErrorMode: boolean = false; // this is the property that will hold the error mode status from the html template

  isErrorMessage: boolean = false;

  // Dependency Injection:

  // here the constuctor receive an instance of the UserService class as a parameter and assign it to a private property called userService.
  ///
  // why we dependency injection:
  // because the component need the service to communicate with the backend ai
  //// angular provide the service instance through dependency injection, so we don't need to create a new instance of the service class in the component class.

  constructor(private userService: UserService) { }


  //oninit is an angular lifecycle interface that is called when the component is initialized.

  //1 Ligecycle Hook: ngOnInit() method is called when the component is initialized.


  // why we use ngOnInit() method:
  // we want to load all the user automatically when the component starts
  ngOnInit(): void {

    //call the method that load all the users from the backend api when the component is initialized.

    this.getUsers();
  }


  // Read operation :Get all user
  // this method retrived the user list fromt the .net web api
  // void menas this method does not return a value directly.



  // flowchart

  // 1 ngoninit
  //2 getUsers
  //3: userserive.getalluser()
  // 4:.net backend api
  //5. return the user data
  // 6. subscribe to receives the response
  // 7.next(Data)
  //8. user.set(Data)
  // 9 angular update the html
  //10 request fail
  //11console error or error message

  getUsers(): void {


    //calls getalluser() from userservice

    // this means calle the backend api


    // here subscribe means let us handle the asynchronous api respone
    this.userService.getAllUsers().subscribe({



      // next run when the request succeeds with the api response

      next: (data) => {

        // we update the users signal with the api respone
        // why user.set(Data);

        // it replaces the current array with new array
        // after angular tracks the signal update and refersher automatticaly
        // the html that reads users


        this.users.set(data);
      },



      // it will be run if the http request fail
      error: (err) => {
        console.error('Error fetching users:', err);

        // display an error messge in the application
        // truely indicates that this is an error message.

        this.showMessage(
          'Could not load user. Make sure backend is running ', true
        )
      }
    })
  }


// Create and update operattion to save the user

// this method handles both creating and updating the user
// IsEdit mode determines which operation should run

// flowchart
//1: users click save button then we hit saveusermethod
//2.check here name and email is valide
//3, No then show error validaiton message;
//4 stop using return here
// 5. is edit mode if yes we can updateuser
//6 no then create a user
// 7 we update the signle and refersh the page


  SaveUser(): void {
    if (!this.name.trim() || !this.email.trim()) {
      this.showMessage("please enter both Name and Email", true)
      return;
    }
    if (this.isEditMode) {
      const updatedUser: User = {
        id: this.userId,
        name: this.name,
        email: this.email
      };
      this.userService.updateUser(updatedUser.id, updatedUser).subscribe(
        {
          next: () => {
            this.showMessage('User updated Successfully', false);
            this.getUsers();
          },
          error: (err) => {
            console.error('Error fetching users:', err);

            // display an error messge in the application
            // truely indicates that this is an error message.

            this.showMessage(
              'Could not load user. Make sure backend is running ', true
            )
          }

        }
      )
    }
    else {


      const newUser = {
        id: this.userId,
        name: this.name,
        email: this.email
      };


      this.userService.createUser(newUser).subscribe(
        {
          next: () => {
            this.showMessage('User created Successfully', false);
            this.getUsers();
          },
          error: (err) => {
            console.error('Create error:', err);

            // display an error messge in the application
            // truely indicates that this is an error message.

            this.showMessage(
              'Failed to create user ', true
            )
          }
        }
      )
    }
  }





  // Helper method: display success or error message

  // it containt msg containt the message to display
  //isError tells us whether this message represent an error.


  // what is the purpose of the showmessage()
  // this showmessage() method display an error message for 4 seconds and the automatically clear the message.
  //For example:
  // when a user is created: User Created Successfully
  //when a user is deleted: User Deleted Scucessfully.
  // when something goes wrorng: that message we can show here


  showMessage(msg: string, isError: boolean): void {

    this.message = msg;
    this.isErrorMessage = isError;


    setTimeout(() => {
      this.message = '';
    }, 4000

    )
  }
}