export default (req, res) => {
  console.log('request body', req.body);
  console.log('request query', req.query); // The url query string
  console.log('request cookies', req.cookies); // The passed cookies
  const {
    query: { id },
  } = req;
  return res.json({ user: { id, name: 'Test User' } });
};
