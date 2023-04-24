import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import axios from "@/lib/axios";


//This is for getting the laravel-session cookie and the CSRF cookie 
//from any response of Sanctum or API Breeze
//In my case, the cookies returned are always two and I only need this, 
//so you can edit for get independent of position and cookies.
const getCookiesFromResponse = (res) => {
    let cookies = res.headers['set-cookie'][0].split(';')[0] + '; ' //Laravel session cookie
    cookies += res.headers['set-cookie'][1].split(';')[0] + '; '    // XSRF session cookie
    return cookies
}

//This is to get the X-XSRF-TOKEN from any response of Sanctum or API Breeze, 
//In my case, the token is always returned first, 
//so you can edit for get independent of position
const getXsrfTokenFromResponse = (res) => {
    return decodeURIComponent(res.headers['set-cookie'][0].split(';')[0].replace('XSRF-TOKEN=','')) // XSRF session cookie
}

//This method works to make any request to your Laravel API
//res_cookies are the cookies of the response of last request you do
//obviously res_cookies is null in your first request that is "/sanctum/csrf-cookie"
const makeRequest = async (method='get', url, dataForm = null, res_cookies ) => {
    const cookies = res_cookies != null ? getCookiesFromResponse(res_cookies) : null

    const res = await axios.request({
        method: method,
        url: url,
        data: dataForm,
        headers: {
            origin: process.env.NEXTAUTH_URL_INTERNAL, // this is your front-end URL, for example -> https://www.example.com
            Cookie: cookies, // set cookie manually on server
            "X-XSRF-TOKEN": res_cookies ? getXsrfTokenFromResponse(res_cookies) : null
        },
        withCredentials: true,
        credentials: true,
    })

    return res
}

const nextAuthOptions = (req, res) => {
    return {
        providers: [
            Credentials({
                // The name to display on the sign in form (e.g. 'Sign in with...')
                name: 'Sanctum',
                credentials: {
                    email: { label: "Email", type: "email", placeholder: "mail@gmail.com" },
                    password: {  label: "Password", type: "password" }
                },
                async authorize(credentials) {
                    let error = ""

                    try {
                        const csrf = await makeRequest('get','/sanctum/csrf-cookie', null, null)
                        const login = await makeRequest('post', '/login', credentials, csrf)
                        const user = await makeRequest('get','/api/user', null, login)
                        res.setHeader('Set-Cookie', user.headers['set-cookie'])

                        return user?.data
                    } catch (err){
                        const httpCode = err.response.status
                        error = err.response.data.message
                    }

                    if(error) throw new Error(encodeURI(error))
                    return null
                    // You can also Reject this callback with an Error or with a URL:
                    // throw new Error('error message') // Redirect to error page
                    // throw '/path/to/redirect'        // Redirect to a URL

                }
            })
        ],
        pages: {
          signIn: "/auth/login",
        },
        callbacks: {

            async jwt({token, user, account, profile, isNewUser}) {
                let response = {}
                if(user){
                    response.token = token
                    response.user = user
                } else response = token

                return response
            },

            async session({session, token}) {
                // Add property to session, like an access_token from a provider.
                session.accessToken = token.accessToken
                session.user = token.user
                session.error = token.error
                return session
            },
        },
    }
}

export default (req, res) => {
    return NextAuth(req, res, nextAuthOptions(req, res))
}