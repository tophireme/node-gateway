const express = require('express');
var cors = require('cors')

const postJobData = require('./route/postJobData')
const getJobData = require('./route/getJobData')
const getCompanyList = require('./route/getCompanyList')
const getCompanySearchList = require('./route/getCompanySearchList')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('success')
})
///  company data imported
const amazon = require('./input/amazon_data.json')

app.post('/api/job', (req, res) => {
    getJobData(req, res)
})

app.post('/api/company', (req, res) => {
    getCompanyList(req, res)
})

app.post('/api/search/company', (req, res) => {
    getCompanySearchList(req, res)
})

app.get('/api/insert/job/amazon', (req, res)=>{

    console.log(amazon.data.length);
    for (let index = 1; index < amazon.data.length; index++) {
        
        postJobData(amazon.data[index], amazon.company, amazon.career_page_url)
    }
    res.json({
        "status": "Executed",
        "total-job": amazon.length ,
    })

})

app.listen(PORT, ()=>{
    console.log(`app running on port ${PORT}`);
})