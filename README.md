# Passport Login Template
<h3>A web template with sign-up/sign-in capability.</h3>

```bash
 ## Customize the user schema.
 # The default user database: line 22 in the app.js file - loginapp
 # The user schema is located in the models directory
    ## User Model
    {
        fname: String,
        lname: String,
        uname: String,
        email: String,
        password: String,
        admin: Boolean
    }
```

<ul>
    <li>NodeJS: 7.7.4</li>
    <li>NPM: 4.5.0</li>
    <li>Express: 4.15.2</li>
    <li>Express-Handlebars: 3.0.0</li>    
    <li>Foundation: 6.3.1</li>
    <li>Nodemon: 1.11.0</li>
</ul>

<h3>Instructions</h3>

```bash
# Installation
 clone https://github.com/bitjawn/PLT.git or download the zip
 
 npm install

# External Dependencies
 <a href="https://www.mongodb.com/download-center?jmp=docs&_ga=1.202993809.1491474904.1492296757#community"><i>MongoDB</i></a>
 npm install --global nodemon
 
# Run App
 npm start
```
