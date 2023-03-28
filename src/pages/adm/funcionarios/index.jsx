import Head from "next/head";
import styled from "styled-components";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { pt } from "yup-locale-pt";
Yup.setLocale(pt);

import { api } from "../../../../global";
import { useState } from "react";
import { toast } from "react-toastify";

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
        .div-exibir{
            max-width: 470px;
            margin: 0 auto;
            @media (max-width: 720px){
                padding: 1rem;
            }
            .div-h1{
                margin: 1.5rem auto;
                margin-bottom: 2rem;
                h1{
                    font-size: 1.4rem;
                    font-weight: bold;
                    text-align: center;
                }
            }
            .btn-alterar{
                margin: 0.5rem 0px;
                margin-top: 2rem;
                button{
                    display: flex;
                    align-items: center;
                    justify-content: center ;
                    color: #ffffff;
                    background: linear-gradient(to bottom,#f7dfa5,#f0c14b);
                    border-color: #a88734 #9c7e31 #846a29;
                    font-weight: bold;
                    font-size: 1rem;
                    padding:  0.7rem 0;
                    width: 100%;
                    text-transform: uppercase;
                    border-radius: 0.25rem;
                    color: #111;
                    box-shadow: 0 1px 0 rgb(#ffffff / 40%) inset;
                    border-style: solid;
                    border-width: 1px;
                }
            }
        }
    }
`
const GroupSC = styled.div`
    display:flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    .div-label{
        padding: 0.4rem;
        label{
            font-weight: bold;
            font-size: 1.1em;
        }
    }
    .div-input{
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
    }
    .div-error{
        font-size: 1rem;
        color: #e72626;
        margin-top: 0.0rem;
        small{
            padding: 0px;
            margin: 0px;
        }
    }
`
export default function AdmFuncionarios({ session, pontos }) {
    return (
        <>
            <Head>
                <title>Funcionários - Softconnect Tecnologia</title>
            </Head>
            <Main>
                uu
            </Main>
        </>
    );
}

export async function getServerSideProps(context) {
    try {
        const { req } = context
        const session = await getSession({ req })
        if (session && session.id && session.adm) {
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