const cero = require('0http')
const { router, server } = cero()



/**
 * builds a new api router
 */
export function buildRouter(): any {
    router.get('/hello', (req, res) => {
        console.log(req)
        res.end('Hello World!')
    })

    /*router.post('/do', (req, res) => {
        // ...
        res.statusCode = 201
        res.end()
    })*/
    return server
}

