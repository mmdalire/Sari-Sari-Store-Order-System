/**
 * @desc Make sure that the form is valid based on the hasError field which should be false
 * @param {object} data - To be examined if the form is valid
 * @param {boolean} includeTouched - check if the form is touched to activate validation (for EDIT forms)
 * @returns {boolean}
 */
export const formValid = (data, includeTouched = true) => {
	return Object.keys(data).every((field) => {
		// console.log(field, data[field].hasError, data[field].hasTouched);
		if (includeTouched) {
			return data[field].hasError === false && data[field].hasTouched;
		}
		return data[field].hasError === false;
	});
};

/**
 * @desc Generate codes in different entities for convenience of the users
 * @param {array} args - This input/s where the generation of code will be based on
 * @example
 * // generateCode('Automatic', 'Bridge', 'Car')        returns AUT-BRU-CAR
 * // generateCode('Automatic', 'Bridge')               returns AUT-BRI
 * // generateCode('Automatic', 'Bridge Car')           returns UT-BCA
 * // generateCode('Automatic Research', 'Bridge Car')  returns ARE-BCA
 * // generateCode('Automatic Research')                returns ARE
 * // generateCode('Automatic Research', 'Bridge')      returns ARE-BRI
 * @returns {string}
 */
export const generateCode = (...args) => {
	const maxCharacters = 3;
	const generatedCode = [];

	//Count each inputs passed
	if (args && args.length > 0) {
		args.forEach((input) => {
			let codeBasedOnInput;

			//In every input, split by space
			const splitInput = input.split(" ");

			//If the passed input contains more than or equal to 3 words, output the code first letter of each word
			if (splitInput.length >= maxCharacters) {
				codeBasedOnInput =
					(splitInput[0][0] || "") +
					(splitInput[1][0] || "") +
					(splitInput[2][0] || "");
			}
			//If the passed input contains exactly 2 words, output the code by first letter of first word AND first two letters of second word
			else if (splitInput.length === maxCharacters - 1) {
				codeBasedOnInput =
					(splitInput[0][0] || "") +
					(splitInput[1][0] || "") +
					(splitInput[1][1] || "");
			}
			//If the passed input contains exactly 1 word, output the code by first three letters of first word
			else if (splitInput.length === maxCharacters - 2) {
				codeBasedOnInput =
					(splitInput[0][0] || "") +
					(splitInput[0][1] || "") +
					(splitInput[0][2] || "");
			}

			generatedCode.push(codeBasedOnInput);
		});

		return generatedCode.join("-").toUpperCase();
	}
	return "";
};
