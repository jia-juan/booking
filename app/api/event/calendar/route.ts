import { NextResponse } from 'next/server';
import { calendarController } from "@/app/api/event/calendar.controller";

export async function GET(req: Request, res: Response) {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get('year');
    const month = searchParams.get('month');

    if (!year || !month) {
        return NextResponse.json({ error: 'Year and month are required' }, { status: 400 });
    }

    const result = await calendarController.getDateByYearAndMonth(Number(year), Number(month));
    return NextResponse.json(result);
}