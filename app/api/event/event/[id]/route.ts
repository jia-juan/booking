import { NextResponse } from 'next/server';
import EventController from '@/app/api/event/event.controller';
import { getServerSession } from 'next-auth';
import { nextauthOptions } from '@/app/libs/helpers/nextauth-options';

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const event = await EventController.getEventById(Number(params.id));
    return event;
}

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    const session = await getServerSession(nextauthOptions);
    const { startAt, endAt, students } = await req.json();
    const event = await EventController.updateEventById(Number(session?.user?._id), Number(params.id), new Date(startAt), new Date(endAt), students);
    return NextResponse.json(event);
}


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const event = await EventController.deleteEventById(Number(params.id));
    return NextResponse.json(event);
}

