import type React from "react"
import type { Survey } from "../types/Survey"

interface CreateSurveyProps {
  surveyInfo: Survey,
  setSurveyInfo: React.Dispatch<React.SetStateAction<Survey>>
}

const CreateSurvey: React.FC<CreateSurveyProps> = ({ surveyInfo, setSurveyInfo }) => {
  return (
    <div className="w-full flex flex-col p-3 bg-gray-800 border border-pink-300 m-2">
      <h1 className="text-2xl font-extrabold">Survey information</h1>
      <label className="text-gray-300 italic text-md ml-3 text-justify">Survey title is required. You can set it whatever you want.</label>
      <input className="border border-gray-600 bg-gray-800 m-2 text-xl px-2 focus:border-pink-200" type="text" placeholder="*Title"
        value={surveyInfo.title}
        onChange={(e) => {
          setSurveyInfo({
            title: e.target.value,
            description: surveyInfo.description,
            emailSuffix: surveyInfo.emailSuffix
          })
        }}
      />
      <label className="text-gray-300 italic text-md ml-3 text-justify">Description that will be showed before starting the survey.</label>
      <input className="border border-gray-600 bg-gray-800 m-2 text-xl px-2 focus:border-pink-200" type="text" placeholder="Description (Optional)"
        value={surveyInfo.description}
        onChange={(e) => {
          setSurveyInfo({
            title: surveyInfo.title,
            description: e.target.value,
            emailSuffix: surveyInfo.emailSuffix
          })
        }}
      />
      <label className="text-gray-300 italic text-md ml-3 text-justify">You can force users to use only one email suffix to ensure that no one cheats or there is no bots. For example in bulgarian schools @edu.mon.bg is given only to highschool students, teachers or people related with education. No one else can have this suffix.</label>
      <input className="border border-gray-600 bg-gray-800 m-2 text-xl px-2 focus:border-pink-200" type="text" placeholder="Email suffix (Optional)"
        value={surveyInfo.emailSuffix}
        onChange={(e) => {
          setSurveyInfo({
            title: surveyInfo.title,
            description: surveyInfo.description,
            emailSuffix: e.target.value
          })
        }}
      />
    </div>
  )
}

export default CreateSurvey