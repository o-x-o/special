var tools = {

	date(args, cn) {
		var date = args ? new Date(args.replace(/-/mg,'/')) : new Date();
		return date.getFullYear() + (cn?'年':'-') + (date.getMonth() + 1) + (cn?'月':'-') + date.getDate() + (cn?'日':'');
	},

	uuid: function() {
		return (new Date().getTime()) + this.random(10)
	},

	/* 添加Cookie addCookie("xxx","123",{expires:5});保存5秒 */
	addCookie: function(name, value, options) {
		if (arguments.length > 1 && name != null) {
			if (options == null) {
				options = {};
			}
			if (value == null) {
				options.expires = -1;
			}
			if (typeof options.expires === 'number') {
				const time = options.expires;
				const expires = options.expires = new Date();
				expires.setTime(expires.getTime() + (time * 1000));
			}
			if (options.path == null) {
				options.path = '/';
			}
			if (options.domain == null) {
				options.domain = '';
			}
			document.cookie = `${encodeURIComponent(String(name))}=${encodeURIComponent(String(value)) + (options.expires != null ? `; expires=${options.expires.toUTCString()}` : '') + (options.path !== '' ? `; path=${options.path}` : '') + (options.domain !== '' ? `; domain=${options.domain}` : '') + (options.secure != null ? '; secure' : '')}`;
		}
	},
	/* 获取Cookie */
	getCookie: function(name) {
		let value;
		if (name != null) {
			value = new RegExp(`(?:^|; )${encodeURIComponent(String(name))}=([^;]*)`).exec(document.cookie);
		}
		return value ? decodeURIComponent(value[1]) : null;
	},
	/* 移除Cookie */
	removeCookie: function(name, options) {
		this.addCookie(name, null, options);
	},

	ajax: function({
		method = 'POST',
		url = '',
		async = true,
		data = {},
		form,
		success = function () {},
		error = function () {}
	} = {}) {
		method = method.toUpperCase();
		const xmlHttp = new XMLHttpRequest();
		const params = [];
		const formData = new window.FormData();
		Object.keys(data).forEach((key) => {
			params.push(`${key}=${data[key]}`);
			formData.append(key, data[key]);
		});
		if (method === 'GET') {
			xmlHttp.open(method, `${url}?${params.join('&')}`, async);
			xmlHttp.send(null);
		} else {
			/* 默认参数形式为 request payload */
			if (form === true) {
				/* 参数形式为 form data 与用params.join('&')还是formData对象并无关系 */
				xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
			}
			xmlHttp.open(method, url, async);
			// xmlHttp.withCredentials = true; /* 支持跨域发送cookies */
			xmlHttp.send(formData); /* 可能formData对象，或者params.join('&')字符串都可以 formData支持文件 但不可以直接用JSON对象 */
		}
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState === 4) {
				if (xmlHttp.status === 200) {
					success(xmlHttp.responseText);
				} else {
					error(xmlHttp.responseText);
				}
			}
		};
	},

	/* 预览 */
	preUpload: function({
		process = () => {},
		load = () => {},
		multiple = 'true',
		size = '10',
		// accept = 'image/jpg,image/jpeg,image/png,image/gif,image/tiff,image/bmp',
		accept = 'image/*'
	} = {}) {
		input = document.createElement('INPUT');
		input.type = 'file';
		input.setAttribute('style', 'display:none');
		input.accept = accept;
		input.multiple = multiple;
		input.onchange = function (event) {
			const files = Array.from(this.files || event.target.files || event.dataTransfer.files);
			files.forEach((file) => {
				const fileReader = new FileReader();
				fileReader.onprogress = function (e) {
					if (this.over) {
						return;
					}
					if (file.size > size * 1024 * 1024) {
						window.zlert(`文件过大，请上传小于${size}M的文件:${file.name}`);
						this.over = true;
					}
					process((e.loaded / e.total), file);
					// console.log(`${file.name}[${file.type}]:${((e.loaded / e.total) * 100).toFixed()}%`);
				};
				fileReader.onload = function () {
					if (this.over) {
						return;
					}
					load(this.result, file);
					// console.log(`${file.name}[${file.type}]:load.`);
					// this.adjustImg(this.result, e.total / 1024);
				};
				fileReader.onerror = function () {
				};
				fileReader.readAsDataURL(file);
			});
			document.body.removeChild(inputDom);
		};
		var inputDom = document.body.appendChild(input);
		input.click();
	},

	OSSUpload: function(file, call, category, errorFn) {
		axios.post('common/get_policy', {}, {loading: false}).then(res => {
			const data = res.data;
			const path = `web/chat/${category||'etc'}/${this.date()}/${this.uuid()}.${file.name.split('.')[1] || file.type.split('/')[1]}`;
			// const expire = parseInt(data.expire, 10);
			this.ajax({
				url: data.urlPre,
				data: {
					key: path,
					policy: data.policy,
					OSSAccessKeyId: data.accessid,
					success_action_status: '200', // 让服务端返回200,不然，默认会返回204
					signature: data.signature,
					name: file.name,
					file
				},
				success: () => {
					call(`${data.urlPre}${path}`);
				},
				error: (ret) => {
					console.error(ret);
					typeof errorFn === 'function' && errorFn(ret);
					alert('上传失败');
				}
			});
		}).catch(err => {
			console.error(err);
		});
	},

	/* 
		图片加载完成回调 onLoad(imgs, (loaded)=>{}); 或 onLoad(imgs).then((loaded)=>{}); 
		参数imgs可以是单元素可以是数组，可以是Image对象可以是URL字符串。（Image对象即是HTMLImageElement对象）
		该方法不仅适用于Image对象，还适用于其他拥有onload方法的对象。
	*/
	onLoad: function(imgs, call) {
		imgs = imgs.forEach ? imgs : [imgs]; // 有可能是NodeList等
		const loaded = [];
		return Promise.all(
			Array.prototype.map.apply(imgs, [(img => 
				new Promise((resolve, reject) => {
					let image;
					if(typeof img === 'string') {
						image = new Image();
						image.src = img;
					} else {
						image = img;
					}
					if(image.complete) resolve(image);
					else image.onload = () => resolve(image);
					image.onerror = reject;
				}).then(img => loaded.push(img))
				.catch(err => console.log(err))
			)])
		).then(()=>{
			call && call(loaded);
			return loaded;
		});
	},

	random: function(length) {
		length = length || 32;
		const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
		let res = '';
		for (let i = 0; i < length; i++) {
			res += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return res;
	}
};