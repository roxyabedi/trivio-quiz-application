package com.nianti.services;

import com.nianti.models.Answer;
import com.nianti.models.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.List;

@Component
public class AnswerDao
{
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public AnswerDao(DataSource dataSource)
    {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Answer> getAnswersByQuestionId(int questionId)
    {
        return null;
    }
}
