import type { NextApiRequest, NextApiResponse } from 'next'
import { getKnex } from '../../../../knex'

type Data = {
    name: string
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>) {
    const knex = getKnex()
    const todos = await knex("cadastro_funcionarios")
    res.status(200).json(todos)
}