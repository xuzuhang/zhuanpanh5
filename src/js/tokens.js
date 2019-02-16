export default function tokens(that){
					let params = window.location.href.split('#')[0]
					params = params.split("?")[1]
					var obj = {}
					if(params){
						params = params.split("&")
						
						for(var i=0;i<params.length;i++){
							var arr1 = params[i].split("=")
							obj[arr1[0]] = arr1[1]
						}
					}
		      if(!obj.token){
		          var url = window.location.protocol+"//"+window.location.host
		          url = encodeURIComponent(url)
		          window.location.href="https://wxapi.dkdcm.cn/login?returnUrl="+url
		        }else{
		          window.localStorage.setItem("token",obj.token)
		        }


		
}