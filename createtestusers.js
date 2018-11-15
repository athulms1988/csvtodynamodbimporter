const AWS = require('aws-sdk');
const accessKeyID = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.REGION;
var documentClient = new AWS.DynamoDB.DocumentClient({accessKeyId: accessKeyID, secretAccessKey: secretAccessKey, region: region, apiVersion: '2012-10-08'});
var params = {
    TableName: 'usertable',
    Item: {
        id: 1003,
        country: 'India',
        distance: 3045,
        dob: '20/09/1990',
        email: 'jogijacob89@gmail.com',
        first_name: 'Jogi',
        last_name: 'Jacob',
        gender: 'Male',
        is_campaigned: false,
        last_login: '03/10/2018',
        mobile_no: '9809034879',
        no_of_bookings: 10,
        days_booked: 180,
        is_actual_user: 1
    }
};
documentClient.put(params, function(err, data) {
    if (err == null) {
        console.log(data);
    } else {
        console.log(err);
    }
});