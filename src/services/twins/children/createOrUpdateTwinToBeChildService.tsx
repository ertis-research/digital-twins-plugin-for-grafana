import { fetchExtendedApiForDittoService } from "services/general/fetchDittoExtendedService"
import { IStaticContext } from "utils/context/staticContext"
import { IDittoThingData } from "utils/interfaces/dittoThing"

export const createOrUpdateTwinToBeChildService = ( context:IStaticContext, parentId:string, childId:string, data?:IDittoThingData) => {
    const body = (data !== undefined) ? JSON.stringify(data) : ""
    return fetchExtendedApiForDittoService(context, "/twins/" + parentId + "/children/" + childId, {
    method: 'PUT',
    headers: {
      "Authorization": 'Basic '+btoa('ditto:ditto'),
      "Accept": "application/json"
    },
    body: body
  }).catch(() => console.log("error"))
}