import { getSession } from 'next-auth/client';
import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../src/utils/database';

export default async function ListTasks(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = req.headers;

      const email = data.useremail;

      if (!email) {
        res.status(400).json({ message: 'Erro no usuário' });
        return;
      }

      const { db } = await connect();

      const response = await db.collection('tasks').findOne({ user_email: email });

      if (response) {
        res.status(200).json(response);
      } else {
        res.status(200).json({ message: 'Sem tarefas cadastradas' });
      }
    } catch (err) {
      res.status(500).send('Erro no servidor');
    }
  } else if (req.method === 'DELETE') {
    try {
      const session = await getSession({ req });

      const data = req.body;

      const { db } = await connect();

      // eslint-disable-next-line max-len
      const response = await db.collection('tasks').updateOne({ user_email: session.user.email }, { $pull: { task: data } });

      res.status(200).json(response);
    } catch (err) {
      res.status(500).send('Falha ao deletar tarefa');
    }
  } else if (req.method === 'PUT') {
    try {
      const data = req.body;

      const session = await getSession({ req });

      const { db } = await connect();

      // eslint-disable-next-line prefer-template, quotes
      await db.collection('tasks').updateOne({ user_email: session.user.email }, { $set: { ["task." + data.index]: data.updatedTask } });

      res.status(200).json({ message: 'Tarefa atualizada com sucesso!' });
    } catch (err) {
      res.status(500).send('Erro ao atualizar tarefa');
    }
  }
}
