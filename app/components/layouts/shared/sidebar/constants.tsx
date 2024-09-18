import { CalendarIcon, UsersIcon, ClipboardDocumentListIcon, ChartBarIcon, UserGroupIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline'

export const MAIN_NAVIGATION = [
    { name: '行事曆', href: '/calendar', icon: CalendarIcon, current: true },
    { name: '預約', href: '/booking', icon: ClipboardDocumentListIcon, current: false },
    { name: '學員', href: '/students', icon: UsersIcon, current: false },
    { name: '數據', href: '/dashboard', icon: ChartBarIcon, current: false },
]
export const SUB_NAVIGATION = [
    { name: '團隊', href: '/teams', initial: 'T', current: false },
    { name: '管理', href: '/manage', initial: 'M', current: false },
    // { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    // { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    // { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]