import styles from './CountryList.module.css'

import Spinner from './Spinner'
import Message from './Message'
import CountryItem from './CountryItem'
import { useCities } from '../context/CitiesContext'

function CountryList() {
    // retrieve values from context
    const {cities, isLoading} = useCities()

    // check if the data is loading
    if(isLoading) {
        return <Spinner />
    }

    // check if there are no cities
    if(!cities.length) {
        return (
            <Message message='Add your first city by clicking on a city on the map' />
        )
    }

    // get countries from cities prop
    const countries = cities.reduce((arr, city) => {
        if(!arr.map(el => el.country).includes(city.country)) {
            return [...arr, {country: city.country, emoji: city.emoji}]
        } else {
            return arr
        }
    }, [])

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => 
                <CountryItem country={country} key={country.country} />
            )}
        </ul>
    )
}


export default CountryList
