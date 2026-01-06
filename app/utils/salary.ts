export type DayHours = {
    date: Date;
    hours: number;
    isHoliday: boolean;
}

export function calculateDayPay(hour: DayHours, hourlyRate: number) {
    let multiplier = 1;
    if (hour.isHoliday) multiplier = 2;
    else if (hour.date.getDay() === 0) multiplier = 1.5;

    return hour.hours * hourlyRate * multiplier;
}

export function calculateMonthPay(hours: DayHours[], hourlyRate: number) {
    return hours.reduce((total, day) => total + calculateDayPay(day,hourlyRate), 0);
}

export function calculateWithBonus(pay: number) {
    return pay * 1.08;
}

export function calculateVacationPay(pay: number) {
    return pay * 0.08;
}