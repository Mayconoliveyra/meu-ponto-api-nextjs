import Head from "next/head";
import styled from "styled-components";
import { getSession } from "next-auth/react";
import router from "next/router"
import Modal from 'react-bootstrap/Modal';
import moment from "moment"
import 'moment/locale/pt-br'
moment.locale('pt-br')

import { apiClient, apiServer } from "../../../global";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
const ModalPonto = styled.div`
    .div-marcacao{
        display: flex;
        justify-content: center;
        margin: 1rem;
        h1{
            font-size: 1.7rem;
            font-weight: bold;
        }
    }
    .div-hr{
        display: flex;
        justify-content: center;
        margin: 3rem 0;
        p{
            font-size: 2rem;
            font-style: italic;
        }
    }
    .div-btn-ponto{
        display: flex;
        justify-content: center;
        .btn-registrar{
            font-weight: 600;
            padding: 0.8rem;
            /* margin-top: 2rem; */
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
`
export default function Dashboard({ session, pDiario }) {
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [horaAtual, setHoraAtual] = useState()

    useEffect(() => {
        const intervalId = setInterval(() => {
            const data = new Date();
            setHoraAtual(moment(data).format('HH:mm:ss'))
        }, 1000)

        return () => clearInterval(intervalId);
    }, [])

    const handleRegitrarPonto = async () => {
        setBtnDisabled(true)

        const axios = await apiClient(session);
        await axios.post("pontos")
            .then(() => {
                handleClose()
                router.reload()
            })
            .catch(res => {
                /* Se status 400, significa que o erro foi tratado. */
                if (res && res.response && res.response.status == 400) {
                    toast.error(res.response.data)
                } else {
                    toast.error("Ops... Não possível realizar a operação. Por favor, tente novamente.")
                }
            })
        setBtnDisabled(false)
    }
    return (
        <>
            <Head>
                <title>Dashboard - Softconnect Tecnologia</title>
            </Head>
            <Main>
                <div className="div-registrar">
                    <button type="button" disabled={pDiario.saida2} className="btn-registrar" onClick={() => handleShow()}>
                        REGISTRAR PONTO
                    </button>
                </div>
                <div className="div-historico">
                    <div className="div-cabecalho">
                        <span>{moment(pDiario.data).format('LL')}</span>
                    </div>
                    <div className="div-dados">
                        <ul>
                            <li>
                                <div className="d-registro">
                                    <div className="d-ent-sai">
                                        <span>Entrada 1</span>
                                    </div>
                                    <div className="div-data-hora">
                                        {pDiario.entrada1 ?
                                            <span>{pDiario.entrada1.slice(0, 5)}</span>
                                            :
                                            <span>...</span>
                                        }
                                    </div>
                                </div>
                                <div className="d-registro">
                                    <div className="d-ent-sai">
                                        <span>Saida 1</span>
                                    </div>
                                    <div className="div-data-hora">
                                        {pDiario.saida1 ?
                                            <span>{pDiario.saida1.slice(0, 5)}</span>
                                            :
                                            <span>...</span>
                                        }
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="d-registro">
                                    <div className="d-ent-sai">
                                        <span>Entrada 2</span>
                                    </div>
                                    <div className="div-data-hora">
                                        {pDiario.entrada2 ?
                                            <span>{pDiario.entrada2.slice(0, 5)}</span>
                                            :
                                            <span>...</span>
                                        }
                                    </div>
                                </div>
                                <div className="d-registro">
                                    <div className="d-ent-sai">
                                        <span>Saida 2</span>
                                    </div>
                                    <div className="div-data-hora">
                                        {pDiario.saida2 ?
                                            <span>{pDiario.saida2.slice(0, 5)}</span>
                                            :
                                            <span>...</span>
                                        }
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <Modal size="lg" show={show} onHide={handleClose} animation={false}>

                    <Modal.Body>
                        <ModalPonto>
                            <div className="div-marcacao">
                                <h1>Marcação de Ponto</h1>
                            </div>
                            <div className="div-hr">
                                <p>
                                    {horaAtual}
                                </p>
                            </div>
                            <div className="div-btn-ponto">
                                <button disabled={btnDisabled} type="button" className="btn-registrar" onClick={() => handleRegitrarPonto()}>
                                    CONFIRMAR
                                </button>
                            </div>
                        </ModalPonto>
                    </Modal.Body>
                </Modal>
            </Main>
        </>
    );
}

export async function getServerSideProps(context) {
    const { req } = context
    const session = await getSession({ req })
    if (session && session.id) {
        const response = await fetch("http://localhost:3000/api/pontos?_diario=true");
        const pDiario = await response.json();


      /*   const axios = await apiServer(session);
        const pDiario = await axios.get("pontos?_diario=true").then((res) => res.data).catch(error => console.log(error)) */

        return {
            props: { session, pDiario },
        }
    }

    return {
        redirect: {
            destination: "/",
            permanent: false
        }
    }
}