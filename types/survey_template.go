package types

type SurveyTemplate struct {
	Id          *uint   `json:"id,omitempty"`
	Title       string  `json:"title"`
	Description string  `json:"description"`
	CreatedAt   *string `json:"createdAt,omitempty"`
}
