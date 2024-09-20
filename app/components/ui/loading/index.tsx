export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
            <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full animate-ping bg-indigo-600"></div>
                <div className="w-4 h-4 rounded-full animate-ping bg-indigo-600"></div>
                <div className="w-4 h-4 rounded-full animate-ping bg-indigo-600"></div>
            </div>
        </div>
    )
}