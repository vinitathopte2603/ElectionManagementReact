import AxiosServices from './AxiosServices'
let services = new AxiosServices()

export default class PartyServices {

    PartyWiseResponse(data) {
        return services.GET("http://localhost:50924/api/ElectionStatusResult/Party-Wise?state=" + data)
    }
    GetAllParties() {
        return services.GET("http://localhost:50924/api/Party")
    }
    UpdateParty(data, partyId) {
        var token = localStorage.getItem("token")
        return services.PUT("http://localhost:50924/api/Party/" + partyId, data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    AddParty(data){
        var token = localStorage.getItem("token")
        return services.POST("http://localhost:50924/api/Party" , data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    DeleteParties(data){
        console.log("services",data);
        
        var token = localStorage.getItem("token")
        return services.PUT("http://localhost:50924/api/Party/Parties/Delete" , data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
}