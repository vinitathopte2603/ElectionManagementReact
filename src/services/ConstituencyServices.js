import AxiosServices from './AxiosServices'
let services = new AxiosServices()

export default class ConstituencyServices {
    GetAllConstituencies(data) {

        return services.GET("http://localhost:50924/api/Constituency?state=" + data)
    }
    ConstituencyWiseResponse(constituencyId) {
        return services.GET("http://localhost:50924/api/ElectionStatusResult/Constituency-Wise?constituencyId=" + constituencyId)
    }
    GetAllStates() {
        return services.GET("http://localhost:50924/api/Constituency/states")
    }
    UpdateConstituency(data, constituencyId) {
        console.log("services", data);
        var token = localStorage.getItem("token")
        return services.PUT("http://localhost:50924/api/Constituency/" + constituencyId, data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    AddConstituency(data) {
        var token = localStorage.getItem("token")
        return services.POST("http://localhost:50924/api/Constituency",data,{
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
}
