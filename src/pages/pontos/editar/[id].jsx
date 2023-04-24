import Head from "next/head";
import styled from "styled-components";
import { getSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link"
import { PeopleFill, ChevronRight } from "react-bootstrap-icons"
import { Formik } from "formik";
import * as Yup from "yup";
import { pt } from "yup-locale-pt";
Yup.setLocale(pt);

import { TituloForm } from "../../../components/formulario/titulo/components";
import { FormOne, GroupOne, GroupSelectOne } from "../../../components/formulario/form/components";

import { FormatObjNull } from "../../../../global";

const prefix = "ponto"
const prefixRouter = "/pontos"

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

export default function Editar({ data, session }) {
    const [btnDisabled, setBtnDisabled] = useState(false);

    const scheme = Yup.object().shape({
        tipo_alteracao: Yup.string().label("Tipo de ajuste").nullable().required().trim(),
        data: Yup.string().nullable().label("Data").required(),
        h_entrada: Yup.string().nullable().label("Entrada").required(),
        h_saida: Yup.string().nullable().label("Saída").required(),
    });

    return (
        <>
            <Head>
                <title>{`Editar ${prefix} - Softconnect Tecnologia`}</title>
            </Head>
            <Main>
                <TituloForm title={`Editar ${prefix}`} icon={<PeopleFill size={25} />}>
                    <li>
                        <Link href="/dashboard">Início <ChevronRight height={10} /></Link>
                    </li>
                    <li>
                        <Link href={prefixRouter}>{`${prefix[0].toUpperCase() + prefix.substring(1)}s`} <ChevronRight height={10} /></Link>
                    </li>
                    <li className="ativo">
                        Editar
                    </li>
                </TituloForm>

                <Formik
                    validationSchema={scheme}
                    initialValues={data}
                    onSubmit={async (values, setValues) => {
                        setBtnDisabled(true)
                        const valuesFormat = FormatObjNull(values)
                        console.log(valuesFormat)
                        setBtnDisabled(false)
                    }}
                >
                    {({ errors, touched, values, dirty }) => (
                        <FormOne>
                            <GroupSelectOne
                                label="Tipo de alteração"
                                required
                                name="tipo_alteracao"
                                data={[
                                    { value: "Selecione", name: "Selecione" },
                                    { value: "Data", name: "1 - Data" },
                                    { value: "Hora", name: "2 - Hora" },
                                    { value: "Data e Hora", name: "3 - Data e Hora" },
                                    { value: "Outras", name: "4 - Outras" },
                                ]}
                                md={12}
                            />

                            <GroupOne
                                error={!!errors.data && touched.data}
                                label="Data"
                                name="data"
                                type="date"
                                required
                                disabled={values.tipo_alteracao != "Data" && values.tipo_alteracao != "Data e Hora"}
                                md={6}
                            />
                            <GroupOne
                                error={!!errors.h_entrada && touched.h_entrada}
                                label="Entrada"
                                name="h_entrada"
                                type="time"
                                required
                                disabled={values.tipo_alteracao != "Hora" && values.tipo_alteracao != "Data e Hora"}
                                md={6}
                            />
                            <GroupOne
                                error={!!errors.h_saida && touched.h_saida}
                                label="Saída"
                                name="h_saida"
                                type="time"
                                required
                                disabled={values.tipo_alteracao != "Hora" && values.tipo_alteracao != "Data e Hora"}
                                md={6}
                            />
                            <div className="div-btn-salvar">
                                <button disabled={btnDisabled || !dirty} className="btn-salvar" type="submit">Solicitar</button>
                            </div>
                        </FormOne>
                    )}
                </Formik>

            </Main>
        </>
    );
}

import { getKnex } from "../../../../knex";
export async function getServerSideProps(context) {
    const { req } = context
    const session = await getSession({ req })

    if (session && session.id) {
        const knex = getKnex()
        const { id } = context.params;

        const data = await knex("vw_cadastro_pontos")
            .select()
            .where({ id_usuario: session.id, id: id })
            .first()

        if (data && data.id) {
            return {
                props: { session, data },
            }
        }
    }

    return {
        redirect: {
            destination: "/",
            permanent: false
        }
    }
}