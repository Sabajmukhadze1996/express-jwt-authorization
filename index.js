const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



app.get("/api", (req, res) => {
    res.json({
        message: "Hey there! Welcome to this API service"
    })
})

app.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            res.sendStatus(403) //forbidden
        } else {
            res.json({
                message: "Posts created...",
                authData
            })
        }
    })
})

app.post("/api/login", (req, res) => {
    const user = {
        id: 1,
        username: "John",
        email: "john@gmail.com",
    }
    jwt.sign({ user }, "secretkey", (error, token) => {
        res.json({
            token,
        })
    })
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers["Authorization"]
    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1]
        req.token = bearerToken
        next();
    } else {
        res.sendStatus(403)
    }
}


app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
})