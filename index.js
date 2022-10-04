//Dotenv
require('dotenv').config({path:".env"});
const express = require('express');
const app = express();

  app.get('/', (request, response) => {
      response.send('<h1>Hello_World!</h1>')
  });

  const PORT = 3001
  app.listen(PORT, () => {
      console.log(`
    🚀 Server running on port ${process.env.PORT}.
    🛠️  In ${process.env.APP_ENV} environment.
      `)
  });