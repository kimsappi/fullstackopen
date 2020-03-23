import React from 'react';

const Total = ({parts}) => {
	const sum = parts.reduce((total, part) => total + part.exercises, 0);

	return(
		<p><strong>total of {sum} exercises</strong></p>
	)
}

export default Total;