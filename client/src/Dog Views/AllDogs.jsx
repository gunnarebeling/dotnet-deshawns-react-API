import { useEffect, useState } from "react"
import { getAllDogs } from "../Services/DogServices"

export const AllDogs = () => {
    const [allDogs, setAllDogs] = useState([])

    useEffect(() => {
        getAllDogs().then( res =>{
            setAllDogs(res)
        })
    }, [])
    return(
        <div>
            <div>
                <h3>All Dogs</h3>
            </div>
            <ul>
                {allDogs.map( dog => {
                    return (
                    <li key={dog.id} className="  my-4 mx-4 rounded">
                        <h3 className="text-start">{dog.name}</h3>
                        
                    </li>
                )})}

            </ul>
        </div>
    )
}