import Head from "next/head";
import styled from "styled-components";
import { getSession } from "next-auth/react";
import { ArrowUp, ArrowDown, PeopleFill, ChevronRight, PlusCircleDotted, Search, ExclamationTriangle } from "react-bootstrap-icons"
import Link from "next/link"

import { TituloForm } from "../../../components/formulario/titulo/components"
import { CabecalhoForm } from "../../../components/formulario/cabecalho/components"

import { TabelaForm, ThForm, TdForm, VazioForm, PaginadorForm } from "../../../components/formulario/tabela/components";

import { api } from "../../../../global";

const Main = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem;

    @media (max-width: 720px){
        padding: 0px;
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
export default function AdmFuncionarios({ funcionarios, totalPags, _sort, _order, _page }) {
    const prefix = "funcionário"
    const prefixRouter = "/adm/funcionarios"

    const LinkHrefTable = (nomeExibir, columnDb) => {
        return (
            <Link href={`${prefixRouter}?_page=1&_sort=${columnDb}&_order=${_order == "DESC" ? "ASC" : "DESC"}`}>
                {_sort == columnDb &&
                    <>
                        {_order == "DESC" ?
                            <ArrowUp />
                            :
                            <ArrowDown />
                        }
                    </>
                }
                {nomeExibir}
            </Link>
        )
    }

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

                {funcionarios && funcionarios.length > 0 ?
                    <TabelaForm>
                        <table>
                            <thead>
                                <tr>
                                    <ThForm maxwidth="65px">
                                        {LinkHrefTable("Cód.", "id")}
                                    </ThForm>
                                    <ThForm maxwidth="100px">
                                        {LinkHrefTable("CPF", "cpf")}
                                    </ThForm>
                                    <ThForm maxwidth="9999px">
                                        {LinkHrefTable("Nome", "nome")}
                                    </ThForm>
                                </tr>
                            </thead>
                            <tbody>
                                {funcionarios.map((ponto => {
                                    return (
                                        <tr key={ponto.id}>
                                            <TdForm maxwidth="65px">{ponto.id}</TdForm>
                                            <TdForm maxwidth="100px">{ponto.cpf}</TdForm>
                                            <TdForm maxwidth="9999px">{ponto.nome}</TdForm>
                                        </tr>
                                    )
                                }))}
                            </tbody>
                        </table>
                    </TabelaForm>
                    :
                    <VazioForm nome={prefix}>
                        <div className="icon-vazio">
                            <ExclamationTriangle size={75} />
                        </div>
                        <h3>Nenhum {prefix} foi encontrado(a)!</h3>
                    </VazioForm >
                }

                {
                    totalPags > 1 &&
                    <PaginadorForm>
                        {(() => {
                            const links = [];
                            for (let page = 1; page <= totalPags; page++) {
                                links.push(
                                    <Link key={page} className={_page == page ? 'active' : ''} href={`${prefixRouter}?_page=${page}&_sort=${_sort}&_order=${_order}`}>{page}</Link>
                                );
                            }
                            return links;
                        })()}
                    </PaginadorForm>
                }
            </Main>
        </>
    );
}

export async function getServerSideProps(context) {
    const { req } = context
    const session = await getSession({ req })

    if (session && session.id && session.adm) {
        const axios = await api(session);

        const { _sort = "id", _order = "DESC", _page = 1, _limit = 20 } = context.query;
        const params = `?_page=${_page}&_limit=${_limit}&_sort=${_sort}&_order=${_order}`
        const { funcionarios, totalPags } = await axios.get(`adm/funcionarios/get${params}`).then((res) => res.data)

        return {
            props: { funcionarios, totalPags, _sort, _order, _page, _limit },
        }
    }

    return {
        redirect: {
            destination: "/",
            permanent: false
        }
    }
}