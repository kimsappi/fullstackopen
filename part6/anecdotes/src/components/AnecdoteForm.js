import React from 'react'
import { useDispatch } from 'react-redux'

import * as anecdotesService from '../services/anecdotes'
import { asObject, createNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const createAnecdote = event => {
    event.preventDefault()
    const anecdoteText = event.target.anecdote.value;
    if (anecdoteText.length)
      dispatch(createNewAnecdote(anecdoteText))
      anecdotesService.saveAnecdote(asObject(anecdoteText))
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
