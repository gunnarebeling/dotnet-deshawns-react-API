export const getALLWalkerCity = () => {
    return fetch("/api/walkercity").then(res => res.json())
}

export const getWalkerCityByWalkerId = (walkerId) => {
    return fetch(`/api/walkercity?walkerId=${walkerId}`).then(res => res.json())
}