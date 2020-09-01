import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { createNewNotification, destroyNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = anecdote => {
    dispatch(voteForAnecdote(anecdote.id))
    dispatch(createNewNotification(`You voted for '${anecdote.content}'`))
    setTimeout(() => dispatch(destroyNotification()), 5000)
  }

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .filter(anecdote => anecdote.content.includes(filter))
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
      )}
    </>
  )
}

export default AnecdoteList
