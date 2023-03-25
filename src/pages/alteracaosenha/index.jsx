import Head from "next/head";
import styled from "styled-components";
import { getSession } from "next-auth/react";
import router from "next/router"

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { pt } from "yup-locale-pt";
Yup.setLocale(pt);


import { api, showError } from "../../../global";
import { useEffect, useState } from "react";

const Main = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem;

   
    @media (max-width: 720px){
        padding: 0.5rem;
    }

    .div-alterar{
        flex: 1;
        background: #fff;
        box-shadow: 0px 1px 15px 1px rgb(69 65 78 / 8%);
        background-image: url(https://rhidv2.s3-sa-east-1.amazonaws.com/assets/metronic_v5.5.5/theme/classic/demos/default/assets/app/media/img/bg/bg-3.jpg);

        .div-exibir{
            max-width: 470px;
            margin: 0 auto;
            .div-h1{
                margin: 1.3rem auto;
                h1{
                    font-size: 1.4rem;
                    font-weight: bold;
                    text-align: center;
                }
            }
        }
    }
`
const GroupSC = styled.div`
  display:flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  [data="label"]{
    padding: 0.4rem;
    label{
     /*  font-family:${({ theme }) => theme.font.family.bold}; */
      font-size: 1.4em;
    }
    
  }
  [data="input"]{
    border-top-color: #949494;
    border: 0.1rem solid #a6a6a6;
    box-shadow: 0 0.1rem 0 rgb(0 0 0 / 7%) inset;
    border-radius: 0.3rem 0.3rem 0 0;
    border-right-color: #949494;
    border-bottom-color: #949494;
    border-left-color: #949494;
    border-color:${({ error }) => error && "#d00"};
    box-shadow:${({ error }) => error && "0 0 0 0.2rem rgb(221 0 0 / 15%) inset;"};
    input{
      width: 100%;
      background-color: transparent;
      padding: 0.8rem;
      padding-top: 0.9rem;
      box-shadow: none;
      border: 0;
      font-size: 1.1rem;
    }
    [data="show-password"]{
      width: 100%;
      padding: 0 10px 6px 10px;
      span{
        color: #555!important;
        font-size: 0.9rem !important;
      }
    }
  }
  [data="error"]{
        font-size: 1rem;
        color: #e72626;
        margin-top: 0.0rem;
        small{
            padding: 0px;
            margin: 0px;
        }
  }
`
export default function Dashboard({ session, pontos }) {
    const scheme = Yup.object().shape({
        senha: Yup.string().nullable().label("Senha").required("É necessário informar uma senha.")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
                "Deve ter no mínimo 6 dígitos, 1 letra maiúscula, 1 minúscula e um número"
            ),
        confirsenha: Yup.string().oneOf([Yup.ref("senha"), null], "A confirmação de senha não confere.")
            .required("É necessário confirmar sua senha.").label("Confirmar senha")
    });

    return (
        <>
            <Head>
                <title>Alteração de Senha - Softconnect Tecnologia</title>
            </Head>
            <Main>
                <div className="div-alterar">
                    <div className="div-exibir">
                        <div className="div-h1">
                            <h1>Alteração de Senha</h1>
                        </div>
                        <Formik
                            validationSchema={scheme}
                            initialValues={{ senha: '', confirsenha: '', show_password: true }}
                            onSubmit={async (values, setValues) => {


                            }}
                        >
                            {({ values, errors, touched, dirty }) => (
                                <Form data="form" action="">
                                    <GroupSC error={!!errors.senha && touched.senha}>
                                        <div data="label">
                                            <label htmlFor="senha">Senha atual</label>
                                        </div>
                                        <div data="input">
                                            <Field name="senha" type="password" autoComplete='off' maxLength="55" />
                                        </div>
                                        <div data="error">
                                            <small>
                                                <ErrorMessage name="senha" />
                                            </small>
                                        </div>
                                    </GroupSC>
                                    <GroupSC error={!!errors.senha && touched.senha}>
                                        <div data="label">
                                            <label htmlFor="senha">Nova senha</label>
                                        </div>
                                        <div data="input">
                                            <Field name="senha" type="password" autoComplete='off' maxLength="55" />
                                        </div>
                                        <div data="error">
                                            <small>
                                                <ErrorMessage name="senha" />
                                            </small>
                                        </div>
                                    </GroupSC>
                                    <GroupSC error={!!errors.senha && touched.senha}>
                                        <div data="label">
                                            <label htmlFor="senha">Confirmar nova senha</label>
                                        </div>
                                        <div data="input">
                                            <Field name="senha" type="password" autoComplete='off' maxLength="55" />
                                        </div>
                                        <div data="error">
                                            <small>
                                                <ErrorMessage name="senha" />
                                            </small>
                                        </div>
                                    </GroupSC>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </Main>
        </>
    );
}

export async function getServerSideProps(context) {
    try {
        const { req } = context
        const session = await getSession({ req })
        if (session && session.id) {
            return {
                props: { session },
            }
        }

        throw ""
    } catch (error) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
}