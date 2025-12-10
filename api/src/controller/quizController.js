import * as quizService from "../services/quizService.js";

export const generateQuiz = async (req, res) => {
  try {
    const { tutorialId } = req.params;

    if (!tutorialId) {
      return res.status(400).json({
        status: "error",
        message: "tutorialId is required"
      });
    }

    const questions = await quizService.generateQuiz(tutorialId);

    return res.json({
      status: "success",
      tutorialId,
      questions,
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
