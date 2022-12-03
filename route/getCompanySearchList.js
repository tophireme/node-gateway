module.exports = (req, res) => {
    var axios = require('axios');
    var URL = 'http://localhost:1337/api/companies'
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        console.log('Object missing');
    } else {
        if (!(req.body.search === 0 || (req.body.search).trim() === 'null')) {
            URL = URL + `?filters[name][$containsi]=${req.body.search.trim()}`;
        }
    }
    var config = {
        method: 'get',
        url: URL,
        headers: {}
    };

    axios(config)
        .then(function (response) {
            var data = []
            for(var i =0; i<response.data.data.length; i++){
            data.push(
                {
                    "company": response.data.data[i].attributes.name,
                    "logo": response.data.data[i].attributes.logo
                }
                )
            }
          res.json(data);
        })
        .catch(function (error) {
            console.log(error);
        });

}