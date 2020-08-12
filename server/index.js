import Explorer from "../src/business/Explorer/Explorer"
const express = require('express')
var cors = require('cors')
const app = express()
const port = 3001
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use('/', express.static('build'))

app.get('/explore', async (req, res) => {
    
    const url = req.query.q
    const jumps = req.query.j
    const e = new Explorer(url)
    e.setGraph({})
    await e.explore(jumps)
    res.send(e.getGraph())
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})