package types

type Question struct {
	Id           *uint   `json:"id,omitempty"`
	SurveyId     *uint   `json:"surveyId,omitempty"`
	QuestionText string  `json:"questionText"`
	Image        *string `json:"image,omitempty"`
	QuestionType *string `json:"questionType,omitempty"`
	MinLabel     string  `json:"minLabel"`
	MaxLabel     string  `json:"maxLabel"`
	DisplayOrder *uint   `json:"displayOrder,omitempty"`
}
