import type React from "react"
import type { SurveyTemplate } from "../types/SurveyTemplate"

interface CreateSurveyProps {
  surveyTemplateInfo: SurveyTemplate,
  setSurveyInfo: React.Dispatch<React.SetStateAction<SurveyTemplate>>
}

const CreateSurveyTemplate: React.FC<CreateSurveyProps> = ({ surveyTemplateInfo, setSurveyInfo }) => {
  return (
    <div className="w-full flex flex-col p-3 bg-gray-800 border border-pink-300 m-2">
      <h1 className="text-2xl font-extrabold">Template information</h1>
      <label className="text-gray-300 italic text-md ml-3 text-justify">Template title is required. You can set it whatever you want.</label>
      <input className="border border-gray-600 bg-gray-800 m-2 text-xl px-2 focus:border-pink-200" type="text" placeholder="*Title"
        value={surveyTemplateInfo.title}
        onChange={(e) => {
          setSurveyInfo({
            title: e.target.value,
            description: surveyTemplateInfo.description,
          })
        }}
      />
      <label className="text-gray-300 italic text-md ml-3 text-justify">Description that will be showed before starting the survey.</label>
      <input className="border border-gray-600 bg-gray-800 m-2 text-xl px-2 focus:border-pink-200" type="text" placeholder="Description (Optional)"
        value={surveyTemplateInfo.description}
        onChange={(e) => {
          setSurveyInfo({
            title: surveyTemplateInfo.title,
            description: e.target.value,
          })
        }}
      />
      {/* <label className="text-gray-300 italic text-md ml-3 text-justify">You can force users to use only one email suffix to ensure that no one cheats or there is no bots. For example in bulgarian schools @edu.mon.bg is given only to highschool students, teachers or people related with education. No one else can have this suffix.</label>
      <input className="border border-gray-600 bg-gray-800 m-2 text-xl px-2 focus:border-pink-200" type="text" placeholder="Email suffix (Optional)"
        value={surveyInfo.emailSuffix}
        onChange={(e) => {
          setSurveyInfo({
            title: surveyInfo.title,
            description: surveyInfo.description,
            emailSuffix: e.target.value
          })
        }}
      /> */}
    </div>
  )
}

export default CreateSurveyTemplate