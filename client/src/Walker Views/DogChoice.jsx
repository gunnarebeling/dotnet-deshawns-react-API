import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getWalkerCityByWalkerId } from "../Services/walkerCityService"
import { getAllDogs, updateDog } from "../Services/DogServices"

export const DogChoice = () => {
    const [walkerCities, setWalkerCities] = useState([])
    const [availableDogs, setAvailableDogs] = useState([])
    const {walkerId} = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        getWalkerCityByWalkerId(walkerId).then(res => setWalkerCities(res))
    }, [])

    useEffect(() => {
        getAllDogs().then(dogs => {
            const filtereddogs = dogs.filter(dog => walkerCities.some(wc => wc.cityId == dog.cityId && dog.walkerId == null))
            
            setAvailableDogs(filtereddogs)
        })
    }, [walkerCities])
    
    const handleSelectedDog = (event) => {
        event.preventDefault()
        const id = event.target.dataset.id
        const selectedDog = availableDogs.find(dog => dog.id === parseInt(id))
        selectedDog.walkerId = parseInt(walkerId)
        updateDog(id, selectedDog).then(() => {
            navigate(`/dogs/${id}`)
        })


    }


    return (
        <div>
            <div>
                <h3>choose  dog</h3>
            </div>
            <div>
                {availableDogs.map(dog => {
                    return (
                        <div key={dog.id}>
                            <h4 data-id={dog.id} onClick={handleSelectedDog} >{dog.name}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}