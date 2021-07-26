import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const providers = [
  Providers.GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET,
    scope: 'read:user gist',
  }),
]

const callbacks = {
  // eslint-disable-next-line no-unused-vars
  async jwt(token, user, account, profile, isNewUser) {
    if (account?.accessToken) {
      token.accessToken = account.accessToken
    }
    return token
  },
  async session(session, token) {
    session.accessToken = token.accessToken
    return session
  },
}

const options = {
  providers,
  callbacks
}

export default (req, res) => NextAuth(req, res, options)