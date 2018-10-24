require('dotenv').config();//instatiate environment variables

var CONFIG = {} //Make this global to use all over the application

CONFIG.app          = process.env.APP   || 'development';
CONFIG.port         = process.env.PORT  || '3001';
CONFIG.port2         = process.env.PORT2  || '4000';

CONFIG.db_dialect   = process.env.DB_DIALECT    || 'mongo';
CONFIG.db_host      = process.env.DB_HOST       || 'localhost';
CONFIG.db_port      = process.env.DB_PORT       || '27017';
CONFIG.db_name      = process.env.DB_NAME       || 'vchar3';
CONFIG.db_user      = process.env.DB_USER       || 'root';
CONFIG.db_password  = process.env.DB_PASSWORD   || 'db-password';

CONFIG.jwt_secret_key  = process.env.JWT_ENCRYPTION || '!!buri-nazar-walle-tera-mooh-kala';
CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION || '10000';

CONFIG.email_host      = process.env.EMAIL_HOST || '';
CONFIG.email_port      = process.env.EMAIL_PORT || '';
CONFIG.email_username  = process.env.EMAIL_USERNAME || '';
CONFIG.email_password  = process.env.EMAIL_PASSWORD || '';

module.exports = CONFIG;
