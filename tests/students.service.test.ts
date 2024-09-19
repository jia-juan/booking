import { PrismaClient, User, RegisteredStudent } from '@prisma/client';
import StudentsService from '@/app/api/students/students.service';

const prisma = new PrismaClient();
const studentsService = new StudentsService();

describe('StudentsService', () => {
    let teacher: User;
    let student: User;
    let registeredStudent: RegisteredStudent;

    beforeAll(async () => {
        // 開始一個新的事務
        await prisma.$transaction(async (tx) => {
            // 創建一個教師
            teacher = await tx.user.create({
                data: {
                    role: 'TEACHER',
                    name: 'Test Teacher',
                    email: 'teacher@example.com',
                },
            });

            // 創建一個學生
            student = await tx.user.create({
                data: {
                    role: 'STUDENT',
                    name: 'Test Student',
                    email: 'student@example.com',
                },
            });
        });
    });

    afterAll(async () => {
        // 回滾事務，清除測試資料
        await prisma.$transaction(async (tx) => {
            await tx.registeredStudent.deleteMany();
            await tx.user.deleteMany();
        });

        await prisma.$disconnect();
    });

    beforeEach(async () => {
        // 清理相關的資料庫表
        await prisma.studentWishRegister.deleteMany({});
        await prisma.registeredStudent.deleteMany({});
    });

    afterEach(async () => {
        // 清理相關的資料庫表
        await prisma.studentWishRegister.deleteMany({});
        await prisma.registeredStudent.deleteMany({});
    });

    it('should return registered students by teacherId', async () => {
        const wishRegister = await studentsService.createStudentWishRegister(student.id, teacher.id);
        await studentsService.reviewStudentWishRegister(teacher.id, wishRegister.id, true);
        const students = await studentsService.getRegisteredStudentsByTeacherId(teacher.id);
        console.log('Registered Students:', students);

        expect(students).toHaveLength(1);
        expect(students[0].id).toBe(student.id);
    });

    it('should create a StudentWishRegister', async () => {
        const newWishRegister = await studentsService.createStudentWishRegister(student.id, teacher.id);
        expect(newWishRegister).toBeDefined();
        expect(newWishRegister.status).toBe('PENDING');
    });

    it('should not create a StudentWishRegister if one already exists', async () => {
        await studentsService.createStudentWishRegister(student.id, teacher.id);
        await expect(studentsService.createStudentWishRegister(student.id, teacher.id)).rejects.toThrow('已經有PENDING的StudentWishRegister或RegisteredStudent');
    });

    it('should review and approve a StudentWishRegister', async () => {
        const wishRegister = await studentsService.createStudentWishRegister(student.id, teacher.id);
        await studentsService.reviewStudentWishRegister(teacher.id, wishRegister.id, true);

        const registeredStudents = await studentsService.getRegisteredStudentsByTeacherId(teacher.id);
        expect(registeredStudents).toHaveLength(1);
        expect(registeredStudents[0].id).toBe(student.id);

        const updatedWishRegister = await prisma.studentWishRegister.findUnique({ where: { id: wishRegister.id } });
        expect(updatedWishRegister?.status).toBe('CONFIRMED');
    });

    it('should review and reject a StudentWishRegister', async () => {
        const wishRegister = await studentsService.createStudentWishRegister(student.id, teacher.id);
        await studentsService.reviewStudentWishRegister(teacher.id, wishRegister.id, false);

        const updatedWishRegister = await prisma.studentWishRegister.findUnique({ where: { id: wishRegister.id } });
        expect(updatedWishRegister?.status).toBe('REJECTED');
    });

    it('should delete a RegisteredStudent', async () => {
        const wishRegister = await studentsService.createStudentWishRegister(student.id, teacher.id);
        await studentsService.reviewStudentWishRegister(teacher.id, wishRegister.id, true);

        await studentsService.deleteRegisteredStudent(teacher.id, student.id);

        const registeredStudents = await studentsService.getRegisteredStudentsByTeacherId(teacher.id);
        expect(registeredStudents).toHaveLength(0);
    });

    it('should get student wish register by teacherId', async () => {
        const wishRegister = await studentsService.createStudentWishRegister(student.id, teacher.id);
        const result = await studentsService.getStudentWishRegisterByTeacherId(teacher.id);

        // 驗證結果
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(student);
    });
});
