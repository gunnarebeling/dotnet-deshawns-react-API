import { useEffect, useState } from "react"
import { getCities, postCity } from "../Services/cityServices"

export const Cities = () => {
    const [cities, setCities] = useState([])
    const [newCity, setNewCity] = useState("")
    const [cityChange, setCityChange] = useState(false)

    useEffect(()=> {
        getCities().then(res => {
            setCities(res)
        })
    }, [cityChange])

    const handleAddCity = (event) => {
        const obj = {name: newCity}
        postCity(obj).then(res => {
            setCityChange(p => !p)
        })
    }
    return (
        <div>
            <h2>Cities</h2>
            {cities.map(city => {
                return (
                    <div className="m-3">
                        <h5>{city.name}</h5>
                    </div>
                )
            })}
            <div>
                <input 
                type="text"
                placeholder="enter new city"
                value={newCity}
                onChange={(event)=> {
                    let copy = newCity
                    copy = event.target.value
                    setNewCity(copy)
                }} />
                <button className="btn btn-primary" onClick={handleAddCity}>add city</button>
            </div>
        </div>
    )
} 