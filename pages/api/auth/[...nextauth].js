import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'

const providers= [
  Providers.Credentials({
    async authorize(credentials) {
      // Here call your API with data passed in the login form
      try {

      const user = await axios.post('http://localhost:8080/users/login',
        {

            password: credentials.password,
            email: credentials.email

        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        })
        console.log(user)
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null or false then the credentials will be rejected
          return null
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
          } catch (e) {
          const errorMessage = e.response.data.message
          // Redirecting to the login page with error message          in the URL
          throw new Error(errorMessage + '&email=' + credentials.email)
          }
      // if (token) {
      //   return token
      // } else {
      //   return null
      // }
    }
  })
]


const callbacks = {
  // Getting the JWT token from API response
  async jwt(token, user) {
    if (user) {
      token.accessToken = user.token
    }

    return token
  },

  async session(session, token) {
    session.accessToken = token.accessToken
    return session
  }
}

const options = {
  providers,
  callbacks,
  pages: {
    signIn: '/login',
    signIn: '/login',
    error: '/login',

  },
}

export default (req, res) => NextAuth(req, res, options)
