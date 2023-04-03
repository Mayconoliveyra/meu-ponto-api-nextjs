import Head from "next/head";
import styled from "styled-components";
import { getSession } from "next-auth/react";
import { PeopleFill, ChevronRight, PlusCircleDotted, Search } from "react-bootstrap-icons"
import Link from "next/link"

import { TituloForm } from "../../../components/formulario/titulo/components"
import { CabecalhoForm } from "../../../components/formulario/cabecalho/components"

const Main = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem;

    @media (max-width: 720px){
        padding: 0;
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
export default function AdmFuncionarios({ session, pontos }) {
    const prefix = "funcionário"
    const prefixRouter = "/portal/cadastros/produtos"

    return (
        <>
            <Head>
                <title>Funcionários - Softconnect Tecnologia</title>
            </Head>
            <Main>
                <TituloForm title={`Listar ${prefix}s`} icon={<PeopleFill size={25} />}>
                    <li>
                        <Link href="/adm/dashboard">Início <ChevronRight height={10} /></Link>
                    </li>
                    <li>
                        <Link href={prefixRouter}>{`${prefix[0].toUpperCase() + prefix.substring(1)}s`} <ChevronRight height={10} /></Link>
                    </li>
                    <li className="ativo">
                        Listar
                    </li>
                </TituloForm>
                <CabecalhoForm>
                    <Link className="btn-adicionar" href={`${prefixRouter}/adicionar`}><PlusCircleDotted size={18} /><span>Adicionar</span></Link>
                    <div className="div-input-pesquisa">
                        <input placeholder="Buscar" type="text" />
                        <button><Search size={18} /></button>
                    </div>
                </CabecalhoForm>
            </Main>
        </>
    );
}

export async function getServerSideProps(context) {
    const { req } = context
    const session = await getSession({ req })
    if (session && session.id && session.adm) {
        return {
            props: { session },
        }
    }

    return {
        redirect: {
            destination: "/",
            permanent: false
        }
    }
}