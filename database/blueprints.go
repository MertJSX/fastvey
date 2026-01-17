package database

import (
	"fmt"
	"log"
)

func CreateSurveyTemplatesTable() {
	_, err := DB.Exec(`
	CREATE TABLE IF NOT EXISTS survey_templates (
    	id INTEGER PRIMARY KEY AUTOINCREMENT,
    	title TEXT NOT NULL,
    	description TEXT,
    	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Survey templates table has been created!")
}

func CreateSurveysTable() {
	_, err := DB.Exec(`
	CREATE TABLE IF NOT EXISTS surveys (
    	id INTEGER PRIMARY KEY AUTOINCREMENT,
    	survey_template_id INTEGER NOT NULL,
    	title TEXT NOT NULL,
		email_suffix TEXT,
		start_date TEXT,
		end_date TEXT,
    	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    	FOREIGN KEY (survey_template_id) REFERENCES survey_templates(id) ON DELETE CASCADE
	);
	`)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Survey templates table has been created!")
}

func CreateQuestionsTable() {
	_, err := DB.Exec(`
	CREATE TABLE IF NOT EXISTS questions (
    	id INTEGER PRIMARY KEY AUTOINCREMENT,
    	survey_template_id INTEGER NOT NULL,
    	question_text TEXT NOT NULL,
		image TEXT,
    	question_type TEXT DEFAULT 'scale',-- 'scale', it will fixed for now, but I can add more questions types in future like 'text' and 'multiple_choice'
    	min_label TEXT DEFAULT 'Very Good', -- 1
    	max_label TEXT DEFAULT 'Very Bad',  -- 7
    	display_order INTEGER NOT NULL,
    	FOREIGN KEY (survey_template_id) REFERENCES survey_templates(id) ON DELETE CASCADE
	);
	`)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Questions table has been created!")
}

func CreateParticipantsTable() {
	_, err := DB.Exec(`
	CREATE TABLE IF NOT EXISTS participants (
    	id INTEGER PRIMARY KEY AUTOINCREMENT,
    	survey_id INTEGER NOT NULL,
    	email TEXT NOT NULL,
    	verification_token TEXT UNIQUE,    -- for email verifications
    	is_verified BOOLEAN DEFAULT FALSE,
    	verification_sent_at TIMESTAMP,
    	responded_at TIMESTAMP,            -- when it's answered
    	UNIQUE(survey_id, email),
    	FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE CASCADE
	);
	`)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Participants table has been created!")
}

func CreateResponsesTable() {
	_, err := DB.Exec(`
	CREATE TABLE IF NOT EXISTS responses (
    	id INTEGER PRIMARY KEY AUTOINCREMENT,
    	participant_id INTEGER NOT NULL,
    	question_id INTEGER NOT NULL,
    	answer_value INTEGER,              -- between 1-7
    	answer_text TEXT,                  -- Only for the text type responses, I won't implement it right now. Maybe in future.
    	UNIQUE(participant_id, question_id),
    	FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
    	FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
	);
	`)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Responses table has been created!")
}
