/**
 * 將開始與結束時間運算出單一天日曆的標記位置，當天限定版
 * @param start 開始日期
 * @param end 結束日期
 * @returns 返回一個包含兩個整數的物件：
 *   - 第一個整數表示日曆中的起始行數（例如，從0開始的行索引）
 *   - 第二個整數表示跨越的行數（例如，從起始行到結束行的數量）
 */

export function calculateRowSpan(start: Date, end: Date): {startRow: number, spanRows: number} {
    // 將時間對齊到最近的 5 分鐘
    const roundToNearest5Minutes = (date: Date): Date => {
        const minutes = Math.round(date.getMinutes() / 5) * 5;
        date.setMinutes(minutes, 0, 0); // 將秒數和毫秒數設為 0
        return date;
    };

    // 將開始時間和結束時間對齊到最近的 5 分鐘
    const alignedStart = roundToNearest5Minutes(new Date(start.getTime()));
    const alignedEnd = roundToNearest5Minutes(new Date(end.getTime()));

    // 計算 startRow 和 endRow，每行代表 5 分鐘 (+ 2 是因為頁面初始有前一天的 10 分鐘跨度顯示)
    const startRow = alignedStart.getHours() * 12 + Math.floor(alignedStart.getMinutes() / 5) + 2;
    const endRow = alignedEnd.getHours() * 12 + Math.floor(alignedEnd.getMinutes() / 5) + 2;

    // 計算 spanRows
    const spanRows = endRow - startRow;

    return { startRow, spanRows };
}
