import BaseConfig from './baseConfig';

// const API_ROOT = BaseConfig.debug
// ? 'https://w3-02.cyqapp.com' : 'https://production.domain.com';

const API_ROOT = 'https://w3-02.cyqapp.com'; // 开发
// const API_ROOT = 'https://www-02.cyqapp.com'; // 生产

const API_ROOT_DOMAIN = API_ROOT;
const AUTH_URL = `${API_ROOT_DOMAIN}/auth`;
const API_MYPROFILE_URL = `${API_ROOT_DOMAIN}/profile`;

const Network = {};

Network.API_ROOT = API_ROOT;

// auth
Network.AUTH_URL = `${AUTH_URL}`; // the authentication

// profile
Network.ME_URL = `${API_MYPROFILE_URL}`;

// APP download
Network.APP_DOWNLOAD_URL = 'http://a.app.qq.com/o/simple.jsp?pkgname=bobaikeji.cyq';

export default Network;
