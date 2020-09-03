const calculateBmi = (height: number, weight: number): string => {
	if (isNaN(height) || isNaN(weight))
		throw 'Height and weight must be numbers!';
	const bmi: number = weight / Math.pow(height / 100, 2);
	switch (true) {
		case bmi < 15:
			return 'Very severely underweight';
		case bmi < 16:
			return 'Severely underweight';
		case bmi < 18.5:
			return 'Underweight';
		case bmi < 25:
			return 'Normal (healthy weight)';
		case bmi < 30:
			return 'Overweight';
		case bmi < 35:
			return 'Obese Class I (Moderately obese)';
		case bmi < 40:
			return 'Obese Class II (Severely obese)';
		default:
			return 'Obese Class II (Very severely obese)';
	}
};

if (process.argv.length === 4)
	try {
		console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));
	}
	catch(err) {
		console.log(err);
	}
else
	console.log('usage: npm run calculateBmi <height (cm)> <weight (kg)>');

export default calculateBmi;
