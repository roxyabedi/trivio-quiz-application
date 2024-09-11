package com.nianti.controllers;

import com.nianti.models.Quiz;
import com.nianti.services.QuizDao;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class EditController
{

    @Autowired
    private QuizDao quizDao;

    @GetMapping("/quizzes")
    public String getEditPage(Model model)
    {
        var quizzes = quizDao.getAllQuizzes();
        Quiz quiz = new Quiz();

        model.addAttribute("title", "Quizzes");
        model.addAttribute("quizzes", quizzes);
        model.addAttribute("quiz", quiz);

        return "edit/index";
    }

    @PostMapping("/quizzes")
    public String addQuiz(Model model, @Valid @ModelAttribute("quiz") Quiz quiz, BindingResult result)
    {
        if(result.hasErrors()){

            var quizzes = quizDao.getAllQuizzes();
            model.addAttribute("IsInvalid", true);
            model.addAttribute("quizzes", quizzes);
            return "edit/index";
        }
        quizDao.addQuiz(quiz);
        return "redirect:/quizzes";
    }
}
