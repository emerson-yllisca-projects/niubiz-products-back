const app = require('./app')
const port = process.env.PORT_APP || 4001

app.listen( port , (() => {
    console.log("Running in port" , port)
}));