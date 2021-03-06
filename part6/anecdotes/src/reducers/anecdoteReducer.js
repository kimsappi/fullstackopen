import * as anecdotesService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// const initialState = anecdotesAtStart.map(asObject)

export const voteForAnecdote = anecdote => {
  anecdotesService.voteAnecdote(anecdote)
  return {
    type: 'VOTE_FOR_ANECDOTE',
    data: anecdote.id
  }
}

export const createNewAnecdote = content => {
  const anecdoteObject = asObject(content)
  anecdotesService.saveAnecdote(anecdoteObject)
  return dispatch => {
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: anecdoteObject
    })
  }
}

export const initialiseAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INITIALISE_ANECDOTES',
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE_FOR_ANECDOTE':
      const id = action.data
      const votedAnecdote = state.find(n => n.id === id)
      const changedAnecdote = {...votedAnecdote, votes: votedAnecdote.votes += 1}
      return state.map(anecdote =>
        anecdote.id === id ? changedAnecdote : anecdote
      )

    case 'CREATE_ANECDOTE':
      return state.concat(action.data)

    case 'INITIALISE_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export default anecdoteReducer
