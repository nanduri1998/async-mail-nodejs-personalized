const nodemailer = require('nodemailer'),
    const creds = require('./creds.js'),
    transporter = nodemailer.createTransport({
        pool: true,
        service: 'gmail',
        secure: false,
        auth: {
            user: creds.email,
            pass: creds.password
        }
    }),
    EmailTemplate = require('email-templates').EmailTemplate,
    path = require('path'),
    Promise = require('bluebird');

let users = [
    {
        name: 'NAME_OF_PERSON',
        email: 'EMAIL_OF_PERSON',
        filename: 'FILENAME_OF ATTACHMENT_IF_ANY', //Delete this and next line in case of no attachments
        path: 'path/to/file/with/extension'
    }
]

function sendEmail(obj) {
    return transporter.sendMail(obj);
}

function loadTemplate(templateName, contexts){
    let template = new EmailTemplate(path.join(__dirname, 'templates', templateName));
    return Promise.all(contexts.map((context) => {
        return new Promise((resolve, reject) => {
            template.render(context, (err, result) => {
                if (err) reject(err);
                else resolve({
                    email: result,
                    context,
                });
            })
        });
    }));
}


loadTemplate('updates', users).then((results) => {
    return Promise.all(results.map((result) => {
        sendEmail({
            to: result.context.email,
            from: 'COMPANY_OR_PERSON_NAME',
            subject: result.email.subject,
            html: result.email.html,
            text: result.email.text,
            //Uncomment in case of attachements
            // attachments: {
            //     filename: result.context.filename,
            //     path: result.context.path
            // }
        });
    }))
}).then(() => {
    console.log("Done");
})