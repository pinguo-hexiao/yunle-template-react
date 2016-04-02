// 接口域名
let host = '/api/v1';

if(process.env.NODE_ENV === 'production'){
	// 正式线上接口
  host = '/online_api';
}

export const API_ROOT = host;








