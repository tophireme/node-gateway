module.exports = (req, res) => { 
var axios = require('axios');
require('dotenv').config()

const BASEURL = process.env.BASEURL
var URL = `${BASEURL}/jobs?populate=*`;

if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
    console.log('Body is Empty');
  }
  else{
    if(!((req.body.location).trim() === 'null' || (req.body.location).trim() === '')){
        URL = URL + `&filters[location][$eqi]=${req.body.location}`;
       }
       if(!((req.body.designation).trim() === 'null' || (req.body.designation).trim() === '')){
        URL = URL + `&filters[designation][$eqi]=${req.body.designation}`;
       }
  }

console.log(URL);
var config = {
  method: 'get',
  url: URL,
  headers: { }
};

axios(config)
.then(function (response) {
    var data = []
    for(var i =0; i<response.data.data.length; i++){
    // console.log(response.data.data[i].attributes.company.data.attributes.name);
    data.push(
        {
            "job_id": response.data.data[i].attributes.job_id,
            "location": response.data.data[i].attributes.location,
            "designation": response.data.data[i].attributes.designation,
            "link": response.data.data[i].attributes.link,
            "company": response.data.data[i].attributes.company.data.attributes.name,
            "logo": response.data.data[i].attributes.company.data.attributes.logo
        }
        )
    }
  //res.json(response.data);
  res.json(data);
})
.catch(function (error) {
  console.log(error);
});


}