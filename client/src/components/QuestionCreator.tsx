import type { Question } from "../types/Question"
import { useState } from "react"

interface QuestionCreatorProps {
    setQuestions: React.Dispatch<React.SetStateAction<Array<Question>>>
}

const QuestionCreator: React.FC<QuestionCreatorProps> = ({setQuestions}) => {
  const [questionText, setQuestionText] = useState("")
  const [minLabel, setMinLabel] = useState("Very bad")
  const [maxLabel, setMaxLabel] = useState("Very good")
  return (
    <div className="w-full bg-gray-800 p-4 border border-pink-300">
        <section>
            <h1 className="text-xl font-extrabold">Question Creator</h1>
            <label className="italic text-gray-400">What is your question? For example "How was your day?"</label>
            <textarea className="bg-gray-700 p-1 m-1 w-full" rows={2} value={questionText} onChange={(e) => {setQuestionText(e.target.value)}} placeholder="Question Text" />
            <label className="italic text-gray-400">These are labels on opposite directions. Min label is the text in leftside and max label is the text in right side.</label>
            <div className="flex">
                <input className="w-1/2 text-left bg-gray-700 p-2 border border-gray-500" type="text" value={minLabel} onChange={(e) => setMinLabel(e.target.value)} />
                <input className="w-1/2 text-right bg-gray-700 p-2 border border-gray-500" type="text" value={maxLabel} onChange={(e) => setMaxLabel(e.target.value)} />
            </div>
            <button 
            className="w-full mt-4 bg-pink-400 hover:bg-pink-500 cursor-pointer text-lg font-extrabold"
            onClick={() => {
                const question: Question = {
                    image: "",
                    maxLabel: maxLabel,
                    minLabel: minLabel,
                    questionText: questionText
                }
                setQuestions((prev) => [...prev, question])
                setQuestionText("")
            }}
            >Add</button>
        </section>
    </div>
  )
}

export default QuestionCreator