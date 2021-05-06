import expressJwt from 'express-jwt';

const authJwt = () => {
  const secret = process.env.JWT_SECRET;
  const api = process.env.API_URL;

  return expressJwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/api\/products(.*)/, method: ['GET', 'OPTIONS'] },
      { url: /\/api\/category    (.*)/, method: ['GET', 'OPTIONS'] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
};

const isRevoked = async (req, payload, done) => {
  if (!payload.isAdmin) {
    done(null, true);
  }
  done();
};

export default authJwt;
