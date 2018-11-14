var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');
const AWS = require('aws-sdk');
var csv_filename = "mockuserdata.csv";
const accessKeyID = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.REGION;
var documentClient = new AWS.DynamoDB.DocumentClient({accessKeyId: accessKeyID, secretAccessKey: secretAccessKey, region: region, apiVersion: '2012-10-08'});
rs = fs.createReadStream(csv_filename);
parser = parse({
    columns : true,
    delimiter : ','
}, function(err, data) {

    var split_arrays = [], size = 1;

    while (data.length > 0) {
        split_arrays.push(data.splice(0, size));
    }
    data_imported = false;
    chunk_no = 1;

    async.each(split_arrays, function(item_data, callback) {
        item_data[0].id = parseInt(item_data[0].id);
        item_data[0].distance = parseInt(item_data[0].distance);
        item_data[0].no_of_bookings = parseInt(item_data[0].no_of_bookings);
        item_data[0].is_campaigned = item_data[0].is_campaigned === "true" ? true : false
        item_data[0].is_actual_user = 0;
        var params = {
            TableName: 'usertable',
            Item: item_data[0]
          };
          documentClient.put(params, function(err, data) {
            console.log('done going next');
            if (err == null) {
                console.log('Success chunk #' + chunk_no);
                data_imported = true;
            } else {
                console.log(err);
                console.log('Fail chunk #' + chunk_no);
                data_imported = false;
            }
            chunk_no++;
            callback();
          });
        /*documentClient.batchWriteItem(params, {}, function(err, res, cap) {
            console.log('done going next');
            if (err == null) {
                console.log('Success chunk #' + chunk_no);
                data_imported = true;
            } else {
                console.log(err);
                console.log('Fail chunk #' + chunk_no);
                data_imported = false;
            }
            chunk_no++;
            callback();
        });*/
    }, function() {
        // run after loops
        console.log('all data imported....');

    });
});
rs.pipe(parser);