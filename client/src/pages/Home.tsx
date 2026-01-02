import SurveysList from "../components/SurveysList"
import GeneralStats from "../components/GeneralStats"

const Home = () => {
  return (
    <div className="flex gap-2 px-2">
      <GeneralStats />
      <SurveysList />
    </div>
  )
}

export default Home