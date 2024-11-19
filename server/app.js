const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const dbservices = require('./dbServices');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes for Colleges
app.get('/getAll', (req, res) => {
    const db = dbservices.createDbInstance();
    const result = db.getAllData();
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

app.post('/insert', (req, res) => {
    const { name, addr, pin, branches, avgPack, rating, review } = req.body;
    const db = dbservices.createDbInstance();
    const result = db.insertData(name, addr, pin, branches, avgPack, rating, review);
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

// Routes for Hostels
app.get('/getAllHostels', (req, res) => {
    const db = dbservices.createDbInstance();
    const result = db.getAllHostelsData();
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

app.post('/insertHostelInfo', (req, res) => {
    const { name, addr, pin, facilities, fees, rating, review } = req.body;
    const db = dbservices.createDbInstance();
    const result = db.insertHostelData(name, addr, pin, facilities, fees, rating, review);
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

// Routes for Mess
app.get('/getAllMess', (req, res) => {
    const db = dbservices.createDbInstance();
    const result = db.getAllMessData();
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

app.post('/insertMessInfo', (req, res) => {
    const { name, addr, pin, facilities, fees, rating, review } = req.body;
    const db = dbservices.createDbInstance();
    const result = db.insertMessData(name, addr, pin, facilities, fees, rating, review);
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

// Routes for Searching
app.get('/search/:id', (req, res) => {
    const { id } = req.params;
    const db = dbservices.createDbInstance();
    const result = db.searchHostelsById(id);
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

app.get('/searchM_Id/:id', (req, res) => {
    const { id } = req.params;
    const db = dbservices.createDbInstance();
    const result = db.searchMessById(id);
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

app.get('/searchCollegeName/:name', (req, res) => {
    const { name } = req.params;
    const db = dbservices.createDbInstance();
    const result = db.searchCollegeByName(name);
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

// User Registration and Login
app.post('/register', (req, res) => {
    const { name, pass } = req.body;
    const db = dbservices.createDbInstance();
    const result = db.registerUser(name, pass);
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

app.get('/searchUserName/:pass', (req, res) => {
    const { pass } = req.params;
    const db = dbservices.createDbInstance();
    const result = db.verifyUser(pass);
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

// Insert Comments
app.post('/insertComment', (req, res) => {
    const { name, email, comment } = req.body;
    const db = dbservices.createDbInstance();
    const result = db.insertCommentData(name, email, comment);
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
