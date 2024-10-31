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