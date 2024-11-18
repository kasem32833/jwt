require('dotenv').config();
const jwtSecretKey = process.env.JWT_SECRET;
const smtpUser = process.env.SMTP_USER;
const smtpPassword = process.env.SMTP_PASSWORD;
const uploadDir = process.env.UPLOAD_DIR


module.exports = {jwtSecretKey, smtpPassword, smtpUser, uploadDir}