import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import '@testing-library/jest-dom';

// Test for displaying fetched questions
test("displays question prompts after fetching", async () => {
  render(<App />);
  
  // Wait for the questions to be fetched and displayed
  await waitFor(() => {
    expect(screen.queryByText(/lorem testum 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/lorem testum 2/i)).toBeInTheDocument();
  });
});

// Test for creating a new question when the form is submitted
test("creates a new question when the form is submitted", async () => {
  render(<App />);

  // Fill in the form inputs
  fireEvent.change(screen.getByPlaceholderText("Question Prompt"), {
    target: { value: "What is React?" },
  });
  fireEvent.change(screen.getByPlaceholderText("Answer 1"), {
    target: { value: "A JavaScript library" },
  });
  fireEvent.change(screen.getByPlaceholderText("Answer 2"), {
    target: { value: "A database" },
  });
  fireEvent.change(screen.getByPlaceholderText("Answer 3"), {
    target: { value: "A web server" },
  });

  // Submit the form
  fireEvent.click(screen.getByText("Add Question"));

  // Wait for the new question to appear
  await waitFor(() => {
    expect(screen.getByText("What is React?")).toBeInTheDocument();
  });
});

// Test for deleting a question when the delete button is clicked
test("deletes the question when the delete button is clicked", async () => {
  render(<App />);

  // Wait for the questions to be fetched and displayed
  await waitFor(() => {
    expect(screen.queryByText(/lorem testum 1/i)).toBeInTheDocument();
  });

  // Click the delete button for the first question
  fireEvent.click(screen.getAllByText("Delete")[0]);

  // Wait for the question to be removed from the document
  await waitFor(() => {
    expect(screen.queryByText(/lorem testum 1/i)).not.toBeInTheDocument();
  });
});

// Test for updating the correct answer when the dropdown is changed
test("updates the answer when the dropdown is changed", async () => {
  render(<App />);

  // Wait for the second question to be fetched and displayed
  await waitFor(() => {
    expect(screen.queryByText(/lorem testum 2/i)).toBeInTheDocument();
  });

  // Find the dropdown (select element) for the second question
  const dropdowns = screen.getAllByRole("combobox"); // Find all dropdowns
  const secondDropdown = dropdowns[1]; // Select the second dropdown for "Lorem Testum 2"

  // Change the dropdown value to "2"
  fireEvent.change(secondDropdown, { target: { value: "2" } });

  // Wait for the new correct answer to be reflected in the dropdown
  await waitFor(() => {
    expect(secondDropdown).toHaveValue("2");
  });
});