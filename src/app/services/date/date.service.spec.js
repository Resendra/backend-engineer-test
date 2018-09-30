const dateService = require('./date.service');

describe('Date Service', () => {
    describe('mergeOverlappingDurations', () => {
        it('should merge overlapping durations and create only one entry (not sorted by start date)', () => {
            const input = [{
                    startDate: "2016-01-01T00:00:00+01:00",
                    endDate: "2018-05-01T00:00:00+01:00"
                },
                {
                    startDate: "2013-01-01T00:00:00+01:00",
                    endDate: "2016-05-01T00:00:00+01:00"
                }
            ];

            const expectedResult = [{
                startDate: '2013-01-01T00:00:00+01:00',
                endDate: '2018-05-01T00:00:00+01:00'
            }];

            const result = dateService.mergeOverlappingDurations(input);
            expect(result).toEqual(expectedResult);
        });

        it('should merge overlapping durations and create only one entry (sorted by start date)', () => {
            const input = [{
                    startDate: "2013-01-01T00:00:00+01:00",
                    endDate: "2016-05-01T00:00:00+01:00"
                },
                {
                    startDate: "2016-01-01T00:00:00+01:00",
                    endDate: "2018-05-01T00:00:00+01:00"
                }
            ];

            const expectedResult = [{
                startDate: '2013-01-01T00:00:00+01:00',
                endDate: '2018-05-01T00:00:00+01:00'
            }];

            const result = dateService.mergeOverlappingDurations(input);
            expect(result).toEqual(expectedResult);
        });

        it('should not merge durations if none of them are overlapping', () => {
            const input = [{
                    startDate: "2013-01-01T00:00:00+01:00",
                    endDate: "2016-05-01T00:00:00+01:00"
                },
                {
                    startDate: "2016-05-01T00:00:00+01:00",
                    endDate: "2018-05-01T00:00:00+01:00"
                }
            ];

            const expectedResult = [{
                    startDate: "2013-01-01T00:00:00+01:00",
                    endDate: "2016-05-01T00:00:00+01:00"
                },
                {
                    startDate: "2016-05-01T00:00:00+01:00",
                    endDate: "2018-05-01T00:00:00+01:00"
                }
            ];

            const result = dateService.mergeOverlappingDurations(input);
            expect(result).toEqual(expectedResult);
        });

        it('should merge a duration which is in the range of another duration', () => {
            const input = [{
                    startDate: "2013-01-01T00:00:00+01:00",
                    endDate: "2016-05-01T00:00:00+01:00"
                },
                {
                    startDate: "2016-05-01T00:00:00+01:00",
                    endDate: "2018-05-01T00:00:00+01:00"
                },
                //  should be merged in the first duration
                {
                    startDate: "2014-05-01T00:00:00+01:00",
                    endDate: "2015-06-01T00:00:00+01:00"
                }
            ];

            const expectedResult = [{
                    startDate: "2013-01-01T00:00:00+01:00",
                    endDate: "2016-05-01T00:00:00+01:00"
                },
                {
                    startDate: "2016-05-01T00:00:00+01:00",
                    endDate: "2018-05-01T00:00:00+01:00"
                }
            ];

            const result = dateService.mergeOverlappingDurations(input);
            expect(result).toEqual(expectedResult);
        });

        it('should merge a duration which has the exact same dates of another duration', () => {
            const input = [{
                    startDate: "2013-01-01T00:00:00+01:00",
                    endDate: "2016-05-01T00:00:00+01:00"
                },
                {
                    startDate: "2016-05-01T00:00:00+01:00",
                    endDate: "2018-05-01T00:00:00+01:00"
                },
                //  should be merged in the first duration
                {
                    startDate: "2013-01-01T00:00:00+01:00",
                    endDate: "2016-05-01T00:00:00+01:00"
                }
            ];

            const expectedResult = [{
                    startDate: "2013-01-01T00:00:00+01:00",
                    endDate: "2016-05-01T00:00:00+01:00"
                },
                {
                    startDate: "2016-05-01T00:00:00+01:00",
                    endDate: "2018-05-01T00:00:00+01:00"
                }
            ];

            const result = dateService.mergeOverlappingDurations(input);
            expect(result).toEqual(expectedResult);
        });
    });
});