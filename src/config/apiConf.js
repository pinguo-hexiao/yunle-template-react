// 接口域名
let host = '/proxy';

if(process.env.NODE_ENV === 'production'){
	// 正式线上接口
  host = '/api/v1';
}

export const API_ROOT = host;








