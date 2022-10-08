**Sprint Goal:** Learn new technologies including React,MongoDB, nodejs, and Express. Start
the sign in page, calculators, productivity features and forum features. The sprint concludes on
October 7, 11:59 p.m.

**Stories for Sprint 1:** User stories 1-5, 7, 8 13, 15,16-19

**Team Capacity:** 80

**Participants:** Christine, Catherine, Tara, Ishika,Zane, Madison

**What happened during the meeting?:**
- Went through each user story to assign values to them using planning poker. This
    involved discussing the user stories and making clarifications about them. When
    disagreements occurred with user story values, the people who chose the highest and
    lowest values explained their reasoning for their chosen values and the team voted
    again.
- We assigned user stories for sprint 1

# **Tasks breakdown:**
**User Stories to be completed sprint 1**

### User Story 13: As a student learning math (Mark), I want to access the derivative calculator so that I can verify homework answers for calculus I - Assigned to Tara
- Task Breakdown:
	- Figuring out how to translate input format (such as the coexistence of constants, variables, exponents, operations, etc) to a format that can be read by the program (3 hours)
		-  Acceptance Criteria: When the program can distinguish between each term separated by +/-, knows how to deal with negative signs, and knows the type (constant, variable, exponent) involved in each term
	-  Logic in automating the derivative processes (polynomials, chain rule, constants) and implementing its calculations with JavaScript functions (6 hours)
		-  Acceptance Criteria: When all polynomials, equations needing the chain rule, and constants can be derived properly
	-  Creating input tools (ex. trig functions, variables, keyboard, etc) for client to use to enter the derivative, and displaying the result in a neat format (10 hours)
		-  Acceptance Criteria: When buttons can be used on the website to transfer data to the user input of the program
	-  Creating a step-by-step solution to display the answers (12 hours)
		-  Acceptance Criteria: When every problem that can be solved can be displayed in terms of steps taken to solve it, and the strategy used
- Story Points: 13

### User Story 16: As a user, I would like to schedule my day with a daily to-do list so that I can plan out activities/tasks in my day. - Assigned to Christine
- Task Breakdown:
	-  Christine
		-  Creating the UI (20hrs) 
			-  Acceptance Criteria: The UI matches the design of the Figma board
		-  Sort tasks by a variety of filters (complete, deadline, title, timespent…) (2hrs)
			-  Acceptance Criteria: Tasks can be sorted by all 4 attributes immediately when clicking the buttons
- Story Points: 5

### User Story 17: As a user, I would like to start and pause a stopwatch for the item on the to-do list that I am currently working on, so that I can track the amount of time spent on this activity. - Assigned to Christine
- Task Breakdown:
	-  Christine
		-  Display to-do list items (5hrs) 
			-  Acceptance Criteria: All todolist tasks are visible on the page
		-  Creating the UI (20hrs) 
			-  Acceptance Criteria: The UI matches the design of the Figma board
- Story points: 3

### User Story 18: As a user, I would like to view the stopwatch that is currently running so that I know how much time I spent on the current item- Assigned to Christine
- Task Breakdown:
	-  Christine
		-  Logic for saving the time to the database (2hrs) 
			-  Acceptance Criteria: The timespent on tasks in the database reflect the real life time logged on the browser with less than 30 second difference
		-  Toggle the display of the timer (< 1hr) ()
			-  The timer expands and collapses, showing only the toggle and current time,  on a button click
- Story points: 2

### User Story 19: As a user, I would like to mark an item on the to-do list as complete so that I could keep track of which items are completed.- Assigned to Christine
- Task Breakdown:
	-  Christine
		-  Save to the database ( < 1hr)
			-  Acceptance Criteria: The tasks marked as complete are logged accurately in the MongoDB database
- Story points: 1

### User Story 15: As a student learning math (Mark), I want to access the linear algebra calculator so that I can verify homework answers for linear algebra courses. - Assigned to Zane
- Task Breakdown:
	- Learned about react and went through react tutorials (3 days)
		- Acceptance Criteria: Program runs without syntax and compilation errors.
	- Implemented UI for redirection to different calculators( 1 day)
		- Acceptance Criteria: Users can redirect to different types of linear algebra calculators through buttons.
	- Designed classes and functions needed for each calculator (2 day)
		- Acceptance Criteria:Math calculations are correct and efficient.
	- Implemented calculator functionalities( Linear Algebra solvers: matrices, linear transformations, eigenvalues etc.) (3 days)
		- Acceptance Criteria: Users can solve equations/calculate wanted results by using the calculators.
- Story Points: 20

### User Story 23: As a web developer for No Struggle, I want to learn the necessary technologies including MERN stack in order to figure out how to implement my assigned user stories. - Assigned to Tara and Madison
- Task Breakdown:
	-  Tara
		-  Learn how to use react (16 hours)
			-  Acceptance Criteria: Can implement in current task
		-  Learn how to use node and express (16 hours)
			-  Acceptance Criteria: Can implement in current task
		-  Learn how to use MongoDB (16 hours)
			-  Acceptance Criteria: Can implement in current task
		-  Learn useful JavaScript functions (16 hours)
			-  Acceptance Criteria: Can implement in current task
	-  Madison
		-  Learn how to use React (8 hours)
			-  Acceptance Criteria: Can implement in current task
		-  Learn how to use NodeJs and Express (8 hours)
			-  Acceptance Criteria: Can implement in current task
		-  Learn how to use MongoDB (4 hours)
			-  Acceptance Criteria: Can implement in current task
- Story points: 13

### User Story 8: As a user added to a forum (Sarah), I want to post questions, answers, and comments underneath posts so that I can communicate and collaborate with other students -Assigned to Madison
- Task Breakdown:
	-  Page to post questions (In progress)
	-  UI for page to post questions (in progress) - 3 hours
		-  Acceptance Criteria: The UI is user friendly
	-  Post title and content data to MongoDB - 5 hours (complete)
		-  Acceptance Criteria: The data for the title and content is correctly posted in MongoDB
	-  Add ability to select tags for the post and post tags to database- 5 hours
		-  Acceptance Criteria: Users can toggle on and off tags, and the tags that are toggled on when the user finishes the post, is recorded in MongoDB
	-  Check for valid input - 5 hours (in progress)
		-  Acceptance Criteria: A message is displayed to user when they try to submit a post without a title or content
	-  Page to display question and all of its answers - 10 hours(TODO)
		-  Acceptance Criteria: can display a page for a question with the question followed by its answers
	-  Feature to add an answer to a post - 5 hours (TODO)
		-  Acceptance Criteria: answer is added to MongoDB and displayed on page
	-  Feature to comment underneath a post - 8 hours (TODO)
		-  Acceptance Criteria: comment is added to MongoDB and displayed on page
	-  Feature to reply to a comment - 8 hours (TODO)
		-  Acceptance Criteria:reply is added to MongoDB and displayed on page
	-  General comment section for the post including being able to add comments and reply to comments 10 hours (TODO) 
		-  Acceptance Criteria: Comments are in database and can be displayed on page
- Story points: 5

### User Story 1: As a user(Sarah/Mark), I want to log into my account with email and password so that I can use the website.- Assigned to Catherine
- Task Breakdown:
	-  Catherine
		-  Authenticating users - 3 hours
			-  Acceptance Criteria: User can input a valid username and password for an existing account to navigate to the app.
		-  Implement UI for signing in - <1 hour
			-  Acceptance Criteria: Fields for username and password and a button for signing in.
- Story Points: 3

### User Story 2: As an unregistered user(Sarah/Mark), I want to register a new account through username, email, and password so that I can join the website.- Assigned to Catherine
- Task Breakdown:
	- Catherine
		- Save new user in database - 3 hours
			- Acceptance Criteria: User can input a valid username and password for an existing account to navigate to the app.
		- Implement UI for signing up - <1 hour
			- Acceptance Criteria: Fields for username and password and a button for signing up.
- Story Points: 3

### User Story 3: As a user(Sarah/Mark), I want to log out so that I can prevent others around me from accessing my account when I’m absent. - Assigned to Catherine
- Task Breakdown:
	-  Catherine
		-  Removing current user from database in active session - 3 hours
			-  Acceptance Criteria: Given username and password are no longer associated with an account
		-  Implement UI for signing out - 1 hour
			-  Acceptance Criteria: Button for signing out and redirection
- Story Points: 1

### User Story 4: As a user(Sarah/Mark), I want to be able to reset my password through email so that I can log in if I forget my password. - Assigned to Catherine
- Task Breakdown:
	-  Catherine
		-  Sending an email - 2 days
			-  Acceptance Criteria: User can input a valid username and password for an existing account to navigate to the app.
		-  Implement UI for password reset - 4 hours
			-  Acceptance Criteria: User is prompted with password reset dialog.
- Story Points: 13

### User Story 5: As a registered user (Sarah/Mark), I want to view my profile so that I can edit my account details. - Assigned to Catherine
- Task Breakdown:
	-  Catherine
		-  Allow users to edit account details - 1 day
			-  Acceptance Criteria: While in the profile page, users can change their associated username, password and email.
		-  Implement UI for viewing profile - 4 hours
			-  Acceptance Criteria: Access to your profile where account details are displayed.
- Story Points: 3

 
**Spikes:** No spikes


