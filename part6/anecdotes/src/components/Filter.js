import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { changeFilterValue } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(changeFilterValue(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
