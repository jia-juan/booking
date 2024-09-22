import { calendarService } from './calendar.service';
import { eventService } from './event.service';
import { utcToLocal } from '@/app/libs/utils/date.utc.to.local';
import { formatDate } from '@/app/libs/utils/event.date.format';
import { NextResponse } from 'next/server';
class CalendarController {

    async getDateByYearAndMonth(year: number, month: number, teacherId: number) {
        const result = await calendarService.getDateByYearAndMonth(year, month);

        const events = await eventService.getEventsByTeacherId(teacherId, year, month);

        // 整合 result 和 events
        const mergedResult = result.map(date => {
            const localFormattedDate = formatDate(utcToLocal(new Date(date.date)));
            const matchedEvents = events.filter(event => {
                return formatDate(utcToLocal(new Date(event.startAt))) === localFormattedDate;
            }).map(event => ({
                id: event.id,
                startAt: event.startAt,
                endAt: event.endAt,
                startRow: event.startRow,
                spanRows: event.spanRows,
                students: event.students.map(student => ({
                    id: student.id,
                    name: student.name
                })),
            }));

            return {
                ...date,
                events: matchedEvents
            };
        });

        return NextResponse.json(mergedResult);
    }
}

export const calendarController = new CalendarController();