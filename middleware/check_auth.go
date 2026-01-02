package middleware

import (
	"github.com/MertJSX/fastvey-server/utils"
	"github.com/gofiber/fiber/v2"
)

func CheckAuth(c *fiber.Ctx) error {
	var body map[string]interface{}

	err := c.BodyParser(&body)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"err": "Bad request"})
	}

	token := c.Get("Authorization")

	if token != "" {
		_, err := utils.VerifyToken(token, utils.Config.JWTSecret)
		if err != nil {
			return c.Status(401).JSON(fiber.Map{"err": "invalid token"})
		}
	}

	return c.Next()
}
