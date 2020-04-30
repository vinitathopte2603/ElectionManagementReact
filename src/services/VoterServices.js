import AxiosServices from './AxiosServices'
let services = new AxiosServices()

export default class VoterServices {

  
    Vote(data){
        var token = localStorage.getItem("token")
        return services.POST("http://localhost:50924/api/Voter" , data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
}