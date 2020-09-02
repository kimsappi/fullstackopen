import React from 'react'
import { connect } from 'react-redux'

import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { createNewNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = anecdote => {
    props.voteForAnecdote(anecdote)
    props.createNewNotification(`You voted for '${anecdote.content}'`, 5)
  }

  return (
    <>
      {props.anecdotes
        .sort((a, b) => b.votes - a.votes)
        .filter(anecdote => anecdote.content.includes(props.filter))
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

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteForAnecdote,
  createNewNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
