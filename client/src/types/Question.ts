export interface Question {
    id?: number,
    surveyId: number,
    questionText: string,
    image: string,
    questionType: string,
    minLabel: string,
    maxLabel: string,
    displayOrder: string
}