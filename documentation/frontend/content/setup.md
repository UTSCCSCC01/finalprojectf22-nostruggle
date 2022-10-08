---
title: "Setup"
date: 2022-10-06T11:17:25-04:00
draft: false
author: "Team NoStruggle"
---

### System Requirements

- Node [v16.17.1](https://nodejs.org/en/)

### Clone the Github repository to local

``` shell
git clone https://github.com/UTSCCSCC01/finalprojectf22-nostruggle
```

### Running the application
Using npm script:
``` shell
npm install
npm run dev
``` 
Run the server:
``` shell
cd server
npm install
npm run dev
```
Run the client:
``` shell
cd client
npm install
npm start
```

### Creating a pull request

On the github repository, navigate to the **Pull requests** tab.

![](/images/pullrequest.jpg)

- Set the working(?) base branch. For development features, this will always be **dev**
- Set the compare branch. This is the branch with the new code you want to merge into the working (?) branch.
- If there are any merge conflicts, you must resolve them

#### Reviewing a pull request:

![](/images/prreview.jpg)

