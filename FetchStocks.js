const token = 'tL6Zmhr14CdSicdpH4Et'
const results = {}
import Transforms from './Transforms.js'

let data;

async function fetchStocks(){
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
        await fetch(`https://data.nasdaq.com/api/v3/datasets/WIKI/${tickers[i]}.csv?api_key=${token}`)
            .then(response => response.text())
            .then(data => results[tickers[i]] = Transforms(data));
    }
    return(
        results
    )
}

async function FetchStocks(){
    // if (Date.now() - data.TTL)
    const data = {
        "data": await fetchStocks(),
        "TTL": Date.now()
    }
    console.log(Date.now() - data.TTL)
    return await fetchStocks()
}

export default FetchStocks
