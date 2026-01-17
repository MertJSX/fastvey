package routes

import (
	"github.com/MertJSX/fastvey-server/database"
	"github.com/gofiber/fiber/v2"
)

func GetSurveyTemplates(c *fiber.Ctx) error {
	var requestBody struct {
		Offset int `json:"offset"`
	}

	if err := c.BodyParser(&requestBody); err != nil {
		return c.Status(400).JSON(
			fiber.Map{"err": "Bad request! " + err.Error()},
		)
	}

	surveys, err := database.GetSurveyTemplates(requestBody.Offset)

	if err != nil {
		return c.Status(500).JSON(
			fiber.Map{"err": "Database error: " + err.Error()},
		)
	}

	return c.Status(200).JSON(
		fiber.Map{"surveys": surveys},
	)
}
