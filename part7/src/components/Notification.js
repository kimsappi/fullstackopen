import React from 'react'

const Notification = ({notification}) => {
  if (!notification.length)
    return null;
  else
    return (<p>{notification}</p>);
}

export default Notification
