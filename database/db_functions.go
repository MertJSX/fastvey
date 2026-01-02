package database

import (
	"github.com/MertJSX/fastvey-server/types"
)

func CreateSurvey(survey types.Survey) (uint, error) {
	stmt, err := DB.Prepare(`
	INSERT INTO surveys (
    	title,
    	description,
		email_suffix
	) VALUES (?, ?, ?);
	`)

	if err != nil {
		return 0, err
	}

	result, err := stmt.Exec(survey.Title, survey.Description, survey.EmailSuffix)

	if err != nil {
		return 0, err
	}

	lastInsertID, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return uint(lastInsertID), nil
}

func CreateSurveyQuestions(questions []types.Question) error {
	stmt, err := DB.Prepare(`
	INSERT INTO questions (
    	survey_id,
    	question_text,
		image,
		question_type,
		min_label,
		max_label,
		display_order
	) VALUES (?, ?, ?, ?, ?, ?, ?);
	`)

	if err != nil {
		return err
	}

	for _, v := range questions {
		_, err = stmt.Exec(v.SurveyId, v.QuestionText, v.Image, v.QuestionType, v.MinLabel, v.MaxLabel, v.DisplayOrder)

		if err != nil {
			return err
		}
	}

	return nil

}
