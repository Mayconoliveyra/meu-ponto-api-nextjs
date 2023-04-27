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

import { TituloForm } from "../../../../components/formulario/titulo/components";
import { FormOne, GroupOne, GroupTextarea, GroupSelectOne } from "../../../../components/formulario/form/components";

import { FormatObjNull } from "../../../../../global";

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

export default function AdmEditar({ data, session }) {
    const [btnDisabled, setBtnDisabled] = useState(false);

    const scheme = Yup.object().shape({
        data: Yup.string().nullable().label("Data").required(),
        entrada1: Yup.string().nullable().label("Entrada 1"),
        saida1: Yup.string().nullable().label("Saída 1"),
        entrada2: Yup.string().nullable().label("Entrada 2"),
        saida2: Yup.string().nullable().label("Saída 2"),
        acrescentar_hrs: Yup.string().nullable().label("Acrescentar horas"),
        subtrair_hrs: Yup.string().nullable().label("Subtrair horas"),
        motivo_solicitacao: Yup.string().label("Motivo da solicitação").nullable().required().trim(),
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
                            <GroupOne
                                error={!!errors.data && touched.data}
                                label="Data"
                                name="data"
                                type="date"
                                disabled
                                md={12}
                            />
                            <GroupOne
                                error={!!errors.entrada1 && touched.entrada1}
                                label="Entrada 1"
                                name="entrada1"
                                type="time"
                                md={6}
                            />
                            <GroupOne
                                error={!!errors.saida1 && touched.saida1}
                                label="Saída 1"
                                name="saida1"
                                type="time"
                                md={6}
                            />
                            <GroupOne
                                error={!!errors.entrada2 && touched.entrada2}
                                label="Entrada 2"
                                name="entrada2"
                                type="time"
                                md={6}
                            />
                            <GroupOne
                                error={!!errors.saida2 && touched.saida2}
                                label="Saída 2"
                                name="saida2"
                                type="time"
                                md={6}
                            />
                            <GroupOne
                                error={!!errors.acrescentar_hrs && touched.acrescentar_hrs}
                                label="Acrescentar horas"
                                name="acrescentar_hrs"
                                type="time"
                                md={6}
                            />
                            <GroupOne
                                error={!!errors.subtrair_hrs && touched.subtrair_hrs}
                                label="Subtrair horas"
                                name="subtrair_hrs"
                                type="time"
                                md={6}
                            />
                            <GroupSelectOne
                                label="Obs"
                                name="obs"
                                data={[
                                    { value: null, name: null },
                                    { value: "Atestado", name: "Atestado" },
                                    { value: "Falta", name: "Falta" },
                                    { value: "Folga", name: "Folga" },
                                    { value: "Feriado", name: "Feriado" },
                                    { value: "Compensado", name: "Compensado" },
                                    { value: "DSR", name: "DSR" },
                                ]}
                                md={12}
                            />
                            <GroupTextarea
                                error={!!errors.motivo_solicitacao && touched.motivo_solicitacao}
                                label="Motivo da solicitação"
                                name="motivo_solicitacao"
                                rowstxt={3}
                                sm={12}
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

import { getKnex } from "../../../../../knex";
export async function getServerSideProps(context) {
    const { req } = context
    const session = await getSession({ req })

    if (session && session.id && session.adm) {
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