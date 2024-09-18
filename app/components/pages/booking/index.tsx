import Booking from "@/app/components/ui/list/booking"
import Pagination from "@/app/components/ui/pagination"
import TabBooking from "@/app/components/ui/tab/booking"

export default function BookingPage() {
    return (
        <>
            <TabBooking />
            <Booking />
            <Pagination />
        </>
    )
}