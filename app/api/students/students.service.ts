import prisma from "@/app/libs/helpers/prisma";

class StudentsService {
    private readonly prisma = prisma;

    constructor() {
        this.prisma = prisma;
    }

    async getRegisteredStudentsByTeacherId(teacherId: number) {
        const registeredStudents = await this.prisma.registeredStudent.findMany({
            where: { teacherId },
            include: { student: true }
        });

        return registeredStudents.map(rs => rs.student);
    }

    async getStudentWishRegisterByTeacherId(teacherId: number) {
        const wishRegisters = await this.prisma.studentWishRegister.findMany({
            where: { teacherId, status: 'PENDING' },
            include: { student: true }
        });

        return wishRegisters.map(rs => rs.student);
    }

    async createStudentWishRegister(studentId: number, teacherId: number) {
        // 檢查是否已經有PENDING的StudentWishRegister或RegisteredStudent
        const existingWishRegister = await prisma.studentWishRegister.findFirst({
            where: {
                studentId,
                teacherId,
                status: 'PENDING'
            }
        });

        const existingRegisteredStudent = await prisma.registeredStudent.findFirst({
            where: {
                studentId,
                teacherId
            }
        });

        if (existingWishRegister || existingRegisteredStudent) {
            throw new Error('已經有PENDING的StudentWishRegister或RegisteredStudent');
        }

        // 創建新的StudentWishRegister
        return await prisma.studentWishRegister.create({
            data: {
                studentId,
                teacherId,
                status: 'PENDING'
            }
        });
    }

    async reviewStudentWishRegister(teacherId: number, wishRegisterId: number, approve: boolean) {
        // 找到對應的StudentWishRegister
        const wishRegister = await prisma.studentWishRegister.findFirst({
            where: {
                id: wishRegisterId,
                teacherId,
                status: 'PENDING'
            }
        });

        if (!wishRegister) {
            throw new Error('找不到對應的StudentWishRegister');
        }

        if (approve) {
            // 審核通過，新增RegisteredStudent
            await prisma.registeredStudent.create({
                data: {
                    studentId: wishRegister.studentId,
                    teacherId: wishRegister.teacherId
                }
            });

            // 更新StudentWishRegister狀態為CONFIRMED
            await prisma.studentWishRegister.update({
                where: { id: wishRegisterId },
                data: { status: 'CONFIRMED' }
            });
        } else {
            // 審核拒絕，更新StudentWishRegister狀態為REJECTED
            await prisma.studentWishRegister.update({
                where: { id: wishRegisterId },
                data: { status: 'REJECTED' }
            });
        }
    }

    async deleteRegisteredStudent(teacherId: number, studentId: number) {
        // 刪除RegisteredStudent
        const deletedStudent = await prisma.registeredStudent.deleteMany({
            where: {
                teacherId,
                studentId
            }
        });

        if (deletedStudent.count === 0) {
            throw new Error('找不到對應的RegisteredStudent');
        }
    }

    
}

export default StudentsService;
