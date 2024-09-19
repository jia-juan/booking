import { NextResponse } from 'next/server';
import StudentsService from "./students.service";

class StudentsController {
    private readonly studentsService = new StudentsService();

    async getRegisteredStudentsByTeacherId(teacherId: number) {
        try {
            const students = await this.studentsService.getRegisteredStudentsByTeacherId(teacherId);
            return NextResponse.json(students);
        } catch (error) {
            return NextResponse.error();
        }
    }

    async getStudentWishRegisterByTeacherId(teacherId: number) {
        try {
            const wishRegisters = await this.studentsService.getStudentWishRegisterByTeacherId(teacherId);
            return NextResponse.json(wishRegisters);
        } catch (error) {
            return NextResponse.error();
        }
    }

    async createStudentWishRegister(studentId: number, teacherId: number) {
        try {
            const newWishRegister = await this.studentsService.createStudentWishRegister(studentId, teacherId);
            return NextResponse.json(newWishRegister);
        } catch (error) {
            return NextResponse.error();
        }
    }

    async reviewStudentWishRegister(teacherId: number, wishRegisterId: number, approve: boolean) {
        try {
            await this.studentsService.reviewStudentWishRegister(teacherId, wishRegisterId, approve);
            return NextResponse.json({ message: '審核完成' });
        } catch (error) {
            return NextResponse.error();
        }
    }

    async deleteRegisteredStudent(teacherId: number, studentId: number) {
        try {
            await this.studentsService.deleteRegisteredStudent(teacherId, studentId);
            return NextResponse.json({ message: '刪除成功' });
        } catch (error) {
            return NextResponse.error();
        }
    }
}

export default StudentsController;