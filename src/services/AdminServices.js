import AxiosServices from './AxiosServices'
let services = new AxiosServices()

export default class AdminServices{

    Login(data){
        console.log("in services",data);
        var token =" "
    return services.POST("http://localhost:50924/api/Admin/Login",data,token)
}

}