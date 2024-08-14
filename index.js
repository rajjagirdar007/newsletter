const express = require('express')
const app = express()
const port = 3097
const path = require("path");
const fs = require("fs");
var http = require('http');
const mysql = require('mysql');

const connection = mysql.createConnection({
	host:'192.168.152.3',
	user:'linkedin',
	password:'g[#)B?7,S]D<bu59R',
	database:'mycivvi'
});

connection.connect((err)=>{
	if(err) throw err;
	console.log('Connected to mycivvi');
});
var cors = require('cors')
app.use(cors())

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use("/public", express.static('/var/www/welcome.mpengs/public'));

app.get('/',(req,res) => {
	res.sendFile('/var/www/newsletter.mpengs/index.html')
})

app.get('/get_event_pics3', (req, res) => {
    const file = "/var/www/welcome.mpengs/public/newsletter"
    const array = [""]
    fs.readdir(file, function(err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function(file) {
            var stat = fs.statSync(`/var/www/welcome.mpengs/public/newsletter/${file}`);

            if (stat.isFile()) {
                var p = `/public/newsletter/${file}`;
                var obj = {
                    path: `/public/newsletter/${file}`
                }

                array.push(p);
            }
        });
        res.send({ data: array });
    })
})



app.post('/get_ips', (req, res) => {
    const ip_count = req.body.data;  // tried req.query with the same (undefined) result
	var sql = 'INSERT INTO user_count(`long`, `lat`, `count`) VALUES (${ip_count.long}, ${ip_count.lat}, ${ip_count.count})';
	connection.query(sql, (err, results, fields) => {
		console.log(sql + "success!!!");		
		if (err) throw err;
	})

	console.log(ip_count); 
})

app.listen(port, ()=>{
	console.log(`Listening in on ${port}`)
})
