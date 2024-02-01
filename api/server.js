// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')

const fs = require("fs");
const os = require("os");

fs.copyFile("db.json", os.tmpdir() + "/db.json", function (err) {
    if (err) console.log(err);
    else console.log("copy file succeed to" + os.tmpdir());
});

// Uncomment to allow write operations
// const fs = require('fs')
// const path = require('path')
// const filePath = path.join('db.json')
// const data = fs.readFileSync(filePath, "utf-8");
// const db = JSON.parse(data);
// const router = jsonServer.router(db)

// Comment out to allow write operations
const router = jsonServer.router(path.resolve(os.tmpdir() + "/db.json"));
const server = jsonServer.create()
const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
