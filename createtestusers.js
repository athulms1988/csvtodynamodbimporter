const AWS = require('aws-sdk');
const accessKeyID = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.REGION;
var documentClient = new AWS.DynamoDB.DocumentClient({accessKeyId: accessKeyID, secretAccessKey: secretAccessKey, region: region, apiVersion: '2012-10-08'});
var params = {
    TableName: 'usertable',
    Item: {
        id: 1001,
        country: 'India',
        distance: 4345,
        dob: '08/10/1988',
        email: 'athul.salimkumar@ibsplc.com',
        first_name: 'Athul',
        last_name: 'MS',
        gender: 'Male',
        is_campaigned: false,
        last_login: '03/10/2017',
        mobile_no: '9496328220',
        no_of_bookings: 15,
        is_actual_user: true
    }
};
documentClient.put(params, function(err, data) {
    if (err == null) {
        console.log(data);
    } else {
        console.log(err);
    }
});