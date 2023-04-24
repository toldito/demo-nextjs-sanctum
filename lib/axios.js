import Axios from "axios";

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        origin: process.env.NEXTAUTH_URL_INTERNAL,
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true
})

export default axios;