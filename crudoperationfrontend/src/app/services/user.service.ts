import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';



// WITH THE HELP OF ROOT ANGULAR MAKES THE SERVICE AVAILABLE TO ALL COMPONENTS IN THE APPLICATION
//  WITHOUT NEEDING TO PROVIDE IT IN EACH COMPONENT'S PROVIDERS ARRAY.

// WHY WE USE ROOT INJECTABLE:
//1. APPLICATION-WIDE SINGLETON: WHEN YOU PROVIDE A SERVICE AT THE ROOT LEVEL, ANGULAR CREATES A SINGLE INSTANCE OF THAT SERVICE AND SHARES IT ACROSS THE ENTIRE APPLICATION. THIS IS USEFUL FOR SERVICES THAT MANAGE STATE OR DATA THAT NEEDS TO BE ACCESSED BY MULTIPLE COMPONENTS.
//2. SIMPLIFIED DEPENDENCY INJECTION: BY PROVIDING A SERVICE AT THE ROOT LEVEL, YOU DON'T NEED TO SPECIFY IT IN THE PROVIDERS ARRAY OF EACH COMPONENT THAT USES IT. THIS MAKES IT EASIER TO MANAGE DEPENDENCIES AND REDUCES BOILERPLATE CODE.
//3. PERFORMANCE OPTIMIZATION: WHEN A SERVICE IS PROVIDED AT THE ROOT LEVEL, ANGULAR CAN OPTIMIZE ITS CREATION AND LIFECYCLE MANAGEMENT, POTENTIALLY IMPROVING PERFORMANCE COMPARED TO PROVIDING IT IN MULTIPLE COMPONENTS.


//@injectable  decorator is used to define a class as a service that can be injected 
// into other classes (like components or other services) using Angular's dependency injection system. It allows you to specify how the service should be provided and its scope within the application.


// it means we use (@Injectable decorator) to register the service with Angular's dependency injection system, making it available for injection into other classes (like components or other services) throughout the application. By specifying providedIn: 'root', we are indicating that this service should be a singleton and available application-wide, meaning that Angular will create a single instance of the service and share it across the entire application. This is useful for services that manage state or data that needs to be accessed by multiple components.

// it allows angular to create and inject the service whenever it is needed, without having to manually instantiate it. This promotes a modular and maintainable architecture, as services can be easily shared and reused across different parts of the application.



// @Injectable is the decorator that is provided by angular that allows us dependency injection.

@Injectable({
  providedIn: 'root',
})


////
export class UserService {

// Base url of our .net backend api
  private apiUrl = 'https://localhost:7047/api/User';


  // SO SIMPLE WORKD

  // HTTPCLIENT IS ANGULAR BUILD-IN SERVICE THAT WE CAN USE TO MAKE HTTP REQUESTS TO THE BACKEND API
  //OR TO COMMUNICATE WITH THE BACKEND API


  // we can inject httpclient to make http request(get,post,put,delete) 
  // to the backend api and we can use it to get data from the backend api 
  // and we can use it to send data to the backend api.
  constructor(private http: HttpClient  ) {

   
   }


   // in simple words observale is used to handle asynchronous responses from the backend api and it allows us to subscribe to the response and get the data from the backend api and it allows us to handle errors and it allows us to cancel the request if we want to cancel the request.

    // Get all users from the backend api

    // this method we can use get all users from the backend api

    //Http Method : GET
    //Endpoint : https://localhost:7047/api/User/GetAll

      getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/GetAll`);
      };


      ///GetById

      // this method we can use get user by id from the backend api

      //Http Method : GET
      //Endpoint : https://localhost:7047/api/User/GetById/{id}

      getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/GetById/${id}`);
      }

      //Create User

      // this method we can use create user from the backend api

      //Http Method : POST
      //Endpoint : https://localhost:7047/api/User/Create

      createUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/Create`, user);
      }

      //Update User
      
      // this method we can use update user from the backend api

      //Http Method : PUT
      //Endpoint : https://localhost:7047/api/User/Update/{id}

      updateUser(id: number, user: User): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/Update/${id}`, user);
      }


      //Delete User
      
      // this method we can use delete user from the backend api
      //Http Method : DELETE
      //Endpoint : https://localhost:7047/api/User/Delete/{id}
      
      deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/Delete/${id}`);
      }
}
