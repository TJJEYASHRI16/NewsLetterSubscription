const express = require('express');
const bodyParser = require('body-parser')

const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({encoded:true}));
app.use(express.static("public"));

app.listen(process.env.PORT || "3000" , function(){
    console.log("server started on 3000");
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
    console.log(__dirname+"/signup.html");
});


app.post("/failure" , function(req,res){
res.redirect("/");
});


app.post("/" , function(req,res){
const first = req.body.first;
const last = req.body.last;
const email = req.body.email;

const data = {
members:[
    {
        email_address:email,
        status:'subscribed',
        merge_fields:
            {
                FNAME:first,
                LNAME:last
            }
        
    }
]
}

const jsonData = JSON.stringify(data);
const url = "https://us17.api.mailchimp.com/3.0/lists/9f57eef379";
const options = {
    
    
    method: 'POST',
    auth:'tjeyashri:722eaf753451ebf8ad4579278effaa10-us17'
  };

const request = https.request(url,options,function(response){
    
response.on("data",function(data){
    const statusCode = response.statusCode;
    if(statusCode==200){
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }
    console.log(JSON.parse(data));
})
});
console.log(jsonData);
request.write(jsonData);
request.end();
});

//apikey
//722eaf753451ebf8ad4579278effaa10-us17

//list id
//9f57eef379