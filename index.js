const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
  req.body.events.forEach((event) => {
    if (event.type === 'message' && event.message.type === 'text') {
      const replyMessage = { type: 'text', text: `You said: ${event.message.text}` };
      new line.Client(config).replyMessage(event.replyToken, replyMessage);
    }
  });
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
