import { NextResponse } from 'next/server';
import { eventService, User } from './event.service';

class EventController {

    async createEvent(teacherId: number, startAt: Date, endAt: Date, students: User[]) {

        const event = await eventService.createEvent(teacherId, startAt, endAt, students);
        return NextResponse.json(event);
    }

    async getEventsByTeacherId(teacherId: number, year: number, month: number) {

        const events = await eventService.getEventsByTeacherId(teacherId, year, month);
        return NextResponse.json(events);
    }
}

export default new EventController();