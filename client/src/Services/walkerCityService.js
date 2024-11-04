export const getALLWalkerCity = () => {
    return fetch("/api/walkercity").then(res => res.json())
}

export const getWalkerCityByWalkerId = (walkerId) => {
    return fetch(`/api/walkercity?walkerId=${walkerId}`).then(res => res.json())
}

export const DeleteWalkerCity = (id) => {
    return fetch(`/api/walkercity/${id}`, {
        method: "DELETE"
    })
}

export const postWalkerCity = (walkerCity) => {
    return fetch("/api/walkercity", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(walkerCity)
    })
}