import { useEffect, useState } from "react"
import { getAllDogs } from "../Services/DogServices"
import { Navigate, useNavigate } from "react-router-dom"

export const AllDogs = () => {
    const [allDogs, setAllDogs] = useState([])
    const navigate = useNavigate()



    useEffect(() => {
        getAllDogs().then( res =>{
            setAllDogs(res)
        })
    }, [])

    const dogDetails = (event) => {
        const dogId = parseInt(event.target.dataset.id)
        navigate(`dogs/${dogId}`)
    }
    return(
        <div>
            <div>
                <h3>All Dogs</h3>
            </div>
            <ul>
                {allDogs.map( dog => {
                    return (
                    <li key={dog.id} className="  my-4 mx-4 rounded">
                        <h3 className="text-start" data-id={dog.id} onClick={dogDetails}>{dog.name}</h3>
                        
                    </li>
                )})}

            </ul>
        </div>
    )
}