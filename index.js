import express from 'express';
import bodyParser from 'body-parser';
import qr from 'qr-image';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "qrcode",
    password: "hidalgo001",
    port: 5432,
});
db.connect().catch(err => console.error('Database connection error.', err));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get("/", (req, res) => {
    res.render("index", { qrCodeURL: null });
});

app.post("/generate", async (req, res) => {
    const { link } = req.body;
    if (!link) {
        return res.render("index", { qrCodeURL: null, error: "Link is required."});
    }

    const qrImage = qr.imageSync(link, { type: 'png' });
    const qrCodeURL = `data:image/png;base64,${qrImage.toString('base64')}`;

    try {
        await db.query('INSERT INTO qr_codes (link) VALUES ($1)', [link]);
        console.log('Link inserted into the database: ', link);
    } catch (err) {
        console.log("Error inserting link into the databse: ", err);
    }

    res.render("index", { qrCodeURL });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
