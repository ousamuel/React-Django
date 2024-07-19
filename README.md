## Introduction
Dev Showcase is a web platform that allows developers to showcase their projects

<!-- In this application, users can effortlessly manage shared expenses with friends, family, or colleagues. They can create groups for different occasions or groups of people, add expenses, split bills accurately among group members, and keep track of who owes what. The app provides clear insights into spending patterns and simplifies settling debts, ensuring financial transparency among users. -->
[Click here to go to the website](http://react-django.s3-website.us-east-2.amazonaws.com/)

[Link to demo](https://www.loom.com/share/ffd56b19213a403b873db55183e04421?sid=af39d766-e292-4a07-ae7f-7e4d3160b270)

## Technologies

Front-end:
- Framework: NextJS (React) + NextUI 
- React Hook Form
- HTTP Client: Axios
- Tailwind CSS
- Hosting: AWS S3

Back-end :
- Django + Django Rest Framework (DRF) for API
- PostgreSQL
- Hosting: AWS EC2, Gunicorn, Nginx

## Project Architecture

Front-end Integrations:
- Component-Based Architecture: The frontend is built using reusable React components.
- API Integration: Axios is used to make HTTP requests to the backend API.
- Forms: react-hook-form is utilized for form handling and validation.

Back-end Integrations:
- Django Models: Define the structure of data (User, Project) and manage database interactions.
- Django Rest Framework: Provides RESTful APIs for CRUD operations on models.
<!-- - Custom Validators: Ensure data integrity (e.g., file type validation for images).
User Authentication: Supports user registration and login, including social logins (assumed from LinkedIn field). -->

