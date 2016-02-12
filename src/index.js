var http       = require('http'),
    AlexaSkill = require('./AlexaSkill'),
    APP_ID = "YOUR_APP_ID",
    banksUrl = "PUBLIC_URL" //use ngrok.io if you don't have a static ip;

var speech = function(speech) {
    return banksUrl +"/sendSpeech/"+speech;
}

var sendSpeechToBanks = function(words, callback) {
    http.get(speech(words), function(res) {
        var body = '';

        res.on('data', function(data){
            body += data;
        });

        res.on('end', function(){
            callback(body);
        });

    }).on('error', function(e){
        console.log('Error: ' + e);
    })
}

var handleSpeech = function(intent, session, response) {
    if (intent.slots.commands.music != undefined) {
        sendSpeechToBanks(intent.slots.commands.value + intent.slots.commands.music.value, function (data) {
            var cardText = data;
            var text = 'Ok ' + intent.slots.commands.value;
            var heading = 'Ok ' + intent.slots.commands.value;
            response.tellWithCard(text, heading, cardText);
        })
    }
    else {
        sendSpeechToBanks(intent.slots.commands.value, function (data) {
            var cardText = data;
            var text = 'Sure I will ' + intent.slots.commands.value;
            var heading = 'Ok ' + intent.slots.commands.value;
            response.tellWithCard(text, heading, cardText);
        })
    }
}

var Banks = function(){
    AlexaSkill.call(this, APP_ID);
};

Banks.prototype = Object.create(AlexaSkill.prototype);
Banks.prototype.constructor = Banks;

Banks.prototype.eventHandlers.onLaunch = function(launchRequest, session, response){
    var output = "Welcome"

    var reprompt = 'What commands do you want to know about?';

    response.ask(output, reprompt);
};

Banks.prototype.intentHandlers = {
    SendCommandIntent: function(intent, session, response){
        handleSpeech(intent, session, response);
    },

    HelpIntent: function(intent, session, response){
        var speechOutput = 'Say a command.';
        response.ask(speechOutput);
    }
};

exports.handler = function(event, context) {
    var skill = new Banks();
    skill.execute(event, context);
};