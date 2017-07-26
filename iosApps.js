//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Before making an iOS app (or any app really) have a pen+paper or a whiteboard handy to map out your idea //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////
// 1) Create a new swift project //
///////////////////////////////////
	// A single view application is most basic, but you can choose other options per your needs
		Configure your project name, any other settings (like orientation)
	// Some helpful commands for the SWIFT UI:
		⌘+0 // Show/hide navigator section
		⌘+SHIFT+Y // Show/hide debug section
		⌘+OPTION+0 // Show/hide utility section
	// You may need to tweak some features in your project setup, some things to think about:
		Do you want your app to rotate with the phone, or stay in one view?
			// Landscape or Portrait
	// Info.plist is an important file if you want to do things like:
		Build an augmented reality app (which needs the camera!)

////////////////////////
// 2) Main.storyboard //
////////////////////////
	// Setup your project views here, use the utility area to search for elements you need to add
	// Format your app with auto layout (see the section below on auto layout for more info)
		// Needed to keep your app looking good on any device!
	// Some useful views/elements
		View Controller
		Table View Controller
		Button
		Bar Button Item
		Label
		Text Field

///////////////
// 3) Segues //
///////////////
	// In the Main.storyboard file (or any other storyboard you add!)
	// To setup a segue navigation, click on your view then:
		Editor
			Embed In
				Navigation Controller
	// SHOW Segue (next view comes in from the right)
		// You can the n link other views and create a segue tree by simply:
			CTRL+click() and drag() from a button to the next view
				Select the "Show" option
	// MODAL Segue (next view comes up from the bottom)
		CTRL+click() and drag() from a button on one view to the next view
			Select the "Present Modally" option
	// To create a "back" button (or a "dismiss" button) see part 4 on creating a custom class

////////////////////////////////
// 4) Creating a Custom Class //
////////////////////////////////
	// Making a "Dismiss" button (to go back to the previous view)
		// First you need a viewcontroller.swift file for the view
			File
				New
					File
		// Select the "Cocoa Touch Class" option and name the file
			"SecondViewController"
				// Make sure the name relates to the name of that view!
		// To link the swift file with your second view controller:
			Click on the yellow button on the top of the view
				In the Utility Area, select the custom class{} as "SecondViewController"
		// Open the SecondViewController file to link the button action
			// Make sure you have both the Main.storyboard and the SecondViewController file visible
			CTRL+click() and drag() from the button to the SecondViewController
				Give the action a relevant name, such as "dismissButtonPressed"
				Connection: "Action"
				Type: UIButton
		// Within the function dismissButtonPressed, put your logic to dismiss the view
			dismiss(animated: true, completion: nil)

/////////////////////////////////////
// 5) Passing Data Through a Segue //
/////////////////////////////////////
	// Typically data will be passed from one view to another
		// To do this we must "prepare" for the segue
	// For this example, let's have a text field in view A (our main view) and a button to go to view B
		// On view B we have a Label which we would like to be set to the text entered in view A
			// In their respective view controller files, link the text field and label
				// A
				CTRL+click() and drag() from the text field in view A to the ViewController
					Give it a relevant name like "inputText"
				// B
				CTRL+click() and drag() from the label in view B to the SecondViewController
					Give it a relevant name like "outputLabel"
		// In the second (B) view controller (SecondViewController) add a variable:
			var outputText: String? // make this optional!  Type should match your data passed
		// Also in the second view controller:
			Inside of the viewDidLoad() func:
				// Set the outputLabel text equal to the outputText variable
				outputLabel.text = outputText
		// In the initial (A) view controller (ViewController), add anoverride the prepare for segue function:
			override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
    			let destination = segue.destination as! SecondViewController
				destination.outputText = inputText.text
			}
		// Dismissing from the second view (B) you'll still see the data from before in view A

//////////////////////////////
// 6) Table View Controller //
//////////////////////////////
	// Table views are a very useful way to store data and organize your app
	// To create a table view, you can drag a table view controller into your storyboard from the utility
		// You can also just use a table view if you want to embed it in a normal view controller
	Table View Controller
		// To connect the table view to your ViewController file, it'll need to be changed:
			// before:
				// class ViewController: UIViewController {}
			// after:
				class TableViewController: UITableViewController {}
					// If you change the class name, you should also change the name of the swift file
						// In the navigator section, rename the file
							// before:
								// ViewController.swift
							// after:
								TableViewController.swift
		/* If you've removed the initial view controller for a table view controller, then you will likely
		 need to select the table view controller and click an option under the view controller section
		 of the utility */
		 	(+) Is Initial View Controller
		// You will need to also link the table view controller to the right view controller swift file
			// In the utility section, make the selection:
				Class: TableViewController
		// To display information on your table, setup a variable (array) to store this information:
			// Working in the TableViewController.swift file... add the variable:
				var items = ["hello","world","it's me!"]
					// You can set the items as an empty array, but it's nice for developing to see data!
			// To set the number of rows, use the numberOfRowsInSection function:
				override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        			return items.count
				}
    		// To fill the cells of the rows you just created, use the cellForRow function:
    			override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        			let cell = tableView.dequeueReusableCell(withIdentifier: "ListItemCell", for: indexPath)
        			cell.textLabel?.text = items[indexPath.row]
        			return cell
				}
				// You'll notice above we have the withIdentifier as "ListItemCell"
					// This needs to be set for the cell, selct the cell on the storyboard
						// In the utility section, give the cell an identifier
							Identifier: "ListItemCell"
	// To make a table view static (which you may want to do if, for example, you're adding a new user form)
		// Select the table view (not the table view controller, just the table view) and in the utility section:
			Content: Static Cells
				// If you only need one input, for example, you can delete the other cells
				// You can also add more cells if you need more!
	// Input table is needed if we want the user to input into a form, using a static table:
		Add a Text Field from the utility section into the table view cell
			// Adjust dimensions as needed using auto layout

//////////////////////////////
// 7) Navigation Controller //
//////////////////////////////
	// Often you will want to add buttons on the top of your view controller for navigation
		// To do this, select the view where you want the controlls and click:
			Editor
				Embed In
					Navigation Controller
		// You can now in the utility search for buttons to put on, look up:
			Bar Button Item
				// If you select the button after adding it, in the utility you can change it
					// For example...
						System Item: Add
							// This will display a "plus" sign! Pretty cool!
		// Now to navigate, you can simply click on your button and control-drag it to the next view
			// MODAL Segue (next view comes up from the bottom)
				CTRL+click() and drag() from a button on one view to the next view
					Select the "Present Modally" option
				// The next view can be another table view controller or another view controller, depending on need
		// This can be repeated on other views by embeding in the navigation controller
		// For more see sections 3 and 4 on segues and custom classes

////////////////////////////////
// 8) Protocols and Delegates //
////////////////////////////////
	/* 	Protocols are sets of rules our delegates must conform to in order to work with certain types of objects
		Delegates are pointers from one object to another, so we can call on specific methods to pass data
	*/
	// To setup a protocol, create a controller for your view:
		File
			New
				Project
					// Give the project a relevant name (below example for adding to a table):
					"AddItemTableViewController"
		// You will need to connect this new file to your view:
			click() on the Table View Controller // the yellow-circle
				// In the utility section, select:
					Class: AddItemTableViewController
		// You can then link your buttons (below are some examples)
			// Cancel button:
				CTRL+click() and drag() from the cancel button to the view controller
					// Give settings:
						Name: cancelButtonPressed
						Connection: Action
						Type: UIBarButtonItem
				// After you have the linkage, you need to setup the cancel function
					// In order to cancel the view, you must call it from a different view!
						// Make a new file:
							File
								New
									File
										// Pick a blank swift file and give it a name
											CancelButtonDelegate.swift
						// Inside the new file you need to setup the protocol, example:
							protocol CancelButtonDelegate: class {
								func cancelButtonPressed(by controller: UIViewController)
							}
						// Make sure you import the UIKit
							import UIKit
				// Inside the AddItemTableViewController, create a delagate var:
					weak var delegate: CancelButtonDelegate?
					// Also inside the AddItemTableViewController
						// Inside of the cancel button function:
					delegate?.cancelButtonPressed(by: self)
						// This will run your function which we will setup in the root view controller
				// Inside the root view controller (usually called ViewController.swift) setup the function
					// The root view controller will be the delegate
					// Use the prepareForSegue function:
						override func prepare(for segue: UIStoryboardSegue, sender: Any?){
							let navigationController = segue.destination as! UINavigationController
							let AddItemTableViewController = navigationController.topViewController as! AddItemTableViewController
							AddItemTableViewController.delegate = self
						}
			// Save button:

	// Sample protocol:
		protocol UITableViewDataSource {
    		func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int
    		func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell
		}
		// Any class that follows this protocol must include these functions
			// Example:
				extension ViewController: UITableViewDataSource {
					func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {        
						// Code goes here
					}
					func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {        
						// Code goes here
					}
				}
				extension ViewController: UITableViewDelegate {
				}

//////////////////////////
// 9) Unwinding a segue //
//////////////////////////
	// To unwind a segue (from view B to view A, where A is the first view and B is the second):
		// First you need to add this line in view A:
			@IBAction func unwindToWhatever(segue: UIStoryboardSegue) {}
			// make the "unwindToWhatever something relevant"
				CTRL+click() on the button and drag() it to the exit icon (orange button)
					Select the "unwindToWhatever"
					// You then have to click on the unwind segue and give it an identifier
						Identifier: "unwindToWhatever"
						// In file view B, to unwind:
							self.performSegue(withIdentifier: "unwindToWhatever", sender: self)

///////////////////
// 10) Core Data //
///////////////////
	/* For an iOS application to use a database, it relies on a Cocoa API known as  Core Data. 
		For those of you familiar with SQL, you probably want to separate the concept of "database" 
		into two kinds: There are relational databases, which is what you're probably used to, and 
		object databases, which is what Core Data provides. */
	/* In all of your future projects where you will use Core Data you will check the box when 
		creating the project and you won't have to do this. */
	/* - */
	// Importing Core Data is easy, go into this file:
		AppDelegate.swift
			// Add this line:
				import CoreData
	// Next open a new file:
		File
			New
				File
					// select:
					Core Data
						// add:
						New Data Model 
							// Will create a file like "YourDataModelName.xcdatamodeld"
	// Back in the AppleDelegate.swift file, add the below at the end of the file (inside the last backet):
		// MARK: - Core Data stack
	    lazy var persistentContainer: NSPersistentContainer = {
	        /*
	         The persistent container for the application. This implementation
	         creates and returns a container, having loaded the store for the
	         application to it. This property is optional since there are legitimate
	         error conditions that could cause the creation of the store to fail.
	        */
	        let container = NSPersistentContainer(name: "BucketList")
	        container.loadPersistentStores(completionHandler: { (storeDescription, error) in
	            if let error = error as NSError? {
	                // Replace this implementation with code to handle the error appropriately.
	                // fatalError() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.
	                /*
	                 Typical reasons for an error here include:
	                 * The parent directory does not exist, cannot be created, or disallows writing.
	                 * The persistent store is not accessible, due to permissions or data protection when the device is locked.
	                 * The device is out of space.
	                 * The store could not be migrated to the current model version.
	                 Check the error message to determine what the actual problem was.
	                 */
	                fatalError("Unresolved error \(error), \(error.userInfo)")"
	            }
	        })
	        return container
	    }()
	    // MARK: - Core Data Saving support
	    func saveContext () {
	        let context = persistentContainer.viewContext
	        if context.hasChanges {
	            do {
	                try context.save()
	            } catch {
	                // Replace this implementation with code to handle the error appropriately.
	                // fatalError() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.
	                let nserror = error as NSError
	                fatalError("Unresolved error \(nserror), \(nserror.userInfo)")
	            }
	        }
	    }
	// Add inside of the "applicationWillTerminate(application: UIApplication)" method of AppDelegate:
		// You should have this method already in your AppDelegate.swift file. Only add the line inside.
		func applicationWillTerminate(application: UIApplication) {
		/* ------ ADD THE LINE BELOW ------ */
		        self.saveContext() // ADD THIS LINE
		    }

///////////////////////////////////
// 10.1) Core Data CRUD Commands //
///////////////////////////////////
	// CRUD Basics
		// Managed Objects
			let context = (UIApplication.shared.delegate as! AppDelegate).persistentContainer.viewContext
		// Saving
			do{
				try context.save()
			catch{
				print(error)
			}
		// Create
			let newThing = Thing(context: context)
			newThing.property = "value"
		// Read (Fetch)
			let thingRequest:NSFetchRequest<Thing> = Thing.fetchRequest()
			do { let fetchedThings = try context.fetch(thingRequest) }
			catch { print(error) }
		// Update
			someManagedObject.property = "newValue"
			// after updating, save it!
			do { try context.save() }
			catch { print(error) }
		// Delete
			context.delete(someManagedObject)
	// Example CRUD:
		// To enable you to use core data, you need to setup what you want in NSManagedObject:
			let managedObjectContext = (UIApplication.shared.delegate as! AppDelegate).persistentContainer.viewContext
		// Create a new entity:
			let thing = NSEntityDescription.insertNewObject(forEntityName: "OurCustomEntityName", into: managedObjectContext) as! OurCustomEntityName
		// Set attributes of an entity:
			thing.coolTextAttribute = "Some Totally Cool Text"
		// Commit changes using the managedObjectContext:
			if managedObjectContext.hasChanges {
				do {
					try managedObjectContext.save()
					print("Success")
				} catch {
					print("\(error)")
				}
			}
		// Tell Core Data that we want to fetch items:
			let itemRequest = NSFetchRequest<NSFetchRequestResult>(entityName: "AwesomeEntity")
		// Iterate through records:
			do {
				// get the results by executing the fetch request we made earlier
				let results = try managedObjectContext.fetch(itemRequest)
				// downcast the results as an array of AwesomeEntity objects
				items = results as! [AwesomeEntity]
				// print the details of each item
				for item in items {
					print("\(item.coolTextAttribute)")
				}
			} catch {
				// print the error if it is caught (Swift automatically saves the error in "error")
				print("\(error)")
			}
		// Store the items in an array:
			var items = [AwesomeEntity]()
		// Fetch all items on page load, and save into data source:
			override func viewDidLoad() {
				super.viewDidLoad()
				// Do any additional setup after loading the view, typically from a nib.
				let userRequest = NSFetchRequest<NSFetchRequestResult>(entityName: "AwesomeEntity")
				do {
					let results = try managedObjectContext.fetch(userRequest)
					items = results as! [AwesomeEntity]
				} catch {
					print("\(error)")
				}
			}
		// Set text of cell with item text:
			cell.textLabel?.text = items[indexPath.row].coolTextAttribute
		// Keep in mind variable types!


////////////////////////////
// 11) API Calls and JSON //
////////////////////////////
	// Grand Central Dispatch
		/* GCD is a C API that interfaces with the threads on your computer to manage processes. 
		The GCD manages queues of tasks to run where each of the queues runs concurrently (at the same time) 
		and each of the tasks within a queue runs synchronously. In iOS by default, the GCD has 4 queues 
		that it manages with one completely dedicated to UI related tasks. 

		Behind the scenes, iOS does everything it can to make the user experience of any application the 
		best possible. Because of this, it keeps all UI related tasks on one queue and switches to the other
		queues for UI unrelated tasks such as HTTP requests! 

		In order to make our application faster, all we need to do is make sure that the actual 
		tableView.reloadData() function is run on the main queue that runs the UI. Conveniently enough iOS 
		calls this queue the "main queue". */
			// Remember that all UI related tasks and only UI related tasks belong in the main queue. 
			// Typically requests will look like:
				let url = URL(string: "http://www.some-api-url.com")
				let session = URLSession.shared
				let task = session.dataTask(with: url!, completionHandler: {
					data, response, error in
					// Do something here with the data from the response
					DispatchQueue.main.async {
						// Do something here to update the UI
					}
				})
				task.resume()


//////////////
// A) Swift //
//////////////
	// All iOS applications are built using Swift, a strongly typed language built on objective-c
	// To practice, you can use xCode and a file called a playground:
		File
			New
				Playground

////////////////////
// B) Auto Layout //
////////////////////
	// Auto layout is extremely important!
		// If you want your app to scale with the device it's being used on, you need auto layouts
	// Helpful tips:
		Move from top to bottom and left to right when setting the auto layout for elements in your view
		You must always set both vertical and horizontal alignment!
		Elements are often set in relation to other elements, try other devices/orientations to see how it looks!
		You can also set the width and height of an element, not just the position!

//////////////
// C) Views //
//////////////
	// Views are the physical layout of your app
		// Within a view, you can have a number of different elements such as:
			Tables
			Buttons
			Text Fields
			Navigation Bars
			...and many more!
		// You can change the background of a view to be a solid color, or an image
			// To add an image, you must add the image (in proper format) to the assets file
				Assets.xcassets
					// Drag the images in here, you should then be able to use them in your views and controllers!

////////////////////
// D) Controllers //
////////////////////
	// Controllers are files which interact with the views and render the data/images/actions
		// Written in Swift

/////////////////////////
// E) Data Persistence //
/////////////////////////
	// There are different ways to store data in Swift:
		// NSUserDefaults
			Very easy to use, but generally reserved for small pieces of data 
			like settings and user preferences. Should not be used for storing 
			any core data for your application. Data is stored on the device.
		// NSCoding
			A method of persisting data where you encode data and save it in a 
			file. Gives great control over how the data is structured, but may 
			not be the best option when dealing with relational data. Data is 
			stored on the device.
		// Core Data
			An iOS framework that uses an object-oriented style for storing and
			 modeling data. A robust and relatively easy solution to implement 
			 for larger data sets and relational data. Data is stored on the device.
		// Back-end API Server
			Using the full force of a back-end API server allows one to have full 
			control over their database and use any database (MySQL, MongoDB, 
			PostgreSQL, etc.). Relies on an internet connection. Data is 
			not stored on the device.

///////////////////
// F) Satori API //
///////////////////
	// Example (from Satori website, quickstart.html file):
		<!DOCTYPE html>
		<html>
		  <head>
		    <meta charset="UTF-8">
		    <title>Satori Quickstart</title>
		    <style>
		      p {
		        margin: 10px 0px 5px 0px;
		      }
		      div#output {
		        padding: 6px;
		        width: 800px;
		        height: 500px;
		        border: 1px solid #ccc;
		        border-radius: 3px;
		        font-size: small;
		        overflow-y: scroll;
		      }
		      div#output > div {
		        padding: 4px 0;
		      }
		    </style>
		    <script src="https://satori-a.akamaihd.net/satori-rtm-sdk/v1.0.2/sdk.min.js"></script>
		  </head>
		  <body>
		    <p>Output:</p>
		    <div id="output" />

		    <script type="text/javascript">
		      var endpoint = "YOUR_ENDPOINT_LINK";
		      var appkey = "YOUR_APP_KEY";
		      // Role and role secret are optional: replace only if you need to authenticate.
		      var role = "YOUR_ROLE";
		      var roleSecret = "YOUR_SECRET";
		      var channelName = "CHANNEL_NAME";

		      function showText(text) {
		        var view = document.getElementById("output");
		        var record = "<div>" + text + "</div>";
		        view.innerHTML = record + view.innerHTML;
		      }

		      // Check if the role is set to authenticate or not
		      var shouldAuthenticate = "YOUR_ROLE" != role;
		      var authProvider;
		      if (shouldAuthenticate) {
		         authProvider = RTM.roleSecretAuthProvider(role, roleSecret);
		      }

		      var client = new RTM(endpoint, appkey, { authProvider: authProvider });

		      // Hook up to client connectivity state transitions
		      client.on("enter-connected", function () {
		        showText("Connected to Satori RTM!");
		      });
		      client.on("leave-connected", function () {
		        showText("Disconnected from Satori RTM");
		      });
		      client.on("error", function (error) {
		        var reason;
		        if (error.body) {
		          reason = error.body.error + " - " + error.body.reason;
		        } else {
		          reason = "unknown reason";
		        }
		        showText("RTM client failed: " + reason);
		      });

		      client.start();

		      // Show information about the client configuration
		      var configInfo = "RTM client config:<br />";
		      configInfo += "&nbsp;&nbsp;endpoint = '" + endpoint + "'<br />";
		      configInfo += "&nbsp;&nbsp;appkey = '" + appkey + "'<br />";
		      configInfo += "&nbsp;&nbsp;authenticate? = " + shouldAuthenticate;
		      if (shouldAuthenticate) {
		        configInfo += " (as " + role + ")";
		      }
		      showText(configInfo);

		      // At this point, the client may not yet be connected to Satori RTM.
		      // The SDK internally creates a subscription object and will subscribe
		      // once the client connects.
		      var subscription = client.subscribe(channelName, RTM.SubscriptionMode.SIMPLE);
		      subscription.on("enter-subscribed", function() {
		        // When subscription is established (confirmed by Satori RTM).
		        showText("Subscribed to the channel: " + channelName);
		      });
		      subscription.on("rtm/subscribe/error", function(pdu) {
		        // When a subscribe error occurs.
		        showText("Failed to subscribe: " + pdu.body.error + " - " + pdu.body.reason);
		      });
		      subscription.on("rtm/subscription/data", function(pdu) {
		        // Messages arrive in an array.
		        pdu.body.messages.forEach(function(msg) {
		          showText("Animal is received: " + JSON.stringify(msg));
		        });
		      });

		      var publishLoop  = function() {
		        // At this point, the client may not yet be connected to Satori RTM.
		        // If client is not connected then skip publishing.
		        if (client.isConnected()) {
		          var lat = 34.134358 + (Math.random() / 100);
		          var lon = -118.321506 + (Math.random() / 100);
		          var animal = {
		            who: "zebra",
		            where: [lat, lon]
		          };
		          client.publish(channelName, animal, function(pdu) {
		            if (pdu.action.endsWith("/ok")) {
		              // Publish is confirmed by Satori RTM.
		              showText("Animal is published: " + JSON.stringify(animal));
		            } else {
		              showText("Publish request failed: " + pdu.body.error + " - " + pdu.body.reason);
		            }
		          });
		        }
		      }
		      setInterval(publishLoop, 2000);
		    </script>
		  </body>
		</html>


























