import React from 'react'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const createAnecdote = event => {
    event.preventDefault()
    const anecdoteText = event.target.anecdote.value;
    if (anecdoteText.length)
      dispatch(createNewAnecdote(anecdoteText))
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
