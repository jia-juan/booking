import { useEffect, useMemo } from "react"

export default function CalendarGridDay({
    containerNav,
    days,
    setSelectedDate,
    updateDays
}: {
    containerNav: any,
    days: any[],
    setSelectedDate: (date: string) => void,
    updateDays: (days: any[]) => void
}) {

    const selectedDay = days.find((day) => day.isSelected)

    const DaysInWeek = (days: any[], selectedDay: any) => {
        if (!selectedDay) return [];

        const selectedDate = new Date(selectedDay.date)
        const currentDayIndex = selectedDate.getDay(); // 取得選擇日期是週幾 (0為週日, 1為週一...)
        const mondayOffset = currentDayIndex === 0 ? -6 : 1 - currentDayIndex; // 計算從選擇日期開始到最近的週一的天數差異

        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(selectedDate.getDate() + mondayOffset); // 設定週一的日期

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // 設定週日的日期

        return days.filter(day => {
            const dayDate = new Date(day.date);
            return dayDate >= startOfWeek && dayDate <= endOfWeek;
        });
    }

    const daysInThisWeek = useMemo(() => DaysInWeek(days, selectedDay), [days, selectedDay]);

    const handleDayClick = (date: string) => {
        const updatedDays = days.map(day => ({
            ...day,
            isSelected: day.date === date
        }));
        updateDays(updatedDays);
        setSelectedDate(date);
    };

    return (
        <div
            ref={containerNav}
            className="sticky top-0 z-10 grid flex-none grid-cols-7 bg-white text-xs text-gray-500 shadow ring-1 ring-black ring-opacity-5 md:hidden"
        >
            {daysInThisWeek.map((day) => {
                const isToday = new Date().toDateString() === new Date(day.date).toDateString();
                const isSelected = day.isSelected;
                const baseClass = "mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold";
                const className = isSelected
                    ? isToday
                        ? `${baseClass} bg-indigo-600 text-white`
                        : `${baseClass} bg-gray-900 text-white`
                    : isToday
                        ? `${baseClass} text-indigo-600`
                        : `${baseClass} text-gray-900`;

                return (
                    <button
                        key={day.date}
                        type="button"
                        onClick={() => handleDayClick(day.date)}
                        className="flex flex-col items-center pb-1.5 pt-3"
                    >
                        <span>{new Date(day.date).toLocaleDateString('zh-TW', { weekday: 'short' })}</span> {/* 顯示中文星期 */}
                        <span className={className}>
                            {new Date(day.date).getDate()}
                        </span>
                    </button>
                );
            })}
        </div>
    )
}