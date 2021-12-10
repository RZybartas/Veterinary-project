const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    const { mysql } = req.app;
    try {
        const [meds] = await mysql.query(`SELECT * FROM medications` );
    
        res.send(meds)
        
    } catch (error) {
        console.log(error);
        res.status(500).send({error: 'Server error. Please try again'})
    }
});

router.post('/', async (req, res) => {
    const { mysql } = req.app;
    const { name, description } = req.body;
    try {
        const query = `INSERT INTO medications (name, description ) VALUES (?, ?)`
        const [{ insertId }] = await mysql.query(query, [ name, description ])

        res.status(201).send({
            added: {...req.body, id: insertId}
        })
    } catch (error) {
        console.error(error, "Incorrect data")
    }
});


module.exports = router;