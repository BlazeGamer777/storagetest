const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const moment = require('moment');

let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
let inv = JSON.parse(fs.readFileSync('Storage/inv.json', 'utf8'));

bot.on('message', message => {

  var sender = message.author
  var msg = message.content.toUpperCase();
  var prefix = '='

  if(!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {}
  if(!userData[sender.id + message.guild.id].money) userData[sender.id + message.guild.id].money = 1000;
  if(!userData[sender.id + message.guild.id].lastDaily) userData[sender.id + message.guild.id].lastDaily = "Not Collected";

  fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
    if (err) console.log(err);
  })

  if (msg === prefix + 'PING'){
    message.channel.send("Pong!")
  }


  if (msg === prefix + 'MONEY' || msg === prefix + 'BALANCE' || msg === prefix + 'CASH' || msg === prefix + 'BANK') {
    message.channel.send({"embed":{
      title: "Bank",
      color: 0xF1C40F,
      fields:[{
        name:"Account Holder",
        value:message.author.username + "#" + message.author.discriminator,
        inline:true
      },
      {
        name:"Cash",
        value: userData[sender.id + message.guild.id].money,
        inline:true
      }]

    }})
  }

  if (msg === prefix + 'ATEST'){
    userData[sender.id + message.guild.id].money = userData[sender.id + message.guild.id].money + 100

    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
      if (err) console.log(err);
    })

    message.channel.send("Deposited $100 to your account!");
  }

  if (msg === prefix + 'DTEST'){
    userData[sender.id + message.guild.id].money = userData[sender.id + message.guild.id].money - 100

    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
      if (err) console.log(err);
    })

    message.channel.send("Withdrawed $100 from your account!");
  }

  if (msg === prefix + 'DAILY'){
    if (userData[sender.id + message.guild.id].lastDaily != moment().format('L')) {
      userData[sender.id + message.guild.id].lastDaily = moment().format('L')
      userData[sender.id + message.guild.id].money += 500;
      message.channel.send({embed:{
        title:"Daily Reward",
        description:"You got $500 added to your account! Please come back later!"
      }})
    } else {
      message.channel.send({embed:{
        title:"Daily Reward",
        description:"You already got your daily cash! Check back later! You can collect your reward " + moment().endOf('day').fromNow() + "."
    }})

    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
      if (err) console.log(err);
    })
  }

  }

});

bot.on('ready', () => {
  console.log("Ready!")
})

bot.login('NTAzNzA3Njc0MDc3Mjk4Njg4.Dq6Z-w.mMOvE-ZSmnwx9V_c2H8QNELfgNk');
