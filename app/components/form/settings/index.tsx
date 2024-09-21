'use client'

import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsValidation } from '@/app/libs/validators/settings';
import { useState } from 'react';
import Notifications from '@/app/components/ui/notifications/';

export default function SettingsForm() {
    const { data: session } = useSession();
    const [notification, setNotification] = useState<{ type: 'success' | 'error', title: string, message: string } | null>(null);
    const form = useForm({
        resolver: zodResolver(settingsValidation),
        defaultValues: {
            takeTime: 0,
            maxStudent: 1,
        },
    });

    useEffect(() => {
        if (session) {
            axios.get('/api/user/teachers/course')
                .then(response => {
                    const courseSettings = response.data;
                    form.reset({
                        takeTime: courseSettings.takeTime,
                        maxStudent: courseSettings.maxStudent,
                    });
                })
                .catch(error => {
                    console.error('Error fetching course settings:', error);
                });
        }
    }, [session]);

    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post('/api/user/teachers/course', data);
            setNotification({
                type: 'success',
                title: '更新成功',
                message: '課程設定已成功更新。'
            });
        } catch (error) {
            console.log(error);
            setNotification({
                type: 'error',
                title: '更新失敗',
                message: '課程設定更新失敗。'
            });
        }
    }

    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-gray-900">課程設定</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                請設定課程時數、課程人數。
                            </p>
                        </div>

                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">

                            <div className="sm:col-span-4">
                                <label htmlFor="takeTime" className="block text-sm font-medium leading-6 text-gray-900">
                                    課程時長 (分鐘)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="takeTime"
                                        type="number"
                                        {...form.register('takeTime', {
                                            valueAsNumber: true,
                                            setValueAs: v => v === '' ? null : v
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {form.formState.errors.takeTime && (
                                        <p className="mt-2 text-sm text-red-600">{form.formState.errors.takeTime.message}</p>
                                    )}
                                </div>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    課程編輯及學員預約將以開始時間，自動生成結束時間；若不設定(0)，則可以動態設定結束時間。
                                </p>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="maxStudent" className="block text-sm font-medium leading-6 text-gray-900">
                                    最大參與人數
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="maxStudent"
                                        type="number"
                                        {...form.register('maxStudent', { valueAsNumber: true })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {form.formState.errors.maxStudent && (
                                        <p className="mt-2 text-sm text-red-600">{form.formState.errors.maxStudent.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        取消
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        儲存
                    </button>
                </div>
            </form>
            {notification && <Notifications type={notification.type} title={notification.title} message={notification.message} />}
        </>
    )
}
