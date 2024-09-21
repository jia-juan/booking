import { ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { formatDate } from '@/app/libs/utils/event.date.format'
import { useState } from 'react'
import Modal from '@/app/components/ui/modal'
import CreateEventForm from '@/app/components/form/event/create'

export default function CalendarHeader({
    days,
    setSelectedDate,
    updateDays
}: {
    days: any[],
    setSelectedDate: (date: string) => void,
    updateDays: (days: any[]) => void
}) {

    const [modalState, setModalState] = useState({
        isCreateModalOpen: false,
    });

    const openCreateModal = () => setModalState(prev => ({ ...prev, isCreateModalOpen: true }));
    const closeAllModals = () => setModalState({ isCreateModalOpen: false });

    const handleSaveEvent = () => {
        // TODO: 重設 days，父類別重新渲染 events
        closeAllModals();
    }

    const selectedDay = days.find((day) => day.isSelected)
    if (!selectedDay) {
        return null; // 如果沒有找到 selectedDay，則不渲染任何內容
    }

    const date = new Date(selectedDay.date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const dayOfWeek = date.toLocaleDateString('zh-TW', { weekday: 'long' })

    const changeDate = (offset: number) => {
        let newDate;
        if (offset === 0) {
            newDate = new Date(); // 設置為今天的日期
        } else {
            newDate = new Date(date);
            newDate.setDate(date.getDate() + offset);
        }
        const formattedDate = formatDate(newDate);
        const updatedDays = days.map(day => ({
            ...day,
            isSelected: day.date === formattedDate
        }));
        updateDays(updatedDays);
        setSelectedDate(formattedDate);
    }

    return (
        <header className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
            <div>
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                    <time dateTime={date.toLocaleDateString()} className="sm:hidden">
                        {year} 年 {month} 月 {day} 日
                    </time>
                    <time dateTime={date.toLocaleDateString()} className="hidden sm:inline">
                        {year} 年 {month} 月 {day} 日
                    </time>
                </h1>
                <p className="mt-1 text-sm text-gray-500">{dayOfWeek}</p>
            </div>
            <div className="flex items-center">
                <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
                    <button
                        type="button"
                        className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
                        onClick={() => changeDate(-1)}
                    >
                        <span className="sr-only">前一天</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
                        onClick={() => changeDate(0)}
                    >
                        今天
                    </button>
                    <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
                    <button
                        type="button"
                        className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
                        onClick={() => changeDate(1)}
                    >
                        <span className="sr-only">後一天</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden md:ml-4 md:flex md:items-center">
                    <div className="ml-6 h-6 w-px bg-gray-300" />
                    <button
                        onClick={openCreateModal}
                        type="button"
                        className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        新增
                    </button>
                    <Modal isOpen={modalState.isCreateModalOpen} onClose={closeAllModals}>
                        <div onClick={(e) => e.stopPropagation()}>
                            <CreateEventForm onClose={closeAllModals} onSave={handleSaveEvent} />
                        </div>
                    </Modal>
                </div>
                <Menu as="div" className="relative ml-6 md:hidden">
                    <MenuButton className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Open menu</span>
                        <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                    </MenuButton>

                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        <div className="py-1">
                            <MenuItem>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                >
                                    新增
                                </a>
                            </MenuItem>
                        </div>
                        <div className="py-1">
                            <MenuItem>
                                <a
                                    onClick={() => changeDate(0)}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                >
                                    今天
                                </a>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </Menu>
            </div>
        </header>
    )
}