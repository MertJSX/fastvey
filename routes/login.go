package routes

import (
	"github.com/MertJSX/fastvey-server/utils"
	"github.com/gofiber/fiber/v2"
)

func Login(c *fiber.Ctx) error {
	var body map[string]interface{}
	err := c.BodyParser(&body)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"err": "Bad request!",
		})
	}

	reqUsername, hasUsername := body["username"].(string)
	reqPassword, hasPassword := body["password"].(string)

	if !hasUsername && !hasPassword {
		return c.Status(400).JSON(fiber.Map{
			"err": "Bad request!",
		})
	}

	if reqUsername != utils.Config.Admin.Username || reqPassword != utils.Config.Admin.Password {
		return c.Status(400).JSON(fiber.Map{
			"err": "Wrong password or username!",
		})
	}

	token, err := utils.CreateToken(reqUsername, utils.Config.JWTSecret)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"err": "Unknown error while creating token!",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"token": token,
	})
}
