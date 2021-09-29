import React, { Fragment, useState, useEffect, ChangeEvent} from 'react'
import { Button, Field, TextArea, Input, Form, FormAPI, Select, Icon, FieldSet, InputControl } from '@grafana/ui'
import {} from '@emotion/core'; //https://github.com/grafana/grafana/issues/26512
import { createTypeService } from 'services/types/createTypeService'
import { TYPES_NAMESPACE_IN_DITTO } from 'utils/consts'
import { IAttribute, IDittoThingSimple, IDittoThing, IFeature } from 'utils/interfaces/dittoThing'
import { FormAttributes } from './subcomponents/formAttributes'
import { FormFeatures } from './subcomponents/formFeatures'
import { getPoliciesService } from 'services/policies/getPoliciesService';
import { ISelect } from 'utils/interfaces/select';
import { SelectableValue } from '@grafana/data/types/select';

export const FormType = () => {

    const [attributes, setAttributes] = useState<IAttribute[]>([])
    const [features, setFeatures] = useState<IFeature[]>([])
    const [currentType, setCurrentType] = useState<IDittoThing>({thingId:"", policyId:""})
    const [readOnly, setReadOnly] = useState(true)
    const [policies, setPolicies] = useState<ISelect[]>([])
    const [value, setValue] = useState<SelectableValue<number>>()

    const handleFinalSubmit = (data:IDittoThing) => {
        createTypeService(TYPES_NAMESPACE_IN_DITTO, data.thingId, data)
    }
  
    useEffect(() => {
      setCurrentType({
        ...currentType,
          attributes : attributes,
          features : features
        }
      )
    }, [features, attributes])

    useEffect(() => {
      getPoliciesService().then(res => setPolicies(res)).catch(() => console.log("error"))
    }, [])

    const editPreviewOnClick = () => {
      setReadOnly(!readOnly)
    }

    const handleOnChangeInputName = (event:ChangeEvent<HTMLInputElement>) => {
      setCurrentType({
        ...currentType,
        thingId : event.target.value
      })
    }

    return (
      <Fragment>
        <h2>Create new type</h2>
        <div className="row">
          <div className="col-8">
            <Form onSubmit={handleFinalSubmit}>
              {({register, errors, control}:FormAPI<IDittoThingSimple>) => {
                return (
                  <FieldSet>
                    <Field label="ThingId:">
                      <Input {...register("thingId", {required:true})} type="text" onChange={handleOnChangeInputName}/>
                    </Field>
                    <Field label="Policy:">
                      <InputControl
                        render={({field}) => 
                          <Select {...field} 
                            options={policies}
                            value={value}
                            onChange={v => setValue(v)}
                            prefix={<Icon name="arrow-down"/>} 
                          />
                        }
                        control={control}
                        name="policyId"
                      />
                    </Field>
                  </FieldSet>
                )
              }}
            </Form>
            <hr />
            <FormAttributes attributes={attributes} setAttributes={setAttributes}/>
            <hr />
            <FormFeatures features={features} setFeatures={setFeatures}/>
            <div className="d-flex justify-content-center">
              <Button className="mt-3" type="submit" form="formTypeFinal">Create type</Button>
            </div>
          </div>
          <div className="col-4">
            <TextArea value={JSON.stringify(currentType, undefined, 4)} className="w-100 h-100 mb-4" style={{boxSizing: "border-box"}} readOnly={readOnly}/>
            <Button variant="secondary" onClick={editPreviewOnClick}>Edit</Button>
            </div>
        </div>
      </Fragment>
    )
  }