export default function CalendarEvent() {
    return (
        <ol
            className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
            style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
        >
            <li className="relative mt-px flex" style={{ gridRow: '74 / span 12' }}>
                <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
                >
                    <p className="order-1 font-semibold text-blue-700">Breakfast</p>
                    <p className="text-blue-500 group-hover:text-blue-700">
                        <time dateTime="2022-01-22T06:00">6:00 AM</time>
                    </p>
                </a>
            </li>
            <li className="relative mt-px flex" style={{ gridRow: '92 / span 30' }}>
                <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
                >
                    <p className="order-1 font-semibold text-pink-700">Flight to Paris</p>
                    <p className="order-1 text-pink-500 group-hover:text-pink-700">
                        John F. Kennedy International Airport
                    </p>
                    <p className="text-pink-500 group-hover:text-pink-700">
                        <time dateTime="2022-01-22T07:30">7:30 AM</time>
                    </p>
                </a>
            </li>
            <li className="relative mt-px flex" style={{ gridRow: '134 / span 18' }}>
                <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-indigo-50 p-2 text-xs leading-5 hover:bg-indigo-100"
                >
                    <p className="order-1 font-semibold text-indigo-700">Sightseeing</p>
                    <p className="order-1 text-indigo-500 group-hover:text-indigo-700">Eiffel Tower</p>
                    <p className="text-indigo-500 group-hover:text-indigo-700">
                        <time dateTime="2022-01-22T11:00">11:00 AM</time>
                    </p>
                </a>
            </li>
        </ol>
    )
}