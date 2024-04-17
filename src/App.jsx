import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Homepage from './pages/Homepage'
import AppLayout from './pages/AppLayout'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import { CitiesProvider } from './context/CitiesContext'


function App() {
    return (
        <CitiesProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage />} />
                    <Route path='product' element={<Product />} />
                    <Route path='pricing' element={<Pricing />} />
                    <Route path='login' element={<Login />} />

                    {/* App Route with Subroutes */}
                    <Route path='app' element={<AppLayout />}>
                        {/* Default Route */}
                        <Route index element={
                            <Navigate replace to='cities' />
                        } />

                        {/* Cities Route */}
                        <Route path='cities' element={
                            <CityList />
                        } />

                        {/* Inidividual City Route */}
                        <Route path='cities/:id' element={<City />} />

                        {/* Countries Route */}
                        <Route path='countries' element={
                            <CountryList />
                        } />

                        {/* Form Route */}
                        <Route path='form' element={<Form />} />
                    </Route>

                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </CitiesProvider>
    )
}

export default App
