import Head from "next/head";
import styled from "styled-components";
import { getSession } from "next-auth/react";

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

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Dashboard - Softconnect Tecnologia</title>
            </Head>
            <Main>
                <header>
                    header
                </header>
                <tbody>
                    corpo
                </tbody>
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
                props: {},
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