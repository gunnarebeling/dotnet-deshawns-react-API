import { useEffect, useState } from "react"
import { DeleteWalker, getAllWalkers } from "../Services/walkersServices"
import { getCities } from "../Services/cityServices"
import { getALLWalkerCity } from "../Services/walkerCityService"
import { useNavigate } from "react-router-dom"

export const AllWalkers = () => {
    const [allWalkers, setAllWalkers] = useState([])
    const [allCities, setAllCities] = useState([])
    const [selectedCity, setSelectedCity] = useState(0)
    const [walkerCity, setWalkerCity] = useState([])
    const [filteredWalkers, setFilteredWalkers] = useState([])
    const [deletedWalker, setDeletedWalker] =useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        getAllWalkers().then(res => {
            setAllWalkers(res)
        })
        getCities().then(res => setAllCities(res))
        getALLWalkerCity().then(res => setWalkerCity(res))
    }, [deletedWalker])

    useEffect(() => {
        let cityWalker = []
        if (selectedCity) {
            walkerCity.forEach(wc => {
                if (wc.cityId == selectedCity) {
                    cityWalker.push(wc.walker)
                }
            }) 
        }else if (!selectedCity) {
            cityWalker = [...allWalkers]
        }
        setFilteredWalkers(cityWalker)
    }, [selectedCity, allWalkers])

    const handleDelete = (event) => {
        const id = event.target.dataset.id
        DeleteWalker(parseInt(id)).then(() => {
            setDeletedWalker(res => !res)
        })
    }

    const handleAddDog = (event) => {
        const id = event.target.dataset.id
        navigate(`/walkers/${id}/dogchoice`)
    }
    return (
        <div>
            <div className="m-4" >
                <h3>Walkers</h3>
            </div>
            <div className="m-2" >
                <label htmlFor="">city: </label>
                <select 
                name="city" 
                id="city-dropdown"
                value={selectedCity}
                onChange={(e) => {
                    const id = e.target.value
                    setSelectedCity(id)
                }}
                >
                    <option value="">all</option>
                    {allCities.map(city => {
                        return (
                            <option key={city.id} value={city.id}>{city.name}</option>
                        )
                    })}

                </select>
            </div>
            <div id="walker-list" >
                {filteredWalkers.map(walker => {

                    return (
                    <div key={walker.id} className="d-flex border justify-content-between align-items-center rounded mx-5 my-3">
                        <h4 className="m-3">{walker.name}</h4>
                        <div className="m-3">
                            <button className="btn btn-primary" data-id={walker.id} onClick={handleAddDog} >Add Dog</button>
                            <button data-id={walker.id} className="btn btn-warning" onClick={handleDelete} >Remove</button>
                        </div>
                    </div>
                    )
                })}

            </div>
        </div>
    )
}