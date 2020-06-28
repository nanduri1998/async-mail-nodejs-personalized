const nodemailer = require('nodemailer'),
    creds = require('./creds.js'),
    userimport = require('./users.json'),
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

let users = userimport.data;

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
            from: 'Innovation Center <innovationcenter_hyd@gitam.in>',
            subject: result.email.subject,
            html: result.email.html,
            text: result.email.text,
            // Uncomment in case of attachements
            attachments: [
                {
                    path: 'files\/'+result.context.email+'.jpg'
                }
            ]
        });
    }))
}).then(() => {
    console.log("Done");
})