export const changeFilterValue = content => {
  return dispatch => {
    dispatch({
      type: 'CHANGE_FILTER',
      data: content
    })
  }
}

const filterReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'CHANGE_FILTER':
      console.log(action.data)
      return action.data
  
    default:
      return state
  }
}

export default filterReducer
