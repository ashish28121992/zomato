const express = require('express');
const mysql = require('mysql');
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 4000;

app.use(express.json())
app.use(cors())

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'zomato'
    

});

con.connect((err)=>{
    if(err){
        console.log(err.sqlMessage)  
    }
    else{
        console.log("connected")

    }
})



app.get('/hotellist', (req, res) => {

    const q1 = "SELECT * from hotel";

    con.query(q1, (err, result) => {
        if (err) {
            res.send(err.sqlMessage)
            console.log(err.sqlMessage)
        } 
        else {
          res.send(result);
        }
    })

});


app.post('/hotelregistration', (req, res) => {
    const data = {
        hid : req.body.hid ,
        hname: req.body.hname,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pin: req.body.pin,
        howner: req.body.howner,
        contact: req.body.contact,
        type: req.body.type
    }

    const q1 = "insert into hotel set ?"
    con.query(q1, data, (err, result) => {
        if (err) {
            console.log(err.sqlMessage)
        } else {
           res.send(result)
        }
    })


});
app.get('/menulist', (req, res) => {

    const q1 = "SELECT * from menu";

    con.query(q1, (err, result) => {
        if (err) {
            res.send(err.sqlMessage)
            console.log(err.sqlMessage)
        } 
        else {
          res.send(result);
        }
    })

});


app.post('/menuitem', (req, res) => {
    const data = {
        mid : req.body.mid ,
        item: req.body.item,
        price: req.body.price,
        tag: req.body.tag,
        avloption: req.body.avloption,
        hid: req.body.hid
        
    }

    const q1 = "insert into menu set ?";
    con.query(q1, data, (err, result) => {
        if (err) {
            console.log(err.sqlMessage)
        } else {
           res.send(result)
        }
    })


});
// Create delete api (/hotellist/:id)
	app.delete('/hotellist/:hid', (req, res) => {
    const data = req.params.hid;
    const q1 = "delete from hotel where hid=?";
    con.query(q1,data,(err, result)=>{
        if(err){
            console.log(err.sqlMessage);
        }else{
            res.send(result);
           }
    })
});



app.put('/hotellist/:hid', (req, res) => {
    const data = [req.body.city, req.body.hname,req.body.address,req.body.city,req.body.state,req.body.pin,req.body.howner,req.body.contact, req.params.hid];
    con.query("UPDATE hotel SET city=?, hname=?, address=?, city=?, state=?, pin=?, howner=?, contact=? WHERE hid=?", data, (err, result, field)=>{
        if(err)
            console.log(err.sqlMessage);
        else
            res.send(result);
    })
	});
	







app.listen(4000);