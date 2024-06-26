import styles from './CityList.module.css'

import Spinner from '../components/Spinner'
import CityItem from '../components/CityItem'
import Message from '../components/Message'
import { useCities } from '../context/CitiesContext'

function CityList() {
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

    return (
        <ul className={styles.cityList}>
            {cities.map((city) => <CityItem city={city} key={city.id} />)}
        </ul>
    )
}


export default CityList
