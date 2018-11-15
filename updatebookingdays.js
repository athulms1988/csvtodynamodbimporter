const AWS = require('aws-sdk');
const accessKeyID = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.REGION;
var documentClient = new AWS.DynamoDB.DocumentClient({accessKeyId: accessKeyID, secretAccessKey: secretAccessKey, region: region, apiVersion: '2012-10-08'});

 function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
var params = {
    TableName: 'usertable'
};
documentClient.scan(params, function(err, data) {
    if (err) {
        console.log(err);
        res.status(400).json({status: 400, message: 'error in fetching data'});
    } else {
        data.Items.forEach(function(element, index, array) {
            //element["days_booked"] = getRandomArbitrary(0,300);
            var updateParams = {
                TableName: 'usertable',
                Key: { id : element["id"] },
                UpdateExpression: 'set #days_booked = :days_booked',
                ConditionExpression: '#id = :id',
                ExpressionAttributeNames: {'#days_booked': 'days_booked', '#id' : 'id'},
                ExpressionAttributeValues: {
                    ':days_booked': getRandomArbitrary(0,300),
                    ':id' : element["id"]
                }
            };
            documentClient.update(updateParams, function(err, data) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        });
    }
});