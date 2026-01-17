import { useCallback, useState } from "react"
import CreateSurveyTemplate from "../components/CreateSurvey"
import type { Question } from "../types/Question";
import QuestionCreator from "../components/QuestionCreator";
import QuestionsList from "../components/QuestionsList";
import type { SurveyTemplate } from "../types/SurveyTemplate";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const NewSurveyTemplate = () => {
  const [surveyInfo, setSurveyInfo] = useState<SurveyTemplate>({
    title: "",
    description: ""
  })
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const navigate = useNavigate()

  const createSurveyTemplate = useCallback(() => {
    if (questions.length == 0) {
      return
    }
    if (surveyInfo.title == "") {
      return
    }

    axiosInstance.post("/admin/survey-templates/new", {
      surveyTemplateInfo: surveyInfo,
      questions: questions
    }).then(() => {
      navigate("/")
    }).catch((err) => {
      console.error(err);
    })
  }, [surveyInfo, setSurveyInfo, questions, setQuestions])

  return (
    <div className="flex box-border gap-5">
      <div className="flex flex-col w-1/3">
        <CreateSurveyTemplate surveyTemplateInfo={surveyInfo} setSurveyInfo={setSurveyInfo} />
        <button className="w-full bg-pink-400 hover:bg-pink-500 cursor-pointer m-2 mt-0 text-xl rounded-md"
        onClick={() => {createSurveyTemplate()}}
        >Create Template</button>
      </div>
      <div className="flex flex-col w-2/3 m-2 gap-5">
        <QuestionCreator setQuestions={setQuestions} />
        <QuestionsList questions={questions} setQuestions={setQuestions} />
      </div>
    </div>
  )
}

export default NewSurveyTemplate