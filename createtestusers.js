const AWS = require('aws-sdk');
const accessKeyID = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.REGION;
var documentClient = new AWS.DynamoDB.DocumentClient({accessKeyId: accessKeyID, secretAccessKey: secretAccessKey, region: region, apiVersion: '2012-10-08'});
var params = {
    TableName: 'usertable',
    Item: {
        id: 1005,
        country: 'India',
        distance: 5301,
        dob: '05/07/1984',
        email: 'v-nkuruvelil@carrentals.com',
        first_name: 'Nikhil',
        last_name: 'Kuruvelil',
        gender: 'Male',
        is_campaigned: false,
        last_login: '15/11/2018',
        mobile_no: '14049928875',
        no_of_bookings: 15,
        days_booked: 156,
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