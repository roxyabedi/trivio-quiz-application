package com.nianti.controllers;

import com.nianti.models.Quiz;
import com.nianti.services.AnswerDao;
import com.nianti.services.QuestionDao;
import com.nianti.services.QuizDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class QuizController {

    @Autowired
    private QuizDao quizDao;
    @Autowired
    private QuestionDao questionDao;
    @Autowired
    private AnswerDao answerDao;

    @GetMapping("/quiz")
    public String getQuizPage(Model model, @RequestParam int quizId)
    {
        var quizzes = quizDao.getAllQuizzes();

        var quizModel = quizzes.stream()
                .filter(quiz -> quiz.getQuizId() == quizId)
                .findFirst();

        if (quizModel.isPresent())
        {
            model.addAttribute("quizModel", quizModel.get());
        }
        else {
            model.addAttribute("quizModel", new Quiz());
        }

        return "quiz/index";
    }

    @GetMapping("/quiz/{quizId}")
    public String getQuiz(Model model, @PathVariable int quizId)
    {

        var questions = questionDao.getQuestionsByQuizId(quizId);
        var quizzes = quizDao.getAllQuizzes();

        var quizModel = quizzes.stream()
                .filter(quiz -> quiz.getQuizId() == quizId)
                .findFirst();

        if (quizModel.isPresent())
        {
            model.addAttribute("quizModel", quizModel.get());
        }
        else {
            model.addAttribute("quizModel", new Quiz());
        }

        model.addAttribute("questions", questions);
        model.addAttribute("quiz", quizzes);
        model.addAttribute("id", quizId);

        return "quiz/test";
    }
    @GetMapping("/quiz/setup/{quizId}")
    public String getQuizFragment(Model model, @PathVariable int quizId, @RequestParam int currentQuestion){

        var questions = questionDao.getQuestionsByQuizId(quizId);

        var activeQuestion = questions.stream()
                .filter(question -> question.getQuestionId() == currentQuestion)
                .findFirst();

        if (activeQuestion.isPresent())
        {
            var answers = answerDao.getAnswersByQuestionId(currentQuestion);
            var question = activeQuestion.get().getQuestionText();

            model.addAttribute("activeQuestion", question);
            model.addAttribute("answers", answers);
        }
        else {
            model.addAttribute("questionNumber", new Quiz());
        }

//        model.addAttribute("questions", questions);
//        model.addAttribute("answers", answers);

        return "/fragments/quiz-question";
    }


}
