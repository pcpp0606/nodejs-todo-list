import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // .env 파일의 내용을 로드

const connect = () => {
    // mongoose.connect는 MongoDB 서버에 연결하는 메서드입니다.
    mongoose
        .connect(
            // 빨간색으로 표시된 부분은 대여한 ID, Password, 주소에 맞게끔 수정해주세요!
            //   'mongodb+srv://park:1234@express-mongo.uy7ttg7.mongodb.net/?retryWrites=true&w=majority',
            process.env.MONGO_URI, // 환경 변수에서 MongoDB URI를 가져옵니다.
            {
                dbName: 'node_lv1', // node_lv1 데이터베이스명을 사용합니다.
            },
        )
        .then(() => console.log('MongoDB 연결에 성공하였습니다.'))
        .catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));
};

mongoose.connection.on('error', (err) => {
    console.error('MongoDB 연결 에러', err);
});

export default connect;