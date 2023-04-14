import Head from "next/head";
import styled from "styled-components";
import { getSession } from "next-auth/react";

import { api } from "../../../global";

const Main = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem;

    @media (max-width: 720px){
        padding: 0.5rem;
    }

    .div-pontos{
        flex: 1;
        margin-top: 2rem;
        background: #fff;
        box-shadow: 0px 1px 15px 1px rgb(69 65 78 / 8%);
        width: 100%;
        display: flex;
        flex-direction: column;
    }
`

export default function Pontos({ session, pontos }) {
    return (
        <>
            <Head>
                <title>Visualizar Pontos - Softconnect Tecnologia</title>
            </Head>
            <Main>
                <div className="div-pontos">
                    <h1>1</h1>
                </div>
            </Main>
        </>
    );
}

export async function getServerSideProps(context) {
    const { req } = context
    const session = await getSession({ req })
    if (session && session.id) {
        const axios = await api(session);
        const pontos = await axios.get("ponto?_diario=true").then((res) => res.data)

        return {
            props: { session, pontos },
        }
    }

    return {
        redirect: {
            destination: "/",
            permanent: false
        }
    }
}