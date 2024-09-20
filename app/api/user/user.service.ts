import prisma from "@/app/libs/helpers/prisma";

class UserService {
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

    async createStudentWishRegister(studentId: number, teacherId: number) {
        // 學員申請老師
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

    
    async getTeacherHasWishRegister(studentId: number) {
        // 學員取得自己已申請的老師，且狀態為PENDING
        const teachers = await prisma.studentWishRegister.findMany({
            where: {
                studentId,
                status: 'PENDING'
            },
            include: {  
                teacher: true
            }
        });
        
        return teachers.map(t => t.teacher);

    }

    async getTeacherHasRegistered(studentId: number) {
        // 學員取得自己已註冊的老師
        const teachers = await prisma.registeredStudent.findMany({
            where: {
                studentId
            },
            include: {
                teacher: true
            }
        });

        return teachers.map(t => t.teacher);
    }

    async getAllTeachersPagination(studentId: number, page: number, limit: number) {
        // 學員取得所有老師（老師或管理者）
        const offset = page * limit;
        const teachers = await prisma.user.findMany({
            where: {
                role: {
                    in: ['TEACHER', 'ADMIN']
                }
            },
            skip: offset,
            take: limit,
            orderBy: {
                id: 'asc'
            }
        });

        const total = await prisma.user.count({
            where: {
                role: {
                    in: ['TEACHER', 'ADMIN']
                }
            }
        });
        // 取得學員申請中的老師進行標記
        const wishRegisterTeachers = await this.getTeacherHasWishRegister(studentId);

        // 取得學員已註冊的老師進行標記
        const registeredTeachers = await this.getTeacherHasRegistered(studentId);

        const teachersWithRegisterStatus = teachers.map(teacher => ({
            ...teacher,
            registered: wishRegisterTeachers.some(wt => wt.id === teacher.id) || registeredTeachers.some(rt => rt.id === teacher.id)
        }));

        return { teachers: teachersWithRegisterStatus, total };
    }

    async getTeacherHasRegisteredPagination(studentId: number, page: number, limit: number) {
        // 學員取得自己已註冊的老師
        const offset = page * limit;
        const registeredTeachers = await prisma.registeredStudent.findMany({
            where: {
                studentId
            },
            skip: offset,
            take: limit,
            include: {
                teacher: true
            },
            orderBy: {
                id: 'asc'
            }
        }); 

        const total = await prisma.registeredStudent.count({
            where: {
                studentId
            }
        });

        return { registeredTeachers, total };
    }
}

export default UserService;
