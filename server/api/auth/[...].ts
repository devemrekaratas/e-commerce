import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'

const users = [
  {name:'John Doe', email:'john@doe.com', password:'12345'}
]
export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || '12345',
  providers: [
    // @ts-expect-error
    CredentialsProvider.default({
      name: 'Credentials',
      async authorize (credentials: any) {
        const user = users.find(
          (u) => 
            u.email === credentials.email && u.password === credentials.password
        )
        if(user) return user
      }
    })
  ],
  pages:{
    "signIn" : "/auth/login"
  }
})