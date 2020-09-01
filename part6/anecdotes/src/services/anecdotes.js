import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const saveAnecdote = async anecdote => {
  const response = await axios.post(baseUrl, anecdote)
  return true
}
