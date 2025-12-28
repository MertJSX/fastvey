package types

type Question struct {
	Id           uint   `json:"id"`
	SurveyId     uint   `json:"surveyId"`
	QuestionText string `json:"questionText"`
	Image        string `json:"image"`
	QuestionType string `json:"questionType"`
	MinLabel     string `json:"minLabel"`
	MaxLabel     string `json:"maxLabel"`
	DisplayOrder string `json:"displayOrder"`
}
