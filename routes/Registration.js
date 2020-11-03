//Start the server and the run the Registration.js file seperately to register the users

const csv = require('csv-parser')
const fs = require('fs')
var axios = require('axios');
var async = require('async');
const results = [];
const functionArray = [];

function myFunction() {
    for (var i = 0; i < results.length; i++) {
        functionArray.push(
            //Post function
            axios.post('http://localhost:3000/users/signup',
                {
                    password: results[i].DOB,
                    username: results[i].Sid,
                    hostel: '5f37923011855135682d1ae8' // Hostel id of hostel for which the list is..
                    // Replace it everytime you want to add list of different hostel         
                })
                .then((res) => {
                    console.log(`Status: ${res.status}`);
                    console.log('Body: ', res.data);
                }).catch((err) => {
                    console.log(err);
                }),
        )
    }
}

fs.createReadStream('data.csv') //Csv file
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        //console.log(results);
        async.series([
            myFunction,
            functionArray
        ])

    });