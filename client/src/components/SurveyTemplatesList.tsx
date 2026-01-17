import { Link } from "react-router-dom"

const SurveyTemplatesList = () => {
  return (
    <div className="flex flex-col w-1/3 justify-center items-center">
      <section className="w-full flex justify-between border-b p-2">
        <h1 className="text-2xl font">Survey Templates</h1>
        <Link to="/survey-templates/new" className="bg-pink-400 hover:bg-pink-500 p-2 rounded-2xl px-4">New Template</Link>
      </section>

      <section>
        <h1>No surveys found</h1>
      </section>
    </div>
  )
}

export default SurveyTemplatesList