import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'

const providers= [
  Providers.Credentials({

    pages: {
      signIn: '/login',

    },
    async authorize(credentials) {
      // Here call your API with data passed in the login form
      console.log(credentials);

      axios.post('localhost:8080/users/signup', {
          email: credentials.email,
          password: credentials.password
        })
        .then(function (response) {
          console.log(res.json(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
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
  callbacks
}

export default (req, res) => NextAuth(req, res, options)
