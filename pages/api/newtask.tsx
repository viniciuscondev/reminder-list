import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import connect from '../../src/utils/database';

export default async function newTask(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const task = req.body;

      const session = await getSession({ req });

      if (!task) {
        res.status(400).json({ message: 'Tarefa vazia' });
        return;
      }

      const { db } = await connect();

      const findUser = await db.collection('tasks').findOne({ user_email: session.user.email });

      if (!findUser) {
        await db.collection('tasks').insertOne({
          user_email: session.user.email,
          task: [task],
        });
      } else {
        await db.collection('tasks').updateOne({ user_email: session.user.email }, { $push: { task } });
      }

      res.status(200).json({ message: 'Tarefa criada com sucesso!' });
    } catch (err) {
      res.status(500).send('Erro no servidor');
    }
  }
}
