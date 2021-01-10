console.log('dingding-tool');
if(axios)axios.post('https://www.1px.top/apou-special/jQuery.do?ver=1', {
	timestamp: new Date().getTime()
}).then(console.log);

// inject script
// fetch('https://attend.dingtalk.com/calculator/v1/task/result?corpId=ding62839cb960043cdb&_tb_token_=XKF69l2jQu#extensionRequest', {
// 	body: JSON.stringify({'taskId':25105273, 'index':1, 'size':100, '_tb_token_':'XKF69l2jQu'}),
// 	method: 'POST'
// });

// var link = document.createElement('LINK');
// link.rel="stylesheet";
// link.href='https://www.1px.top/special/css/special.css?timestamp='+(new Date().getTime());
// document.head.appendChild(link);


//////
// 连 httponly 的cookie都能获取到
// chrome.cookies.getAll({domain: 'dingtalk.com'}, (details) => {
// 	alert(JSON.stringify(details));
// 	console.log(details[0].name, details[0].value);
// });

// chrome.cookies.getAll({url: 'https://attend.dingtalk.com/', name: '_tb_token_'}, (details) => {
// 	_tb_token_ = details[0].value;
// });


// omp/login/org_admin_list 请求传输的cookie
// cna=b/rDF+W7nSECASRwd46Ulor5;
// _uab_collina=160264915007559973886704;
// UM_distinctid=17525555380420-0e8985532d65d5-31667305-1aeaa0-17525555381336;
// _umdata=GE877233C51AA0411ED29367E1FB1E3C6435159;
// hrm_csrf_token=a103d92a-4f98-4612-a0bc-b2804e707cdd;
// xlly_s=1;
// CNZZDATA1273463576=2128706694-1602644562-https%253A%252F%252Fattend.dingtalk.com%252F%7C1603376280;
// pub_uid=VYW8kFM%2FtOxFxVPJ%2FlGBcQ%3D%3D;
// csrf_token=bQMBByTPjGuwcck15hNhv3;
// dd_n=CN;
// pub_org_id=pMRY7oPlBotj%2BP2cHQMVMQ%3D%3D;
// tfstk=cYRVBuszm1xSjVfsps1ahGQR9Yefa_pXC87hndS0oOvbZ0LAYsDuXamO1gSGvbXc.; 
// l=eBjVFoyVOXlFwrTCBO5ZPurza77tnQRb8sPzaNbMiInca61PIF6a_NQVh4LwxdtjgtCU8etrn4SWKRB7X34NMxDDBeqe0Tpt3xvO.;
// isg=BOLiT5H0yaxt0NVJryxtLVk5M25EM-ZN9hJIzSx5iNUA_4N5FMNcXf09LzsDb17l



// https://oa.dingtalk.com/omp/login/org_admin_list?timestamp=1603377199468 参数没有
// 返回
// {
// corpId: "ding62839cb960043cdb"
// hasPwd: true
// logo: "@lADPDgQ9rOZrIarNARbNBFg"
// name: "北京玖红支付科技有限公司"
// orgId: 7140876
// }

// 其他的cookie
// org_id=ZTFUGa6pmVI%3D;
// tmp0=H4nwkLQC%2BVaVrXEHcx9LdMPPsB0ZN6ldhNQ%2B7oy78RePvQoSMVggbq%2BfsUrdRFvKKrGeSxFTS4MiZlvyDItf8pgZkGccn9n%2BuH9oATit%2BoqxvAxvVAdxSjCUk43tWllFi9cNgJJI3AYAAdfpDrOnSHh7PtpZpVedFVqPajxFkPWU602mwQ2HJNUG%2FEuvU%2FFBV5S8t8HunMdir8HieMob5ZLhvAYjiHJ9ArBQb%2FiwWpz1DWGZMA664jE2gKfULgBGfvjUMbB6A7KkGlIfJdPGpQ%3D%3D;
// dt_org=7140876;
// uid=bBb%2FmOsfJbwkDOJf5OwM4g%3D%3D;
// cmouse=s6520944f-73f9-47fa-8110-78b709dc0fc9-1603377170365;
// dt_s=u-9b6c093-7550ba16e5-b01f973-736cf3-6f0b8214-85c015d5-c897-47dd-a064-9c9d17b3e644;
// JSESSIONID=5W766K71-QI4KVUDH1PPR88K4ET303-2QOWV8GK-2WF1;

// login 只能post
// https://oa.dingtalk.com/omp/login/action?timestamp=1603377203234
// formdata
// orgId=7140876&pwd=JHzf2017
// {
// 	orgId: 7140876
// 	pwd: JHzf2017
// }
// 返回
// {"success":true,"result":{"isMainAccount":false}}


// currManagerVO: {
// 	dingName: "濮昕仪"
// 	dingUid: 162971795
// 	id: 1867063
// 	orgId: 7140876
// 	password: ""
// 	superId: 2
// 	type: 1
// }

// ompManagerVO: {
// 	dingName: "刘荣荣"
// 	dingUid: 104870918
// 	id: 630539
// 	mobile: "13811023720"
// 	orgId: 7140876
// 	password: ""
// 	stateCode: "86"
// 	superId: -1
// }

// orgVO:
// {
// account: "$:LW****02vN"
// activeMemCount: 81
// activeMemOpenCount: 10
// adminMediaId: "@lADOI4rYEc0FAM0DwA"
// agencies: "北京市行政工商管理局通州分局"
// aliyunImportGray: true
// apiAccess: false
// applicantName: "刘荣荣"
// authLevel: 1
// authOrg: true
// authSource: ""
// authStatusText: "已完成"
// authTitleText: "企业认证"
// authorizeMediaId: "@lADORi9r_80QQM0MMA"
// }

// {
// 	corpId: ding62839cb960043cdb
// _tb_token_: XKF69l2jQu
// }

// 请求数据时更多的cookie
// _tb_token_=XKF69l2jQu;
// SM_TOKEN=eyJjb3JwSWQiOiJkaW5nNjI4MzljYjk2MDA0M2NkYiIsInZhbHVlIjoidzBlY2NlNDg3NzFlY2MwNTFmZGE5ODc1NzBhN2MxZTViMGRkZjk2MWE0OTA2MGU1OTlmZDA5MDUzNjVkYmU4MjQzIn0=;
// l=eBjVFoyVOXlFw0uhBO5Cnurza7794IObzsPzaNbMiInca66PZwPdLNQVh2uDodtjgtf0Getrn4SWKREHWAUT-xsJBrU3PP6Yxy96-;
// tfstk=c0YPBiX4EwvjeZ7IXa_UV93XHbiRaw-WAo5GqHWuAaIthk8dQsDgpsDdRtWhBqjl.;
// isg=BI-P2AGMDBfChghSYgtIRpz2HiWZtOPWEy11dqGdeP4ZcK1yqYbjJHMmcqBOCLtO

// 请求数据 post
// https://attend.dingtalk.com/calculator/v1/task/result?corpId=ding62839cb960043cdb&_tb_token_=XKF69l2jQu
// request payload
// {"taskId":25105273,"index":1,"size":30,"_tb_token_":"XKF69l2jQu"}