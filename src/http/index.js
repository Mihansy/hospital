import axios from 'axios'

//开发时的请求数据地址跟上线地址有可能不相同时
const isDev = process.env.NODE_ENV === 'development'

const ajax = axios.create({
	baseURL: 'http://124.225.159.126:8888'  //请求API
	//baseURL:isDev ? '开发环境地址': '上线后的地址'
})

const pageName = '/homePage/'

//头部导航
export const getNav = () => {  
	return ajax.get(pageName+"getTopMenulist") //请求地址
}

//左侧数据 这里arr = [url,length]
export const getLeftNav = (url,length) => {  //箭头函数想要接收不定参数，应使用rest参数...解决
	return ajax.get(pageName+url,{
		params: {
			length: length
		}
	})
}

//首页数据
export const getHome = (requestUrl, len, modelName) => {
	return ajax.get(pageName+requestUrl,{
		params: {
			length: len, 
			modelName: modelName,
		}
	})
}

//列表数据
export const getList = (url, pageSize=15, pageNo=1, modelName='') => {
	return ajax.get(url,{
		params: {
			length: pageSize,
			pageNo: pageNo,
			modelName: modelName
		}
	})
}

//详情页
export const getDetail = (id) => {
	return ajax.get('/detailsPage/getPage/',{
		params: {
			id: id
		}
	})
}