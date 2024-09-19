'use client'

import { UserCircleIcon } from '@heroicons/react/24/solid'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileValidation } from '@/app/libs/validators/profile';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { PROFILE_FORM_PERSONAL_FIELDS, PROFILE_FORM_SOCIAL_FIELDS, PROFILE_FORM_NOTIFICATION_FIELDS, PROFILE_FORM_NOTIFICATION_HOW_FIELDS } from './constants';
import Notifications from '@/app/components/ui/notifications';

export default function ProfileForm() {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);
  const [initialData, setInitialData] = useState<any>(null); // 新增初始資料狀態
  const [notification, setNotification] = useState<{ type: 'success' | 'error', title: string, message: string } | null>(null);

  const form = useForm({
    resolver: zodResolver(profileValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      birthday: null,
      lineId: '',
      facebook: '',
      instagram: '',
      notifyBooking: false,
      notifyPromotion: false,
      notifyHow: 'NONE',
    }
  })

  useEffect(() => {
    if (session) {
      axios.get('/api/profile')
        .then(response => {
          const userData = response.data.user;
          setUser(userData);
          setInitialData(userData); // 設定初始資料
          form.reset({
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            birthday: userData.birthday ? new Date(userData.birthday).toISOString().split('T')[0] : '',
            lineId: userData.lineId || '',
            facebook: userData.facebook || '',
            instagram: userData.instagram || '',
            notifyBooking: userData.notifyBooking ?? false,
            notifyPromotion: userData.notifyPromotion ?? false,
            notifyHow: userData.notifyHow || 'NONE',
          });
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [session, form]);

  const onSubmit = async (data: any) => {
    const formattedData = {
      ...data,
      birthday: data.birthday ? new Date(data.birthday) : null,
    }
    try {
      await axios.put(`/api/profile/${user.id}`, formattedData);
      setNotification({ type: 'success', title: '成功', message: '個人資料更新成功' });
      setInitialData(formattedData); // 更新初始資料
    } catch (error) {
      setNotification({ type: 'error', title: '錯誤', message: '個人資料更新失敗 ' + error });
    }
  }

  const onCancel = () => {
    if (initialData) {
      form.reset({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        birthday: initialData.birthday ? new Date(initialData.birthday).toISOString().split('T')[0] : '',
        lineId: initialData.lineId || '',
        facebook: initialData.facebook || '',
        instagram: initialData.instagram || '',
        notifyBooking: initialData.notifyBooking ?? false,
        notifyPromotion: initialData.notifyPromotion ?? false,
        notifyHow: initialData.notifyHow || 'NONE',
      });
    }
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">個人資料</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              請定期維護您的個人資料，以確保資訊的正確性和完整性。
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {PROFILE_FORM_PERSONAL_FIELDS.map((field) => (
                <div className="sm:col-span-4" key={field.id}>
                  <label htmlFor={field.id} className="block text-sm font-medium leading-6 text-gray-900">
                    {field.label}
                  </label>
                  <div className="mt-2">
                    <input
                      key={field.id}
                      type={field.type}
                      {...form.register(field.id as any)}
                      {...(field.readOnly ? { readOnly: true } : {})}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {form.formState.errors[field.id as keyof typeof form.formState.errors] && (
                      <p className="mt-2 text-sm text-red-600">{form.formState.errors[field.id as keyof typeof form.formState.errors]?.message}</p>
                    )}
                  </div>
                </div>
              ))}
              <div className="col-span-full">
                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                  照片
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    上傳照片
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">社群帳號</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              請填入您個人常用的社群帳號。
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {PROFILE_FORM_SOCIAL_FIELDS.map((field) => (
                <div className="sm:col-span-4" key={field.id}>
                  <label htmlFor={field.id} className="block text-sm font-medium leading-6 text-gray-900">
                    {field.label}
                  </label>
                  <div className="mt-2">
                    <input
                      key={field.id}
                      type={field.type}
                      {...form.register(field.id as any)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">通知</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              我們會通知您重要變更，但您可以選擇其他您想聽到的內容。
            </p>
            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">通知條件</legend>
                <div className="mt-6 space-y-6">
                  {PROFILE_FORM_NOTIFICATION_FIELDS.map((field) => (
                    <div className="relative flex gap-x-3" key={field.id}>
                      <div className="flex h-6 items-center">
                        <input
                          key={field.id}
                          type={field.type}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          {...form.register(field.id as any)}
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label htmlFor={field.id} className="font-medium text-gray-900">
                          {field.label}
                        </label>
                        <p className="text-gray-500">{field.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">通知方式</legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">請設定您希望如何接收以上通知的方式。</p>
                <div className="mt-6 space-y-6">
                  {PROFILE_FORM_NOTIFICATION_HOW_FIELDS[0].options.map(option => (
                    <div key={option.id} className="flex items-center gap-x-3">
                      <input
                        id={`push-${option.id}`}
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        {...form.register('notifyHow')}
                        value={option.id}
                        defaultChecked={form.watch('notifyHow') === option.id}
                      />
                      <label htmlFor={`push-${option.id}`} className="block text-sm font-medium leading-6 text-gray-900">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={onCancel}>
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
