import AxiosServices from './AxiosServices'
let services = new AxiosServices()

export default class CandidatesServices {
    GetAllCandidates() {

        return services.GET("http://localhost:50924/api/Candidate")
    }
   
   
    UpdateCandidate(data, candidateId) {
        console.log("services", data);
        var token = localStorage.getItem("token")
        return services.PUT("http://localhost:50924/api/Candidate/" + candidateId, data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    AddCandidate(data) {
        var token = localStorage.getItem("token")
        return services.POST("http://localhost:50924/api/Candidate",data,{
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
}
