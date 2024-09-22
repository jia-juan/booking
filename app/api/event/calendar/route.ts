import { NextResponse } from 'next/server';
import { calendarController } from "@/app/api/event/calendar.controller";
import { getServerSession } from 'next-auth';
import { nextauthOptions } from '@/app/libs/helpers/nextauth-options';

export async function GET(req: Request, res: Response) {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    
    const session = await getServerSession(nextauthOptions);

    if (!year || !month) {
        return NextResponse.json({ error: 'Year and month are required' }, { status: 400 });
    }

    return await calendarController.getDateByYearAndMonth(Number(year), Number(month), Number(session?.user?._id));

}