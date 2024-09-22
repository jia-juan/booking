import { NextResponse } from 'next/server';
import { EventService, User } from './event.service';

class EventController {
    private readonly eventService = new EventService();

    async createEvent(teacherId: number, startAt: Date, endAt: Date, students: User[]) {

        console.log(students)
        const event = await this.eventService.createEvent(teacherId, startAt, endAt, students);
        return NextResponse.json(event);
    }
}

export default new EventController();