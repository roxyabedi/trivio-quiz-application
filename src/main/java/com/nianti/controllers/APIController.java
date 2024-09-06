package com.nianti.controllers;

import com.nianti.models.Answer;
import com.nianti.models.Question;
import com.nianti.models.Quiz;
import com.nianti.services.AnswerDao;
import com.nianti.services.QuestionDao;
import com.nianti.services.QuizDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class APIController {
    @Autowired
    private QuizDao quizDao;
    @Autowired
    private QuestionDao questionDao;
    @Autowired
    private AnswerDao answerDao;

    @GetMapping("/api/quiz")
    public List<Quiz> getQuizzes()
    {
        List<Quiz> quizzes;
        quizzes = quizDao.getAllQuizzes();
        return quizzes;
    }

    @GetMapping("api/quiz/questions/{quizId}")
    public List<Question> getQuestions(@PathVariable int quizId)
    {
        List<Question> questions;
        questions = questionDao.getQuestionsByQuizId(quizId);
        return questions;
    }

    @GetMapping("api/quiz/answers/{quizId}")
    public List<List<Answer>> getAnswers(@PathVariable int quizId)
    {
        List<List<Answer>> answers = new ArrayList<>();

        List<Question> questions = questionDao.getQuestionsByQuizId(quizId);

        questions.stream()
                .forEach(question -> answers.add(answerDao.getAnswersByQuestionId(question.getQuestionId())));

        return answers;
    }
}
