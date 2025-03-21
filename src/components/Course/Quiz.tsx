import { fetchAIQuiz } from "@/api/courseService";
import { useEffect, useState } from "react";

export const Quiz = () => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(10).fill(null));
  const [score, setScore] = useState<number | null>(null);
  const [quiz, setQuiz] = useState<
    { question: string; options: string[]; answer: string }[]
  >([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetchAIQuiz();
        if (response.status === 200) {
          setQuiz(response.data.data);
        }
      } catch (error) {
        console.error("error fetching quiz", error);
      }
    };
    fetchQuiz();
  }, []);

  const handleOptionChange = (questionIndex: number, option: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = option;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    quiz.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
  };

  return (
    <div className="p-4 relative h-full">
      <h2 className="text-3xl text-center text-gray-800  font-bold mb-4">
        AI QUIZ
      </h2>
      {score === null &&
        quiz.map((q, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold text-2xl">
              {index + 1}. {q.question}
            </p>
            {q.options.map((option, i) => (
              <label
                key={i}
                className={
                  "block  px-6 py-2 rounded-2xl mt-3 transition-all duration-300 " +
                  (selectedAnswers[index] === option
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200")
                }
              >
                <input
                  type="radio"
                  className="hidden"
                  name={`question-${index}`}
                  value={option}
                  checked={selectedAnswers[index] === option}
                  onChange={() => handleOptionChange(index, option)}
                />{" "}
                {option}
              </label>
            ))}
          </div>
        ))}
      <button
        disabled={score !== null || selectedAnswers.includes(null)}
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
      >
        Submit
      </button>
      {score !== null && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-around">
          <p className="text-3xl mt-4 font-bold text-center">
            Your Score <br /> {score}/10
          </p>
          <button
            onClick={() => {
              setScore(null);
              setSelectedAnswers(Array(10).fill(null));
            }}
            className="bg-brand-primary text-white px-6 py-2 rounded-xl hover:opacity-90 cursor-pointer"
          >
            Back to course
          </button>
        </div>
      )}
    </div>
  );
};
