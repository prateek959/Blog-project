import transporter from "../nodemailer/nodemailer.js";

const sendMails = (email) => {
    return async (req, res, next) => {
        try {
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Blog Application",
                text: "Blog created successfully"
            };

            await transporter.sendMail(mailOptions);
           console.log("mail send")
        } catch (error) {
            console.log(error.stack);
            res.status(400).json({ msg: "Internal server error" });
        }
    };
}


export default sendMails;
