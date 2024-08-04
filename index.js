import express from 'express';
import bodyParser from 'body-parser';
import inquirer from 'inquirer'
import qr from 'qr-image'
import fs from 'fs';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("index.ejs")
        QRCode.toDataURL('I am a pony!')
        .then(url => {
            console.log(url)
        })
        .catch(err => {
            console.error(err)
        })

        // With async/await
        const generateQR = async text => {
        try {
            console.log(await QRCode.toDataURL(text))
          } catch (err) {
            console.error(err)
        }
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})