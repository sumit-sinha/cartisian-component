var bodyParser = require('body-parser')
import express from 'express'
const app = express()

const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

import { employees } from "./mocks/employees"

const employeeList = employees

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/me/:id', function (req, res) {
    const id = req.params.id
    const me = employeeList[id]

    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(me))
})

app.post('/me/:id/busy', function (req, res) {
    const id = req.params.id
    const me = employeeList[id]
    me.time = req.body.time
    employeeList[id] = me

    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(me))
})

app.post('/me/:id/available', function (req, res) {
    const id = req.params.id
    const me = employeeList[id]
    me.time = null
    employeeList[id] = me

    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(me))
})

app.get('/employees', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    const list = Object.keys(employeeList).map(function(key) {
        return employeeList[key];
    });
    res.send(JSON.stringify(list))
})

app.post('/employees/:id/appoint', function (req, res) {
    const id = req.params.id
    const user = employeeList[id]
    const me = employeeList[req.body.current_user]
    user.queue = user.queue && user.queue.length > 0 ? user.queue.append(me) : [me]
    employeeList[id] = user

    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(user))
})

app.post('/employees/:id/cancel-appoint', function (req, res) {
    const id = req.params.id
    const user = employeeList[id]
    const me = employeeList[req.body.current_user]
    user.queue = user.queue.filter((user) => {
        return user.userName !== me.userName
    })
    employeeList[id] = user

    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(user))
})

app.listen(3001, () => console.log('Example app listening on port 3001!'))
