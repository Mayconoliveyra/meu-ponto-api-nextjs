import MaskedInput from "react-text-mask";
import { Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const FormOneSC = styled.section`
    padding: 20px 15px;
    @media (max-width: 720px){
        padding: 0px;
    }
    form{
        background: #ffffff;
        border: #CCCCCC solid 1px;
        margin-bottom: 20px;
        border-radius: 3px;
        width: 100%;

        padding: 15px 10px;

        @media (max-width: 720px){
            border: none;
            border-top: #CCCCCC solid 1px;
            border-radius: 0px;
        }
    }
    #row{
        margin-right: 0px;
        margin-left: 0px;
    }
    #Col{
        padding: 0px 3px; 
    }
    .alert {
        font-size: 0.8rem !important;
    }
`;
const FormTwoSC = styled.section`
    @media (max-width: 720px){
        padding: 0px;
    }
    form{
        background: #ffffff;
        margin-bottom: 20px;
        border-radius: 3px;
        width: 100%;

        padding: 15px 10px;
        border: solid 1px #dee2e6;
        border-top: none;
    }
    #row{
        margin-right: 0px;
        margin-left: 0px;
    }
`;
const GroupOneSC = styled.div`
    padding: 0px 5px;
    label {
        color: #333333 !important;
        font-size: 12px !important;
        font-weight: bold;
        white-space: nowrap;
    }
    label:after {
        color: #F00;
        content: '*';
        display: ${({ required }) => required ? 'inline' : 'none'};
    }
    
    
    input, select {
        /* PARAMENTRO 'error' */
        border-color:${({ error }) => error && "#d00 !important;"};
        box-shadow:${({ error }) => error && "0 0 0 0.2rem rgb(221 0 0 / 15%) inset !important;"};

        margin-top: 2px;
        display: block;
        width: 100%;
        height: 34px;
        padding: 6px 12px;
        font-size: 13px;
        color: #555555;
        background-color: #ffffff;
        background-image: none;
        border: 1px solid #cccccc;
        border-radius: 4px;
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
        transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

        &:focus{
            border-color: #0C1B25 !important;
        }
        &:disabled {
            background-color: #e9ecef;
            opacity: 1;
        }
    }

    small {
        margin-left: 3px;
        color: #fe316c;
    }
`;
const TitleFormOneSC = styled.div`
    display: flex;
    align-items: flex-end;
    margin: 10px 0px;
    h4{
        font-weight: bold;
        font-size: 15px;
        margin-left: 6px;
    }
`
const TabsSC = styled.div`
    padding: 20px 15px;
    @media (max-width: 720px){
        padding: 20px 0px;
    }
    .nav-tabs{
        button{
            color: #333333 !important;
        }
    }
    .nav-link{
        border-radius: 0px;
        font-family:${({ theme }) => theme.font.family.medium} ;
    }
`
const RowBtnsSC = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;
    button{
        min-width: 150px;
    }
    @media (max-width: 720px){
        justify-content: space-around;
    }
`

const FormOne = ({ children }) => {
    return (
        <FormOneSC>
            <Form>
                <Row id="row">{children}</Row>
            </Form>
        </FormOneSC>
    );
};
const FormTwo = ({ children }) => {
    return (
        <FormTwoSC>
            <Form>
                <Row id="row">{children}</Row>
            </Form>
        </FormTwoSC>
    );
};
const GroupOne = ({ name, label, type = "text", required = false, autocomplete = "off", maxlength = 255, mask = false, error = false, placeholder, disabled = false, xs, sm, md, lg, xl, xxl }) => {
    const propsGroup = {
        xs,
        sm,
        md,
        lg,
        xl,
        xxl,
    };
    return (
        < Col id="Col"  {...propsGroup} >
            <GroupOneSC required={required} error={error} >
                <label htmlFor={name}>{label}</label>
                {
                    !mask && (
                        <Field name={name}>
                            {({ field }) => (
                                <input
                                    {...field}
                                    id={name}
                                    type={type}
                                    maxLength={maxlength}
                                    autoComplete={autocomplete}
                                    placeholder={placeholder}
                                    disabled={disabled == true || disabled == "true" || disabled == "1" || disabled == 1 ? true : false}
                                    required={required}
                                    value={field.value != undefined ? field.value : ""}
                                />
                            )}
                        </Field>
                    )
                }
                {
                    !!mask && (
                        <Field name={name}>
                            {({ field }) => (
                                <MaskedInput
                                    {...field}
                                    id={name}
                                    type={type}
                                    maxLength={maxlength}
                                    autoComplete={autocomplete}
                                    mask={mask}
                                    guide={false}
                                    showMask={false}
                                    placeholder={placeholder}
                                    d disabled={disabled == true || disabled == "true" || disabled == "1" || disabled == 1 ? true : false}
                                    required={required}
                                    value={field.value != undefined ? field.value : ""}
                                />
                            )}
                        </Field>
                    )
                }
                <small>
                    <ErrorMessage name={name} />
                </small>
            </GroupOneSC>
        </Col >
    );
};
const GroupMoney = ({ fixed = 2, setFieldValue, name, label, type = "number", required = false, autocomplete = "off", maxlength = 7, error = false, placeholder = "R$ 0,00", disabled = false, xs, sm, md, lg, xl, xxl }) => {
    const propsGroup = {
        xs,
        sm,
        md,
        lg,
        xl,
        xxl,
    };
    return (
        < Col id="Col"  {...propsGroup} >
            <GroupOneSC required={required} error={error} >
                <label htmlFor={name}>{label}</label>
                <Field name={name}>
                    {({ field }) => (
                        <input
                            {...field}
                            id={name}
                            type={type}
                            maxLength={maxlength}
                            autoComplete={autocomplete}
                            placeholder={placeholder}
                            disabled={disabled == true || disabled == "true" || disabled == "1" || disabled == 1 ? true : false}
                            required={required}
                            value={field.value != undefined ? field.value : ""}
                            onBlur={(() =>
                                setFieldValue(name, Number(field.value).toFixed(fixed))
                            )}
                        />
                    )}
                </Field>
                <small>
                    <ErrorMessage name={name} />
                </small>
            </GroupOneSC>
        </Col >
    );
};
const GroupSelectOne = ({ name, label, required = false, data = [], xs, sm, md, lg, xl, xxl }) => {
    const propsGroup = {
        xs,
        sm,
        md,
        lg,
        xl,
        xxl,
    };
    return (
        < Col id="Col"  {...propsGroup} >
            <GroupOneSC required={required}>
                <label htmlFor={name}>{label}</label>
                <Field name={name}>
                    {({ field }) => (
                        <select
                            {...field}
                            id={name}
                            name={name}
                            required={required}
                            value={field.value != undefined ? field.value : ""}
                        >
                            {data.map((item, key) => {
                                return <option key={key} value={item.value}>{item.name}</option>
                            })}
                        </select>
                    )}
                </Field>
                <small>
                    <ErrorMessage name={name} />
                </small>
            </GroupOneSC>
        </Col>
    );
};

const TitleFormOne = ({ children }) => {
    return (
        <TitleFormOneSC>
            {children}
        </TitleFormOneSC>
    );
};
const RowBtns = ({ children }) => {
    return (
        <RowBtnsSC>
            {children}
        </RowBtnsSC>
    );
};

export { FormOne, FormTwo, GroupOne, GroupMoney, GroupSelectOne, TitleFormOne, RowBtns }