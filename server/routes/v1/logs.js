const express = require('express');

const router = express.Router();

router.get('/:id', async (req, res) => {
    const { mysql } = req.app;
    
    
    try {
        const query = `SELECT l.id, l.pet_id, p.name, l.description, l.status
        FROM logs l
        RIGHT JOIN pets p
        ON p.id = l.pet_id
        WHERE l.pet_id = ${req.params.id}
        `;
        const [ data ] = await mysql.query(query);


        if (!data) {
            res.status(404).send(`No pet with id: ${id}`)
        }
        
        res.status(201).send(data)
    } catch (error) {
        console.log(error,'Server error.Please try again')
    }
});

router.post('/', async (req,res) => {
    const { mysql } = req.app;
    const {pet_id, description, status} = req.body;
    try {
        const query = `
        INSERT INTO logs (pet_id, description, status)
        VALUES (?, ?, ?)
        `;
        const [data] = await mysql.query(query, [pet_id, description, status]);
    
        res.status(201).send(data);
        
    } catch (error) {
        console.log(error, 'Server error.Please try again')
    }
})

module.exports = router;