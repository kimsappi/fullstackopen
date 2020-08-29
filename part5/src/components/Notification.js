import React, { useEffect } from 'react';

const notificationStyle = {
	backgroundColor: 'lightgray',
	padding: '0.5em',
	borderRadius: '0.2em',
	border: '2px solid',
	fontSize: '1.5em'
};

const Notification = ({notification, setNotification}) => {
	useEffect(() => {
		if (notification)
			setTimeout(() => setNotification(null), 5000);
	}, [notification, setNotification]);
	
	if (!notification)
		return null;

	let content = '';

	if (notification === 'blogSuccess')
		content = 'New blog submitted successfully';
	else if (notification === 'blogError')
		content = 'Blog submission failed';
	else if (notification === 'loginSuccess')
		content = 'Logged in successfully';
	else if (notification === 'loginError')
		content = 'Failed to log in';

	let borderColor = {};
	if (notification.includes('Success'))
		borderColor = 'green';
	else
		borderColor = 'red';

	console.log(content);

	return (
		<div style={{...notificationStyle, borderColor: borderColor, color: borderColor}}>
			{content}
		</div>
	);
};

export default Notification;
