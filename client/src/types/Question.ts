export interface Question {
    id?: number,
    // surveyId?: number, // no need in client
    questionText: string,
    image: string,
    // questionType: string, // existing only in server/database, it's useless in client (for now)
    minLabel: string,
    maxLabel: string,
    // displayOrder?: number // existing only in server/database, it's useless in client
}