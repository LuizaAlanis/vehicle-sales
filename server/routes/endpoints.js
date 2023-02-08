const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Client } = require("pg");

const router = express.Router();

/* run \conninfo to verify */
const connectionString = "postgresql://postgres:123456@localhost:5432/vehicle_sales";

const secret = 'supersecret';

const client = new Client({
    connectionString: connectionString
});
client.connect();


//CRUD
async function registerVehicle(brand, model, image, price) {
    return new Promise((res,rej) => {
        setTimeout(() => {
            const text = 'INSERT INTO vehicles (brand, model, image, price) \
        VALUES ($1, $2, $3, $4) \
        RETURNING id ';
            const values = [brand, model, image, price];
            client.query(text, values)
                .then(result => {
                    res(result)
                })
                .catch(e => rej(e.stack))
        }, 2000);
    })
}

async function getVehicle(vehicleId) {
    return new Promise((res,rej) => {
        setTimeout(() => {
            const text = 'SELECT * FROM vehicles WHERE id = $1';
            const values = [vehicleId];
            client.query(text, values)
                .then(result => {
                    res(result)
                })
                .catch(e => rej(e.stack))
        }, 2000);
    })
}

async function getAllVehicles() {
    return new Promise((res,rej) => {
        setTimeout(() => {
            const text = 'SELECT * FROM vehicles ORDER BY price ASC';

            client.query(text)
                .then(result => {
                    res(result)
                })
                .catch(e => rej(e.stack))
        }, 2000);
    })
}

async function updateVehicle(vehicleId, brand, model, image, price) {
    return new Promise((res,rej) => {
        setTimeout(() => {
            const text = 'UPDATE vehicles SET brand = $2, model = $3, \
      image = $4, price = $5 WHERE id = $1';
            const values = [vehicleId, brand, model, image, price];
            client.query(text, values)
                .then(result => {
                    res(result)
                })
                .catch(e => rej(e.stack))
        }, 2000);
    })
}

async function removeVehicle(vehicleId) {
    return new Promise((res,rej) => {
        setTimeout(() => {
            const text = 'DELETE FROM vehicles WHERE id = $1';
            const values = [vehicleId];
            client.query(text, values)
                .then(result => {
                    res(result)
                })
                .catch(e => rej(e.stack))
        }, 2000);
    })
}

async function getUser(personId) {
    return new Promise((res,rej) => {
        setTimeout(() => {
            const text =  'SELECT * FROM users WHERE username = $1';
            const values = [personId];
            client.query(text, values)
                .then(result => {
                    res(result)
                })
                .catch(e => rej(e.stack))
        }, 2000);
    })
}

async function isTokenValidAsync(token) {
    return new Promise((res,rej) => {
        try {
            const decoded = jwt.verify(token, secret);
            res({tokenInfo : decoded, isValid: true})
        } catch (err) {
            rej({tokenInfo : {}, isValid: false})
        }
    })
}

async function isTokenValid(token) {
    try {
        const decoded = jwt.verify(token, secret);
        return true;
    } catch (err) {
        return false;
    }
}


// Routes
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try{
        const user = await getUser(username);

        if( !(typeof user !== 'undefined' && user !== null) ) return res.status(400).send('Username or password is incorrect');

        const isPasswordValid = bcrypt.compareSync(password, user.rows[0]['password']);
        if (!isPasswordValid) return res.status(400).send('Username or password is incorrect');

        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '7d' });

        return res.json({ token });
    }catch (err) {
        res.status(400).send(err);
    }
});


router.get("/vehicles", (req, res) => {
    client.query("SELECT * FROM vehicles ORDER BY price ASC", (err, result) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });

});

router.get("/vehicle/:vehicleId", async (req, res) => {

    const token = req.header('Authorization');

    if (!token) return res.status(401).send('Access denied. No token provided.');

    const isValid = isTokenValid(token);

    if(isValid){
        const vehicleId = req.params.vehicleId
        try{
            const vehicle = await getVehicle(vehicleId);
            if(vehicle.rowCount > 0)
                res.status(200).send(vehicle.rows[0]);
            else
                res.status(401).send('Not found');
        }catch (err) {
            res.status(400).send(err);
        }
    }
    else
        res.status(400).send('Invalid token');

});

router.delete("/vehicle/remove/:vehicleId", async (req, res) => {

    const token = req.header('Authorization');

    if (!token) return res.status(401).send('Access denied. No token provided.');

    const isValid = isTokenValid(token);

    if(isValid){
        const vehicleId = req.params.vehicleId
        try{
            const vehicle = await removeVehicle(vehicleId);
            res.status(200).send('Row(s) removed: ' + vehicle.rowCount);
        }catch (err) {
            res.status(400).send(err);
        }
    }
    else
        res.status(400).send('Invalid token');

});


router.post("/vehicle/register", async (req, res) => {

    const token = req.header('Authorization');

    if (!token) return res.status(401).send('Access denied. No token provided.');

    const isValid = isTokenValid(token);

    if(isValid){
        const { brand, model, image, price } = req.body;

        try{
            const vehicle = await registerVehicle(brand, model, image, price);
            res.status(200).send(vehicle.rows);
        }catch (err) {
            res.status(400).send(err);
        }
    }
    else
        res.status(400).send('Invalid token');

});


router.put("/vehicle/update/:vehicleId", async (req, res) => {

    const token = req.header('Authorization');

    if (!token) return res.status(401).send('Access denied. No token provided.');

    const isValid = isTokenValid(token);

    if(isValid){
        const vehicleId = req.params.vehicleId
        const { brand, model, image, price } = req.body;

        try{
            const vehicle = await updateVehicle(vehicleId, brand, model, image, price);
            res.status(200).send('Row(s) updated: ' + vehicle.rowCount);
        }catch (err) {
            res.status(400).send(err);
        }
    }
    else
        res.status(400).send('Invalid token');

});

router.get('/token', async (req, res) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).send('Access denied. No token provided.');

    try{
        const tokenInfo = await isTokenValidAsync(token);
        if(tokenInfo.isValid)
            res.send(tokenInfo);
        else
            res.status(400).send('Invalid token');
    }catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;