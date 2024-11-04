import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { DeleteWalkerCity, getWalkerCityByWalkerId, postWalkerCity } from "../Services/walkerCityService"
import { getCities } from "../Services/cityServices"

export const AddWalkerCities = () => {
    const [walkerCities, setWalkerCities] = useState([])
    const [allCities, setAllCities] = useState([])
    const [citiesForm, setCitiesForm] = useState([])
    const {walkerId} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        getWalkerCityByWalkerId(walkerId).then(res => setWalkerCities(res))
        getCities().then(res => setAllCities(res))
        
    }, [])

    useEffect(() => {
        const form = 
        allCities.map(city => {
            const isSelected = walkerCities.some(wc => wc.cityId === city.id && wc.walkerId === parseInt(walkerId))
            return {id: city.id, name: city.name, selected: isSelected}
            })
        
        setCitiesForm(form)

    }, [allCities,walkerCities])

    const checkbox = (event) => {
        const id = event.target.value
        const copy = [...citiesForm]
        const formSelection = copy.find(city => city.id == parseInt(id))
        formSelection.selected = !formSelection.selected
        setCitiesForm(copy)

    }
    const handleSubmit = () => {
        const promises = citiesForm.reduce((list, f) => {
             
            if (f.selected && !walkerCities.some(wc => wc.cityId == f.id)) {
                const newWalkerCity = {
                    walkerId: parseInt(walkerId),
                    cityId: f.id
                }
                list.push(postWalkerCity({...newWalkerCity}))
            }else if (!f.selected && walkerCities.some(wc => wc.cityId == f.id)) {
                const deleteMatch = walkerCities.find(wc => f.id === wc.cityId)
                list.push(DeleteWalkerCity(deleteMatch.id))
            }
            return list
        }, [])

        if (promises != null) {
            Promise.all(promises).then(() => {
                navigate("/walkers")
            })
        }

    

            
    }

    return (
        <div>
            <form className="d-flex justify-content-around container my-4" >
                {citiesForm.map(city => {
                    return (
                        <label key={city.id} >
                            <input 
                                type="checkbox" 
                                value={city.id} 
                                checked={city?.selected || false}
                                onChange={checkbox}/>
                            {city.name}
                        </label>
                    )
                })}
            </form>
            <div>
                <button className="btn btn-primary" onClick={handleSubmit}>submit</button>
            </div>
        </div>
    )
}