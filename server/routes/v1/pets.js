const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    const { mysql } = req.app;
    try {
        const query = `SELECT id, name, dob, client_email FROM pets
        WHERE archived = 0
        `;
        
        const [data] = await mysql.query(query)

        res.status(201).send(data)
    } catch (error) {
        console.error(error,"Can't get pets from database")
    }
});

router.post('/', async (req, res) => {
    const { mysql } = req.app;
    const { id, name, dob, client_email } = req.body;
    try {
        const query = `INSERT INTO pets VALUES  (?, ?, ?, ?, archived = 1)`
        await mysql.query(query, [ id, name, dob, client_email])

        res.status(201).send({
            added: {
                id,
                name, 
                dob, 
                client_email
            }
        })
    } catch (error) {
        console.error(error, "Incorrect data")
    }
});

router.delete('/:id', async (req, res) => {
    const { mysql } = req.app;
    
    try {
        const query =
        `
        UPDATE pets
        SET archived = 1
        WHERE id = ${mysql.escape(req.params.id)}
        `;
        const [data] = await mysql.query(query);
        
        res.status(201).send({
            data
        });

    } catch (error) {
        return res.status(500).send({ error: 'Server error.Please try again'})
    }


})

module.exports = router;