const initialNotification = 'This is a notification'

const anecdoteReducer = (state = initialNotification, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    default:
      return initialNotification
  }
}

export default anecdoteReducer
