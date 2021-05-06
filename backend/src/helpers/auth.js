import expressJwt from 'express-jwt';

const authJwt = () => {
  const secret = process.env.JWT_SECRET;
  return expressJwt({
    secret,
    algorithms: ['HS256'],
  }).unless({
    path: [
      { url: '/api/products', method: ['GET', 'OPTIONS'] },
      { url: '/api/category', method: ['GET', 'OPTIONS'] },
      '/api/users/login',
      '/api/users/register',
    ],
  });
};

export default authJwt;
