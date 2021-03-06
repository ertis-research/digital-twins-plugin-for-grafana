import { HorizontalGroup, Legend, LinkButton } from '@grafana/ui'
import React, { Fragment } from 'react'
import { ISelect } from 'utils/interfaces/select'
import { SelectWithTextArea } from './selectWithTextArea'

interface parameters {
    path : string
    tab : string
    name : string
    values : ISelect[]
    deleteFunction : any
    buttonHref ?: string
}

export const selectWithTitle = ({ path, tab, name, values, deleteFunction, buttonHref } : parameters) => {
    
    return (
        <Fragment>
            <HorizontalGroup justify="center">
                <LinkButton variant="primary" href={path + "&mode=create"}>
                    Create new {name}
                </LinkButton>
            </HorizontalGroup>
            <Legend>Check an existing {name}</Legend>
            <SelectWithTextArea path={path} tab={tab} name={name} values={values} deleteFunction={deleteFunction}/>
        </Fragment>
    )
}