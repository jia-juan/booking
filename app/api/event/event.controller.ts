import { NextResponse } from 'next/server';
import { eventService } from './event.service';

class EventController {

    async createEvent(teacherId: number, startAt: Date, endAt: Date, students: number[]) {

        const event = await eventService.createEvent(teacherId, startAt, endAt, students);
        return NextResponse.json(event);
    }

    async getEventsByTeacherId(teacherId: number, year: number, month: number) {

        const events = await eventService.getEventsByTeacherId(teacherId, year, month);
        return NextResponse.json(events);
    }

    async getEventById(eventId: number) {
        const event = await eventService.getEventsByEventId(eventId);
        return NextResponse.json(event);
    }

    async updateEventById(teacherId: number, eventId: number, startAt: Date, endAt: Date, students: number[]) {
        const event = await eventService.updateEvent(teacherId, eventId, startAt, endAt, students);
        return NextResponse.json(event);
    }
}

export default new EventController();