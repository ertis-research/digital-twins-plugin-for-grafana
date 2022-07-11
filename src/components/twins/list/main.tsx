import React, { useState, useContext } from 'react'
import { AppPluginMeta, KeyValue } from "@grafana/data"
import { IDittoThing } from "utils/interfaces/dittoThing"
import { ISelect } from "utils/interfaces/select"
import { getAllRootTwinsService } from 'services/twins/getAllRootTwinsService'
import { MainList } from 'components/auxiliary/general/mainList'
import { StaticContext } from 'utils/context/staticContext'
import { deleteTwinByIdService } from 'services/twins/crud/deleteTwinByIdService'

interface parameters {
    path : string
    meta : AppPluginMeta<KeyValue<any>>
}

export function ListTwins({path, meta } : parameters) {
    
    const [things, setThings] = useState<IDittoThing[]>([])
    const [values, setValues] = useState<ISelect[]>([])

    const context = useContext(StaticContext)

    const updateThings = () => {
        getAllRootTwinsService(context).then(res => {
            setThings(res)
            console.log(things)
            if(res !== undefined){
                setValues(res.map((item:IDittoThing) => {
                    return {
                        label: item.thingId,
                        value: item.thingId
                    }
                }))
            }
        }).catch(() => console.log("error"))
    }

    const handleOnClickDelete = (e:any, thingId:string) => {
        e.preventDefault()
        deleteTwinByIdService(context, thingId)
        updateThings()
    }

    return <MainList path={path} meta={meta} things={things} values={values} funcThings={updateThings} funcDelete={handleOnClickDelete}/>

}