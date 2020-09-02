import React from 'react'

const Anecdote = ({anecdote, vote}) =>(
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>has {anecdote.votes} votes</p>
    <button onClick={() => vote(anecdote.id)}>vote</button>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
);

export default Anecdote
