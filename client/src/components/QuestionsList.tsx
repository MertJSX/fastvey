import type { Question } from "../types/Question"
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { useCallback, useEffect } from "react";

interface QuestionsListProps {
    questions: Array<Question>,
    setQuestions: React.Dispatch<React.SetStateAction<Array<Question>>>
}

const QuestionsList: React.FC<QuestionsListProps> = ({ questions, setQuestions }) => {
    useEffect(() => {
        console.log("----");
        questions.forEach(element => {
            console.log(element.questionText);
        });
        console.log("----");
    }, [questions])
    const OrderDown = useCallback((index: number) => {
        let questionsMem = [...questions];
        let nextItem = questionsMem[index+1]
        questionsMem[index+1] = questionsMem[index]
        questionsMem[index] = nextItem;
        setQuestions(questionsMem)
    }, [questions, setQuestions])
    const OrderUp = useCallback((index: number) => {
        let questionsMem = [...questions];
        let prevItem = questionsMem[index-1]
        questionsMem[index-1] = questionsMem[index]
        questionsMem[index] = prevItem;
        setQuestions(questionsMem)
    }, [questions, setQuestions])
    const DeleteItem = useCallback((index: number) => {
        const questionsMem = questions.filter((_, i) => i !== index);
        setQuestions(questionsMem);
    }, [questions, setQuestions])
    return (
        <div className="w-full bg-gray-800 p-4 border border-pink-300">
            <h1 className="text-xl mb-5 font-extrabold">Questions</h1>
            <section className="flex flex-col gap-2 justify-center items-center">
                {
                    questions[0] ?
                        questions.map((question, key) => (
                            <article key={key} className="w-full p-3 px-10 border-l-4 border-pink-300 bg-gray-700">
                                <div className="flex">
                                    {
                                        key != questions.length - 1 && questions.length > 1 ? 
                                        <button className="flex items-center bg-gray-800 hover:bg-gray-900 p-1 px-2 cursor-pointer border border-gray-500"
                                        onClick={() => {OrderDown(key)}}
                                        ><FaArrowDown /></button>
                                        : null
                                    }
                                    {
                                        key != 0 && questions.length > 1 ? 
                                        <button className="flex items-center bg-gray-800 hover:bg-gray-900 p-1 px-2 cursor-pointer border border-gray-500"
                                        onClick={() => {OrderUp(key)}}
                                        ><FaArrowUp /></button>
                                        : null
                                    }
                                    <button className="flex items-center bg-gray-800 hover:bg-gray-900 p-1 px-2 cursor-pointer border border-gray-500"
                                    onClick={() => DeleteItem(key)}
                                    ><ImBin /></button>
                                </div>
                                <h1 className="text-md text-gray-200 font-extrabold text-left p-2">{question.questionText}</h1>
                                <div className="flex">
                                    <div className="px-2 w-1/2 bg-gray-600 border border-gray-400 text-left">{question.minLabel}</div>
                                    <div className="px-2 w-1/2 bg-gray-600 border border-gray-400 text-right">{question.maxLabel}</div>
                                </div>
                            </article>
                        ))
                        : (
                            <h1 className="text-center text-gray-500">No questions added yet.</h1>
                        )
                }
            </section>
        </div>
    )
}

export default QuestionsList