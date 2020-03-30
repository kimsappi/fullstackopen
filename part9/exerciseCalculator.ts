const ratingDescriptions = {
	1: 'you can do better',
	2: 'not too bad but could be better',
	3: 'good job!'
} as const;

type Rating = 1 | 2 | 3;
const ratings: Array<Rating> = [1,1,2,3];

type RatingDescription = typeof ratingDescriptions[1] |
						typeof ratingDescriptions[2] |
						typeof ratingDescriptions[3];

interface ExerciseResult {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: RatingDescription;
	target: number;
	average: number;
}

const calculateExercise = (dailyHours: Array<number>, target: number): ExerciseResult => {
	if (!dailyHours || target === undefined || target === null)
		throw 'parameters missing';
	
	if (dailyHours.some(isNaN) || isNaN(target))
		throw 'malformatted parameters';

	const dailyAverage: number = dailyHours.reduce((total, day) => total + day, 0) / dailyHours.length;
	const rating: number = Math.min(3, Math.floor(Math.abs(dailyAverage - 0.7) * 2));
	const ratingTyped: Rating = ratings[rating];

	return {
		periodLength: dailyHours.length,
		trainingDays: dailyHours.reduce((total, hours) => hours ? ++total : total, 0),
		success: dailyAverage >= target,
		rating: rating,
		ratingDescription: ratingDescriptions[ratingTyped],
		target: target,
		average: dailyAverage
	};
};

if (process.argv.length > 3) {
	const target = Number(process.argv[2]);
	const dailyHours: Array<string> = process.argv.slice(3, process.argv.length);
	const dailyHoursNumber: Array<number> = dailyHours.map(hours => Number(hours));
	try {
	console.log(calculateExercise(dailyHoursNumber, target));
	}
	catch(err) {
		console.log(err);
	}
}
else
	console.log('usage: npm run calculateExercise <target daily hours> <1st day\'s hours> ...');

export default calculateExercise;
