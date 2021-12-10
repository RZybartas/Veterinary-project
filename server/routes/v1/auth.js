const express = reqiure('express'); 
const joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const router = express.Router();



const userShema = joi.object({
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

router.post('/', async (req, res) => {
    const userData = req.body;
    const { mysql } = req.app;

    try {
        userData = await userShema.validateAsync(userData)
    } catch (error) {
        return res.status(404).send({ error: 'Incorrect data' })
    }

    try {
        const hashPw = bcrypt.hashSync(userData.password);

        const query = `INSERT INTO users (email, password)
        VALUES (${mysql.escape(userData.email)}, '${hashPw}')`;

        const [data] = await mysql.query(query)
    } catch (error) {
        return res.status(500).send({ error: 'Please try again !' })
    }
});

router.post('/', async (req, res) => {
    const userData = req.body;
    const { mysql } = req.app;

    try {
        userData = await userShema.validateAsync(userData);
    } catch (error) {
        return res.status(404).send({ error: 'Incorrect email or password' })
    };

    try {
        const query = `SELECT * FROM users
        WHERE email = ${mysql.escape(userData.email)}`;

        if (data.length === 0) {
            return res.status(404).send({ error: 'Incorrect email or password'})
        }
        //Checking password if exists
        const isAuthed = bcrypt.compareSync(userData.password, data[0].password);

        if (isAuthed) {
            const token = jwt.sign({ id: data[0].id, email: data[0].email }, jwtSecret)
            return res.status(200).send({token})
        };
        
        return res.status(400).send({ error: 'Incorrect email or password'});
    } catch (error) {
        return res.status(500).send({ error: 'Please try again'})
    }
});

module.exports = router;