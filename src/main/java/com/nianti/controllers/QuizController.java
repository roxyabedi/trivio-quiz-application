package com.nianti.controllers;

import com.nianti.services.QuizDao;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@Controller
public class QuizController {

    private QuizDao QuizDao;


    @GetMapping("/quiz")
    public String getQuizPage(Model model)
    {
        return "quiz/index";
    }

    @GetMapping("/quiz/{quizId}")

    public String getQuiz(Model model, @PathVariable int quizId)
    {
        return "quiz/index";
    }
}
