import Pool from 'pg'
const pool = new Pool.Pool({
    host: 'localhost',
    port: '5432',
    database: 'postgres',
    user: 'postgres',
    password: 'uYOP9g2XtF'
})
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })

/**
 * 
 * @param {String} query 
 * @returns Resulting rows from executing query against postgres
 * Handles the client creation, connection, and connection termination for postgres queries.
 */
async function dbQuery(query){
    try {
        const res = await pool.query(query)
        return res.rows
    } catch (error) {
        console.error(error)
        return false
    }
}

export default dbQuery;