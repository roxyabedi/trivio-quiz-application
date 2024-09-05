package com.nianti.services;

import com.nianti.models.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.apache.commons.dbcp2.BasicDataSource;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Component
public class QuestionDao
{
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public QuestionDao()
    {
        String databaseUrl = "jdbc:mysql://localhost:3306/trivio";
        String userName = "root";
        String password = "P@ssw0rd";
        DataSource dataSource = new BasicDataSource(){{
            setUrl(databaseUrl);
            setUsername(userName);
            setPassword(password);
        }};

        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Question> getQuestionsByQuizId(int quizId)
    {
        ArrayList<Question> questions = new ArrayList<>();

        String sql = """
                SELECT *
                FROM question
                WHERE quiz_id = ?;
                """;

        var row = jdbcTemplate.queryForRowSet(sql, quizId);

        while(row.next()){
            int questionId = row.getInt("question_id");
            quizId = row.getInt("quiz_id");
            int questionNumber = row.getInt("question_number");
            String questionText = row.getString("question_text");

            Question question = new Question(questionId, quizId, questionNumber, questionText);

            questions.add(question);
        }
        return questions;
    }
}
