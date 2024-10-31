export const getAllDogs = () => {
    return fetch("/api/dogs").then(res => res.json())
}

export const getDogById = (id) => {
    return fetch(`/api/dogs/${id}`).then(res => res.json())
}
export const deleteDog = (id) => {
    return fetch(`api/dogs/${id}`, {
        method: "DELETE"
    })
}

export const postDog = (dog) => {
    return fetch("api/dogs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dog)
    }).then(res => res.json())
}