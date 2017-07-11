//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Before making an iOS app (or any app really) have a pen+paper or a whiteboard handy to map out your idea //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////
// 1) Create a new swift project //
///////////////////////////////////
	// A single view application is most basic, but you can choose other options per your needs
		Configure your project name, any other settings (like orientation)
	// Some helpful commands for the SWIFT UI:
		⌘+0 // Show/hide navigator for files, errors, and more
		⌘+SHIFT+Y // Show/hide debug area
		⌘+OPTION+0 // Show/hide utility area

////////////////////////
// 2) Main.storyboard //
////////////////////////
	// Setup your project views here, use the utility area to search for elements you need to add
	// Format your app with auto layout
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
		// You can then link other views and create a segue tree by simply:
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
	// To create a table view, you can drag a table view controller into your storyboard
		// You can also just use a table view if you want to embed it in a normal view controller
	

////////////////
// 7) 
////////////////










