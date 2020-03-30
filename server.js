let express=require("express");
let app=express();
let socketConn=require("./socket/socket");
let jsonWebToken=require("jsonwebtoken");
let moment=require("moment");
let cors=require("cors");
let bodyParser=require("body-parser");

app.use(cors());
app.use(bodyParser.json());

app.use("/getToken",(req,res,next)=>{

    let token=jsonWebToken.sign({
        userId : req.body.userId,
        time : moment.now()
    },"a121",{});
    
    res.send({
        result : true,
        token : token
    });

});

let server=app.listen(3000,()=>{
    console.log("server listen on 3000...");
});

socketConn.createConnection(server);