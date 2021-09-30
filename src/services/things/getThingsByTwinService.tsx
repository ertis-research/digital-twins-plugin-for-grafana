import { fetchDittoService } from "services/general/fetchDittoService"

export const getThingsByTwinService = ( namespace:string ) => {
    return fetchDittoService("/search/things?namespaces=" + namespace, {
      method: 'GET',
      headers: {
        "Authorization": 'Basic '+btoa('ditto:ditto'),
        "Accept": "application/json"
      }
    })
}