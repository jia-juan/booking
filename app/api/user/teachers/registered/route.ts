import { getServerSession } from "next-auth/next"
import { nextauthOptions } from "@/app/libs/helpers/nextauth-options"
import userController from '@/app/api/user/user.controller';

export async function GET(request: Request) {
    const session = await getServerSession(nextauthOptions);

    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const studentId = session.user._id;
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 0;
    const limit = Number(url.searchParams.get("limit")) || 5;

    return await userController.getTeacherHasRegistered(Number(studentId), page, limit);
}