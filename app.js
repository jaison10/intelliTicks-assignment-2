const express = require('express')
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

app.get('/',(req, res)=>{
    return res.redirect('main.html')
})
app.get('/getAllData', (req, res)=>{    
    var allData = []
    base('Table 1').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 10,
        view: "Grid view"
    }).eachPage(
        function page(records, fetchNextPage) {    
        records.forEach(function(record) {
            // console.log('Retrieved', record.get('Name'));
            // console.log(record);
            console.log(record["fields"]);
            // allData.push(record["fields"]);
            allData.push({
                "Name": record.fields["Name"],
                "Desc": record.fields["Desc"],
                "Size": record.fields["Size"],
                "id": record.id
            })
        });
        
        fetchNextPage();
        
    }, function done(err) {
        if (err) { console.error(err); return; }
        console.log(allData);
        return res.status(200).json(allData)
    });
})

app.get('/add', (req, res)=>{
    console.log("Add get ");
    return res.redirect('add.html')
})

app.delete("/delete/:id", (req, res)=>{
    var id = req.params.id;
    console.log("DELETING ID IS: ", id);
    
    base('Table 1').destroy(id, function(err, deletedRecords) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Deleted', deletedRecords.length, 'records');
    });

    return res.status(200).json()
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