import User from '../models/User';

export default async (req, res, next) => {
  const user = await User.findOne({
    where: { id: req.userId, is_admin: true },
  });

  if (!user) {
    return res
      .status(401)
      .json({ error: 'Only administrator user can access' });
  }

  console.log('### chackAdmin middleware ###');
  return next();
};
