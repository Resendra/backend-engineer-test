const moment = require('moment');

/**
 * Merges durations which are overlapping and returns them
 * @param durations An array of durations (startDate: string - ISO-formatted, endDate: string - ISO-formatted)
 * @returns An array of durations which have been merged when overlapping and sorted
 */
const mergeOverlappingDurations = (durations) => {
    //  Sorts the durations array by start date (chronologically)
    const sortedDurations = durations.sort((durationA, durationB) => moment(durationA.startDate) - moment(durationB.startDate));

    let index = 0;
    while (index < sortedDurations.length - 1) {
        const currentDurationEndDate = moment(sortedDurations[index].endDate);
        const nextDurationStartDate = moment(sortedDurations[index + 1].startDate);
        const nextDurationEndDate = moment(sortedDurations[index + 1].endDate);
        //  Checks if the current end date is greater than next duration's start date and merges them, otherwise, we iterate
        if (currentDurationEndDate > nextDurationStartDate) {
            //  Checks if the next duration's end date is greater than the current duration's end date, if so, we replace it
            if (currentDurationEndDate < nextDurationEndDate) {
                sortedDurations[index].endDate = sortedDurations[index + 1].endDate;
            }
            sortedDurations.splice(index + 1, 1);
        } else {
            index++;
        }
    }
    return sortedDurations;
};

/**
 * Converts a duration (startDate, endDate) to a duration in months
 * @param duration An Object representing a duration (startDate: string - ISO-formatted, endDate: string - ISO-formatted)
 * @returns A number which represents the difference between a start date and an end date in months
 */
const convertDurationToMonths = (duration) => {
    return moment(duration.endDate).diff(moment(duration.startDate), 'months');
};

module.exports = {
    mergeOverlappingDurations: mergeOverlappingDurations,
    convertDurationToMonths: convertDurationToMonths
};