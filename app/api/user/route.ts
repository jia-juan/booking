import { NextRequest, NextResponse } from 'next/server';
import UserController from './user.controller';
import { getServerSession } from 'next-auth';
import { nextauthOptions } from '@/app/libs/helpers/nextauth-options';

const studentsController = new UserController();

export async function GET(request: NextRequest) {
    const session = await getServerSession(nextauthOptions);
    
    const { searchParams } = new URL(request.url);
    const teacherId = parseInt(searchParams.get('teacherId') || '0', 10);
    const action = searchParams.get('action');

    const user = session?.user as { role?: string };
    if (user?.role !== 'TEACHER') {
        return NextResponse.error();
    }

    if (action === 'registered') {
        return studentsController.getRegisteredStudentsByTeacherId(teacherId);
    } else if (action === 'wish') {
        return studentsController.getStudentWishRegisterByTeacherId(teacherId);
    }

    return NextResponse.error();
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(nextauthOptions);
    
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const body = await request.json();

    if (action === 'wish') {
        const user = session?.user as { role?: string };
        if (user?.role !== 'STUDENT') {
            return NextResponse.error();
        }
        const { studentId, teacherId } = body;
        return studentsController.createStudentWishRegister(studentId, teacherId);
    } else if (action === 'review') {
        const user = session?.user as { role?: string };
        if (user?.role !== 'TEACHER') {
            return NextResponse.error();
        }
        const { teacherId, wishRegisterId, approve } = body;
        return studentsController.reviewStudentWishRegister(teacherId, wishRegisterId, approve);
    }

    return NextResponse.error();
}

export async function DELETE(request: NextRequest) {
    const session = await getServerSession(nextauthOptions);

    const user = session?.user as { role?: string };
    if (user?.role !== 'TEACHER') {
        return NextResponse.error();
    }

    const body = await request.json();
    const teacherId = body.teacherId;
    const studentId = body.studentId;

    // 只能刪除自己的學生
    const userId = session?.user?._id
    if (teacherId !== userId) {
        return NextResponse.error();
    }

    return studentsController.deleteRegisteredStudent(teacherId, studentId);
}
