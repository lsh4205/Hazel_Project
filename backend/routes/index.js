var express = require('express');
var fs = require('fs');
var csv = require('csv-parser')
var router = express.Router();

/* GET home page. */
router.get('/carbonTotals', async function(req, res, next) {
  try {
    // Read from our csv. Firebase has been removed from project.
    let result = []
    fs.createReadStream("./totals.csv")
    .pipe(csv())
    .on("data", (data) => {
        const monthlyData = {
          month: data.Month, 
          tonnes: parseFloat(data["Tonnes Removed:"])
        }
        result.push(monthlyData);
    })
    .on("end", () => {
        console.log(result);
       
        res.send({data: result});
    });
  }catch(e) {
    console.log(e)
    
    res.send({message: "there was an error"})
  }
  
});

module.exports = router;
