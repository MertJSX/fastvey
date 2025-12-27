package utils

import (
	"fmt"
	"log"
	"os"

	"github.com/MertJSX/fastvey-server/database"
	"github.com/MertJSX/fastvey-server/resources"
	"github.com/MertJSX/fastvey-server/types"
	"gopkg.in/yaml.v3"
)

var Config types.ConfigFile

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

	fileData, err := os.ReadFile("./config.yml")

	if err != nil {
		log.Fatalf("Error reading config file: %s", err)
	}

	err = yaml.Unmarshal(fileData, &Config)
	if err != nil {
		log.Fatalf("Config.yml parse error: %v", err)
	}
}

func Init() {
	InitConfig()
	database.InitializeDatabase()
}
