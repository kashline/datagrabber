import express from 'express';
import FetchStocks from './FetchStocks.js'
import Fetchrecipes from './FetchRecipes.js';
import sanitize from 'sanitize';
import SeedData from './SeedData.js';
import NewRecipe from './NewRecipe.js';
import Redis from './Redis.js';
import test from './test.js';
import CreateRecipe from './CreateRecipe.js';
import GetRecipe from './GetRecipe.js';

Redis()
// await test()
SeedData()

const app = express ();
app.use(express.json(), sanitize.middleware);
// app.use(require('sanitize').middleware)
const port = process.env.PORT || 3001;
let dataArr = {};
// FetchStocks().stonks.then(data => dataArr = data);

app.listen(port, () => {
  console.log("Server Listening on PORT=", port);
});

app.get('/status', (request, response) => {
   const status = {
      'Status': 'Running'
   };
   response.send(status);
});

/**
 * GET endpoint for all stock data - data originates from NASDAQ API
 */
app.get('/data/stocks', async (request, response) => {
   const data = await FetchStocks()
   console.log(data)
   response.send(data)
})

/**
 * Query endpoint for getting recipe data from data layer
 */
app.get('/data/recipes', async (request, response) => {
   // If the request object is empty send usage
   if(Object.keys(request.query).length === 0 && request.query.constructor === Object) {
      response.send(JSON.stringify("Use query parameters to get filtered recipes."))
   } else {
      // const res = await Fetchrecipes({...request.query})
      // console.log(request.query.name)
      const res = await GetRecipe(request.query.name)
      console.log(res)
      response.send(res)
   }
})

app.post('/data/recipes/new', async (request, response) => {
   // await NewRecipe(request.body)
   const res = await CreateRecipe(request.body)
   response.send(res)
})
