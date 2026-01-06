
export function getMonthStartEnd(date: Date) {
    const year = date.getDate() >= 16 ? date.getFullYear() : date.getFullYear();
    const month = date.getMonth();

    const start = new Date(year, month, 16);
    const end = new Date(year, month + 1, 15);

    return { start, end };
}

export function getExpectedPayDate(date: Date = new Date()) {
    let payDate = new Date(date.getFullYear(), date.getMonth(), 24);
    const day = payDate.getDay();

    if (day === 6) payDate.setDate(23);
    if (day === 0) payDate.setDate(25);

    return payDate;
} 

export function isSunday(date: Date) {
    return date.getDay() === 0;
}