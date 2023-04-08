import Head from "next/head";
import styled from "styled-components";
import { getSession } from "next-auth/react";
import Alert from 'react-bootstrap/Alert';
import { GearFill, PeopleFill, ChevronRight } from "react-bootstrap-icons"
import Link from "next/link"
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { pt } from "yup-locale-pt";
Yup.setLocale(pt);

import { TituloForm } from "../../../../components/formulario/titulo/components";
import { FormOne, GroupOne, GroupSelectOne } from "../../../../components/formulario/form/components";

import { cpfMask, rgMask, nascimentoMask, telefoneMask } from "../../../../../masks"

/* import { api } from "../../../../../global"; */

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

export default function AdmAdicionar({ session }) {
    const prefix = "funcionário"
    const prefixRouter = "/adm/funcionarios"

    const [btnDisabled, setBtnDisabled] = useState(false);

    const initialValues = {
        nome: "",
        cpf: "",
        rg: "Sim",
        data_nasc: "",
        email: "",
        contato: "",
        sexo: "Selecione",
        bloqueado: "Não",
        motivo_bloqueio: "",
    }
    const scheme = Yup.object().shape({
        nome: Yup.string().label("Nome do produto").nullable().required().trim(),
        codigo_interno: Yup.string().label("Código interno").nullable().required().trim(),
        produto_ativo: Yup.string().label("Produto ativo").required(),
        estoque_controle: Yup.string().label("Controlar estoque").required(),
        estoque_atual: Yup.string().nullable().when("estoque_controle", {
            is: "Sim",
            then: Yup.string().label("Estoque atual").nullable().min(0).required()
        }),
        estoque_minimo: Yup.string().nullable().when("estoque_controle", {
            is: "Sim",
            then: Yup.string().label("Estoque mínimo").nullable().min(0).required()
        }),
        estoque_qtd_minima: Yup.string().nullable().when("estoque_controle", {
            is: "Sim",
            then: Yup.string().label("Quant. min. venda").nullable().min(0).required()
        }),

        url_img: Yup.string().label("Imagem principal").nullable().required().trim(),
        img_1: Yup.string().label("Imagem 1").nullable().optional(),
        img_2: Yup.string().label("Imagem 2").nullable().optional(),
        img_3: Yup.string().label("Imagem 3").nullable().optional(),
        img_4: Yup.string().label("Imagem 4").nullable().optional(),
        preco: Yup.number().label("Valor de venda").nullable().required().min(0.01, "Valor de venda deve ser informado"),
        promocao_ativa: Yup.string().label("Promoção ativa").required(),
        preco_promocao: Yup.string().nullable().when("promocao_ativa", {
            is: "Sim",
            then: Yup.string().label("Valor promoção").nullable().min(0).required()
        }),
    });

    const [alert1, setAlert1] = useState(true);

    return (
        <>
            <Head>
                <title>{`Adicionar ${prefix} - Softconnect Tecnologia`}</title>
            </Head>
            <Main>
                <TituloForm title={`Adicionar ${prefix}`} icon={<PeopleFill size={25} />}>
                    <li>
                        <Link href="/adm/dashboard">Início <ChevronRight height={10} /></Link>
                    </li>
                    <li>
                        <Link href={prefixRouter}>{`${prefix[0].toUpperCase() + prefix.substring(1)}s`} <ChevronRight height={10} /></Link>
                    </li>
                    <li className="ativo">
                        Adicionar
                    </li>
                </TituloForm>

                <Formik
                    validationSchema={scheme}
                    initialValues={initialValues}
                    onSubmit={async (values, setValues) => {
                        console.log(values)
                    }}
                >
                    {({ errors, touched, values, setFieldValue }) => (
                        <FormOne>
                            {alert1 &&
                                <Alert variant="warning" onClose={() => setAlert1(false)} dismissible >
                                    Os campos marcados com <span className="text-danger"><b>*</b></span> são de preenchimento obrigatório.
                                </Alert>
                            }

                            <GroupOne
                                error={!!errors.nome && touched.nome}
                                label="Nome"
                                name="nome"
                                required
                                maxlength={120}
                                md={6}
                                xl={5}
                            />
                            <GroupOne
                                error={!!errors.email && touched.email}
                                label="E-mail"
                                name="email"
                                required
                                maxlength={120}
                                md={6}
                                xl={4}
                            />
                            <GroupOne
                                error={!!errors.cpf && touched.cpf}
                                label="CPF"
                                name="cpf"
                                mask={cpfMask}
                                maxlength={14}
                                md={6}
                                xl={3}
                            />
                            <GroupOne
                                error={!!errors.rg && touched.rg}
                                label="RG"
                                name="rg"
                                mask={rgMask}
                                maxlength={12}
                                md={6}
                                xl={3}
                            />
                            <GroupOne
                                error={!!errors.data_nasc && touched.data_nasc}
                                label="Nascimento"
                                name="data_nasc"
                                mask={nascimentoMask}
                                maxlength={10}
                                md={4}
                                xl={3}
                            />
                            <GroupOne
                                error={!!errors.contato && touched.contato}
                                label="Contato"
                                name="contato"
                                mask={telefoneMask}
                                maxlength={15}
                                md={4}
                                xl={3}
                            />
                            <GroupSelectOne
                                label="Sexo"
                                name="sexo"
                                data={[
                                    { value: "Selecione", name: "Selecione" },
                                    { value: "Masculino", name: "Masculino" },
                                    { value: "Feminino", name: "Feminino" },
                                ]}
                                md={4}
                                xl={3}
                            />

                            <div className="h4-titulo">
                                <GearFill size={25} />
                                <h4>Outros</h4>
                            </div>

                            <GroupSelectOne
                                label="Bloqueado"
                                name="bloqueado"
                                data={[
                                    { value: "Sim", name: "Sim" },
                                    { value: "Não", name: "Não" },
                                ]}
                                md={3}
                            />
                            <GroupOne
                                error={!!errors.motivo_bloqueio && touched.motivo_bloqueio}
                                label="Motivo de bloqueio"
                                name="motivo_bloqueio"
                                maxlength={255}
                                md={9}
                            />


                            <div className="div-btn-salvar">
                                <button className="btn-salvar" type="submit">Cadastrar</button>
                            </div>
                        </FormOne>
                    )}
                </Formik>

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