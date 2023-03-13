import Head from "next/head";
import styled from "styled-components";
import { getSession } from "next-auth/react";
import axios from "axios"

const Main = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem;

    @media (max-width: 720px){
        padding: 0.5rem;
    }

    .div-registrar{
        background: #fff;
        box-shadow: 0px 1px 15px 1px rgb(69 65 78 / 8%);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .btn-registrar{
            font-weight: 600;
            padding: 1rem;
            margin: 1.5rem;
            width: 50%;
            @media (max-width: 720px){
                width: 100%;
            }

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

export default function Dashboard({ session }) {
    const handleRegitrarPonto = async () => {
        await axios.post("/api/ponto/registrar", session)
    }

    return (
        <>
            <Head>
                <title>Dashboard - Softconnect Tecnologia</title>
            </Head>
            <Main>
                <div className="div-registrar">
                    <button type="button" className="btn-registrar" onClick={() => handleRegitrarPonto()}>
                        REGISTRAR PONTO
                    </button>
                </div>
                <div className="div-historico">
                    <div className="div-cabecalho">
                        <span>Ponto diário</span>
                    </div>
                    <div className="div-dados">
                        <ul>
                            <li>
                                <span className="span-identificador">Indentificador: 1-1</span>
                                <div className="d-registro">
                                    <div className="d-ent-sai">
                                        <span>Entrada</span>
                                    </div>
                                    <div className="div-data-hora">
                                        <span>08:08</span>
                                    </div>
                                </div>
                                <div className="d-registro">
                                    <div className="d-ent-sai">
                                        <span>Saida</span>
                                    </div>
                                    <div className="div-data-hora">
                                        <span>12:02</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <span className="span-identificador">Indentificador: 1-2</span>
                                <div className="d-registro">
                                    <div className="d-ent-sai">
                                        <span>Entrada</span>
                                    </div>
                                    <div className="div-data-hora">
                                        <span>13:15</span>
                                    </div>
                                </div>
                                <div className="d-registro">
                                    <div className="d-ent-sai">
                                        <span>Saida</span>
                                    </div>
                                    <div className="div-data-hora">
                                        <span>...</span>
                                    </div>
                                </div>
                            </li>
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