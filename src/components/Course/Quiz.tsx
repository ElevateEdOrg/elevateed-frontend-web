import { useState } from "react";

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Hemingway", "Tolkien", "Rowling"],
    answer: "Shakespeare",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: "Pacific",
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Hydrogen"],
    answer: "Oxygen",
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    answer: "8",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
    answer: "Da Vinci",
  },
  {
    question: "What is the boiling point of water in Celsius?",
    options: ["90", "100", "110", "120"],
    answer: "100",
  },
  {
    question: "Which gas do plants use for photosynthesis?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide",
  },
];

export const Quiz = () => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(10).fill(null));
  const [score, setScore] = useState(null);

  const handleOptionChange = (questionIndex, option) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = option;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    quizData.forEach((q, index) => {
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
        quizData.map((q, index) => (
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
