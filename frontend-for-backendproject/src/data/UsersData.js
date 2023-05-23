import axios from "axios"

export const getUsersItems = async () => {
    const response = await axios.get('http://localhost:3030/users')
    return response.data
    // console.log(response.data)
}