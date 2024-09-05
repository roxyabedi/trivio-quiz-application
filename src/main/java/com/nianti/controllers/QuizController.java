package com.nianti.controllers;

import com.nianti.services.QuestionDao;
import com.nianti.services.QuizDao;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;


@Controller
public class QuizController {

    private QuizDao quizDao = new QuizDao();
    private QuestionDao questionDao = new QuestionDao();


    @GetMapping("/quiz")
    public String getQuizPage(Model model, @RequestParam int quizId)
    {
        var quizzes = quizDao.getAllQuizzes();

        var quizModel = quizzes.stream()
                .filter(quiz -> quiz.getQuizId() == quizId)
                .findFirst();

        model.addAttribute("quiz", quizModel);

        return "quiz/index";
    }

    @GetMapping("/quiz/{quizId}")
    public String getQuiz(Model model, @PathVariable int quizId)
    {

        var questions = questionDao.getQuestionsByQuizId(quizId);
        var quiz = quizDao.getAllQuizzes();

        model.addAttribute("questions", questions);
        model.addAttribute("quiz", quiz);
        model.addAttribute("id", quizId);

        return "quiz/index";
    }
    @GetMapping("/quiz/setup/{id}")
    public String getQuizFragment(Model model, @PathVariable int quizId){

        var questions = questionDao.getQuestionsByQuizId(quizId);

        model.addAttribute("questions", questions);

        return "/fragments/quiz-question";
    }


}
