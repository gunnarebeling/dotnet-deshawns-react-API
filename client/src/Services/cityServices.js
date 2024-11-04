export const getCities = () => {
    return fetch("/api/cities").then(res => res.json())
}

export const postCity = (city) => {
    return fetch("/api/cities", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(city)
    })
}