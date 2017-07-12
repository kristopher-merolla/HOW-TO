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



///////////////////
// 9) 
//////////////////

///////////////////
// 10) 
//////////////////





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





