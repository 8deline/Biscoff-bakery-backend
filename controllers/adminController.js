// const mailgun = require("mailgun-js");
// require('dotenv').config()
const DOMAIN = process.env.mailgun_domain;
const api_key = process.env.API_key
const axios = require("axios")
const qs = require('qs')

const adminController = {
    contactUs: (req, res)=>{
        console.log(process.env.MAILGUN_USERNAME)
        console.log(process.env.MAILGUN_PASSWORD)
        const formValues = req.body
        axios.post(
            'https://api.mailgun.net/v3/sandbox46aeb934ed0b431cac39aa233bbe61f9.mailgun.org/messages',
            qs.stringify({
                from: `${formValues.name} <${formValues.email}>`,
                to: 'asidik001@gmail.com',
                subject: 'New Contact Form Submission from ' + formValues.name,
                text: formValues.message
            }),
            {
                auth: {
                    username: process.env.MAILGUN_USERNAME,
                    password: process.env.MAILGUN_PASSWORD
                },
            }
        )
            .then(response => {
                res.json({
                    success: true,
                    message: "successfully sent"
                })
                console.log(response.data)
            })
            .catch(err => {
                console.log(err.response.data)
                res.statusCode = 500
                res.json({
                    "success": false,
                    "message": "sending failed"
                })
            })
    }

}

module.exports = adminController