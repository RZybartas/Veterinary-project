import { Router } from "express";

const router = Router();

router.get('/:id', async (req, res) => {
    const { mysql } = req.app;
    
    
    try {
        const query = `SELECT  p.id, p.name, pr.comment, pr.timestamp, m.description AS m_description, m.name AS m_name, l.description AS l_description, l.status
        FROM logs l
        LEFT JOIN pets p ON l.pet_id = p.id
        JOIN prescriptions pr ON pr.pet_id=p.id
        LEFT JOIN medications m on m.id=pr.medication_id
        WHERE p.id = ${req.params.id}
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
    const {id, medication_id, pet_id, comment} = req.body;
    const query = `
    INSERT INTO prescriptions (id, medication_id, pet_id, comment)
    VALUES (?, ?, ?, ?)
    `;
    const [data] = await mysql.query(query, [id, medication_id, pet_id, comment]);

    res.status(201).send(data)
});

export default router;