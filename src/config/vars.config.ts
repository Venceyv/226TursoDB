import dotenv from 'dotenv';
dotenv.config();

export const vars = {
    serverURL:process.env.SERVER_URL,
    port:process.env.PORT,
    db_url:process.env.DATABASEURL,
    db_token:process.env.DBAUTHTOKEN,
    baidu_url:process.env.BAIDU_URL
}
 
