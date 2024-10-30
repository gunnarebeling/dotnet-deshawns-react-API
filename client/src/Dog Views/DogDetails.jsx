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
            <h3>Name: {dog.name}</h3>
            <h3>Walker: {dog.walker == null ? "no walker" : dog.walker?.name}</h3>
            <h3>City: {dog.city?.name}</h3>

        </div>
    )
}