import Head from "next/head";
import styled from "styled-components";
import { getSession } from "next-auth/react";
import { ArrowUp, ArrowDown, PeopleFill, ChevronRight, PlusCircleDotted, Search, ExclamationTriangle } from "react-bootstrap-icons"
import Link from "next/link"
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";

import { TituloForm } from "../../../components/formulario/titulo/components"
import { CabecalhoForm } from "../../../components/formulario/cabecalho/components"

import { TabelaForm, ThForm, TdForm, VazioForm, PaginadorForm, TableVW } from "../../../components/formulario/tabela/components";

import { api } from "../../../../global";
import { horaFormatada } from "../../../../global";
import { useEffect } from "react";

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
const ModalAcoes = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    height: calc(100vh);
    .modal-header{
        height: 53px !important;
        div,
        .btn-close{
            font-size: 16px !important;
        }
        .btn-close{
            padding: 0 10px !important;
        }
    }
    .div-acoes{
        height: 65px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        max-width: 600px;
        margin: 0 auto;
        width: 100%;
        button,a{
            padding: 7px;
            width: 35%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            color: #ffffff;
            border-radius: 2px;
            font-weight: 600;
            letter-spacing: 1px;
            box-shadow: inset 0px -1px 0px 0px rgb(0 0 0 / 9%);
 
            &:disabled{
                cursor: default;
            }
            svg{
                margin-right: 4px;
            }
        }
        .btn-excluir-1{
            background-color: #ffc107;
            border-color: #ffc107;
            &:hover{
                background-color: #ffca2c;
                border-color: #ffc720;
            }
        }

        .btn-excluir{
            background-color: #dc3545;
            border-color: #dc3545;
            &:hover{
                background-color: #bb2d3b;
                border-color: #b02a37;
            }
        }
        .btn-editar{
            background-color: #198754;
            border-color: #198754;
            &:hover{
                background-color: #157347;
                border-color: #146c43;
            }
        }
    }
`
export default function AdmIndex({ datas, totalPags, _sort, _order, _page }) {
    const prefix = "funcionário"
    const prefixRouter = "/adm/funcionarios"
    const [dataVW, setDataVW] = useState({});
    const [btnExcluir, setBtnExcluir] = useState(10);

    const [btnDisabled, setBtnDisabled] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setDataVW({})
        setShow(false);
    }

    const handleShow = (data) => {
        setBtnExcluir(10)
        setDataVW(data)
        setShow(true);
    }

    /* Conta 10s antes de habilitar o btn vermelho de excluir */
    useEffect(() => {
        let intervalId = null
        if (btnExcluir <= 9 && btnExcluir > 0) {
            intervalId = setTimeout(() => {
                setBtnExcluir(btnExcluir - 1)
            }, 1000)
        }

        return () => clearInterval(intervalId);
    }, [btnExcluir])

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
                <title>{`Listar ${prefix} - Softconnect Tecnologia`}</title>
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

                {
                    datas && datas.length > 0 ?
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
                                    {datas.map((data => {
                                        return (
                                            <tr key={data.id} onClick={() => handleShow(data)}>
                                                <TdForm maxwidth="65px">{data.id}</TdForm>
                                                <TdForm maxwidth="100px">{data.cpf}</TdForm>
                                                <TdForm maxwidth="9999px">{data.nome}</TdForm>
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

                <Modal fullscreen show={show} onHide={handleClose} animation={false}>
                    <ModalAcoes>
                        <Modal.Header className="modal-header" closeButton>
                            <Modal.Title>Visualizando</Modal.Title>
                        </Modal.Header>
                        <TableVW>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Código
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.id}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Nome
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.nome}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                E-mail
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.email}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                CPF
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.cpf}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                RG
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.rg}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Nascimento
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.data_nasc}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Contato
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.contato}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Sexo
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.sexo}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Cadastrado em
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {horaFormatada(dataVW.created_at)}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Modificado em
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {horaFormatada(dataVW.updated_at)}
                                            </span>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </TableVW>
                        <div className="div-acoes">
                            {btnExcluir >= 1 ?
                                <button onClick={() => setBtnExcluir(9)} disabled={btnExcluir != 10} className="btn-excluir-1" type="button">Excluir({btnExcluir}s)</button>
                                :
                                <button className="btn-excluir" type="button">Excluir</button>
                            }
                            <Link className="btn-editar" href={`${prefixRouter}/editar/${dataVW.id}`}>Editar </Link>
                        </div>
                    </ModalAcoes>
                </Modal>
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
        const { datas, totalPags } = await axios.get(`adm/funcionarios/get${params}`).then((res) => res.data)

        return {
            props: { datas, totalPags, _sort, _order, _page, _limit },
        }
    }

    return {
        redirect: {
            destination: "/",
            permanent: false
        }
    }
}