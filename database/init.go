package database

import (
	"database/sql"
	"fmt"
	"log"
)

func InitializeDatabase() {
	var err error

	DB, err = sql.Open("sqlite3", "./database.db")

	if err != nil {
		log.Fatal(err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatal(err)
	}

	_, err = DB.Exec("PRAGMA foreign_keys = ON;")
	if err != nil {
		log.Fatal(err)
	}

	CreateSurveysTable()
	CreateQuestionsTable()
	CreateParticipantsTable()
	CreateResponsesTable()

	fmt.Println("Database connection established successfully!")
}
