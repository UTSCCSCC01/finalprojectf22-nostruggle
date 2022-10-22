---
title: "Forum"
date: 2022-10-07T21:26:47-04:00
draft: false
author: "Team NoStruggle"
menu: 
    main: 
        title: "Forum"
        parent: 'features'
        weight: 1
---

### Posting a new question to the forum

CreatePost creates a page that a user can post a new question on the forum.  There is a TextField for the title of the post and another TextField for the content of the post.  There are also tags for different categories that the post can belong to.  The user can type data into the TextFields and they can select a tag for the category of the post.  Only one tag can be selected at a time.  Users can click on the post button to add the post to the database.  Data is only written to the database if the title and content text fields are filled and a tag is selected.  If information is missing then a message will be displayed to the user.


### Forum

The Forum lists all the posts in the database.  The user can scroll on the page to view the list of posts.  The UI for each post includes its title, content, day created, its tag and the UI of a button to view the post.