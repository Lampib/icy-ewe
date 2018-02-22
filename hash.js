return require('bcrypt').hash((process.env.PASSWORD || ''), 11)
  .then(hash => {
    console.log(hash);
  });
