//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Before making an angular app (or any app really) have a pen+paper or a whiteboard handy to map out your idea //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////
// 1) Create a new Angular app, with components //
//////////////////////////////////////////////////
	// Below steps are an example, "AngularSample", "main", "child" are made up, otherwise commands are as-is
	// navigate in terminal to directory where you want to save your project, enter:
		ng new AngularSample --routing
			// When integrating with Express, call the application "public" and create inside express app
				ng new public --routing
			// the "--routing" is be needed for app to use routes, if you do not then omit it
	// to create a component, cd into the AngularSample directory //
		cd AngularSample
		//enter:
		ng g c main
		// create as many components as you may need, but remember they are reuseable!
		ng g c child
	// to add any services you may need for the app
		// "http" (to make http requests)
		ng g service http
	// when your projecet is setup with components, you can view in your browser localhost (default post 4200)

/////////////////////////////////////////////////////
// 2) Serve up your angular app to your local port //
/////////////////////////////////////////////////////
	// to START up the application, within the AngularSample directory, enter:
		ng serve
	// to VIEW the project:
		// open your favorite browser (chrome) and navigate to "localhost: 4200" (4200 is default)
			localhost: 4200
			// this is your "root route"
				// to avoid being mocked relentlessly, in the broswer make sure to:
					"inspect element"
	// to STOP the server, in your terminal window (where the server is running) press the keys:
		CTRL + C

////////////////////////////
// 3) Directory Structure //
////////////////////////////
	// After steps 1,2, the interesting structure of our application's AngularSample directory:
		AngularSample/
			e2e/
			node_modules/ // when you post to github, either add to .gitignore or delete this file
			src/
				app/
					main/ // made from "ng g c main" in step 1
						main.component.css // component css file (to style that component's html file!)
						main.component.html // component html file
						main.component.ts
					child/
						child.component.css
						child.component.html
						child.component.ts
					app-routing.module.ts
					app.component.css // app css file (to style that app's html file!)
					app.component.ts
					app.component.html // app html file
					app.module.ts
				assets/ // static files can be put in here for the application component html pages to use
				environments/
				index.html // root page, take a look, add "Loading..." btwn <app-root> tags, refresh broswer (chrome)

/////////////////////////////
// 4) Imbedding components //
/////////////////////////////
	// view your app in your broswer localhost: port, you're viewing this file:
		app.component.html
			// Remove the stuff CLI put in there, leave/add what you want:
				//<div id="big_wrapper">
				//	<h1>AppComponent</h1>
				//	<router-outlet></router-outlet>
				//</div>
			// add a border around the app to help visualize:
				app.component.css
					//#big_wrapper {
					//	border: 1px solid red;
					//}
	// to imbed an app in your app.component.html:
		app.component.html
			// Add somewhere in the html file your component
				//<app-main></app-main>
					// if you don't know what to call it, check out this file for the name:
						main.component.ts
							// this line:
								selector: 'app-main',
			// add a border around the component to help visualize:
				main.component.html
					//<div id="big_wrapper">
					//	<p>
					//		main works!
					//	</p>
					//</div>
				main.component.css
					//#big_wrapper {
					//	border: 1px solid blue;
					//}
	// you can also imbed a component inside another (parent-child relationship)
		child.component.html
			//<div id="big_wrapper">
			//	<p>
			//		child works!
			//		<app-child></app-child>
			//	</p>
			//</div>
		child.component.css
			//#big_wrapper {
			//	border: 1px solid green;
			//}

//////////////////////////
// 5) Setting up routes //
//////////////////////////
	// application routes can be found in this file:
		app-routing.module.ts
			// note this line, which was added by CLI:
				import { Routes, RouterModule } from '@angular/router';
			// you'll see the paths defined and can add to them:
				const routes: Routes = [
					{
						path: 'weather', // add your path here
						component: main,
						children: [
							{ path: 'wind/:wind', component: child} // path "main/child"
						]
					}
				];
			// to use these components, you guessed it, you need to add an import in your file:
				import { mainComponent } from './main/main.component';
				import { childComponent } from './child/child.component';
	// add a line to the component.ts file:
		main.component.ts
			import { Router, ActivatedRoute } from '@angular/router';
	// routes are now setup, take a look at these routes on the browser:
		"http://localhost:4200/weather"

//////////////
// 6) Forms //
//////////////
	// To use forms, you'll need to import it!:
		app.module.ts
			import { FormsModule } from '@angular/forms';
			// need to add to the imports list as well:
				// before:
					imports: [
						BrowserModule,
						AppRoutingModule
					]
				// after:
					imports: [
						BrowserModule,
						AppRoutingModule,
						FormsModule // add FormsModule here
					]
	// Add a form into your sheet
		main.component.html
			//<form>
			//	<label for="zip">Zipcode:</label>
			//	<input type="number" name="zip">
			//	<button type="submit">Submit zipcode</button>
			//</form>
	// To get the form to pass data, create a function (in component.ts file) to run when you submit:
		main.component.ts
		// the Http request will be either a success or fail, and we can catch these errs (Do not put in constructor):
			export class MainComponent implements OnInit { }
				//weatherData: object;
				//
				//getUserZipInfo(zip) {
				//	console.log("user's zip",zip);
				//	// call the function, which returns a promise, and use the then and catch functions
				//	this._http.fetchWeather(zip)
				//	.then(
				//		// can call this whatever (we use data below)
				//		data => { this.weatherData = zip;
				//		console.log("success",data) }
				//	)
				//	.catch(
				//		// can call a function if error as well
				//		err => { this.weatherData = null;
				//		console.log("fail",err) }
				//	)
				//}
	// Add the function in the form tag in your html file:
		main.component.html
			//<form (submit)="getUserZipInfo(zip.value)">
			//	<label for="zip">Zipcode:</label>
			//	<input type="number" name="zip">
			//	<button type="submit">Submit zipcode</button>
			//</form>

////////////////////////////////
// 7) HTTP Service, API calls //
////////////////////////////////
	// Example API call below goes to a openweathermap.org API
	// using an http service we must import the service first
		main.component.ts
			import { HttpService } from './../http.service';
	// need to also INJECT into the component constructor:
		main.component.ts
			// before: 
				constructor() { }
			// after:
				after: constructor(private _http: HttpService) { }
	// To use an API call, your app needs to utilize http we setup using "ng g service http"
	// In step 6 above, the api call function we have called "fetchWeather()"
		http.service.ts
			// import what you're going to need (notice a pattern yet?):
				import { Http } from '@angular/http'; // required for http requests
				import 'rxjs' // prescription javascript
			// to inject the dependancy and access the Http class methods, update the constructor:
				// before: 
					constructor() { }
				// after:
					after: constructor(private _http: Http) { }
			// create a function to make the API call, which returns an observable, and convert to a promise:
  				export class HttpService { }
					fetchWeather(zip) {
						return this._http.get("http://api.openweathermap.org/data/2.5/weather?zip="+zip+
							",us&APPID=71808975185a1d637ac5e5f7ee4a9f4b").map(response=>response.json()).toPromise()
					}
	// At this point, you'll notice the page is broken!  that's because we need to add something else:
		app.module.ts
			// import the HttpModule and HttpService
				import { HttpModule } from '@angular/http'; // needed for HTTP request to server!
				import { HttpService } from './http.service'; // needed for using http services!
			// Then add them inside the @NgModel
				// HttpModule to imports list
					// before:
						imports: [
							BrowserModule,
							FormsModule,
							AppRoutingModule
						]
					// after:
						imports: [
							BrowserModule,
							FormsModule,
							AppRoutingModule, 
							HttpModule // add HttpModule here
						]
				// HttpService to providers list
					// before:
						providers: [],
					// after:
						providers: [HttpService], // add HttpService here

////////////////////////////////
// 8) Building an Express App //
////////////////////////////////
	// layout of express app:
	my-express-app/
		server/
			config/
				mongoose.js
				routes.js
			controllers/
				products.js
			models/
				product.js
		server.js
	// make a directory for our express app:
		mkdir my-express-app
			// go into the directory:
				cd my-express-app
					// initialize the node app:
						npm init -y
							// install packagaes:
								npm install --save express
								npm install --save body-parser
								npm install --save mongoose
							// create server file:
								touch server.js
								mkdir server
									// go into server folder:
										cd server
											// create directories:
												mkdir config
													// add files in config (cd into config first):
														cd config
															touch mongoose.js
															touch routes.js
															cd ..
												mkdir controllers
													// add files:
														cd controllers
															touch products.js
															cd ..
												mkdir models
													// add files:
														cd models
															touch product.js
															cd ..
															cd .. // back inside my-express-app dir

/////////////////////////////
// 9) MongoDB and Mongoose //
/////////////////////////////
	// give collection names in LOWER CASE


////////////////////////////////////
// X) Express-Angular Integration //
////////////////////////////////////
	// First step towards integration is moving your angular app directory inside your express directory
		// before:
			my-express-app/
				server/
				server.js
		// mid:
			my-express-app/
				my-angular-app/ // app directory goes here!  rename it to "public"
				server/
				server.js
		// after:
			my-express-app/
				public/ // app directory
				server/
				server.js
	// Within your angular directory, in the terminal enter:
		ng build -w
			// This will create a "dist" directory to hold the transpiled ts files as js
			// The "-w" listens for saves, so when we update the app and save, the "dist" is updated
			// When you are ready to deploy, run without the "-w" ie: "ng build"
		// now the express app looks like (mins a few file omitted for space) this:
			my-express-app/
				public/
					dist/ // this was added with the "ng build -w" command
					e2e/
					node_modules/
					src/
				server/
				server.js
	// Edit the server.js file to point to the "dist" directory as the static folder
		server.js
			app.use(express.static(path.join(__dirname, '/public/dist')));
				// if you did not rename your angular app to "public" the above route would be different
					// just use "public" for your angular app directory! :)
			// you should also add a "catch all" route to your routes file
				my-express-app/
					server/
						config/
							mongoose.js
							routes.js // add routes here
				// the '/' route will automatically point to index.html, so don't need to add that:
					routes.js
						app.get('*', (req, res, next)=>{
							res.sendFile(path.resolve("./public/dist/index.html")); // SYNTAX MAY NOT BE CORRECT FOR THIS LINE
						});
	// In your terminal in the express app directory (my-express-app) enter:
		nodemon server.js
			// this starts up our node server and keeps it running
	// In a separate terminal window, enter:
		sudo mongod
			// this starts up our mongo database (assuming we're using that!)

///////////////////
// Y) Deployment //
///////////////////
	// Using AWS...
















