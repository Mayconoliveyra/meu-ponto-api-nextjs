import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import router from "next/router"
import styled from "styled-components";
import { signIn } from "next-auth/react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { DoorOpen } from "react-bootstrap-icons"
import * as Yup from "yup";
import { pt } from "yup-locale-pt";
Yup.setLocale(pt);
import { getSession, signOut } from "next-auth/react";

import axios from "axios";
import { toast } from "react-toastify";

const Main = styled.main`
    height: 100vh;
    background-color: #FFFFFF;
    display: flex;

    .s-login{
        flex: 1;
        width: 100%;
        padding: 1rem;
        @media (min-width:1000px){
            max-width: 700px;
        }

        .d-exibir{
            padding-top: 2rem;
            margin: auto;
            max-width: 30rem;
            .f-form{
                display: flex;
                flex-direction: column;
                h1{
                    text-align:center;
                    margin-bottom: 4rem;
                    font-family:${({ theme }) => theme.font.family.bold};
                    color: #111;
                }
                .d-recuperar{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 1rem !important;
                    font-family:${({ theme }) => theme.font.family.medium};
                    margin: 1rem 0;
                    margin-top: 0.5rem;
                    label{
                        display: flex;
                        align-items:center;
                    input{
                        height: 1.7rem;
                        width: 1.7rem;
                    }
                    span{
                        margin-left: 7px;
                    }
                    }
                    a{
                        font-size: 1rem !important;
                        font-family:${({ theme }) => theme.font.family.medium};
                        text-decoration: underline;
                    }
                }
                .btn-entrar{
                    margin: 0.5rem 0px;
                    button{
                        display: flex;
                        align-items: center;
                        justify-content: center ;
                        color: #ffffff;
                        background: linear-gradient(to bottom,#f7dfa5,#f0c14b);
                        border-color: #a88734 #9c7e31 #846a29;
                        font-family:${({ theme }) => theme.font.family.bold};
                        font-size: 1rem;
                        padding:  0.7rem 0;
                        width: 100%;
                        text-transform: uppercase;
                        border-radius: 0.25rem;
                        color: #111;
                        box-shadow: 0 1px 0 rgb(#ffffff / 40%) inset;
                        border-style: solid;
                        border-width: 1px;
                        svg{
                            margin-right: 0.6rem;
                            font-size: 1.7rem;
                        }
                    }
                }
            }
        }
    }
    .s-logo{
        background-color: #232F3E;
        @media (max-width:1000px){
            display: none;
        }
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

const GroupSC = styled.div`
  display:flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  .d-label{
    padding: 0.4rem;
    label{
      font-family:${({ theme }) => theme.font.family.bold};
      font-size: 1.4em;
    }
  }
  .d-input{
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
    .d-show-password{
      width: 100%;
      padding: 0 10px 6px 10px;
      span{
        color: #555!important;
        font-size: 0.9rem !important;
      }
    }
  }
  .d-error{
        font-size: 1rem;
        color: #e72626;
        margin-top: 0.0rem;
        small{
            padding: 0px;
            margin: 0px;
        }
  }
`

export default function Home() {
    const initialValues = {
        email: '',
        senha: '',
        show_password: true,
    }
    const scheme = Yup.object().shape({
        email: Yup.string().email().label("E-mail").required(),
        senha: Yup.string().required().label("Senha"),
    });
    return (
        <>
            <Head>
                <title>Softconnect Tecnologia</title>
            </Head>
            <Main>
                <section className="s-login">
                    <div className="d-exibir">
                        <Formik
                            validationSchema={scheme}
                            initialValues={initialValues}
                            onSubmit={async (values, setValues) => {
                                await axios.post("/api/auth/login", values)
                                    .then(async () => {
                                        const user = await signIn("credentials", {
                                            redirect: false,
                                            email: values.email,
                                            password: values.senha,
                                        });

                                        if (!user.error) {
                                            router.push("/dashboard")
                                        } else {
                                            router.reload()
                                        }
                                    })
                                    .catch(res => {
                                        /* Se status 400, significa que o erro foi tratado. */
                                        if (res && res.response && res.response.status == 400) {
                                            /* Se data=500, será exibido no toast */
                                            if (res.response.data && res.response.data[500]) {
                                                toast.error(res.response.data[500])
                                            } else {
                                                setValues.setErrors(res.response.data)
                                            }
                                        } else {
                                            /* Mensagem padrão */
                                            toast.error("Ops... Não possível realizar a operação. Por favor, tente novamente.")
                                        }
                                    })
                            }}
                        >
                            {({ setFieldValue, values, errors, touched, dirty }) => (
                                <Form className="f-form" action="">
                                    <h1>FAZER LOGIN</h1>
                                    <GroupSC error={!!errors.email && touched.email}>
                                        <div className="d-label">
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="d-input">
                                            <Field name="email" type="email" maxLength="120" />
                                        </div>
                                        <div className="d-error">
                                            <small>
                                                <ErrorMessage name="email" />
                                            </small>
                                        </div>
                                    </GroupSC>
                                    <GroupSC error={!!errors.senha && touched.senha}>
                                        <div className="d-label">
                                            <label htmlFor="senha">Senha</label>
                                        </div>
                                        <div className="d-input">
                                            <Field name="senha" type="password" maxLength="255" />
                                            {values.show_password && values.senha && (
                                                <div className="d-show-password">
                                                    <span name="senha" value>{values.senha}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="d-error">
                                            <small>
                                                <ErrorMessage name="senha" />
                                            </small>
                                        </div>
                                    </GroupSC>

                                    <div className="d-recuperar">
                                        <label htmlFor="show_password" onClick={() => setFieldValue("show_password", !values.show_password)}>
                                            <Field name="show_password" type="checkbox" /><span>Mostrar senha</span>
                                        </label>
                                        <Link href="/conta/recuperar">Esqueceu a senha?</Link>
                                    </div>

                                    <div className="btn-entrar">
                                        <button type="submit"><DoorOpen /><b>ENTRAR</b></button>
                                    </div>
                                    <div className="btn-entrar">
                                        <button type="button" onClick={() => signOut()}><DoorOpen /><b>sair</b></button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </section>
                <section className="s-logo">
                    <Image src={'/assets/images/logo.png'} width={300} height={60} alt="logo" quality={100} priority={true} />
                </section>
            </Main>
        </>
    );
}

export async function getServerSideProps(context) {
    const { req } = context
    const session = await getSession({ req })
    if (session && session.id) {
        return {
            redirect: {
                destination: "/dashboard",
                permanent: false
            }
        }
    }

    return {
        props: {},
    }
}