const TIMEZONE_OFFSET = 8 * 60;  // UTC+8 時區偏移（分鐘 ）

/**
 * 將日期轉換為特定時區的顯示格式
 * @param date 原始日期
 * @param offset 時區偏移量（分鐘）
 * @returns 指定時區的日期
 */
export function utcToLocal(date: Date, offset: number = TIMEZONE_OFFSET): Date {
    // 根據 offset 的值決定是否考慮本地時區的偏移量
    const utcTime = offset === 0
        ? date.getTime() // 如果 offset 為 0，直接使用日期的毫秒值
        : date.getTime() + date.getTimezoneOffset() * 60000; // 否則轉為 UTC 時間

    // 添加指定的時區偏移量（轉換為毫秒）
    const timeZoneDate = new Date(utcTime + offset * 60000); // 調整為目標時區的時間

    return timeZoneDate;
}