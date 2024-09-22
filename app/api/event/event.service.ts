import prisma from "@/app/libs/helpers/prisma";
import { utcToLocal } from "@/app/libs/utils/date.utc.to.local";
import { calculateRowSpan } from "@/app/libs/utils/calculate.event.rowspan";

export class EventService {
    private readonly prisma = prisma;

    constructor() {
        this.prisma = prisma;
    }

    async createEvent(teacherId: number, startAt: Date, endAt: Date, students: number[]) {

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

    async getEventsByTeacherId(teacherId: number, year: number, month: number) {
        const startOfMonth = utcToLocal(new Date(Date.UTC(year, month - 1, 1)));
        const endOfMonth = utcToLocal(new Date(Date.UTC(year, month, 0)));
    
        const events = await this.prisma.event.findMany({
            where: {
                teacherId,
                startAt: {
                    gte: startOfMonth,
                    lte: endOfMonth
                }
            },
            include: {
                students: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        return events;
    }

    async getEventsByEventId(eventId: number) {
        const event = await this.prisma.event.findUnique({
            where: {
                id: eventId
            },
            include: {
                students: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })
        return event;
    }

    async updateEvent(teacherId: number, eventId: number, startAt: Date, endAt: Date, students: number[]) {
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
                    { endAt: { gt: localStartAt } },
                    { id: { not: eventId } }  // 排除自身
                ]
            }
        });

        if (overlappingEvent) {
            console.log("事件時間範圍重疊: " + overlappingEvent);
            throw new Error("事件時間範圍重疊");
        }

        const { startRow, spanRows } = calculateRowSpan(localStartAt, localEndAt);

        const event = await this.prisma.event.update({
            where: {
                id: eventId
            },
            data: {
                startAt,
                endAt,
                startRow,
                spanRows,
                students: {
                    set: students.map(student => ({ id: student }))
                }
            }
        })
        return event;
    }

    async deleteEvent(eventId: number) {
        const event = await this.prisma.event.delete({
            where: {
                id: eventId
            }
        })
    }
}

export const eventService = new EventService();