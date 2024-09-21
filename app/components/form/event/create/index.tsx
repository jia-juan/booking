'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Notifications from '@/app/components/ui/notifications'
import { eventFormValidation } from '@/app/libs/validators/event'
import { addMinutes, format } from 'date-fns'

function formatToDateTimeLocal(date: Date): string {
    return format(date, "yyyy-MM-dd'T'HH:mm")
}

interface CreateEventFormProps {
    onClose: () => void;
    onSave: () => void;
}


export default function CreateEventForm({ onClose, onSave }: CreateEventFormProps) {

    const [takenTimes, setTakenTimes] = useState<number>(0)
    const [maxStudent, setMaxStudent] = useState<number>(1)

    const [registeredStudents, setRegisteredStudents] = useState<any>([])

    const [notification, setNotification] = useState<{ type: 'success' | 'error', title: string, message: string } | null>(null);

    const form = useForm({
        resolver: zodResolver(eventFormValidation),
        defaultValues: {
            startTime: '',
            endTime: '',
        },
    });

    useEffect(() => {
        axios.get('/api/user/teachers/course')
            .then(response => {
                setTakenTimes(response.data.takeTime)
                setMaxStudent(response.data.maxStudent)
            })
    }, [])

    useEffect(() => {
        axios.get('/api/user/students/registered')
            .then(response => {
                setRegisteredStudents(response.data.students)
            })
    }, [])

    const onSubmit = (data: any) => {
        // TODO: 新增事件，重複的學員只創建一ㄘ
        console.log(selectedStudents)
        console.log(data)
        onSave()
    }

    const handleStartTimeChange = (event: any) => {
        const startTime = new Date(event.target.value)
        form.setValue('startTime', event.target.value)

        if (takenTimes > 0) {
            const endTime = addMinutes(startTime, takenTimes)
            form.setValue('endTime', formatToDateTimeLocal(endTime))
        }
    }

    const [selectedStudents, setSelectedStudents] = useState<any[]>(Array(maxStudent).fill(null));

    const handleStudentSelect = (event: any, index: number) => {
        const selectedId = event.target.value;
        if (selectedStudents.includes(selectedId)) {
            return; // 已選擇，不做任何動作
        }
        const newSelectedStudents = [...selectedStudents];
        newSelectedStudents[index] = selectedId;
        setSelectedStudents(newSelectedStudents);
    }

    const availableStudents = (index: number) => {
        return registeredStudents.filter((student: any) => !selectedStudents.includes(student.id) || selectedStudents[index] === student.id);
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">新增事件</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">新增一個事件，並選擇事件的開始時間和結束時間及參與的學員</p>

                        <div className="mt-10 space-y-8">
                            <div>
                                <label htmlFor="startTime"
                                    className="block text-sm font-medium leading-6 text-gray-900">
                                    開始時間
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="startTime"
                                        type="datetime-local"
                                        {...form.register('startTime')}
                                        onChange={handleStartTimeChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="endTime"
                                    className="block text-sm font-medium leading-6 text-gray-900">
                                    結束時間
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="endTime"
                                        type="datetime-local"
                                        {...form.register('endTime')}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {form.formState.errors.endTime && (
                                        <p className="mt-2 text-sm text-red-600">{form.formState.errors.endTime.message}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    選擇學員
                                </label>
                                {Array.from({ length: maxStudent }).map((_, index) => (
                                    <div key={index} className="mt-2">
                                        <select
                                            id={`student-${index}`}
                                            name={`student-${index}`}
                                            value={selectedStudents[index] || ''}
                                            onChange={(event) => handleStudentSelect(event, index)}
                                            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        >
                                            <option value="" disabled>選擇學員</option>
                                            {availableStudents(index).map((student: any) => (
                                                <option
                                                    key={student.id}
                                                    value={student.id}
                                                    disabled={selectedStudents.includes(student.id)}
                                                >
                                                    {student.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-between gap-x-6">
                    <div className="flex gap-x-6 ml-auto">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            取消
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            新增
                        </button>
                    </div>
                </div>
            </form>
            {notification && <Notifications type={notification.type} title={notification.title} message={notification.message} />}
        </div>
    )
}
