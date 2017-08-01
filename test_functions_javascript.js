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
// Returns a boolean if word found and the count of times found
function doesStringContainWord(inputString,word) {
	var wordString;
	// check if input was given, and then force it as a string
	if (typeof word != "undefined") {
		if (typeof word != "string") {
			wordString = String(word);
		}
	} else { // if word IS undefined
		console.log("inputs are: inputString: string, word:any");
		return [false,0];
	}
	// If we get this far, all is well, check if inputString is a string
	if (typeof inputString == "string") {
		var wordCount = 0; // start a count of times the word was found
		// grab lower case versions of the inputString and word
		let lowInputString = inputString.toLowerCase();
		let lowWord = wordString.toLowerCase();
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
					wordCount ++;
				}
			}
		}
		if (wordCount == 0) { // if you didn't find the word
			console.log("did not find word!");
			return [false,0];
		} 
		if (wordCount >= 1) { // you found the word!
			console.log("found word",wordCount,"times!");
			return [true,wordCount];
		}
	} else { // inputString or word not a string!
		console.log("inputs are: inputString: string, word:any");
		return [false,0];
	}
}

// Check if an input string contains a word from an array of words
// Returns a boolean and an array of hit counts of each word
function stringContainArrayWords(inputString, arr) {
	console.log("input string and check each array element");
}

// Read an input string and return a dictionary of words with count of each word
function makeWordDictionary(inputString) {
	if (typeof inputString == "undefined") {
		return false;
	}
	var theString;
	var outputDict = {};
	if (typeof inputString != "string") {
		theString = String(inputString);
	}
	theString = inputString.toLowerCase();
	for (var i = 0; i<theString.length; i++) {
		for (var j = i; j<theString.length; j++) {
			var word;
			if (theString[j] == " ") {
				i = j;
				for (key in outputDict) {
					if (word = key) {
						outputDict.key += 1;
						break;
					}
				}
				outputDict.word = 1;
				break;
			} else {
				word += theString[j];
			}
		}
	}
	return outputDict;
}

console.log(makeWordDictionary("hello and and hello and I"));

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
// doesStringContainWord(theString1,word1);


