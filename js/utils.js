'use strict';

/**
 * Fisher-Yates shuffler
 * @param array
 * @returns {*}
 */
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

/**
 * Turns number of seconds into number of minutes and seconds
 * @param seconds
 */
function getMMSS(seconds) {
	return {
		"m": Math.floor(seconds / 60),
		"s": seconds % 60
	}
}

function getMMSSString(seconds) {
	let mmss = getMMSS(seconds);
	let mString = mmss["m"].toString();
	if (mString.length < 2) {
		mString = "0" + mString;
	}

	let sString = mmss["s"].toString();
	if (sString.length < 2) {
		sString = "0" + sString;
	}

	return mString + ":" + sString;
}

function hex(buffer) {
	let hexCodes = [];
	let view = new DataView(buffer);
	for (let i = 0; i < view.byteLength; i += 4) {
		// Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
		let value = view.getUint32(i);

		// toString(16) will give the hex representation of the number without padding
		let stringValue = value.toString(16);

		// We use concatenation and slice for padding
		let padding = '00000000';
		let paddedValue = (padding + stringValue).slice(-padding.length);
		hexCodes.push(paddedValue);
	}

	// Join all the hex strings into one
	return hexCodes.join("");
}

function sha256(str) {
	// We transform the string into an arraybuffer.
	const buffer = new TextEncoder("utf-8").encode(str);
	return crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
		return hex(hash);
	});
}
