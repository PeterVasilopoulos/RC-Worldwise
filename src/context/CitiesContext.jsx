import { createContext, useState, useEffect } from "react";

// city information url
const BASE_URL = 'http://localhost:9000' 

// context variable
const CitiesContext = createContext()

// component
function CitiesProvider({children}) {
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(function() {
        async function fetchCities() {
            try {
                setIsLoading(true)
                const res = await fetch(`${BASE_URL}/cities`)
                const data = await res.json()
                setCities(data)
            } catch {
                alert('Error loading data...')
            } finally {
                setIsLoading(false)
            }
        }

        fetchCities()
    }, [])

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading
        }}>
            {children}
        </CitiesContext.Provider>
    )
}

export {CitiesProvider}