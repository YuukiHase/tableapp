import { days } from './../constants/ConfigLanguages';

// export const numberWithCommas = (number) => {
//     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

// If there are more than 3 digits after the decimal point.
export const numberWithCommas = (number) => {
    let parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

// Conver Day
export const convertDayToVN = (day) => {
    switch (day) {
        case 1: return days.vn.MONDAY;
        case 2: return days.vn.TUESDAY;
        case 3: return days.vn.WEDNESDAY;
        case 4: return days.vn.THURSDAY;
        case 5: return days.vn.FRIDAY;
        case 6: return days.vn.SATURDAY;
        case 0: return days.vn.SUNDAY;

        default: return day;
    }
}
export const convertDayToEN = (day) => {
    switch (day) {
        case 1: return days.en.MONDAY;
        case 2: return days.en.TUESDAY;
        case 3: return days.en.WEDNESDAY;
        case 4: return days.en.THURSDAY;
        case 5: return days.en.FRIDAY;
        case 6: return days.en.SATURDAY;
        case 0: return days.en.SUNDAY;

        default: return day;
    }
}

export const dateFormat = (date) => {
    let dd = date.getDate();
    let mm = (date.getMonth() < 10) ? `0${date.getMonth()}` : date.getMonth();
    let yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`
}