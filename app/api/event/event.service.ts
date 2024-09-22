import prisma from "@/app/libs/helpers/prisma";
import { utcToLocal } from "@/app/libs/utils/date.utc.to.local";
import { calculateRowSpan } from "@/app/libs/utils/calculate.event.rowspan";

export interface User {
    id: number;
}

export class EventService {
    private readonly prisma = prisma;

    constructor() {
        this.prisma = prisma;
    }

    async createEvent(teacherId: number, startAt: Date, endAt: Date, students: User[]) {

        // 時區轉換
        const localStartAt = utcToLocal(startAt);
        const localEndAt = utcToLocal(endAt);

        // MVP1 當天檢查控制，TODO 之後跨天需移除
        if (
            localStartAt.getDate() !== localEndAt.getDate()
        ) {
            throw new Error("事件時間範圍跨天");
        }

        // 重複避免
        const overlappingEvent = await this.prisma.event.findFirst({
            where: {
                AND: [
                    { teacherId: teacherId },
                    { startAt: { lt: localEndAt } },
                    { endAt: { gt: localStartAt } }
                ]
            }
        });

        if (overlappingEvent) {
            console.log("事件時間範圍重疊: " + overlappingEvent);
            throw new Error("事件時間範圍重疊");
        }

        const { startRow, spanRows } = calculateRowSpan(localStartAt, localEndAt);

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