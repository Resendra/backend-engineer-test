const dateService = require('../date/date.service');

/**
 * Groups a set of skills and their different durations from given professional experiences
 * @param professionalExperiences A set of professional experiences
 * @returns An Object which contains each skill grouped by ID and associated with all their durations from various professional experiences
 */
const groupSkillsByIdWithDurations = (professionalExperiences) => {
    const skills = professionalExperiences
        .reduce((acc, professionalExperience) => {
            //  Maps each professionalExperience's start date and end date in their associated skill
            const skills = professionalExperience.skills.map((skill) => {
                skill.duration = {
                    startDate: professionalExperience.startDate,
                    endDate: professionalExperience.endDate
                };
                return skill;
            });
            return acc.concat(skills);
        }, [])
        .reduce((acc, concatenatedSkill) => {
            //  Groups each skill by skill id and regroup their duration
            const id = concatenatedSkill.id;
            if (acc[id]) {
                acc[id].durations.push(concatenatedSkill.duration);
            } else {
                acc[id] = {
                    id: concatenatedSkill.id,
                    name: concatenatedSkill.name,
                    durations: [concatenatedSkill.duration]
                };
            }
            return acc;
        }, {});

    return skills;
}

/**
 * Computes a freelancer's skills with their total duration in months from its professional experiences
 * @param professionalExperiences A set of professional experiences
 * @returns An array of skills with their total duration in months
 */
const computeSkillsWithDurationByMonth = (professionalExperiences) => {
    const groupedSkillsById = groupSkillsByIdWithDurations(professionalExperiences);
    const groupedSkills = Object.values(groupedSkillsById); //  Retrieves values in an array
    return groupedSkills
        .map(skill => {
            const mergedDurations = dateService.mergeOverlappingDurations(skill.durations);
            const durationInMonths = mergedDurations
                .reduce((sum, mergedDuration) => {
                    //  Converts a duration to its equivalent in months and add it to the sum
                    sum = sum + dateService.convertDurationToMonths(mergedDuration);
                    return sum;
                }, 0);
            //  Maps a skill to the expected format
            return {
                id: skill.id,
                name: skill.name,
                durationInMonths: durationInMonths
            };
        });
};

module.exports = {
    computeSkillsWithDurationByMonth: computeSkillsWithDurationByMonth
};