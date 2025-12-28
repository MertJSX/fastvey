package types

type Survey struct {
	Id          uint   `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	EmailSuffix string `json:"emailSuffix"`
	CreatedAt   string `json:"createdAt"`
}
