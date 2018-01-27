console.log('this is loaded');

exports.twitter = {
  consumer_key: process.env.'5yuU79OkiRwJGYImshcbxcV11',
  consumer_secret: process.env.'bTU7MkU6psVSpt4JdFiOdDjdXLy8xoHh34MVP3D1n1TXcAPnTE',
  access_token_key: process.env.'956344682220470272-Wqgasq9glYJog5AMDPGxDm5OqZJF07r',
  access_token_secret: process.env.'uQBY7Qhl8sCMKJmkprQqTTQ3LTvo5Cy5yKNvHWKiKie4f',
};

exports.spotify = {
  id: process.env.'51fbe441292a49d2a7a5dcf8ff9c8145',
  secret: process.env.'717039af6aa840a88d24ad033473e4b9',
};

exports.omdb = {
	key: process.env.OMDB_KEY
};