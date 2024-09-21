import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import classNamesActivate from '@/app/components/libs/classNamesActivate'

export default function CalendarGridMonth({
    days,
    setSelectedDate,
    updateDays
}: {
    days: any[],
    setSelectedDate: (date: string) => void,
    updateDays: (days: any[]) => void
}) {

    const selectedDay = days.find((day) => day.isSelected)
    
    const handleDayClick = (date: string) => {
        const updatedDays = days.map(day => ({
            ...day,
            isSelected: day.date === date
        }));
        updateDays(updatedDays);
        setSelectedDate(date);
    };

    const handlePreviousMonth = () => {
        const selectedDate = new Date(selectedDay.date);
        const previousMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
        const previousMonthLastDay = new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0); // 上個月的最後一天
        handleDayClick(previousMonthLastDay.toLocaleDateString('sv-SE'));
    };

    const handleNextMonth = () => {
        const nextMonthFirstDay = new Date(selectedDay.date);
        nextMonthFirstDay.setMonth(nextMonthFirstDay.getMonth() + 1);
        nextMonthFirstDay.setDate(1); // 下個月的第一天
        handleDayClick(nextMonthFirstDay.toLocaleDateString('sv-SE'));
    };

    return (
        <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block">
            <div className="flex items-center text-center text-gray-900">
                <button
                    type="button"
                    onClick={handlePreviousMonth}
                    className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">上個月</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <div className="flex-auto text-sm font-semibold">{new Date(selectedDay?.date).getFullYear()} 年 {new Date(selectedDay?.date).getMonth() + 1} 月</div>
                <button
                    type="button"
                    onClick={handleNextMonth}
                    className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">下個月</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
            <div className="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                <div>ㄧ</div>
                <div>二</div>
                <div>三</div>
                <div>四</div>
                <div>五</div>
                <div>六</div>
                <div>日</div>
            </div>
            <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                {days.map((day, dayIdx) => (
                    <button
                        key={day.date}
                        type="button"
                        onClick={() => handleDayClick(day.date)}
                        className={classNamesActivate(
                            'py-1.5 hover:bg-gray-100 focus:z-10',
                            day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                            (day.isSelected || day.isToday) && 'font-semibold',
                            day.isSelected && 'text-white',
                            !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                            !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                            day.isToday && !day.isSelected && 'text-indigo-600',
                            dayIdx === 0 && 'rounded-tl-lg',
                            dayIdx === 6 && 'rounded-tr-lg',
                            dayIdx === days.length - 7 && 'rounded-bl-lg',
                            dayIdx === days.length - 1 && 'rounded-br-lg',
                        )}
                    >
                        <time
                            dateTime={day.date}
                            className={classNamesActivate(
                                'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                                day.isSelected && day.isToday && 'bg-indigo-600',
                                day.isSelected && !day.isToday && 'bg-gray-900',
                            )}
                        >
                            {day.date.split('-').pop().replace(/^0/, '')}
                        </time>
                    </button>
                ))}
            </div>
        </div>
    )
}