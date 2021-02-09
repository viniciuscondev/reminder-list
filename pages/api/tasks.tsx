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

      res.status(200).json(response);
    } catch (err) {
      res.status(500).send('Erro no servidor');
    }
    // } else if (req.method === 'DELETE') {
    //   try {
    //     const data = req.body;

    //     console.log(data.task);

    //     const { db } = await connect();

  // eslint-disable-next-line max-len
  // const response = await db.collection('tasks').updateOne({ use_email: 'abexanderconde@gmail.com' }, { $pull: { task:  } });
  //   } catch (err) {
  //     res.status(500).send('Falha ao deletar tarefa');
  //   }
  // }
  }
}
