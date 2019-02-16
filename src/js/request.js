import axios from 'axios'
import Token from './tokens'
var http ='https://wechathub.dkdcm.cn/'

export default function req(url,method,data,fn,that,er){
    if(window.localStorage.getItem("token")){
        
        axios.defaults.headers.post['authorization'] = window.localStorage.getItem("token");
        axios.defaults.headers.get['authorization'] = window.localStorage.getItem("token");
        axios.defaults.headers.put['authorization'] = window.localStorage.getItem("token");
       
            
        // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        if(method == "get"){
            axios[method](http+url,
            ).then(res => {
                var status = res.status
                status = status/100
                console.log(status)
                if(status >= 5){
                    er(status)
                }else{
                    if(res.data.code === 401){

                        Token(that)
                    }else{
                        fn(res,status)

                    }
                }
                
            }).catch(err=>{ 
                er(err)
            })
        }else{
            axios[method](http+url,data
            ).then(res => {
                // if()
                
                var status = res.status
                status =  status/100
                console.log(status)
                if(status >= 5){
                    alert("500")
                    er(status)
                }else{
                    if(res.data.code === 401){
        
                        Token(that)
                       
                    }else{
 
                        fn(res,status)
                    }
                }
               
                
            }).catch(err=>{
                er(err)
            })
        }
       
    }else{
        Token(that)
    }
    
}


    
