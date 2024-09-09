# Sprint 2 - Pair Project - Trivio Quiz App

## Pair Programming
This project should be completed using pair-programming. Your team should work as a pair throughout
the project. You should share screens as you develop, and take turns programming (switch who is 
sharing the screen at least every 30 minutes). 

Commit and push your code often.

## Project Management
Use a Kanban Board such as https://trello.com to manage your project. Break your project down into small 
and manageable tasks on your trello board. Move your tasks across the kanban board as you complete them.

## Design
Use diagramming a diagramming tool such as https://lucidchart.com or https://diagrams.net to plan your project.
Save screenshots of your diagrams (or export as pdf) to your project. You can also include screen shots of your
diagrams in your README file.

# Project Description

This project is a quiz application. Users of this website can select a quiz. Once they select a quiz, they
will be asked the questions in the quiz, 1 question at a time. When they select an answer, the page
should display if they selected the correct answer.

At the end of the quiz you should display the users quiz score.

For this project **YOU WILL NOT SAVE USER ANSWERS OR SCORES** to the database.

You have complete freedom to change the CSS and design of the application. It currently uses the `Sketchy` bootswatch bootstrap 
file, but you may choose to use a different bootstrap design, or remove bootstrap entirely. Your site design
can be your own. You just need to ensure that the functionality of the site works as described in the requirements section.

## Database Setup

Run the `trivio-db.sql` database script in the `database` folder to create your database. You can modify the script to add your
own quizzes and questions to the database.

If you choose to change the name of the database you will need to modify the database connection string in the 
`src/main/resources/application.properties` file

## Requirements

#### IMPORTANT: DO NOT EXPAND THE SCOPE OF THESE REQUIREMENTS

It may be tempting to want to add more features to these requirements, such as adding more tables to the database
script so that you can save a users responses and quiz results. **YOU SHOULD NOT DO THIS** Additional features
such as this are outside the scope of this project. You should focus instead on completing the requirements
that are outlined here instead, and complete them in the order that they have been specified.

Development sprints are planned by product owners who specify the priority of the tasks that are to be implemented.
They also specify the order in which they should be developed. A sprint will always have a list of tasks that are 
expected to be completed, and a few **stretch** requirements if there is time for them.

Accordingly, it is not expected that you will complete all of the requirements listed below. Complete as many as
you can reasonably complete in the time that you have. But you should complete them in the order specified.
The quality of your work, and ensuring that both team members are fully able to discuss this project, are more
important that completion of all requirements.

### 1 - As a User I need the ability to take a quiz

This requirement is the primary purpose of this web application - you should not rush through this first requirement.
You will need to create the appropriate `Controllers` and `Dao` methods to retrieve the quiz questions and possible 
answers. Your trello board should have several tasks related to this requirement.

* Allow a user to select a quiz from the home page by clicking on a quiz name. This should take you to the quiz page.
* The quiz page should initially only display the name of the quiz, but no questions.
  * It should also display a start button that will be used to begin the quiz
* Using JavaScript, the start button should load the first question of the quiz.
* When a user selects an answer, the "next" button should be displayed - allowing the user to load the next question
* You should track the number of questions that were answered correctly
* After the last question was answered you should display the final score
* The quiz page should entirely be managed using JavaScript and the `fetch()` API to load one question at a time

### 2 - As a user I need to be able to add and edit quizzes

We do not have logins to this website, so any user should be able to add a new quiz.

* Create a quiz management page that displays all quizzes
* From this page you should be able to click a link to create a new quiz
* The new quiz form should include both client and server side validation when adding a new quiz
  * A new quiz should not show up on the home page unless it has been marked as **live**
* The quiz management page should also allow you to edit a quiz
  * The edit page should also be fully validated
  * Here users should be able to enable and disable quizzes by checking the **isLive** checkbox

### 3 - As a user I need to be able to add quiz questions

The quiz details page should display a list of quiz questions. Users can add new questions or edit current
questions from this list.

* From the quiz management page, allow a user to click on a quiz name to take them to the quiz detail page
* on the quiz detail page, you should display a list of all questions associated with that quiz
* Allow the user to add a new question
* Allow the user to edit an existing question
* Allow the user to click on the name of the question to display the question details (possible answers)

### 4 - As a user I need to be able to add possible answers for each question

* From the Quiz Detail page, allow the user to click on a question name to take them to the question details page
* On the question details page, display a list of all possible answers associated with that question
* Allow the user to add a new answer
* Allow the user to edit an existing answer
* Allow the user to delete an answer from the list
* Only one of the answers for a question should be the correct answer

### README

Your project should include a README file. Take the time to document your project in the README. Include the following sections.


Show a block of code that you are particularly proud of (one block for each team member).

#### Retrospective

* What did you learn from the project?
* What would you do differently?
* What would you do the same?
* If you had more time, what else would you add to the project?


