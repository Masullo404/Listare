import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import prisma from "@/db/database"

declare module "next-auth"{
    interface Session{
      user: {
        id: number; 
        name?: string | null;
        email?: string | null;
        image?: string | null;
      };
    }
  }

const options:NextAuthOptions = {
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        })
    ],
    session:{
        strategy:"jwt",
        maxAge: 60 * 60
    },
    jwt:{
        secret:process.env.JWT_SECRET
    },
    callbacks:{
        async signIn({user,account}){
            const verifyUser = await prisma.user.findUnique({
                where:{
                    oauth_id_oauth_provider:{
                        oauth_id:String(account?.providerAccountId),
                        oauth_provider:String(account?.provider)
                    }
                }
            })
            if(!verifyUser){
                 await prisma.user.create({
                    data:{
                        email:String(user.email),
                        name:user.name || 'Default user',
                        description:"My description",
                        oauth_id:String(account?.providerAccountId),
                        oauth_provider:String(account?.provider),
                        img:user.image
                    }  
                 })
                 return true                
            }
            if(account?.provider !== verifyUser.oauth_provider || account.providerAccountId !== verifyUser.oauth_id){
                return false
            }
            return true
        },
        async jwt({ token, user }) {
            if (user) {
              token.id = user.id;
              token.email = user.email;
              token.name = user.name;
            } 
            return token;
        },
        async session({ session, token }) {
            if (token && session.user){
                session.user.id = Number(token.id);
                session.user.email = token.email;
            }
            return session;
        },
        async redirect({baseUrl}) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            return `${baseUrl}/dashboard`
        }
    }
}

export default options