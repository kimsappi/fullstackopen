import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const buttonHandler = event => {
    store.dispatch({
      type: event
    })
  }

  return (
    <div>
      <button onClick={() => buttonHandler('GOOD')}>good</button> 
      <button onClick={() => buttonHandler('OK')}>neutral</button> 
      <button onClick={() => buttonHandler('BAD')}>bad</button>
      <button onClick={() => buttonHandler('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
