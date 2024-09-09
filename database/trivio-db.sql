-- Drop and create the database
DROP DATABASE IF EXISTS trivio;
CREATE DATABASE trivio;
USE trivio;

-- Create tables
CREATE TABLE quiz
(
    quiz_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    quiz_title VARCHAR(255),
    quiz_description VARCHAR(255),
    is_live BOOLEAN DEFAULT 0
);

CREATE TABLE question
(
    question_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    question_number INT NOT NULL,
    question_text VARCHAR(2000) NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id)
);

CREATE TABLE answer
(
    answer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    answer_text VARCHAR(2000) NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (question_id) REFERENCES question(question_id)
);

-- Insert quizzes
INSERT INTO quiz (quiz_title, quiz_description, is_live) VALUES
('General History', 'A quiz covering significant events and figures in world history.', 1),
('Academic Trivia', 'A quiz with questions on various academic subjects including chemistry, mathematics, and literature.', 0),
('Pop Culture', 'A quiz focused on recent popular culture, including movies, TV shows, and celebrities.', 1),
('Science', 'A quiz about fundamental scientific concepts and discoveries.', 1),
('Geography', 'A quiz exploring geographical knowledge, including countries, rivers, and landmarks.', 1);

-- Insert questions and answers for 'General History'
INSERT INTO question (quiz_id, question_number, question_text) VALUES
(1, 1, 'Who was the first President of the United States?'),
(1, 2, 'What year did the Titanic sink?'),
(1, 3, 'Which empire was famously led by Genghis Khan?'),
(1, 4, 'The fall of the Berlin Wall occurred in which year?'),
(1, 5, 'Who was the British Prime Minister during World War II?');

INSERT INTO answer (question_id, answer_text, is_correct) VALUES
(1, 'Thomas Jefferson', 0),
(1, 'George Washington', 1),
(1, 'Abraham Lincoln', 0),
(1, 'John Adams', 0),

(2, '1912', 1),
(2, '1905', 0),
(2, '1923', 0),
(2, '1915', 0),

(3, 'Ottoman Empire', 0),
(3, 'Roman Empire', 0),
(3, 'Mongol Empire', 1),
(3, 'Persian Empire', 0),

(4, '1979', 0),
(4, '1985', 0),
(4, '1989', 1),
(4, '1991', 0),

(5, 'Neville Chamberlain', 0),
(5, 'Winston Churchill', 1),
(5, 'Margaret Thatcher', 0),
(5, 'Harold Wilson', 0);

-- Insert questions and answers for 'Academic Trivia'
INSERT INTO question (quiz_id, question_number, question_text) VALUES
(2, 1, 'What is the chemical symbol for gold?'),
(2, 2, 'In which year did the United States declare its independence?'),
(2, 3, 'Who wrote the play Romeo and Juliet?'),
(2, 4, 'What is the formula for the area of a circle?'),
(2, 5, 'What is the powerhouse of the cell?');

INSERT INTO answer (question_id, answer_text, is_correct) VALUES
(6, 'Au', 1),
(6, 'Ag', 0),
(6, 'Fe', 0),
(6, 'Pb', 0),

(7, '1776', 1),
(7, '1789', 0),
(7, '1801', 0),
(7, '1812', 0),

(8, 'Charles Dickens', 0),
(8, 'William Shakespeare', 1),
(8, 'Mark Twain', 0),
(8, 'Jane Austen', 0),

(9, '2πr', 0),
(9, 'πd', 0),
(9, 'πr²', 1),
(9, '2πd', 0),

(10, 'Nucleus', 0),
(10, 'Ribosome', 0),
(10, 'Endoplasmic reticulum', 0),
(10, 'Mitochondria', 1);

-- Insert questions and answers for 'Pop Culture'
INSERT INTO question (quiz_id, question_number, question_text) VALUES
(3, 1, 'Who played Jack Dawson in the movie Titanic?'),
(3, 2, 'What is the name of the fictional town in "Stranger Things"?'),
(3, 3, 'Which superhero is known as "The Dark Knight"?'),
(3, 4, 'Who won the Grammy Award for Album of the Year in 2022?'),
(3, 5, 'Which streaming service is known for producing "The Crown"?');

INSERT INTO answer (question_id, answer_text, is_correct) VALUES
(11, 'Leonardo DiCaprio', 1),
(11, 'Johnny Depp', 0),
(11, 'Brad Pitt', 0),
(11, 'Tom Hanks', 0),

(12, 'Hawkins', 1),
(12, 'Sunnydale', 0),
(12, 'Raccoon City', 0),
(12, 'Hill Valley', 0),

(13, 'Superman', 0),
(13, 'Spider-Man', 0),
(13, 'Iron Man', 0),
(13, 'Batman', 1),

(14, 'Olivia Rodrigo', 0),
(14, 'Billie Eilish', 1),
(14, 'Taylor Swift', 0),
(14, 'Adele', 0),

(15, 'Netflix', 1),
(15, 'Hulu', 0),
(15, 'Amazon Prime Video', 0),
(15, 'HBO Max', 0);

-- Insert questions and answers for 'Science'
INSERT INTO question (quiz_id, question_number, question_text) VALUES
(4, 1, 'What is the chemical symbol for water?'),
(4, 2, 'What planet is known as the Red Planet?'),
(4, 3, 'What is the hardest natural substance on Earth?'),
(4, 4, 'What is the process by which plants make their food?'),
(4, 5, 'What gas do plants absorb from the atmosphere for photosynthesis?');

INSERT INTO answer (question_id, answer_text, is_correct) VALUES
(16, 'H2O', 1),
(16, 'CO2', 0),
(16, 'O2', 0),
(16, 'NaCl', 0),

(17, 'Mars', 1),
(17, 'Venus', 0),
(17, 'Jupiter', 0),
(17, 'Saturn', 0),

(18, 'Diamond', 1),
(18, 'Gold', 0),
(18, 'Platinum', 0),
(18, 'Iron', 0),

(19, 'Photosynthesis', 1),
(19, 'Respiration', 0),
(19, 'Transpiration', 0),
(19, 'Digestion', 0),

(20, 'Carbon Dioxide', 1),
(20, 'Oxygen', 0),
(20, 'Nitrogen', 0),
(20, 'Hydrogen', 0);

-- Insert questions and answers for 'Geography'
INSERT INTO question (quiz_id, question_number, question_text) VALUES
(5, 1, 'What is the capital of France?'),
(5, 2, 'Which river is the longest in the world?'),
(5, 3, 'Which continent is the Sahara Desert located in?'),
(5, 4, 'What is the largest island in the world?'),
(5, 5, 'Which country has the most natural lakes?');

INSERT INTO answer (question_id, answer_text, is_correct) VALUES
(21, 'Paris', 1),
(21, 'London', 0),
(21, 'Berlin', 0),
(21, 'Madrid', 0),

(22, 'Nile', 1),
(22, 'Amazon', 0),
(22, 'Yangtze', 0),
(22, 'Mississippi', 0),

(23, 'Africa', 1),
(23, 'Asia', 0),
(23, 'Australia', 0),
(23, 'South America', 0),

(24, 'Greenland', 1),
(24, 'New Guinea', 0),
(24, 'Borneo', 0),
(24, 'Madagascar', 0),

(25, 'Canada', 1),
(25, 'Russia', 0),
(25, 'United States', 0),
(25, 'Sweden', 0);

-- Insert questions and answers for 'World Capitals'
INSERT INTO quiz (quiz_title, quiz_description, is_live) VALUES
('World Capitals', 'Test your knowledge of world capitals with this quiz covering major cities around the globe.', 1);

INSERT INTO question (quiz_id, question_number, question_text) VALUES
(6, 1, 'What is the capital of Japan?'),
(6, 2, 'What is the capital of Australia?'),
(6, 3, 'What is the capital of Canada?'),
(6, 4, 'What is the capital of Brazil?'),
(6, 5, 'What is the capital of South Africa?'),
(6, 6, 'What is the capital of India?'),
(6, 7, 'What is the capital of Russia?'),
(6, 8, 'What is the capital of Egypt?'),
(6, 9, 'What is the capital of Mexico?'),
(6, 10, 'What is the capital of Argentina?');

INSERT INTO answer (question_id, answer_text, is_correct) VALUES
(26, 'Tokyo', 1),
(26, 'Beijing', 0),
(26, 'Seoul', 0),
(26, 'Hong Kong', 0),

(27, 'Canberra', 1),
(27, 'Sydney', 0),
(27, 'Melbourne', 0),
(27, 'Brisbane', 0),

(28, 'Ottawa', 1),
(28, 'Toronto', 0),
(28, 'Vancouver', 0),
(28, 'Montreal', 0),

(29, 'Brasília', 1),
(29, 'Rio de Janeiro', 0),
(29, 'São Paulo', 0),
(29, 'Buenos Aires', 0),

(30, 'Pretoria', 0),
(30, 'Cape Town', 0),
(30, 'Johannesburg', 0),
(30, 'Bloemfontein', 1),

(31, 'New Delhi', 1),
(31, 'Mumbai', 0),
(31, 'Kolkata', 0),
(31, 'Chennai', 0),

(32, 'Moscow', 1),
(32, 'Saint Petersburg', 0),
(32, 'Novosibirsk', 0),
(32, 'Kazan', 0),

(33, 'Cairo', 1),
(33, 'Alexandria', 0),
(33, 'Luxor', 0),
(33, 'Giza', 0),

(34, 'Mexico City', 1),
(34, 'Guadalajara', 0),
(34, 'Monterrey', 0),
(34, 'Cancún', 0),

(35, 'Buenos Aires', 1),
(35, 'Santiago', 0),
(35, 'Montevideo', 0),
(35, 'Lima', 0);