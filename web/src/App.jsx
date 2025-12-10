// src/App.jsx
import React from "react";
import { ThemeProvider } from "./components/context/ThemeContext";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <ThemeProvider>
      <QuizPage />
    </ThemeProvider>
  );
}

export default App;
