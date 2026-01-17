import SurveyTemplatesList from "../components/SurveyTemplatesList"
import GeneralStats from "../components/GeneralStats"

const Home = () => {
  return (
    <div className="flex gap-2 px-2">
      <GeneralStats />
      <SurveyTemplatesList />
    </div>
  )
}

export default Home