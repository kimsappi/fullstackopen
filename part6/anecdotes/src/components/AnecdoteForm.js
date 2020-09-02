import React from 'react'
import { connect } from 'react-redux'

import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { createNewNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {  
  const createAnecdote = event => {
    event.preventDefault()
    const anecdoteText = event.target.anecdote.value
    if (anecdoteText.length) {
      props.createNewAnecdote(anecdoteText)
      props.createNewNotification(`You created the anecdote '${anecdoteText}'`, 5)
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  createNewAnecdote,
  createNewNotification
}

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
