import { calendarService } from './calendar.service';

class CalendarController {
    async getDateByYearAndMonth(year: number, month: number) {
        const result = await calendarService.getDateByYearAndMonth(year, month);
        // 因為要整合 event 所以不回傳 nextResponse(MEMO)
        return result;
    }
}

export const calendarController = new CalendarController();