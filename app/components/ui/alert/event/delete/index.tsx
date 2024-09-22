'use client'

import { Dialog } from '@headlessui/react'
import { useState } from 'react'

interface DeleteEventAlertProps {
    onDelete: () => void;
    onCancel: () => void;
}

export default function DeleteEventAlert({ onDelete, onCancel }: DeleteEventAlertProps) {
    const [open, setOpen] = useState(true);

    const handleDelete = () => {
        setOpen(false);
        onDelete();
    };

    return (
        <Dialog open={open} onClose={onCancel} className="relative z-50"> {/* 確保 z-index 足夠高 */}
            <div className="fixed inset-0 bg-black bg-opacity-30" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        刪除事件
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            你確定要刪除此事件嗎？此操作無法撤銷。
                        </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            type="button"
                            className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                            onClick={handleDelete}
                        >
                            刪除
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            onClick={onCancel}
                        >
                            取消
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
