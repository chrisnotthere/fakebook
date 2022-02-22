# FakeBook

[Live server](https://chrisnotthere.github.io/fakebook)

FakeBook is a Facebook clone made with Node/Express, React, and MongoDB. The purpose of this project is to use a number of technologies together in one application.

This is a solution to a [project](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs/lessons/odin-book) on The Odin Project full-stack web development course.

## Features ##
* Sign up and login with email
* Login with Facebook account
* Create posts
* Delete posts
* Like/Unlike
* Comment
* Send/Accept friend requests
* Timeline shows friends posts
* Profile shows self posts and friends list

## Technologies ##
* JSON web token authentication
* REST api
* MongoDB/Mongoose database modeling
* Passport.js
* Styled Components

---

#### Known Issues ####
* At times features like create post, like, accept friend request return 401:Unauthorized
  * Sometimes this is fixed after a refresh or logout/login
* Auto populate friend requests for sign in with Facebook and Guest Account not working
* Too many database calls. I hope to learn about caching to remedy this
* Logging too verbose, this may be a security concern

#### TODO ####
* Add edit user info page -> PUT /users/:id - edit user details
* Fix auto populate friend requests -> POST /friends/populate
* Jest unit testing
* Responsive design



#### Thank you for reading. Any feedback is appreciated. ####
