express = require('express')
app = express()

app.set('views', __dirname + "/view")
app.set('view engine', 'ejs');

path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

metrics = require('./metrics')

app.set('port', 1338)

/*app.get(
    '/',
    (req,res)=> res.send("Hello word")
)*/

/*app.get(
    '/index/:name', 
    (req, res) => res.send("Hello " + req.params.name)
  )*/

  app.get(
    '/index/:name', 
    (req, res) => res.render('hello.ejs', {name: req.params.name})
  )

  app.get('/metrics.json', (req, res) => {
    metrics.get((err, data) => {
      if(err) throw err
      res.status(200).json(data)
    })
  })

app.listen(
  app.get('port'), 
  () => console.log(`server listening on ${app.get('port')}`)
)