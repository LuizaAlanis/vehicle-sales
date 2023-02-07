// express for API and nodemon for restart server
const express = require('express');
const cors = require("cors")
const app = express();
const port = 8080;
const whitelist = ["http://localhost:3000"]

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))

app.use(express.json());
app.use('/api', require('./routes/endpoints'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});