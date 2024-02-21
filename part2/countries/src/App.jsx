import {useState, useEffect} from 'react'
import axios from 'axios'
import {Countries} from '../components/Countries.jsx'

const App = () => {
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [query, setQuery] = useState('')

    const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase())) || countries

    useEffect(() => {
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleQuery = (event) => {
        setQuery(event.target.value)
        setSelectedCountry(null)
    }

    return (
        <div>
            find countries: <input value={query} onChange={handleQuery}/>
            <Countries countries={countriesToShow}
                       selectedCountry={selectedCountry}
                       setSelectedCountry={setSelectedCountry}/>
        </div>
    )
}

export default App