package utils

import (
	"fmt"
	"log"
	"os"

	"github.com/MertJSX/fastvey-server/database"
	"github.com/MertJSX/fastvey-server/resources"
)

func InitConfig() {
	_, err := os.Stat("./config.yml")

	if os.IsNotExist(err) {
		fmt.Println("Creating config file...")
		configContent, err := resources.DefaultConfig.ReadFile("default_config.yml")

		if err != nil {
			log.Fatalf("Error reading embedded file: %s", err)
		}

		err = os.WriteFile("config.yml", configContent, 0700)

		if err != nil {
			log.Fatalf("Error creating config.yml")
		}
	}
}

func Init() {
	InitConfig()
	database.InitializeDatabase()
}
