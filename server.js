const express =require("express")
const homeRoutes= require("./routes/homeroutes")
const apiRoutes= require("./routes/api-routes")

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(apiRoutes)
app.use(homeRoutes)

 app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`)
 );