import React from 'react'
import { useHistory } from 'react-router-dom'

import { useField } from '../hooks/index'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/');
  }

  const handleReset = (e) => {
    e.preventDefault()
    for (let element of [content, author, info])
      element.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content.toProps()} />
        </div>
        <div>
          author
          <input name='author' {...author.toProps()} />
        </div>
        <div>
          url for more info
          <input name='info' {...info.toProps()} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
