const express = require('express');
const mongoose = require('mongoose');
const YourModel = require('./secret.model');
const dotenv = require('dotenv');
const Cryptr = require('cryptr');
const cors = require('cors');
const axios = require('axios');
const app = express();


dotenv.config()
app.use(express.json());
app.use(cors())
const port = process.env.port || 4000;
// MongoDB connection
mongoose.connect(process.env.mongDb).then(() => {
    console.log('connected to db')
}).catch(err => {
    console.log(err)
});
console.log(process.env.port)
const cryptr = new Cryptr(process.env.secret, { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: parseInt(process.env.salt) });

app.post('/', async (req, res) => {
    const { secret, duration, visitesAllowed } = req.body;
    // console.log(encryptedString)
    try {
        const encryptedString = cryptr.encrypt(secret);
        const dbResponse = await YourModel.insertMany({
            secret: encryptedString,
            visitesAllowed: visitesAllowed,
            validTill: new Date(Date.now() + 60000 * duration)
        })

        if (dbResponse) {
            // console.log("secret added and will be deleted after", minutes, "minutes");
            res.status(201).json({
                message: 'secret added',
                id: dbResponse[0]._id
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'something went wrong', err: err })
    }




})
app.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const dbResponse = await YourModel.findByIdAndUpdate(id, { $inc: { visitesAllowed: -1 } }, { new: true });
        if (dbResponse) {
            res.status(200).json({
                secret: cryptr.decrypt(dbResponse.secret),
                remainingVisites: dbResponse.visitesAllowed,
                validTill: dbResponse.validTill
            });
            if (dbResponse.visitesAllowed <= 0) {
                await YourModel.findByIdAndDelete(id)
            }
        } else {
            res.status(408).json({ message: 'secretExpired' });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err });
    }
})
// setInterval(() => {
//     axios.get('https://secret-keeper-ht64.onrender.com') // Replace with your actual Render app URL where your Express server is hosted
//         .then(() => console.log('Ping successful'))
//         .catch((err) => console.error('Ping failed:', err));
// },  10 * 60 * 1000);


app.get('/', (req, res) => {
    res.status(200).send("hello world")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
