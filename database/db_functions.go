package database

import (
	"fmt"

	"github.com/MertJSX/fastvey-server/types"
)

func CreateSurveyTemplate(surveyTemplate types.SurveyTemplate) (uint, error) {
	stmt, err := DB.Prepare(`
	INSERT INTO survey_templates (
    	title,
    	description
	) VALUES (?, ?);
	`)

	if err != nil {
		return 0, err
	}

	result, err := stmt.Exec(surveyTemplate.Title, surveyTemplate.Description)

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
    	survey_template_id,
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
		_, err = stmt.Exec(v.SurveyTemplateId, v.QuestionText, v.Image, v.QuestionType, v.MinLabel, v.MaxLabel, v.DisplayOrder)

		if err != nil {
			return err
		}
	}

	return nil

}

func GetSurveyTemplates(offset int) ([]types.SurveyTemplate, error) {
	var foundList []types.SurveyTemplate
	rows, err := DB.Query(`
	SELECT * FROM surveys
	ORDER BY title DESC
	LIMIT 10 OFFSET ?
	`, offset)

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var surveyTemplateItem types.SurveyTemplate
		if err := rows.Scan(
			&surveyTemplateItem.Id,
			&surveyTemplateItem.Title,
			&surveyTemplateItem.Description,
			&surveyTemplateItem.CreatedAt); err != nil {
			fmt.Println(err)
			return nil, fmt.Errorf("error while getting recovery records: %v", err)
		}

		foundList = append(foundList, surveyTemplateItem)
	}

	return foundList, nil
}

func GetQuestions(surveyTemplateID int) ([]types.Question, error) {
	var foundList []types.Question
	rows, err := DB.Query(`
	SELECT * FROM questions
	WHERE survey_template_id = ?
	ORDER BY display_order
	`, surveyTemplateID)

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var surveyItem types.Question
		if err := rows.Scan(
			&surveyItem.Id,
			&surveyItem.SurveyTemplateId,
			&surveyItem.QuestionText,
			&surveyItem.Image,
			&surveyItem.QuestionType,
			&surveyItem.MinLabel,
			&surveyItem.MaxLabel,
			&surveyItem.DisplayOrder); err != nil {
			fmt.Println(err)
			return nil, fmt.Errorf("error while getting recovery records: %v", err)
		}

		foundList = append(foundList, surveyItem)
	}

	return foundList, nil
}
