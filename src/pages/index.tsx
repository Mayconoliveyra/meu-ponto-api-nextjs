import { GetServerSideProps } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

interface ProdutosProps {
  produtos: []
}

type ProdutosLista = {
  id: number,
  nome: string,
  codigo_interno: string,
  estoque_atual: number,
  estoque_minimo: number,
  estoque_qtd_minima: number,
  estoque_controle: boolean,
  url_img: string,
  img_1: string,
  img_2: string,
  img_3: string,
  img_4: string,
  preco: number,
  preco_promocao: number,
  promocao_ativa: boolean,
  id_categoria: number,
  updated_at: string | Date,
  deleted_at: string | Date
}

const Teste = styled.div`
  border: solid 1px red;
`
export default function Home({ produtos }: ProdutosProps) {
  const [todos, setTodos] = useState<ProdutosLista[]>(produtos)
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Teste>
          <h1>oi</h1>
        </Teste>
      </main>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const resp = await fetch('http://localhost:3000/api/teste')
  const produtos = await resp.json()

  return {
    props: { produtos }, // will be passed to the page component as props
  }
}