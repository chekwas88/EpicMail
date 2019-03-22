### EpicMail
[![Build Status](https://travis-ci.org/chekwas88/EpicMail.svg?branch=develop)](https://travis-ci.org/chekwas88/EpicMail)
[![Coverage Status](https://coveralls.io/repos/github/chekwas88/EpicMail/badge.svg?branch=develop)](https://coveralls.io/github/chekwas88/EpicMail?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/6c78ab08d1695947b679/maintainability)](https://codeclimate.com/github/chekwas88/EpicMail/maintainability)


Epic mail is a web app that helps people exchange messages/information over the internet.

## Features

- Users can sign up.
- Users can login.
- Users can create groups.
- Users can send a message to individuals.
- Users can view their inbox and read messages.
- Users can retract sent messages.
- Users can save an email as draft and send it later or delete it.
- user can create and own a group
- A user can delete a group they own
- A user can add users to a group they own
- A user can delete a user(s) from a group.
- A user can send email to a group


## ROUTES 
|Endpoints                                                                                             |  Functions                   |
|------------------------------------------------------------------------------------------------------|------------------------------|
| POST         /api/v1/auth/signup                             | register user.               | 
| POST         /api/v1/auth/login                              | login user.                  | 
| POST         /api/v1/messages                                | create/send a message.       | 
| GET          /api/v1/messages                                | get all received messages    | 
| GET          /api/v1/messages/unread                         | get all unread messages      | 
| GET          /api/v1/messages/sent                           | get all sent messages        | 
| GET          /api/v1/messages/:messageId                     | get a specific message       |
| DELETE       /api/v1/messages/:messageId                     | Delete a specific message    |
| POST         /api/v1/groups                                  | create a group               |
| GET          /api/v1/groups                                  | get  all groups              |
| PATCH        /api/v1/groups/groupid/name                     | change group name            |                          
| DELETE       /api/v1/groups/groupid                          | delete a group               |
| POST         /api/v1/groups/groupid/users                    | Add user to group            |
| DELETE       /api/v1/groups/gropid/users/userid              | delete user from froup       |
| POST         /api/v1/groups/groupid/messages                 | send message to group members|

## Pivotal stories Link
[Stories](https://www.pivotaltracker.com/n/projects/2315381)

## UI Template
The UI template is hosted on [Template](https://chekwas88.github.io/EpicMail/index.html)


## API URL
https://agentcorvinus-epic-mail.herokuapp.com/

## DOCUMENTATION
For the full API documentation visit [Documentation](https://agentcorvinus-epic-mail.herokuapp.com/api/v1/docs)

## Requirement and Installation
This project requires you to have **Node** and  **Git** installed in your system.
To run this project clone the repo:

```sh
git clone https://github.com/chekwas88/EpicMail.git
```

cd into EpicMail

run `npm install` on the command line to install packages.

run `npm start` to start up the project.

## Built With

- [Node.js](https://nodejs.org/)
- Html
- CSS
- [Express](https://expressjs.com)
- [Eslint](https://eslint.org)
- [Mocha](https://mochajs.org)
- [Chai](http://chaijs.com)
- [Babel](https://babeljs.io)

