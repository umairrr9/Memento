# Memento
Memento is a simple and beautiful note taking app created by harrisuddin and umairrr9.

Memento's Git repo shows that majority of the code has been committed by umairrr9 however we would like to make it clear that both of us have been working together on Visual Studio Code's LiveShare feature.

This app has been deployed at https://mementonotes.herokuapp.com.

# How to run the app

1. Download the repo
2. Create a file called .env in the backend folder
3. Add the following lines to the .env file:
  * DB_CONNECTION=<"Your MongoDB Connection String">
  * JWT_SECRET=<"Random string">
  * COOKIE_SECRET=<"Random string">
  * URL=<"If being deployed locally, then it's http://localhost unless you change the port number">
  * EMAIL=<"An email used to send confirmation emails. **If it's not a gmail** then you need to change the file at backend/static/transporter.js to work with your email provider">
  * PASSWORD=<"The password for the email address">
  4. Go to the client directory and run the commands 
  ```
  npm install
  npm run build
  ```
  5. Go to the backend directory and run the commands 
  ```
  npm install
  npm start
  ```