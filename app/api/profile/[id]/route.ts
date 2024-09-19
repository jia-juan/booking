import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { nextauthOptions } from '@/app/libs/helpers/nextauth-options';
import prisma from '@/app/libs/helpers/prisma';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(nextauthOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // TODO: 檢查 session 的 user id 是否等於 params.id，確保改自己的資料
    // if (params.id !== session.user?.id) {
    //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    const { name, email, phone, birthday, lineId, facebook, instagram, notifyBooking, notifyEvent, notifyHow } = await req.json();

    try {
        await prisma.user.update({
            where: {
                email: session.user?.email as string
            },
            data: {
                name, email, phone, birthday, lineId, facebook, instagram, notifyBooking, notifyEvent, notifyHow
            }
        })
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 40 });
    }

    return NextResponse.json({ message: 'User data updated successfully' }, { status: 200 });
}