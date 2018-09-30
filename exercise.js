const fs = require('fs');
const checkerService = require('./src/app/services/checker/checker.service');
const skillService = require('./src/app/services/skill/skill.service');

const freelancerFile = './exercise/freelancer.json'

if (!fs.existsSync(freelancerFile)) {
	console.log('File does not exists');
}

let freelancer = fs.readFileSync(freelancerFile, 'utf8');

freelancer = JSON.parse(freelancer);

// compute all skills duration
if (freelancer && freelancer.freelance) {
	const professionalExperiences = freelancer.freelance.professionalExperiences;
	if (!professionalExperiences) process.exit(1);
	else {
		const issues = professionalExperiences.reduce((issues, professionalExperience) => {
			issues = issues.concat(checkerService.checkProfessionalExperience(professionalExperience));
			return issues;
		}, []);

		if (issues.length > 0) {
			process.exit(1);
		} else {
			const computedSkills = skillService.computeSkillsWithDurationByMonth(freelancer.freelance.professionalExperiences);
			const output = {
				freelance: {
					id: freelancer.freelance.id,
					computedSkills
				}
			}
			// output result
			// console.log(JSON.stringify(output, null, 4));
			const resultFile = './exercise/result.json';
			fs.writeFile(resultFile, JSON.stringify(output, null, 4), (err) => {
				if (err) {
					console.log(`Error while writing output: ${err}, process ending...`);
					process.exit(1);
				} else {
					console.log(`Output result in ${resultFile}`);
				}
			});
		}
	}
}