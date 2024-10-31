import { useEffect, useState } from "react"
import { deleteDog, getAllDogs } from "../Services/DogServices"
import { Navigate, useNavigate } from "react-router-dom"

export const AllDogs = () => {
    const [allDogs, setAllDogs] = useState([])
    const [deletedDog, setDeletedDog] = useState(false)
    const navigate = useNavigate()



    useEffect(() => {
        getAllDogs().then( res =>{
            setAllDogs(res)
        })
    }, [deletedDog])

    const dogDetails = (event) => {
        const dogId = parseInt(event.target.dataset.id)
        navigate(`dogs/${dogId}`)
    }
    const deleteClick = (event) => {
        const dogId = event.target.dataset.id
        deleteDog(parseInt(dogId)).then( () => {
            setDeletedDog(d => !d)
        })
    }
    const addDogClick = () => {
        navigate("adddog")
    }
    return(
        <div>
            <div>
                <h3>All Dogs</h3>
            </div>
            <ul>
                {allDogs.map( dog => {
                    return (
                    <li key={dog.id} className="  my-4 mx-4 d-flex justify-content-between border rounded p-3">
                        <h3 className="text-start" data-id={dog.id} onClick={dogDetails}>{dog.name}</h3>
                        <button className="btn btn-warning" data-id={dog.id}  onClick={deleteClick} >Remove</button>
                    </li>
                )})}

            </ul>
            <div>
                <button className="btn btn-primary" onClick={addDogClick} >Add Dog</button>
            </div>
        </div>
    )
}