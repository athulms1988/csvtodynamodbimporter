const AWS = require('aws-sdk');
const moment = require('moment');
const accessKeyID = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.REGION;
var documentClient = new AWS.DynamoDB.DocumentClient({accessKeyId: accessKeyID, secretAccessKey: secretAccessKey, region: region, apiVersion: '2012-10-08'});
var active = 60;
var fairlyActive = 180;
var params = {
    TableName: 'usertable'
};

function createCampaignId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function getRandomChannelCount() {
    var result = [1,2,3];
    return result[Math.floor(Math.random()*result.length)];
}

function getRandomStatus() {
    var result = [1, 0];
    return result[Math.floor(Math.random()*2)];
}
  
documentClient.scan(params, function(err, data) {
    if (err) {
        console.log(err);
        res.status(400).json({status: 400, message: 'error in fetching data'});
    } else {
        var currentTime = moment();
        data.Items.forEach(function(element, index, array) {
            var lastLogin = moment(element["last_login"],'DD/MM/YYYY');
            var dateDiff = 0;
            if(lastLogin) {
                dateDiff = currentTime.diff(lastLogin, 'days');
            }
            if(dateDiff <= active) {
                
            } else if(dateDiff <= fairlyActive) {
                var channelCount = getRandomChannelCount();
                for(var i=0 ; i < channelCount; i++) {
                    var campaign = {
                        campaignid: createCampaignId(),
                        userid: element["id"],
                        channel: ["whatsapp","email","webpush"][i],
                        status: getRandomStatus(),
                        date: moment().format("DD/MM/YYYY")
                    }
                    var campaignParam = {
                        TableName: 'campaigntable',
                        Item: campaign
                    }

                    documentClient.put(campaignParam, function(err, data) {
                        if (err == null) {
                            console.log(data);
                        } else {
                            console.log(err);
                        }
                    });
                }
            } 
        });
    }
});