import prisma from "@/app/libs/helpers/prisma";

export interface User {
    id: number;
}

export class EventService {
    private readonly prisma = prisma;

    constructor() {
        this.prisma = prisma;
    }

    async createEvent(teacherId: number, startAt: Date, endAt: Date, students: User[]) {

        // 重複避免
        const overlappingEvent = await this.prisma.event.findFirst({
            where: {
                AND: [
                    { teacherId: teacherId },
                    { startAt: { lt: endAt } },
                    { endAt: { gt: startAt } }
                ]
            }
        });

        if (overlappingEvent) {
            console.log("事件時間範圍重疊: " + overlappingEvent);
            throw new Error("事件時間範圍重疊");
        }

        // TODO 計算startRow和spanRows
        const startRow = 0;
        const spanRows = 0;

        const event = await this.prisma.event.create({
            data: {
                teacherId,
                startAt,
                endAt,
                startRow,
                spanRows,
                students: {
                    connect: students.map(student => ({ id: student }))
                }
            }
        })

        return event;
    }

    async getEventsByTeacherId(teacherId: number) {
        const events = await this.prisma.event.findMany({
            where: {
                teacherId
            }
        })
    }

    async getEventsByEventId(eventId: number) {
        const events = await this.prisma.event.findUnique({
            where: {
                id: eventId
            }
        })
    }

    async updateEvent(eventId: number, startAt: Date, endAt: Date, students: User[]) {
        const event = await this.prisma.event.update({
            where: {
                id: eventId
            },
            data: {
                startAt,
                endAt,
                students: {
                    set: students
                }
            }
        })
    }

    async deleteEvent(eventId: number) {
        const event = await this.prisma.event.delete({
            where: {
                id: eventId
            }
        })
    }
}