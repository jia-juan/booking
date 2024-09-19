"use server"
import { Account, Profile } from "next-auth"
import { getServerSession } from "next-auth/next";
import { nextauthOptions } from "@/app/libs/helpers/nextauth-options";
import prisma from "@/app/libs/helpers/prisma";
import bcrypt from "bcrypt";

export const getServerAuthSession = async () => {
    return await getServerSession(nextauthOptions)
};

interface ExtendedProfile extends Profile {
    picture?: string
}

interface LoginWithOauthParams {
    account: Account,
    profile: ExtendedProfile
}

export async function loginWithOauth({ account, profile }: LoginWithOauthParams) {
    // 防止 Google Oauth 重複創建帳號
    const user = await prisma.user.findUnique({
        where: {
            email: profile.email
        }
    })

    if (user) {
        return true
    }

    await prisma.user.create({
        data: {
            email: profile.email!,
            name: profile.name,
            image: profile.image,
            provider: account.provider,
        }
    })

    return true
}

interface GetUserByEmailParams {
    email: string
}

export async function getUserByEmail({ email }: GetUserByEmailParams) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        throw new Error("User not found")
    }

    return { ...user, _id: user.id.toString() }
}

export interface RegisterWithCredentialsParams {
    name: string
    email: string
    password: string
}

export async function registerWithCredentials({ name, email, password }: RegisterWithCredentialsParams) {
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (user) {
        throw new Error("帳號已存在")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return true
}

interface LoginWithCredentialsParams {
    email: string
    password: string
}

export async function loginWithCredentials({ email, password }: LoginWithCredentialsParams) {
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        throw new Error("帳號不存在")
    }

    const passwordIsValid = await bcrypt.compare(password, user.password || '')
    if (!passwordIsValid) {
        throw new Error("密碼錯誤")
    }

    return { ...user, _id: user.id.toString() }
}