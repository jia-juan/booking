export default function CalendarGridTime({ 
    containerOffset, 
    currentTimeRef 
}: { 
    containerOffset: React.RefObject<HTMLDivElement>, 
    currentTimeRef: React.RefObject<HTMLDivElement> 
}) {
    return (
        <div
            className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
            style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
        >
            <div ref={containerOffset} className="row-end-1 h-7"></div>
            <div>
                <div
                    ref={new Date().getHours() === 0 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    12AM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 1 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    1AM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 2 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    2AM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 3 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    3AM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 4 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    4AM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 5 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    5AM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 6 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    6AM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 7 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    7AM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 8 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    8AM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 9 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    9AM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 10 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    10AM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 11 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    11AM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 12 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    12PM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 13 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    1PM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 14 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    2PM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 15 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    3PM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 16 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    4PM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 17 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    5PM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 18 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    6PM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 19 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    7PM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 20 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    8PM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 21 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    9PM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 22 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    10PM
                </div>
            </div>
            <div />
            <div>
                <div
                    ref={new Date().getHours() === 23 ? currentTimeRef : null}
                    className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                >
                    11PM
                </div>
            </div>
            <div />
        </div>
    )
}