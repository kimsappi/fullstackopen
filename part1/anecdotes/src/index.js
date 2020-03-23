import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({name, handleClick}) => {
  return (
    <button onClick={handleClick}>{name}</button>
  )
}

const Anecdote = ({anecdote, votes}) => {
  return (
    <>
      <div>
        {anecdote}
      </div>
      <div>
        has {votes} votes
      </div>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));

  const getRndAnecdote = () => {
    let rnd = Math.random() * props.anecdotes.length;
    rnd = Math.floor(rnd);
    setSelected(rnd);
  }

  const voteForAnecdote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }

  const mostVotesIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={props.anecdotes[selected]} votes={votes[selected]} />
      <Button name='vote' handleClick={voteForAnecdote} />
      <Button name='next anecdote' handleClick={getRndAnecdote} />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={props.anecdotes[mostVotesIndex]} votes={votes[mostVotesIndex]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)