import { NextResponse } from 'next/server';
import EventController from '@/app/api/event/event.controller';

export const POST = async (req: Request) => {
    const { teacherId, startAt, endAt, students } = await req.json();
    const event = await EventController.createEvent(teacherId, new Date(startAt), new Date(endAt), students);
    return NextResponse.json(event);
}

