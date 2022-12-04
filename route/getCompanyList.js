module.exports = (req, res) => {
    var axios = require('axios');
    require('dotenv').config()

    const BASEURL = process.env.BASEURL
    var URL = `${BASEURL}/companies?populate=*`;

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        console.log('Body is Empty');
    } else {
        if (!(req.body.company_name.length === 0 || (req.body.company_name).trim() === 'null')) {
            URL = URL + `&filters[name][$eqi]=${req.body.company_name.trim()}`;
        }
    }

    var config = {
        method: 'get',
        url: URL,
        headers: {}
    };


    console.log(URL);
    axios(config)
        .then(function (response) {
            var jsondata = []
            for (var i = 0; i < response.data.data.length; i++) {
                var jobs = []

                for (var k = 0; k < response.data.data[i].attributes.jobs.data.length; k++) {
                    jobs.push(
                        {
                            "job_id": response.data.data[i].attributes.jobs.data[k].attributes.job_id,
                            "location": response.data.data[i].attributes.jobs.data[k].attributes.location,
                            "designation": response.data.data[i].attributes.jobs.data[k].attributes.designation,
                            "link": response.data.data[i].attributes.jobs.data[k].attributes.link,
                        }
                    )
                }

                var categories = []

                for (var k = 0; k < response.data.data[i].attributes.categories.data.length; k++) {
                    categories.push(response.data.data[i].attributes.categories.data[k].attributes.name)
                }


                jsondata.push(
                    {
                        "id": response.data.data[i].id,
                        "company_name": response.data.data[i].attributes.name,
                        "logo": response.data.data[i].attributes.logo,
                        "jobs": jobs,
                        "categories": categories
                    }
                )
            }
            res.json(jsondata);
        })
        .catch(function (error) {
            console.log(error);
        });

}