const checkerService = require('./checker.service');

describe('Checker Service', () => {
    describe('checkProfessionalExperience', () => {
        it('should return 0 issues if it matches the expected format', () => {
            const input = {
                id: 4,
                companyName: "Okuneva, Kerluke and Strosin",
                startDate: "2016-01-01T00:00:00+01:00",
                endDate: "2018-05-01T00:00:00+01:00",
                skills: [{
                    id: 241,
                    name: "React"
                }]
            };

            const result = checkerService.checkProfessionalExperience(input);
            expect(result).toEqual([]);
        });

        it('should return an issue when the id is missing', () => {
            const input = {
                companyName: "Okuneva, Kerluke and Strosin",
                startDate: "2016-01-01T00:00:00+01:00",
                endDate: "2018-05-01T00:00:00+01:00",
                skills: [{
                    id: 241,
                    name: "React"
                }]
            };

            const result = checkerService.checkProfessionalExperience(input);
            expect(result).toEqual(['Unknown professional experience, missing id']);
        });

        it('should return an issue when the start date is missing', () => {
            const input = {
                id: 4,
                companyName: "Okuneva, Kerluke and Strosin",
                endDate: "2018-05-01T00:00:00+01:00",
                skills: [{
                    id: 241,
                    name: "React"
                }]
            };

            const result = checkerService.checkProfessionalExperience(input);
            expect(result).toEqual([`Start date is missing in P.E.: ${input.id}`]);
        });

        it('should return an issue when the start date format is wrong', () => {
            const input = {
                id: 4,
                companyName: "Okuneva, Kerluke and Strosin",
                startDate: "toto",
                endDate: "2018-05-01T00:00:00+01:00",
                skills: [{
                    id: 241,
                    name: "React"
                }]
            };

            const result = checkerService.checkProfessionalExperience(input);
            expect(result).toEqual([`Cannot parse 'startDate' in P.E.: ${input.id}`]);
        });

        it('should return an issue when the end date is missing', () => {
            const input = {
                id: 4,
                companyName: "Okuneva, Kerluke and Strosin",
                startDate: "2016-01-01T00:00:00+01:00",
                skills: [{
                    id: 241,
                    name: "React"
                }]
            };

            const result = checkerService.checkProfessionalExperience(input);
            expect(result).toEqual([`End date is missing in P.E.: ${input.id}`]);
        });

        it('should return an issue when the end date format is wrong', () => {
            const input = {
                id: 4,
                companyName: "Okuneva, Kerluke and Strosin",
                startDate: "2016-01-01T00:00:00+01:00",
                endDate: "toto",
                skills: [{
                    id: 241,
                    name: "React"
                }]
            };

            const result = checkerService.checkProfessionalExperience(input);
            expect(result).toEqual([`Cannot parse 'endDate' in P.E.: ${input.id}`]);
        });

        it('should return an issue when skills are missing', () => {
            const input = {
                id: 4,
                companyName: "Okuneva, Kerluke and Strosin",
                startDate: "2016-01-01T00:00:00+01:00",
                endDate: "2018-05-01T00:00:00+01:00"
            };

            const result = checkerService.checkProfessionalExperience(input);
            expect(result).toEqual([`Skills are missing in P.E.: ${input.id}`]);
        });

        it('should return various issues when the data is wrong', () => {
            const input = {
                id: 4,
                companyName: "Okuneva, Kerluke and Strosin",
                startDate: "toto",
                endDate: "titi"
            };

            const expectedIssues = [
                `Cannot parse 'startDate' in P.E.: ${input.id}`,
                `Cannot parse 'endDate' in P.E.: ${input.id}`,
                `Skills are missing in P.E.: ${input.id}`
            ]
            const result = checkerService.checkProfessionalExperience(input);
            expect(result).toEqual(expectedIssues);
        });
    });
});