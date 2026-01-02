package routes

import (
	"github.com/MertJSX/fastvey-server/database"
	"github.com/MertJSX/fastvey-server/types"
	"github.com/gofiber/fiber/v2"
)

func NewSurvey(c *fiber.Ctx) error {
	var requestBody struct {
		SurveyInfo types.Survey     `json:"surveyInfo"`
		Questions  []types.Question `json:"questions"`
	}

	if err := c.BodyParser(&requestBody); err != nil {
		return c.Status(400).JSON(
			fiber.Map{"err": "Bad request! " + err.Error()},
		)
	}

	if len(requestBody.Questions) == 0 {
		return c.Status(400).JSON(
			fiber.Map{"err": "Bad request! You have to add at least 1 question to this survey!"},
		)
	}

	surveyId, err := database.CreateSurvey(requestBody.SurveyInfo)

	if err != nil {
		return c.Status(500).JSON(
			fiber.Map{"err": "Database error: " + err.Error()},
		)
	}

	for i, v := range requestBody.Questions {
		v.SurveyId = &surveyId
		displayOrder := uint(i)
		v.DisplayOrder = &displayOrder
		requestBody.Questions[i] = v
	}

	err = database.CreateSurveyQuestions(requestBody.Questions)

	if err != nil {
		return c.Status(500).JSON(
			fiber.Map{"err": "Database error: " + err.Error()},
		)
	}

	return c.Status(200).JSON(
		fiber.Map{"res": "Successfully created!"},
	)
}
