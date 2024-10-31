import { useEffect, useState } from "react"
import { getCities } from "../Services/cityServices"
import { getAllDogs, getDogById, postDog } from "../Services/DogServices"
import { useNavigate } from "react-router-dom"

export const AddDogForm = () => {
    const [dogobj, setDogObj] = useState({name: "", cityId: null, walkerId: null})
    const [cities, setCities] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getCities().then( res => setCities(res))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        let id;
        postDog(dogobj).then((res) => {
             id = res.id
            
        }).then(()=> {
            navigate(`/dogs/${id}`)
        })
    }
    return (
        <div>
            <div className="m-4" >
                <h3>Add Dog</h3>
            </div>
            <div>
                <form action="adddog" onSubmit={handleSubmit}>
                    <fieldset>
                        <div>
                            <label className="m-1" htmlFor="#">Name</label>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Dog Name"
                            value={dogobj.name || ""}
                            onChange={(event) => {
                                let copy = {...dogobj}
                                copy.name = event.target.value
                                setDogObj(copy)
                            }}
                            required/>
                    </fieldset>
                    <fieldset>
                        <div>
                            <label className="m-1" htmlFor="#">City</label>
                        </div>
                        <select 
                            id="city-options" 
                            name="city-options" 
                            placeholder="select a city"
                            value={dogobj.cityId || ""}
                            onChange={(event) => {
                                let copy = {...dogobj}
                                copy.cityId = event.target.value
                                setDogObj(copy)
                            }}
                            required>
                                <option value="">select an option</option>
                                {cities.map(city => {
                                    return (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    )
                                })}
                        </select>
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="btn btn-primary m-4 " >Submit</button>
                    </fieldset>

                </form>
            </div>
        </div>
    )
}