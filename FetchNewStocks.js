const token = 'clnnc6hr01qqp7jp5av0clnnc6hr01qqp7jp5avg'
const results = {}
const finnhub = require('finnhub');
var Transforms = require('./Transforms.js')

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "clnnc6hr01qqp7jp5av0clnnc6hr01qqp7jp5avg"
const finnhubClient = new finnhub.DefaultApi()

async function fetchAllStocks(){
    const tickers = ['msft', 'aapl', 'goog', 'amzn', 'msft', 'aapl', 'goog', 'amzn']
    let i = 1;
    for (let ticker of tickers){
        if (results[ticker]){
            i ++;
        }
    }
    if (i === tickers.length){
        return results
    }
        
    /*
    Takes each item in tickers and returns the response from the nasdaq API transformed to a format the frontend can use.
    */
    for (let i = 0; i < tickers.length; i++) {
        finnhubClient.stockCandles(tickers[i])
    }
    return(
        results
    )
}

function FetchStocks(){
    const data = {"stonks": fetchAllStocks()}
    return data
}

module.exports = {FetchStocks};
