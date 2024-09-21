import { NextResponse } from "next/server";
import UserController from "@/app/api/user/user.controller";
import { getServerSession } from 'next-auth';
import { nextauthOptions } from "@/app/libs/helpers/nextauth-options"


export async function GET(request: Request) {
    const session = await getServerSession(nextauthOptions);

    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user._id;
    return await UserController.getCourseSettings(Number(userId));
}

export async function POST(request: Request) {
    const session = await getServerSession(nextauthOptions);

    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user._id;
    const { takeTime, maxStudent } = await request.json();

    return await UserController.updateCourseSettings(Number(userId), takeTime, maxStudent);
}
