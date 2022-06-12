// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {addRecord} from '../../lib/records';

export default  function handler(req, res) {
  try {
    // console.log(req.body.duration);
    // console.log("req.body", req.body);
    addRecord(req.body)
    // fs.writeFileSync("data/users.json", JSON.stringify(users, null, 4));
    // const fileContents = fs.writeFileSync(fullPath, JSON.stringify(data));
    // res.status(200).json({ code: 200, msg: 'ok' });
    res.status(500).send({ code: 500, msg: "error" });

  } catch (error) {
    res.status(500).send({ code: 500, msg: 'error' });
  }
}
