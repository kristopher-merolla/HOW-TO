///////////////////////////////////
// Test functions for javascript //
///////////////////////////////////

// Print to the console
function speakToConsole() {
	console.log("hello world");
}

// Take input number, multiply by two
function multiplyByTwo(num) {
	if (typeof num == "number") { // simple example of a callback
		return num * 2;
	} else {
		return false;
	}
}

// Multiplies two numbers
function thisTimesThat(num1, num2) {
	if ((typeof num1 == typeof num2) && (typeof	num1 == "number")) {
		return num1 * num2;
	} else {
		return false;
	}
}

// Make an array of numbers
function makeArrayFrom(start,end,step) {
	var arr = [];
	if (typeof step === "undefined") {
		step = 1;
	}
	if ((typeof start == "number") && (typeof end == "number") && (typeof step == "number")) {
		for (var i = start; i<=end; i+=step) {
			arr.push(i);
		}
		return arr;
	} else {
		return false;
	}
}

// Check if a number is a prime number
function isPrime(num) {
	if (typeof num == "number") {
		if (num <= 1) { // not prime
			return false;
		} else if (num == 2) { // first prime number!
			return true
		} else {
			if ((num % 2 == 0) || (num % 3 == 0)) { // not prime
				return false
			} else {
				return true // prime!
			}
		}
	} else {
		return false;
	}
}

// Check for prime number in an array
// returns array of prime numbers from the input list and a boolean
function checkArrayForPrime(arr) {
	var primeArray = [];
	if (typeof arr == "object") {
		if (arr.length == 0) {
			return (true,primeArray);
		} else {
			for (var i = 0; i< arr.length; i ++) {
				if (isPrime(arr[i])) { // callback!
					primeArray.push(arr[i]);
				}
			}
			return (true,primeArray);
		}
	} else {
		console.log("Function must take array");
		return (false,"Function must take array");
	}
}

// Shuffle elements in an array
function shuffleArray(arr) {
	if (typeof arr == "object") {
		var newArray = [];
		let len = arr.length;
		for (var i = 0; i<len; i++) {
			let randomNum = Math.floor((Math.random()*arr.length));
			newArray[i] = arr[randomNum];
			arr.splice(randomNum,1);
		}
		return newArray;
	}
	return false;
}

// Check if an input string contains a word
function doesStringContainWord(inputString,word) {
	if ((typeof inputString == "string") && (typeof inputString == typeof word)) {
		// grab lower case versions of the inputString and word
		let lowInputString = inputString.toLowerCase();
		let lowWord = word.toLowerCase();
		let wordLength = lowWord.length;
		for (var i = 0; i<inputString.length; i++) { // iterate through the inputString
			if (lowInputString[i] == lowWord[0]) { // check if inputString character is start of word
				var checkWord = lowWord[0];
				for (var j = 1; j<wordLength; j++) { // iterate through the word
					if (lowInputString[i+j] == lowWord[j]) {
						checkWord += lowWord[j]; // if we find a match, add that letter to the checkWord
					}
				}
				// once done with the for loop, check the check word against the lowWord
				if (checkWord == lowWord) {
					console.log("you found the word!");
					return true;
				}
			}
		}
		console.log("you did not find the word!");
		return false;
	} else { // inputString or word not a string!
		console.log("your inputs are not strings!");
		return false;
	}
}

/////////////////////////
// Test function calls //
/////////////////////////
// speakToConsole()
// console.log(inputType("hello"))
// console.log(inputType(2))
// console.log(inputType(multiplyByTwo(2)))
// console.log(multiplyByTwo(2))
// console.log(thisTimesThat(10,"hello"))
// console.log(thisTimesThat(10,8))
// console.log(checkArrayForPrime([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]))
// let someArray = makeArrayFrom(1,10);
// console.log(checkArrayForPrime(someArray));
// shuffleArray([1,2,3,4,5])
// console.log(shuffleArray(someArray));

let theString1 = "Hello, I was looking to celebrate the president, but Trump sucks!";
let theString2 = "Did you know dinosaurs are super cool?!";
let word1 = "dino";

doesStringContainWord(theString2,word1);
doesStringContainWord();





