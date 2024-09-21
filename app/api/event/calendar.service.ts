import { eachDayOfInterval, format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

export class CalendarService {

    async getDateByYearAndMonth(year: number, month: number) {

        const zeroBasedMonth = month - 1; // 月份從0開始
        
        const startDate = startOfWeek(startOfMonth(new Date(year, zeroBasedMonth)), { weekStartsOn: 1 }); // 週一為一週的開始
        const endDate = endOfWeek(endOfMonth(new Date(year, zeroBasedMonth)), { weekStartsOn: 1 });

        // 當前日期
        const today = new Date();
        const todayFormatted = format(today, 'yyyy-MM-dd');

        return eachDayOfInterval({ start: startDate, end: endDate }).map(day => ({
            date: format(day, 'yyyy-MM-dd'),
            isCurrentMonth: day.getMonth() === zeroBasedMonth,
            isToday: format(day, 'yyyy-MM-dd') === todayFormatted,
            isSelected: format(day, 'yyyy-MM-dd') === todayFormatted, // 設定當天日期的 isSelected 為 true
            events: [] // 根據需要添加事件
        }));
    }
}

export const calendarService = new CalendarService();