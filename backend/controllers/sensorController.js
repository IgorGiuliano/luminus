import db from '../config/database'

exports.insertCollectedData = async (req, res) => {
    const {id, estado, corrente, tensao, potencia} = req.body;
    
    const { rows } = await db.query(
        "INSERT INTO dataCollected(SENSOR_NAME, ESTADO, CORRENTE, TENSAO, POTENCIA) VALUES($1, $2, $3, $4, $5)",
        [id, estado, corrente, tensao, potencia]
    );

    res.status(201).send({
        message: "Product added successfully!",
        body: {
          data: { id, estado, corrente, tensao, potencia }
        },
    });
};

exports.listCollectedData = async (req, res) => {
    const response = await db.query('SELECT * FROM dataCollected');
    res.status(200).send(response.rows);
};