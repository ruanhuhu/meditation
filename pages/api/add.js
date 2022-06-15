// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {addRecord} from '../../lib/records';

export default  function handler(req, res) {
  try {
    addRecord(req.body)
    res.status(200).json({ code: 200, msg: 'ok' });
  } catch (error) {
    res.status(500).send({ code: 500, msg: 'error' });
  }
}
