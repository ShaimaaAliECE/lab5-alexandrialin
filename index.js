const express = require('express');
let jobList = require('./jobs.json');

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.static('static'));

app.get('/jobsInJson', (req,res) => {

      res.json(jobList);
  })

  app.get('/categoryMention', (req,res) => {
    let counter=0;
      let category = new Map();
      for(const j in jobList){
          for(const c in jobList[j].categories){

            if(category.hasOwnProperty(jobList[j].categories[c])){
                counter = category[(jobList[j].categories[c])];
                counter++;
                //console.log(counter);
                category[jobList[j].categories[c]] = counter;

            }
            else{
                category[jobList[j].categories[c]]=1;
            }
        }
      }
      res.send(JSON.stringify(category));
  })

  app.get('/jobsInCity', (req,res) => {
    //find the product based on the desc
    let jobExists = false;
    let validJobs= {};
    for (const p in jobList)
    {
        if (jobList[p].title.includes(req.query.title))
        {        
            validJobs[p] = jobList[p].title;   
          
        }
    }
    
    res.send(JSON.stringify(validJobs));
 })
app.get('/getCategory/:categories', (req,res) => {
    let jobsInCategory = {};
    for(const j in jobList){
        for(const c in jobList[j].categories){
            if(jobList[j].categories[c] == req.params.categories){
                jobsInCategory[j] = jobList[j].title;
            }
        }
  
    }
    res.json(jobsInCategory);
    
})

app.listen(2000);