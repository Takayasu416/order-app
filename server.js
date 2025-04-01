const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// メール送信設定
const transporter = nodemailer.createTransport({
  service: 'gmail', // Gmailを使う場合
  auth: {
    user: 'yasu0415kmb@gmail.com',
    pass: 'plao uonb hkqt pqke'
  }
});

app.post('/send-order', (req, res) => {
  const order = req.body.order;

  const mailOptions = {
    from: 'yasu0415kmb@gmail.com',
    to: 'yasu0415kmb@gmail.com',
    subject: '注文が届きました！',
    text: `注文内容:\n\n${order}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('メール送信に失敗しました');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('メール送信成功！');
    }
  });
});

app.listen(port, () => {
  console.log(`サーバー起動中: http://localhost:${port}`);
});
