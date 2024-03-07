import {createClient} from 'redis'

async function Redis(){
    const client = createClient()
    client.on('error', err => console.log("Redis client error", err))
    await client.connect()
}

export default Redis;
