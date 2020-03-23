import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) =>
  <button onClick={props.handleClick}>{props.name}</button>

const Statistic = (props) =>
  <tr>
    <td>{props.name}</td>
    <td>{props.value}</td>
  </tr>

const Statistics = ({good, neutral, bad}) => {
  const sumTotal = good + neutral + bad;

  if (sumTotal === 0)
    return(<p>No feedback given</p>)

  const getPositive = () => {
    let percentage = 0;
    if (sumTotal) {
      percentage = good / sumTotal;
      percentage = percentage * 100;
    }
    return percentage.toString().concat(' %');
  }

  const getAverage = () => {
    if (!sumTotal)
      return 0;
    else
      return (good - bad) / sumTotal;
  }

  return (
    <table><tbody>
      <Statistic name='good' value={good} />
      <Statistic name='neutral' value={neutral} />
      <Statistic name='bad' value={bad} />
      <Statistic name='all' value={sumTotal} />
      <Statistic name='average' value={getAverage()} />
      <Statistic name='positive' value={getPositive()} />
      </tbody></table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodHandler = () => setGood(good + 1);
  const neutralHandler = () => setNeutral(neutral + 1);
  const badHandler = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button name='good' handleClick={goodHandler} />
      <Button name='neutral' handleClick={neutralHandler} />
      <Button name='bad' handleClick={badHandler} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)