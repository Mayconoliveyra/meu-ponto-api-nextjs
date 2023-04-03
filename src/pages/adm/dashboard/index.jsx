import Head from "next/head";
import styled from "styled-components";
import { getSession } from "next-auth/react";
import moment from "moment"
import 'moment/locale/pt-br'
moment.locale('pt-br')

import { api } from "../../../../global";

const Main = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem;

    @media (max-width: 720px){
        padding: 0.5rem;
    }

    .div-historico{
        flex: 1;
        background: #fff;
        box-shadow: 0px 1px 15px 1px rgb(69 65 78 / 8%);
        width: 100%;
        display: flex;
        flex-direction: column;

        .div-cabecalho{
            display: flex;
            width: 100%;
            border-bottom: solid 2px #d5dbdb;
            padding: 1rem;
            span{
                font-weight: bold;
            }
        }
        .div-dados{
            flex: 1;
            display: flex;
            ul{
                margin: 1rem;
                width: 100%;
                li{
                    border: solid 1px #d5dbdb;
                    padding: 0.2rem 0.5rem;
                    margin-bottom: 1rem;

                    .span-identificador{
                        font-size: 0.8rem;
                        font-style: italic;
                    }

                    .d-registro{
                        display: flex;
                        padding: 0.5rem;
                        div{
                            flex: 1;
                        }
                        .div-data-hora{
                            text-align: end;
                        }
                    }
                }
            }
        }
    }
`
export default function ADMDashboard({ session, pontos }) {
    return (
        <>
            <Head>
                <title>ADM Dashboard - Softconnect Tecnologia</title>
            </Head>
            <Main>
                <div className="div-historico">
                    <div className="div-cabecalho">
                        <span>Hoje</span>
                    </div>
                    <div className="div-dados">
                        <ul>
                            {pontos.map((ponto => {
                                return (
                                    <li key={ponto.id}>
                                        <span className="span-identificador">Indentificador: {ponto.id}</span>
                                        <div className="d-registro">
                                            <div className="d-ent-sai">
                                                <span>Entrada</span>
                                            </div>
                                            <div className="div-data-hora">
                                                <span>{moment(ponto.ponto_entrada).format('HH:mm')}</span>
                                            </div>
                                        </div>
                                        <div className="d-registro">
                                            <div className="d-ent-sai">
                                                <span>Saida</span>
                                            </div>
                                            <div className="div-data-hora">
                                                {ponto.ponto_saida ?
                                                    <span>{moment(ponto.ponto_saida).format('HH:mm')}</span>
                                                    :
                                                    <span>...</span>
                                                }
                                            </div>
                                        </div>
                                    </li>
                                )
                            }))}
                        </ul>
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
        if (session && session.id && session.adm) {
            const axios = await api(session);
            const pontos = await axios.get("ponto/get").then((res) => res.data)

            return {
                props: { session, pontos },
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