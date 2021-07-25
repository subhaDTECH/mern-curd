import axios from "axios"

const instance=axios.create({
    baseURL:"https://curd-app111.herokuapp.com"
})

export default instance;