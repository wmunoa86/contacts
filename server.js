const express = require('express');
const mongodb = require('./db/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const app = express();
const port = process.env.PORT || 3000;

app
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});

