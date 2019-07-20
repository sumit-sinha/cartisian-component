import express from 'express'
const app = express()

import { employees } from "./mocks/employees"

// respond with "hello world" when a GET request is made to the homepage
app.get('/employees', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(employees))
})

app.listen(3001, () => console.log('Example app listening on port 3000!'))
