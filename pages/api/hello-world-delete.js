// https://levelup.gitconnected.com/a-guide-to-next-js-api-routes-a287eda1f784
const handler = (req, res) => {
  console.log('request method', req.method);
  console.log('request body', req.body);
  console.log('request query', req.query); // The url query string
  console.log('request cookies', req.cookies); // The passed cookies
  const { method } = req;
  switch (method) {
    case 'GET':
      // handleGet()
      break;
    case 'POST':
      // handlePost()
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }

  return res.json({ hello: 'world!', method: req.method });
  // return res.status(404).json({
  //   status: 404,
  //   message: 'Not found',
  // });
};
export default handler;
