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
const target = require('./input/target_data.json')
const apple = require('./input/apple_data.json')
const deloitte = require('./input/deloitte_data.json')
const optum = require('./input/optum_data.json')
const ey = require('./input/ey_data.json')

app.post('/api/job', (req, res) => {
    getJobData(req, res)
})

app.post('/api/company', (req, res) => {
    getCompanyList(req, res)
})

app.post('/api/search/company', (req, res) => {
    getCompanySearchList(req, res)
})

app.get('/api/insert/job/optum', (req, res)=>{

    console.log(optum.data.length);
    for (let index = 1; index < optum.data.length; index++) {
        
        postJobData(optum.data[index], optum.company, optum.career_page_url)
    }
    res.json({
        "status": "Executed",
        "total-job": optum.data.length ,
    })

})

app.get('/api/insert/job/deloitte', (req, res)=>{

    console.log(deloitte.data.length);
    for (let index = 1; index < deloitte.data.length; index++) {
        
        postJobData(deloitte.data[index], deloitte.company, deloitte.career_page_url)
    }
    res.json({
        "status": "Executed",
        "total-job": deloitte.data.length ,
    })

})



app.listen(PORT, ()=>{
    console.log(`app running on port ${PORT}`);
})