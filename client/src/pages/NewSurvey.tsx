import { useCallback, useState } from "react"
import CreateSurvey from "../components/CreateSurvey"
import type { Question } from "../types/Question";
import QuestionCreator from "../components/QuestionCreator";
import QuestionsList from "../components/QuestionsList";
import type { Survey } from "../types/Survey";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const NewSurvey = () => {
  const [surveyInfo, setSurveyInfo] = useState<Survey>({
    title: "",
    description: "",
    emailSuffix: ""
  })
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const navigate = useNavigate()

  const createSurvey = useCallback(() => {
    if (questions.length == 0) {
      return
    }
    if (surveyInfo.title == "") {
      return
    }

    axiosInstance.post("/admin/surveys/new", {
      surveyInfo: surveyInfo,
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
        <CreateSurvey surveyInfo={surveyInfo} setSurveyInfo={setSurveyInfo} />
        <button className="w-full bg-pink-400 hover:bg-pink-500 cursor-pointer m-2 mt-0 text-xl rounded-md"
        onClick={() => {createSurvey()}}
        >Create Survey</button>
      </div>
      <div className="flex flex-col w-2/3 m-2 gap-5">
        <QuestionCreator setQuestions={setQuestions} />
        <QuestionsList questions={questions} setQuestions={setQuestions} />
      </div>
    </div>
  )
}

export default NewSurvey