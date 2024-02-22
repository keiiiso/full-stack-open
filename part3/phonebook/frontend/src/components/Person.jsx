export const Person = (props) => {
    const person = props.person

    return (
        <li>
            {person.name} {person.number}
            <button onClick={props.onDelete}>delete</button>
        </li>
    )
}
