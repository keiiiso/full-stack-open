const Course = (props) => {
    console.log(props)
    return (
        <>
            <Header text={props.course.name}/>
            <Content parts={props.course.parts}/>
            <Total parts={props.course.parts}/>
        </>
    )
}

const Header = (props) => {
    console.log(props)
    return (
        <h2> {props.text} </h2>
    )
}

const Content = (props) => {
    console.log(props)

    return (
        <>
            {props.parts.map(part =>
                <Part key={part.id} part={part}/>
            )}
        </>
    )
}

const Total = (props) => {
    /*let total = 0
    props.parts.map(part => {
            total += part.exercises
        }
    )*/

    const total = props.parts.reduce((sum, part) =>
        sum + part.exercises, 0
    )

    return (
        <>
            <h4> total of {total} exercise(s) </h4>
        </>
    )
}

const Part = (props) => {
    console.log(props)

    return (
        <>
            <p>{props.part.name} {props.part.exercises}</p>
        </>
    )
}

export default Course