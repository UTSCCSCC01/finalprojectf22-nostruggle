---
title: "Docs"
date: 2022-10-06T12:09:08-04:00
draft: false
author: "Team NoStruggle"
---
##### Info on how to make changes to the website you are viewing right now.

---
### Installing hugo

In order to use the `hugo` command, install hugo from https://gohugo.io/getting-started/installing/

### Editing a page
Locate the correspond markdown file in the **/content** folder to edit the page content.


### How to create a new page

Navigate to the documentation root folder inside your terminal

To create a page called **Example Page**, run the following command:

``` shell
hugo new example-page.md
```

To create a subpage called **Example Page** as part of the **Example Section** list section:

> If **Example Section** is not an existing archetype, create an archetype titled `example-section.md` inside the */archetypes* folder.

Then run:

``` shell
hugo new example-section/example-page.md
```

