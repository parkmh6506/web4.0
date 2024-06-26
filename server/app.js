// 서버 설정
const keys = require('./config/key');

const express = require('express');
const app = express();
const port = keys.SERVER_PORT;                      

app.use(express.urlencoded({extended:true}));   //application/x-www-form-urlencoded (x-www-form-urlencoded 형태의 요청 body를 파싱)
app.use(express.json());                        //application/json (JSON 형태의 요청 body를 파싱)

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const cors = require('cors');
const client = `http://${keys.CLIENT_HOST}:${keys.CLIENT_PORT}`;
app.use(cors({
    origin: client,
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
}));


// 라우팅 설정
const userRouter = require('./controllers/UserController');

app.use('/users', userRouter);


// 서버 오픈
app.listen(port, () => {
    console.log(`[Server] 서버를 정상적으로 열었습니다. (http://${keys.SERVER_HOST}:${keys.SERVER_PORT})`);
});