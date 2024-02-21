import {Weather} from './Weather.jsx'

export const Countries = ({countries, selectedCountry, setSelectedCountry}) => {

    const handleShowCountry = (country) => {
        setSelectedCountry(country)
    }

    if (countries.length === 0 || !countries) {
        return <p>No matches, specify another filter</p>
    }

    if (selectedCountry || countries.length === 1) {

        const country = selectedCountry || countries[0]

        return (
            <>
                <h1>{country.name.common}</h1>

                <p>capital: {country.capital}</p>
                <p>area: {country.area}</p>

                <h2>languages:</h2>
                <ul>
                    {Object.entries(country.languages).map(([code, language]) =>
                        <li key={code}>{language}</li>
                    )}
                </ul>

                <Weather country={selectedCountry || countries[0]}/>
            </>
        )
    }

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    return (
        <ul>
            {countries.map(country =>
                <li key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => handleShowCountry(country)}>show</button>
                </li>
            )}
        </ul>
    )

}
