import Head from "next/head";
import styled from "styled-components";
import { getSession } from "next-auth/react";

const Main = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem;

    @media (max-width: 720px){
        padding: 0rem;
    }

    .div-registrar{
        background: #fff;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .btn-registrar{
            font-weight: 600;
            padding: 1rem 4rem;
            margin: 1rem 0.5rem;

            background: linear-gradient(to bottom,#f7dfa5,#f0c14b);
            border-color: #a88734 #9c7e31 #846a29;
            box-shadow: 0 1px 0 rgb(#ffffff / 40%) inset;
            color: #111;
            border-style: solid;
            border-width: 1px;
        }
    }
    .div-historico{
        flex: 1;
        margin-top: 2rem;
        background: #fff;
        width: 100%;
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
                <div className="div-registrar">
                    <button type="button" className="btn-registrar">
                        REGISTRAR PONTO
                    </button>
                </div>
                <div className="div-historico">
                    <button type="button" className="btn-registrar">
                        REGISTRAR PONTO
                    </button>
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