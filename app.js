const express = require('express')
const fs = require('fs');
const path = require('path');
var bodyParser = require('body-parser');

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyXlUV0DUim1jJeY'}).base('appshl3X83nUdBArI');

const app = express()
app.use(bodyParser.json());
app.use(express.json())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({     
    extended:true
}));
const PORT= process.env.PORT || 3000

// app.get('/', (req, res)=>{
//     // res.sendFile('../../index.html');
//     console.log("Im here");
//     base('Table 1').find('recDO9GsjZFBoLTi2', function(err, record) {
//         if (err) { console.error(err); return; }
//         console.log('Retrieved', record.get('Name'));
//     });
//     res.sendFile(path.join(__dirname+'/main.html'));

// })
app.get('/getAllData', (req, res)=>{    
    var allData = []
    base('Table 1').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 10,
        view: "Grid view"
    }).eachPage(
        function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
    
        records.forEach(function(record) {
            // console.log('Retrieved', record.get('Name'));
            // console.log(record);
            console.log(record["fields"]);
            allData.push(record["fields"]);
        });
        
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
        
    }, function done(err) {
        if (err) { console.error(err); return; }
        console.log(allData);
        return res.status(200).json(allData)
    });
    // res.sendFile(path.join(__dirname+'/main.html'));
    // return res.redirect('main.html')
})

app.get('/add', (req, res)=>{
    console.log("Add get ");
    // res.sendFile(path.join(__dirname+'/add.html'));
    return res.redirect('add.html')
})

app.post('/addData', (req, res)=>{
    console.log(req.body);

    base('Table 1').create([
        {
          "fields": {
            "Name": req.body.name,
            "Desc": req.body.desc,
            "Size": req.body.size
          }
        }], function(err, records) {
        if (err) {
            console.error(err);
            return;
        }
        records.forEach(function (record) {
            console.log(record.getId());
        });
    });

    return res.redirect('main.html')
})

app.listen(PORT);