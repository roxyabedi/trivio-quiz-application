package com.nianti.controllers;

import com.nianti.models.Quiz;
import com.nianti.services.QuizDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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

        model.addAttribute("title", "Trivio Home");
        model.addAttribute("quizzes", quizzes);

        return "edit/index";
    }
}
