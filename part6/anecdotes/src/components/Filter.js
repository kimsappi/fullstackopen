import React from 'react'
import { connect } from 'react-redux'

import { changeFilterValue } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.changeFilterValue(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={props.filter} />
    </div>
  )
}

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {changeFilterValue}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
export default ConnectedFilter
