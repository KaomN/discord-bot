/*
	!remindme <time amount> <time unit>
  Reply to a message to set a reminder
  Example: !remindme 5 minutes
*/

var schedule = require('node-schedule');

isValidTimeUnit = (timeUnit) => {
  const validTimeUnits = ["seconds", "second", "sec", "s", "minutes", "minute", "m", "min", "hours", "hour", "h", "days", "day", "d", "weeks", "week", "w"]
  return validTimeUnits.includes(timeUnit)
}

convertTimeUnitToSeconds = (timeUnit) => {
  switch (timeUnit) {
    case "seconds":
    case "second":
    case "sec":
    case "s":
      return 1
    case "minutes":
    case "minute":
    case "m":
    case "min":
      return 60
    case "hours":
    case "hour":
    case "h":
      return 3600
    case "days":
    case "day":
    case "d":
      return 86400
    case "weeks":
    case "week":
    case "w":
      return 604800
  }
}

exports.run = async (message, args) => {
  if (!message.reference) {
    return message.reply("You need to reply to a message to use this command.")
  }

  const timeAmount = args[0]
  if (!timeAmount) {
    return message.reply("You need to specify a time amount.")
  }
  else if (isNaN(timeAmount)) {
    return message.reply("You need to specify a valid time amount.")
  }

  const timeUnit = args[1]
  if (!timeUnit) {
    return message.reply("You need to specify a time unit.")
  }
  else if (!isValidTimeUnit(timeUnit)) {
    return message.reply("You need to specify a valid time unit.")
  }

  const repliedTo = await message.fetchReference();
  if (!repliedTo) {
    return message.reply("You need to reply to a message to use this command.")
  }

  var date = new Date()
  date.setSeconds(date.getSeconds() + (timeAmount * convertTimeUnitToSeconds(timeUnit)))

  const job = schedule.scheduleJob(date, function() {
    message.reply('Reminding you about message:\n' + repliedTo.content)
  });
}

exports.help = {
	name: "remindme",
	description: "\u001b[0;37mReminds you about a message after a specified amount of time. Reply to a message to set a reminder.",
	usage: "\u001b[0;37m!\u001b[0;32mremindme \u001b[0;33m<time amount> <time unit>"
};