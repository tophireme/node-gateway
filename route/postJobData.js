module.exports = (jobData, company) => {
  var axios = require('axios');
  var data = '{\r\n    \r\n}';
  require('dotenv').config()

  const BASEURL = process.env.BASEURL
  const TOKEN =  process.env.TOKEN
  
  var config = {
    method: 'get',
    url: `${BASEURL}/companies?filters[company_name][$eq]=${company}`,
    headers: { 
      'Content-Type': 'text/plain'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {

      var data = JSON.stringify({
        "data": {
          "job_id": jobData.job_id,
          "location": jobData.location,
          "link": jobData.link,
          "company": response.data.data[0].id
        }
      });
    
      var config = {
        method: 'post',
        url: `${BASEURL}/jobs`,
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        },
        data: data
      };
    
      axios(config)
        .then(function (response) {
          console.log(`Data Inserted for Job_id ${response.data.data.attributes.job_id} with id ${response.data.data.id}`);
        })
        .catch(function (error) {
          console.log(error);
        });
  })
  .catch(function (error) {
    console.log(error);
  });

}