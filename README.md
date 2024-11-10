# HundredCards

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11 and node v22.11.0.
It is deployed at the following URL: https://ipcm27.github.io/one-hundred-cards/

![image](https://github.com/user-attachments/assets/a45d792b-e7d1-477f-9064-c5d7085ad7e1)

## Overview

The project demonstrates how to manage application state with NgRx in a scalable way, using best practices in Angular for component structure, error handling, and testability. It serves as a clean example of integrating NgRx into an Angular application to simplify data handling and state consistency across components.

## How it works

When a user enters the page it should see 100 cards fetched by https://jsonplaceholder.typicode.com/.
Each card should have the following properties:

{ </br>
"userId": 1,</br>
"id": 1, </br>
"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", </br>
"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto" </br>
}, </br>

<ul>
<li> As the content of the square, by default, show the post title. Then, </br></li>
  <ul>
    <li> &nbsp; When clicking a square, rotate through the properties of the post one by one (on every click). For example, on the first click,
replace the title with the userId, on the next click show the id, and so on.</br> </li>
    <li> &nbsp; When clicking any other square in the layout, any previous clicked square should also be updated back to its default state.</br> </li>
    <li> &nbsp; Only one square at a time should show details.</br> </li>
  </ul>
<li> On top of the page show the id of the current active post.</li>
</ul>

## Motivation behind choices
<h3> Stylling: </h3> 
<ul>
  <li>Although I am more familair with bootstrap, I choosed to use Tailwind to be more aligned to the client's technologies. </li>
</ul>

<h3> Modular Component Structure with SOLID principles: </h3> 
<ul>
  <li> I created two seprated components: PostPageComponent and PostCardComponent to be aligned with Angular's philosophy of modular design so it can be more scalable and reusable. This organization demonstrate the <strong>Single Responsibility Principle (SRP)</strong> been applied.
    <ul>
  <li> <strong>PostCardComponent</strong> is responsible for handling each individual post. This means it only deals with the input/output of the card info and events;</li>
  <li> <strong>PostPageComponent</strong> manages the collection of cards (the whole page). Its main job is to handle the page-level responsibilities by communicating with the store.</li>
      </ul></li>
  <li> This approach encapsulates the logic related to displaying individual posts within each card component. </li>
  <li> The organization regarding the store: reducers, actions, selectors and effects; is reflecting the <strong> Open/Closed Principle (OCP)</strong>. If I need to add a new fucntionallaty I can create a new case without having to modify the existing ones. </li>
  <li> The components are loosely coupled by using the <strong> Dependency Inversion Principle (DIP)</strong>. For example: PostService, which is injected wherever needed rather than being instantiated directly in components. </li>
</ul>

<h3> Design Patterns: </h3> 
<ul>
  <li><strong>Facade Pattern:</strong> The NgRx Store works as a facade for managing global state. Instead of each component accessing state directly, I use actions and selectors to keep it all organized and consistent.</li>
 <li><strong>Observer Pattern:</strong> With RxJS, actions and selectors are observables, so components can just “watch” for state changes and respond as needed. This setup is perfect for keeping the UI reactive and in sync with async data.
  </li>
  <li><strong>Container-Presenter Pattern (Smart-Dumb Components):</strong> I’ve split the app into smart and dumb components:
    <ul>
      <li>PostPageComponent is a smart component that handles state and communicates with the store.</li>
      <li>PostCardComponent is dumb, just focusing on displaying each post and handling events. This setup keeps components modular and easy to test.</li>
     </ul>
    </li>
</ul>

<h3> Error Handling: </h3> 
<ul>
  <li><strong>Effect-Level Error Handling</strong>: Errors are primarily handled in the Effects layer (such as with loadPostsFailure), where errors are caught and passed along to the store. This allows the app to handle issues gracefully without crashing, making it possible to display user-friendly messages instead of silent failures.</li>

<li><strong>User-Friendly Messaging:</strong> In case of an error, the application displays a clear and helpful message to the user (e.g., “Oops! Something went wrong…”). This provides immediate feedback and even suggests actions the user can take, like refreshing the page or checking back later.</li>
  </ul>

![Captura de tela 2024-11-10 140348](https://github.com/user-attachments/assets/566fb54f-2a25-43af-8c82-4a821676f3ed)



## Questions
<strong>1. We use JWTs a lot throughout our API. For instance, when a user logs in on our API, a JWT is issued and our web-application uses this token for every
request for authentication. Here's an example of such a token:<br>
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzb21lb25lQGV4YW1wbGUubmV0IiwiYWRtaW4iOmZhbHNlLCJ2YWxpZF91bnRpbCI6IldlZCBEZWM 
gMzEgMjM6NTk6NTkgQ0VTVCAxOTY5In0.4bl2puoaRetNjO1GsweKOnnQsYgwNa9bQIC-WQZkuNo</br>
<br></br>
Why is it (or isn't it) safe to use this? </br></strong>

JWT Auth is vastly used on the web. It provides a way the server knows it's client by provifing him a token. JWTs have three main components: a header, payload, and signature. The signature helps verify the authenticity of the token and that its contents haven't been tampered with.

![image](https://github.com/user-attachments/assets/15f67242-058c-46ce-9080-d8e209592591)

Why is safe ?
<ul>
 <li> Are digitally signed (using algorithms like HS256 or RS256), meaning the server can verify if the token has been changed. </li>
 <li> Expire after a set period, reducing the risk if a token is intercepted. </li>
 <li> Can carry claims (user data or roles) that the application can validate without querying a database each time. </li>
</ul>

Why could not be totally safe ?
<ul>
 <li> JWTs store user data (claims) directly in the token payload, which can expose sensitive information if not encrypted.</li>
 <li> If a JWT is intercepted (say, in an unsecured network connection or by a compromised device), the attacker can impersonate the user until the token expires.</li>
</ul>
<hr>

<strong>2. In our web-application, messages sent from one user to another, can contain HTML, which poses some security risks. Describe two attack vectors
bad actors might try to abuse? And how would you mitigate these vectors?</strong>
<ul>
  <li>XCSS: A bad intended developer could intercept the message and embed malicious JavaScript in HTML content. </li> 
  <li>Phising: A bad intended person could insert an html in the message that redirect to an outside link and that user would be in danger. </li>
</ul>
<hr>

<strong>3. Explain the difference between mutable and immutable objects. </strong>
<br>As the name already says, mutable objects can be modified after creation, and immutable objects, on the other hand, can't.
<ul><li><strong> What is an example of an immutable object in JavaScript?</strong> </li>Primtive data types. When we edit a string it creates a new one.</ul>

<ul><li><strong>What are the pros and cons of immutability?</strong></li>
<ul><li>pros: it makes the code cleanner and easier to trace where the change come, avoiding side effects. </li><li>cons: it makes the code bigger and increased memory Usage. </li></ul></ul>
<ul><li><strong>How can you achieve immutability in your own code?</strong> </li>
  
One way to keep objects immutable is by creating a modified copy instead of altering the original object. For example, if you have a function that takes a car object as a parameter, instead of directly modifying car and returning it, you can create a new variable (like carModified) that copies the properties of car, make any changes to carModified, and then return this new object. This way, the original car object remains unchanged. Another one would be using const insted of let. 
</ul>
<hr>
<strong>4. If you would have to speed up the loading of a web-application, how would you do that? (no need to actually do it, just describe the steps you would
take)</strong>
<ul>
  <li> I could enable Lazy Loading for Modules. </li>
  <li> I would review my application and see if the infos that are been request are actually necessary. </li>
  <li> I would consider using cache systems to avoid calling the server many times. </li>
  <li> I could implement SSR (server side rendeinrg) if it wouldn't compromise the server. </li>
  <li> I could compress images and assets to optmize if that didn't compromise the quality of the web application. </li>
</ul>
<hr>

## Clone the project
Clone the project then use npm instal.
I'm using node v22.11.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deploy
The deploy was done at gitbuh pages
npx angular-cli-ghpages --dir=dist/one-hundred-cards

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
![image](https://github.com/user-attachments/assets/9a06a9d1-8708-4aa4-9c42-be3daa01930e)


## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

