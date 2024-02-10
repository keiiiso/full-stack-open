import {useState} from 'react'

const Statistics = (props) => {
    if (props.all === 0) {
        return (
            <>
                <h1> statistics </h1>
                <p> No feedback given </p>
            </>
        )
    }

    return (
        <>
            <h1> statistics </h1>
            <table>
                <StatisticLine text="good" value ={props.good} />
                <StatisticLine text="neutral" value ={props.neutral} />
                <StatisticLine text="bad" value ={props.bad} />
                <StatisticLine text="all" value ={props.all} />
                <StatisticLine text="average" value ={props.average} />
                <StatisticLine text="positive" value ={`${props.positive}%`} />
            </table>
        </>
    )
}

const StatisticLine = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>

        </tr>
    )
}

const Button = (props) => {
    return (
        <>
            <button onClick={props.handleClick}>
                {props.text}
            </button>
        </>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [average, setAverage] = useState(0)
    const [positive, setPositive] = useState(0)

    const handleGoodClick = () => {
        console.log(good, neutral, bad, all)
        const updatedGood = good + 1
        const updatedAll = all + 1

        setGood(updatedGood)
        setAll(updatedAll)

        setAverage((updatedGood - bad) / updatedAll)
        setPositive(good / updatedAll * 100)
        console.log(good, neutral, bad, all)

    }

    const handleNeutralClick = () => {
        console.log(good, neutral, bad, all)

        const updatedNeutral = neutral + 1
        const updatedAll = all + 1

        setNeutral(updatedNeutral)
        setAll(updatedAll)

        setAverage((good - bad) / updatedAll)
        setPositive((good / updatedAll * 100))
        console.log(good, neutral, bad, all)

    }

    const handleBadClick = () => {
        console.log(good, neutral, bad, all)

        const updatedBad = bad + 1
        const updatedAll = all + 1

        setBad(updatedBad)
        setAll(updatedAll)

        setAverage((good - updatedBad) / updatedAll)
        setPositive(good / updatedAll * 100)
        console.log(good, neutral, bad, all)

    }

    return (
        <div>
            <h1> give feedback </h1>
            <Button handleClick={handleGoodClick} text="good"/>
            <Button handleClick={handleNeutralClick} text="neutral"/>
            <Button handleClick={handleBadClick} text="bad"/>

            <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
        </div>
    )
}

export default App