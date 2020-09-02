export const createNewNotification = (content, time) => {
  return dispatch => {
    const timeout = setTimeout(() => {dispatch(destroyNotification())}, time * 1000)
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: {
        content: content,
        timeout: timeout
      }
    })
  }
}

const destroyNotification = content => {
  return {
    type: 'DESTROY_NOTIFICATION'
  }
}

const emptyNotification = {
  content: null,
  timeout: null
}

const notificationReducer = (state = emptyNotification, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      if (state.timeout)
        clearTimeout(state.timeout)
      return action.data

    case 'DESTROY_NOTIFICATION':
      return emptyNotification
  
    default:
      return state
  }
}

export default notificationReducer
