import React, { useEffect, useState } from "react";

// Dummy API request to simulate fetching questions
const fetchQuestions = async () => {
  return [
    { id: 1, prompt: "Lorem Testum 1", answers: ["Answer 1", "Answer 2", "Answer 3"], correctIndex: 0 },
    { id: 2, prompt: "Lorem Testum 2", answers: ["Answer 4", "Answer 5", "Answer 6"], correctIndex: 1 },
  ];
};

function App() {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({
    prompt: "",
    answers: ["", "", ""],
    correctIndex: 0,
  });

  useEffect(() => {
    async function loadQuestions() {
      const questionsData = await fetchQuestions();
      setQuestions(questionsData);
    }
    loadQuestions();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestions([...questions, { id: questions.length + 1, ...form }]);
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const handleAnswerChange = (e, id) => {
    const newQuestions = questions.map((q) =>
      q.id === id ? { ...q, correctIndex: parseInt(e.target.value) } : q
    );
    setQuestions(newQuestions);
  };

  return (
    <div className="App">
      <nav>
        <button>New Question</button>
        <button>View Questions</button>
      </nav>
      <main>
        <section>
          <h1>Quiz Questions</h1>
          <ul>
            {questions.map((q) => (
              <li key={q.id}>
                <p>{q.prompt}</p>
                <select value={q.correctIndex} onChange={(e) => handleAnswerChange(e, q.id)}>
                  {q.answers.map((answer, index) => (
                    <option key={index} value={index}>
                      {answer}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleDelete(q.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
        <form onSubmit={handleSubmit}>
          <input
            name="prompt"
            placeholder="Question Prompt"
            value={form.prompt}
            onChange={handleFormChange}
          />
          <input
            name="answers[0]"
            placeholder="Answer 1"
            value={form.answers[0]}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, answers: [e.target.value, prev.answers[1], prev.answers[2]] }))
            }
          />
          <input
            name="answers[1]"
            placeholder="Answer 2"
            value={form.answers[1]}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, answers: [prev.answers[0], e.target.value, prev.answers[2]] }))
            }
          />
          <input
            name="answers[2]"
            placeholder="Answer 3"
            value={form.answers[2]}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, answers: [prev.answers[0], prev.answers[1], e.target.value] }))
            }
          />
          <button type="submit">Add Question</button>
        </form>
      </main>
    </div>
  );
}

export default App;