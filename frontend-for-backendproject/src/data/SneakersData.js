import axios from "axios"

export const getSneakersItems = async () => {
    const response = await axios.get('http://localhost:3030/sneakers')
    return response.data
    // console.log(response.data)
}