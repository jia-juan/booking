import { utcToLocal } from "@/app/libs/utils/date.utc.to.local";
import { useState } from "react";
import Modal from '@/app/components/ui/modal'
import UpdateEventForm from '@/app/components/form/event/update'

export default function CalendarEvent({ currentDateEvents }: { currentDateEvents: any[] }) {

    const [modalState, setModalState] = useState({
        isUpdateModalOpen: false,
        selectedEventId: null
    });

    const openUpdateModal = (event: any) => setModalState(prev => ({ ...prev, isUpdateModalOpen: true, selectedEventId: event }));
    const closeAllModals = () => setModalState({ isUpdateModalOpen: false, selectedEventId: null });

    const formatEventTime = (utcTime: Date) => {
        const localTime = utcToLocal(utcTime);
        return localTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }

    const handleSaveEvent = () => {
        closeAllModals();
    }

    return (
        <ol
            className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
            style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
        >
            {currentDateEvents.map((event) => (
                <li
                    key={event.id}
                    className="relative mt-px flex"
                    style={{ gridRow: `${event.startRow} / span ${event.spanRows}` }}>
                    <button
                        className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
                        onClick={() => openUpdateModal(event.id)}
                    >
                        <p className="text-blue-500 group-hover:text-blue-700">
                            <time dateTime={event.startAt}>{formatEventTime(new Date(event.startAt))}</time>
                        </p>
                    </button>
                </li>
            ))}
            <Modal isOpen={modalState.isUpdateModalOpen} onClose={closeAllModals}>
                <div onClick={(e) => e.stopPropagation()}>
                    <UpdateEventForm
                        eventId={modalState.selectedEventId}
                        onClose={closeAllModals}
                        onSave={handleSaveEvent}
                    />
                </div>
            </Modal>
        </ol>
    )
}