package com.nianti.controllers;

import com.nianti.services.QuestionDao;
import com.nianti.services.QuizDao;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@Controller
public class QuizController {

    private QuizDao quizDao;
    private QuestionDao questionDao;


    @GetMapping("/quiz")
    public String getQuizPage(Model model)
    {
        return "quiz/index";
    }

    @GetMapping("/quiz/{quizId}")

    public String getQuiz(Model model, @PathVariable int quizId)
    {
        var questions = questionDao.getQuestionsByQuizId(quizId);
        var quiz = quizDao.getQuizById(quizId);

        model.addAttribute("questions", questions);
        model.addAttribute("quiz", quiz);
        return "quiz/index";
    }


}
