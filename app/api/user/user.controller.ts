import { NextResponse } from 'next/server';
import UserService from "./user.service";

class UserController {
    private readonly userService = new UserService();

    async getRegisteredStudentsByTeacherId(teacherId: number) {
        // 老師取得已註冊學員
        try {
            const students = await this.userService.getRegisteredStudentsByTeacherId(teacherId);
            return NextResponse.json(students);
        } catch (error) {
            return NextResponse.error();
        }
    }

    async getStudentWishRegisterByTeacherId(teacherId: number) {
        // 老師取得學員申請
        try {
            const wishRegisters = await this.userService.getStudentWishRegisterByTeacherId(teacherId);
            return NextResponse.json(wishRegisters);
        } catch (error) {
            return NextResponse.error();
        }
    }

    async reviewStudentWishRegister(teacherId: number, wishRegisterId: number) {
        // 老師審核學員申請
        try {
            await this.userService.reviewStudentWishRegister(teacherId, wishRegisterId);
            return NextResponse.json({ message: '審核完成' });
        } catch (error) {
            return NextResponse.error();
        }
    }
    
    async deleteRegisteredStudent(teacherId: number, studentId: number) {
        // 老師刪除已註冊學員
        try {
            await this.userService.deleteRegisteredStudent(teacherId, studentId);
            return NextResponse.json({ message: '刪除成功' });
        } catch (error) {
            return NextResponse.error();
        }
    }
    
    async createStudentWishRegister(studentId: number, teacherId: number) {
        // 學員申請老師
        try {
            const newWishRegister = await this.userService.createStudentWishRegister(studentId, teacherId);
            return NextResponse.json(newWishRegister);
        } catch (error) {
            return NextResponse.json({ message: (error as Error).message }, { status: 400 });
        }
    }

    async getAllTeachers(studentId: number, page: number, limit: number) {
        // 學員取得所有老師（老師或管理者）
        try {
            const { teachers, total } = await this.userService.getAllTeachersPagination(studentId, page, limit);
            return NextResponse.json({ teachers, total });
        } catch (error) {
            return NextResponse.error();
        }
    }

    
    async getTeacherHasRegistered(studentId: number, page: number, limit: number) {
        // 學員取得自己已註冊的老師
        try {
            const { teachers, total } = await this.userService.getTeacherHasRegisteredPagination(studentId, page, limit);
            return NextResponse.json({ teachers, total });
        } catch (error) {
            return NextResponse.error();
        }
    }

    async getStudentHasRegistered(teacherId: number, page: number, limit: number) {
        // 老師取得所有註冊學員
        try {
            const { students, total } = await this.userService.getStudentHasRegisteredPagination(teacherId, page, limit);
            return NextResponse.json({ students, total });
        } catch (error) {
            return NextResponse.error();
        }
    }

    async getStudentHasWishRegister(teacherId: number, page: number, limit: number) {
        // 老師取得所有申請學員（未審核）
        try {
            const { students, total } = await this.userService.getStudentHasWishRegisterPagination(teacherId, page, limit);
            return NextResponse.json({ students, total });
        } catch (error) {
            return NextResponse.error();
        }
    }

    async getCourseSettings(userId: number) {
        try {
            const courseSettings = await this.userService.getCourseSettings(userId);
            return NextResponse.json(courseSettings);
        } catch (error) {
            return NextResponse.error();
        }
    }

    async updateCourseSettings(userId: number, takeTime: number | null, maxStudent: number) {
        try {
            await this.userService.updateCourseSettings(userId, takeTime, maxStudent);
            return NextResponse.json({ message: '更新成功' });
        } catch (error) {
            return NextResponse.json({ message: (error as Error).message }, { status: 400 });
        }
    }
    

}

export default new UserController();