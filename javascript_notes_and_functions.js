//###############################################//
//## JavaScript Notes, Functions, Helpful Tips ##//
//###############################################//


//////////////////////
// 1) General Notes //
//////////////////////
	/* Input types:
		number
		string
		boolean
		undefined
		object
		function 
	*/

	// Print to the console
		console.log("hello world");

	// Create a variable
		var myVariable;
			// This would be an undefined variable, you could later set it like:
				myVariable = 2;
		// You could also just set the variable at declaration
		var myVariable = 2;

	// For loops
		for (var i = 0; i<arr.length; i++) {}

	// While loops
		var bool = true;
		while (bool) {
			// logic in here, must include a "brake out" such as a return, break, or chage of the while bool to false
		}

	// Make a function
		function speakToConsole() {
			console.log("hello world");
		}

	// Find length of an array, or string
		array.length
		string.length

/////////////////////////////////
// 2) Viewing your Code Output //
/////////////////////////////////
	// Node (Node.js) is a great way to visualize your javascript code in real time
		// From within the proper directory in terminal
		nodemon filename.js
			// Every time your file is saved, the server refreshes and you'll see the output in the terminal
		// Or you can juse use node filename.js if you want to run that file once

	// Add HTML code inside a <script></script> tag and save the file as "filename.html" to view on browser console
		// Use Chrome!  Right click to inspect element to view the console

		// To print in the browser (not console, but inside the DOM) use:
			document.write("Hello World");

///////////////////////////////////
// A) NPM (Node Package Manager) //
///////////////////////////////////
	// NPM is a package manager and the default tool that comes with Node.js to manage project dependencies.
		// What are dependencies? In this case, they’re just JavaScript files and libraries that give us tools to make 
		// applications with, such as a ready-made function that spins up a server with ease! That means that npm is 
		// just a tool to fetch and prepare other chunks of code. In the MEAN stack, we call those chunks "modules". 
		// Depending on what technologies you've used in the past, these "modules" are very similar to Ruby gems and Python 
		// libraries, often generalized as "middleware".
	// npm can install and use modules from either a local destination on your computer or it can get them from a remote location called the npm registry, an online home for node modules. There are thousands of NPM packages that the node community has generated. They can be found here: https://www.npmjs.com/

////////////////////////
// B) Making a Server //
////////////////////////
	// get the http module:
	var http = require('http');
	// fs module allows us to read and write content for responses!!
	var fs = require('fs');
	// creating a server using http module:
	var server = http.createServer(function (request, response){ // this line creates the server!
		// see what URL the clients are requesting:
		console.log('client request URL: ', request.url);
		// this is how we do routing:
		if(request.url === '/') {
			fs.readFile('index.html', 'utf8', function (errors, contents){
				response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
				response.write(contents);  //  send response body
				response.end(); // finished!
			});
		}
		// request didn't match anything:
		else {
			response.writeHead(404);
			response.end('File not found!!!');
		}
	});
	// tell your server which port to run on
	server.listen(6789);
	// print to terminal window
	console.log("Running in localhost at port 6789");
