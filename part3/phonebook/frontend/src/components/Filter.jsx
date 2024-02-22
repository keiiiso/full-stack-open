export const Filter = (props) => {
    return (
        <div>
            filter shown with <input value={props.query} onChange={props.onChange}/>
        </div>
    )
}
