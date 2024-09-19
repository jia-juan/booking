import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/helpers/prisma';
import bcrypt from "bcrypt"

export async function POST(req: NextRequest) {
    const { name, email, password, passwordConfirm } = await req.json();

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (user) {
            return NextResponse.json({ message: '使用者已存在' }, { status: 400 })
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

        return NextResponse.json({ message: '註冊成功' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}