import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercise from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	try {
		const height = Number(req.query.height);
		const weight = Number(req.query.weight);
		const ret = {
			weight: weight,
			height: height,
			bmi: calculateBmi(height, weight)
		};
		res.json(ret);
	}
	catch (err) {
		res.status(400).json({ error: 'malformatted parameters' });
	}
});

app.post('/exercises', (req, res) => {
	try {
		const dailyExercises: Array<number> = req.body.daily_exercises;
		const target = Number(req.body.target);
		const ret = calculateExercise(dailyExercises, target);
		res.json(ret);
	}
	catch (err) {
		res.status(400).json({ error: err });
	}
});

const PORT = 3000;
const IP = "0.0.0.0";
app.listen(PORT, IP, () => console.log(`Server running on ${IP}:${PORT}`));