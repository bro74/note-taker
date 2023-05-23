const router = require("express").Router()
const fs= require("fs")

router.get("/api/notes", (req, res)=>{
    fs.readFile('db/db.json', 'utf-8', (err, data) => {
      if(err) throw err
        res.json(JSON.parse(data))
    })
})


module.exports=router
