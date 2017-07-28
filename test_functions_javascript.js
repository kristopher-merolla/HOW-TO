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
// let someArray = makeArrayFrom(1,100);
// console.log(checkArrayForPrime(someArray));












