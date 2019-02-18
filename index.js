const config = require('config')
const express = require('express')
const cookieParser = require('cookie-parser')

const serverConfig = config.get('Server')
const app = express()

// Logging middlware
app.use((request, response, next) => {
    console.log(request.headers)
    next()
})

app.use(cookieParser())

// Serving
// Static files
app.use(express.static(serverConfig.get('static-files-folder')))

// GET
app.get('/', (request, response) => {
    // Example error
    // throw new Error('oops')
    
    console.log('Cookies: ', req.cookies)

    console.log('Signed cookies: ', req.signedCookies)

    res.send("Hello GET")
})

// POST
app.post('/', (request, response) => {
    res.send("Hello POST")
})

// DEL
app.delete('/', (request, response) => {
    res.send("Hello DELETE")
})

// Error tracking
app.use((err, request, response, next) => {
    console.log(err)
    response.status(500).send('Something broke!')
})

// Start server listen
const port = serverConfig.get('port')
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on port ${port}`)
})