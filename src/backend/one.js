import express from "express";
import jwt from "jsonwebtoken";
const app = express();
app.use(express.json());
const key = "MySecretKey";
const port = 700;
const dbuser =    {
            "username" : "cse123",
            "password" : "cvr123"
      };
      
app.post("/",function(req,res)
{
      const {username,password}=req.body
      if(username== dbuser.username && password == dbuser.password)
      {
            jwt.sign(dbuser,key,function(err,token)
            {
                  res.json({token});
                  res.end();
            });
      }
      else
      {
            res.send("Invalid Credentials");
            res.end();
      }
});

app.listen(port, function()
{
      console.log("Server Started:"+port);
});