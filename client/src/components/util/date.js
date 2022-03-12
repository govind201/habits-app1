export function toDay(date) {
    return indexToDay(date.getDay()) + ", " + indexToMonth(date.getMonth()) + " " + date.getDate() + ", " + date.getFullYear();
}

export function toWeek(date) {
    var dateSunday = new Date();

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    dateSunday.setTime(date.getTime() - millisecondsPerDay * date.getDay());

    return "Week of " + toDay(dateSunday);
}

export function toMonth(date) {
    return indexToMonth(date.getMonth()) + " " + date.getFullYear();
}

function indexToMonth(index) {
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return month[index];
}

function indexToDay(index) {
    const day = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return day[index]
}