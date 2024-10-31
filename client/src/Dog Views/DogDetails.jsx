import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDogById } from "../Services/DogServices"

export const DogDetails = () => {
    const [dog, setDog] = useState({})
    const {dogId} = useParams()
    useEffect(() => {
        getDogById(parseInt(dogId)).then(res => {
            setDog(res)
        })
    }, [])

    return (
        <div>
            <div>
                <h3></h3>
            </div>
            <div id="dog-details">
                <h3>{dog.name}'s doggy details</h3>
                <h4>Walker: {dog.walker == null ? "no walker" : dog.walker?.name}</h4>
                <h4>City: {dog.city?.name}</h4>
            </div>

        </div>
    )
}