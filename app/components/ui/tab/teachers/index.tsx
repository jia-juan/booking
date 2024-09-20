import classNamesActivate from "@/app/components/libs/classNamesActivate"
import { TAB_TEACHERS } from "./constants"

export default function TabTeachers({
    setTab,
    tabCounts
}: {
    setTab: (tab: string) => void,
    tabCounts: { [key: string]: number }
}) {

    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    defaultValue={TAB_TEACHERS.find((tab) => tab.current)?.name}
                    className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => setTab(e.target.value)}
                >
                    {TAB_TEACHERS.map((tab) => (
                        <option key={tab.name} value={tab.type}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                        {TAB_TEACHERS.map((tab) => (
                            <a
                                key={tab.name}
                                href="#"
                                aria-current={tab.current ? 'page' : undefined}
                                className={classNamesActivate(
                                    tab.current
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                                    'flex whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium',
                                )}
                                onClick={() => setTab(tab.type)}
                            >
                                {tab.name}
                                {tabCounts[tab.type] ? (
                                    <span
                                        className={classNamesActivate(
                                            tab.current ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900',
                                            'ml-3 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block',
                                        )}
                                    >
                                        {tabCounts[tab.type]}
                                    </span>
                                ) : null}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}
