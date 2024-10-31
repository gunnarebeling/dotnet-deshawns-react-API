export const getALLWalkerCity = () => {
    return fetch("api/walkercity").then(res => res.json())
}