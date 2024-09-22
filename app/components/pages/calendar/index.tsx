'use client'

import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import CalendarHeader from '@/app/components/ui/calendar/header'
import CalendarGridDay from '@/app/components/ui/calendar/grid/day'
import CalendarGridTime from '@/app/components/ui/calendar/grid/time'
import CalendarGridMonth from '@/app/components/ui/calendar/grid/month'
import CalendarEvent from '@/app/components/ui/calendar/event'
import Loading from '@/app/components/ui/loading'
import Notifications from '@/app/components/ui/notifications'

export default function CalendarPage() {
    const container = useRef<HTMLDivElement | null>(null)
    const containerNav = useRef<HTMLDivElement | null>(null)
    const containerOffset = useRef<HTMLDivElement | null>(null)
    const currentTimeRef = useRef<HTMLDivElement | null>(null)

    const [days, setDays] = useState<any[]>([]);
    const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleDateString('sv-SE')); // 使用當地時區
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);

    const [currentDateEvents, setCurrentDateEvents] = useState<any[]>([]);

    const [notification, setNotification] = useState<{ type: 'success' | 'error', title: string, message: string } | null>(null);

    const fetchCalendar = async () => {
        const { data } = await axios.get(`/api/event/calendar?year=${currentYear}&month=${currentMonth}`)
        return data;
    }

    const { data: fetchedDays, isLoading, error, refetch } = useQuery({
        queryKey: ['calendar', currentYear, currentMonth],
        queryFn: fetchCalendar,
        onSuccess: (data: any) => setDays(data)
    });

    useEffect(() => {
        if (fetchedDays) {
            setDays(fetchedDays);
        }
    }, [fetchedDays]);

    const handleDateChange = (newDate: string) => {
        const newDateObj = new Date(newDate);
        const newYear = newDateObj.getFullYear();
        const newMonth = newDateObj.getMonth() + 1;

        setCurrentDate(newDate);

        if (newYear !== currentYear) {
            setCurrentYear(newYear);
        }

        if (newMonth !== currentMonth) {
            setCurrentMonth(newMonth);
        }

    };

    useEffect(() => {
        setCurrentDateEvents(days.find(day => day.date === currentDate)?.events || []);
    }, [days, currentDate]); // 修改這行，添加 days 作為依賴

    useEffect(() => {
        if (fetchedDays) {
            const updatedDays = fetchedDays.map(day => ({
                ...day,
                isSelected: day.date === currentDate
            }));
            setDays(updatedDays);
        }
    }, [fetchedDays, currentDate]);

    const updateDays = (updatedDays: any[]) => {
        setDays(updatedDays);
    };

    useEffect(() => {
        if (error) {
            setNotification({
                type: 'error',
                title: 'Error',
                message: 'Failed to fetch calendar data'
            })
        }
    }, [error])

    useEffect(() => {
        const scrollToCurrentTime = () => {
            if (currentTimeRef.current) {
                currentTimeRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })
            }
        }
        // 使用 setTimeout 確保滾動在 DOM 完全加載後執行
        setTimeout(scrollToCurrentTime, 100)
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="flex h-full flex-col">
            <CalendarHeader
                days={days}
                setSelectedDate={handleDateChange}
                updateDays={updateDays}
                refetchCalendar={refetch}
            />
            <div className="isolate flex flex-auto overflow-hidden bg-white">
                <div ref={container} className="flex flex-auto flex-col overflow-auto">
                    <CalendarGridDay
                        containerNav={containerNav}
                        days={days}
                        setSelectedDate={handleDateChange}
                        updateDays={updateDays}
                    />
                    <div className="flex w-full flex-auto">
                        <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
                        <div className="grid flex-auto grid-cols-1 grid-rows-1">
                            {/* Horizontal lines */}
                            <CalendarGridTime
                                containerOffset={containerOffset}
                                currentTimeRef={currentTimeRef}
                            />
                            {/* Events */}
                            <CalendarEvent
                                currentDateEvents={currentDateEvents}
                            />
                        </div>
                    </div>
                </div>
                <CalendarGridMonth
                    days={days}
                    setSelectedDate={handleDateChange}
                    updateDays={updateDays}
                />
            </div>
            {notification &&
                <Notifications
                    type={notification.type}
                    title={notification.title}
                    message={notification.message}
                />
            }
        </div>
    )
}