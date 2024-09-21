import { calendarService } from '@/app/api/event/calendar.service';
import { format } from 'date-fns';

describe('CalendarService', () => {

    it('should return correct dates for a given year and month', async () => {
        const year = 2024;
        const month = 8; // 9月 (月份從0開始)

        const result = await calendarService.getDateByYearAndMonth(year, month);

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);

        const firstDate = result[0].date;
        const lastDate = result[result.length - 1].date;

        // 檢查第一天和最後一天是否在正確的範圍內
        expect(new Date(firstDate).getDay()).toBe(1); // 週一
        expect(new Date(lastDate).getDay()).toBe(0); // 週日

        // 檢查是否包含當前日期
        const todayFormatted = format(new Date(), 'yyyy-MM-dd');
        const todayEntry = result.find(day => day.date === todayFormatted);
        expect(todayEntry).toBeDefined();
        expect(todayEntry?.isToday).toBe(true);
        expect(todayEntry?.isSelected).toBe(true);
    });
});
