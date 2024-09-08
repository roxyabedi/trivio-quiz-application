package com.nianti.controllers;

import com.nianti.models.Quiz;
import com.nianti.services.QuizDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class editController
{

    @Autowired
    private QuizDao quizDao;

    @GetMapping("/quizzes")
    public String getEditPage(Model model)
    {
        var quizzes = quizDao.getAllQuizzes();
        Quiz quiz = new Quiz();

        model.addAttribute("title", "Trivio Home");
        model.addAttribute("quizzes", quizzes);
        model.addAttribute("quiz", quiz);

        return "edit/index";
    }

    @PostMapping("/quizzes")
    public String addQuiz(Model model, @ModelAttribute("quiz") Quiz quiz)
    {
        quizDao.addQuiz(quiz);
        model.addAttribute("quiz", quiz);
        return "redirect:/quizzes";
    }
}
