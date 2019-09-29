import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const StatisticRow = ({ name, value }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {

    const average = (good, neutral, bad) => {
        if ((good + neutral + bad) === 0) {
            return 0;
        } else {
            return ((good * 1 + bad * (-1)) / (good + neutral + bad));
        }
    }

    const positive = (good, all) => {
        if (good == 0) {
            return 0;
        } else {
            return (good / all);

        }
    }

    if ((good + neutral + bad) == 0) {
        return (
            <>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </>
        )
    }

    return (
        <div>
            <h1>statistics</h1>
            <StatisticRow name="good" value={good} />
            <StatisticRow name="neutral" value={neutral} />
            <StatisticRow name="bad" value={bad} />
            <StatisticRow name="all" value={good + neutral + bad} />
            <StatisticRow name="average" value={average(good, neutral, bad)} />
            <StatisticRow name="positive" value={positive(good, (good + neutral + bad))} />
        </div>
    )
}

const App = (props) => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={() => setGood(good + 1)} text="good" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button handleClick={() => setBad(bad + 1)} text="bad" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}


ReactDOM.render(<App />,
    document.getElementById('root')
)
