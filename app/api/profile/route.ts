import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { nextauthOptions } from '@/app/libs/helpers/nextauth-options';
import prisma from '@/app/libs/helpers/prisma';

export async function GET(req: NextRequest) {
    const session = await getServerSession(nextauthOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user?.email as string
        }
    })

    return NextResponse.json({ user })
}
