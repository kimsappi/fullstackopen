export const createNewNotification = (content, time) => {
  return dispatch => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: content
    })
    setTimeout(() => {dispatch(destroyNotification())}, time * 1000)
  }
}

const destroyNotification = content => {
  return {
    type: 'DESTROY_NOTIFICATION'
  }
}

const notificationReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      return action.data

    case 'DESTROY_NOTIFICATION':
      return null
  
    default:
      return state
  }
}

export default notificationReducer
