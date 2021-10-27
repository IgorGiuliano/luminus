import db           from './config/database';
import bodyParser   from 'body-parser';
import cors         from 'cors';
import morgan       from 'morgan';
import '@babel/polyfill';

const   express     = require('express'),
        app         = express(),
        port        = 5000

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cors());

app.listen(port, () => {
    console.log(`Server iniciado na porta: ${port}`);
});

app.get('/', (req, res) => {
    res.send("Homepage");
});

app.get('/register', async (req,res) => {

        const existingUser = await db.query(
            "SELECT * FROM users WHERE email = igor.andrade07@gmail.com" 
        );
         
});

app.post('/login', (req, res) => {

});

/*
app.get('/teste', async (req, res) => {
 //   const response = await db.query('SELECT * FROM dataCollected WHERE SENSOR_NAME = $1',
   //                                     [req.body.sensor_name]);
   
   const response = await db.query('SELECT * FROM dataCollected WHERE COD_ID = 2');
    res.status(200).send(response.rows[0]);
});

app.post('/luminus-api-receive-data', async (req, res) => {

    const {sensor_name, estado, corrente, tensao, potencia} = req.body;
    
    const { rows } = await db.query(
        "INSERT INTO dataCollected(SENSOR_NAME, ESTADO, CORRENTE, TENSAO, POTENCIA) VALUES($1, $2, $3, $4, $5)",
        [sensor_name, estado, corrente, tensao, potencia]
    );

    res.status(201).send({
        message: "Data added successfully",
        body: {
          data: { sensor_name, estado, corrente, tensao, potencia }
        },
      });
});

app.put('/luminus-api-receive-data', async (req, res) => {
    const {sensor_name, estado, corrente, tensao, potencia} = req.body;
    const aux = await db.query('SELECT * FROM dataCollected WHERE SENSOR_NAME = $1', [sensor_name]);
  
    const response = await db.query(
      "UPDATE dataCollected SET estado = $1, corrente = $2, tensao = $3, potencia = $4 WHERE SENSOR_NAME = $5",
      [estado, corrente, tensao, potencia, sensor_name]
    );
  
    res.status(200).send({ message: "Product Updated Successfully!" });
})

app.get('/luminus-api-send-state', (req, res) => {
    res.send("on");
})
*/