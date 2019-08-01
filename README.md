#   Async Personalized email
A Node.Js script to send personalized emails with attachments to a group of emails. It works asynchronously, meaning it won't wait for the email to be sent but continues to render the next email and later check for callbacks.

### Installation
1. Clone this repo
2. Run `npm install`
3. Create a file `creds.js` and input the following code into it:
    ```javascript
    module.exports = {
        email: 'YOUR_GMAIL_EMAIL_ID',
        password: 'GMAIL_PASSWORD' //If two step verification enabled, generate a app password and replace here.
    }
4. Give a listing of users in the users array in `index.js`. It must follow the following syntax:
    ```javascript
    let users = [
        {
            name: 'NAME',
            email: 'USER_EMAIL',
            filename: 'FILENAME_OF ATTACHMENT_IF_ANY', //Delete this and next line in case of no attachments
            path: 'path/to/file/with/extension',
            anyOtherParameters: 'Ex: ID Number etc...'
        }
    ]
    ```
5. You can create templates in `templates` folder.
6. `updates` folder contains sample files. Edit `loadTemplate('updates', users)` to match your users and template folder name.
7. You can use extra handlebars denoted with `{{anyOtherParameters}}` to replace it while sending email.
8. Run the script using `node index.js` or `npm start`