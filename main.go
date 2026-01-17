package main

import (
	"github.com/MertJSX/fastvey-server/middleware"
	"github.com/MertJSX/fastvey-server/routes"
	"github.com/MertJSX/fastvey-server/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	utils.Init()

	app.Use(cors.New())

	app.Post("/api/login", func(c *fiber.Ctx) error {
		return routes.Login(c)
	})

	app.Get("/api/survey/:id", func(c *fiber.Ctx) error {
		return c.SendString("Not implemented yet")
	})

	app.Post("/api/survey/respond/:id", func(c *fiber.Ctx) error {
		return c.SendString("Not implemented yet")
	})

	app.Use("/api/admin", func(c *fiber.Ctx) error {
		return middleware.CheckAuth(c)
	})

	app.Get("/api/admin/dashboard", func(c *fiber.Ctx) error {
		return c.SendString("Not implemented yet")
	})

	app.Get("/api/admin/surveys-templates", func(c *fiber.Ctx) error {
		return routes.GetSurveyTemplates(c)
	})

	app.Post("/api/admin/surveys-templates/new", func(c *fiber.Ctx) error {
		return routes.NewSurveyTemplate(c)
	})

	app.Delete("/api/admin/surveys-templates/delete/:id", func(c *fiber.Ctx) error {
		return c.SendString("Not implemented yet")
	})

	app.Get("/api/admin/surveys/stats/:id", func(c *fiber.Ctx) error {
		return c.SendString("Not implemented yet")
	})

	app.Listen(":5000")
}
