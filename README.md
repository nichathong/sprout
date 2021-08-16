# Sprout

[Live Demo](not available)

## Background and Overview

We've all been there. How hard can keeping a plant alive be? All I have to do is water it every day. A month later your plant is withering. Keeping your plants healthy is hard. One slip of the mind and months of growth down the drain. Sprout is a simple app that aims to help you grow healthy plants.

To achieve this functionality, Sprout will let users create gardens. Using information about each plant in the garden, sprout will notify the user when to water each plant. To help engage the user, Sprout will also have a page where users can view each other's gardens.

We will need to:

* Build a database to store user and plant information
* Construct a Web application for visualization of and interaction with the user's plants

## Functionality & MVP

Sprout is an application that allows users to keep track of the plants they own, and to be notified of stats like when to water them, when to give their plants nutrients, and more. 

- [ ] Hosting on Heroku
- [ ] User authentication: sign up and log in:
- [ ] Home page with information on the user's garden and list of plants they own. 
- [ ] Database of plants, each with their own show page - users also have the ability to add new plants to the db
- [ ] Notifications system for watering, etc.
- [ ] Production README

#### Bonus Features:

- [ ] Users can search for/follow other users and see/like the plants in their gardens. 

## Technologies & Technical Challenges

### Technologies
Sprout is an application built with MERN stack

**Backend:** MongoDB, Express

The data for Sprout will be stored in MongoDB, a noSQL database. 

Sprout only has two models `user` and `plant`. The association between them is easy. Using a noSQL database could make the database more scalable and flexible

**Frontend:** React/Redux, Node.js, Axios

React-redux cycle would be implemented to manage the data visualization for the frontend

### Technical Challenges
* implement a search function 
* sending alerts when the user needs to water the plants

## Group Members & Work Breakdown

* **Patrick Campbell** - Team leader
* **Annie Yang** -  Frontend/Backend Asst.
* **Shirley Tang** - Backend Leader
* **Nicha Thongpanchang** - Frontend Lead 

#### **Monday**

* Starting working on the app skeleton base on weekend project (Twitter)
* Shirley - start implement user authorization on the backend
* Annie - AWS S3 setup, coordinate with Nicha on ideal pictures, and collecting information that needs for the database
* Patrick - Help Shirley on the backend setup  
* Nicha - Create Wireframe for the apps, collecting information on what needs to be on the database

#### **Tuesday**

* Annie/Nicha Connecting the user backend to frontend to make sure that user auth is working
* Shirley - populating database for plants
* Patrick - Making sure the workflow of the group and will fill in the gap where needed (help both frontend and backend)

#### **Wednesday**

* Shirley/Annie - Continue implementation of visualization on Web application, add more features if possible
* Nicha - Styling
* Patrick - complete README, test for bugs

#### **Thursday**
everyone
* complete CSS styling
* test for bugs

#### ** Friday **

* Presentation day
