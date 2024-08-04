import express from 'express';
import bodyParser from 'body-parser';
import qr from 'qr-image';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
    res.render("index", { qrCodeURL: null });
});

app.post("/generate", (req, res) => {
    const { link } = req.body;
    const qrImage = qr.imageSync(link, { type: 'png' });
    const qrCodeURL = `data:image/png;base64,${qrImage.toString('base64')}`;
    res.render("index", { qrCodeURL });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
