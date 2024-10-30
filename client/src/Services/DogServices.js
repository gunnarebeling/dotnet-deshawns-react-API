export const getAllDogs = () => {
    return fetch("/api/dogs").then(res => res.json())
}