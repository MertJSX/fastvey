package main

import (
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/login", func(c *fiber.Ctx) error {
		return c.SendString("Not implemented yet")
	})

	app.Get("/survey/:id", func(c *fiber.Ctx) error {
		return c.SendString("Not implemented yet")
	})

	app.Post("/survey/respond/:id", func(c *fiber.Ctx) error {
		return c.SendString("Not implemented yet")
	})

	app.Get("/admin/dashboard", func(c *fiber.Ctx) error {
		return c.SendString("Not implemented yet")
	})

	app.Get("/admin/surveys", func(c *fiber.Ctx) error {
		return c.SendString("Not implemented yet")
	})

	app.Post("/admin/surveys/new", func(c *fiber.Ctx) error {
		return c.SendString("Not implemented yet")
	})

	app.Delete("/admin/surveys/delete/:id", func(c *fiber.Ctx) error {
		return c.SendString("Not implemented yet")
	})

	app.Get("/admin/surveys/stats/:id", func(c *fiber.Ctx) error {
		return c.SendString("Not implemented yet")
	})

	app.Listen(":5000")
}
