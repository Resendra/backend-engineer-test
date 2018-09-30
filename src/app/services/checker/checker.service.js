const moment = require('moment');

/**
 * Checks if the professional experience data matches with what we expect from it
 * @param professionalExperience A professional experience which has a duration (startDate, endDate), used skills and some metadata
 * @returns An array which contains any issue with the given structure (wrong date formats, missing metadata etc...)
 */
const checkProfessionalExperience = (professionalExperience) => {
    const issues = [];
    if (!professionalExperience.id) issues.push('Unknown professional experience, missing id');
    else {
        //  Note that we only support the ISO_8601 format here but it can be extended with other formats
        if (!professionalExperience.startDate) issues.push(`Start date is missing in P.E.: ${professionalExperience.id}`);
        else if (!moment(professionalExperience.startDate, moment.ISO_8601).isValid()) issues.push(`Cannot parse 'startDate' in P.E.: ${professionalExperience.id}`);

        if (!professionalExperience.endDate) issues.push(`End date is missing in P.E.: ${professionalExperience.id}`);
        else if (!moment(professionalExperience.endDate, moment.ISO_8601).isValid()) issues.push(`Cannot parse 'endDate' in P.E.: ${professionalExperience.id}`);

        if (!professionalExperience.skills) issues.push(`Skills are missing in P.E.: ${professionalExperience.id}`);
    }

    return issues;
}

module.exports = {
    checkProfessionalExperience: checkProfessionalExperience
};