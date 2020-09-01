import React from 'react'
import { useDispatch } from 'react-redux'

import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { createNewNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const createAnecdote = event => {
    event.preventDefault()
    const anecdoteText = event.target.anecdote.value
    if (anecdoteText.length) {
      dispatch(createNewAnecdote(anecdoteText))
      dispatch(createNewNotification(`You created the anecdote '${anecdoteText}'`, 5))
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

export default AnecdoteForm
