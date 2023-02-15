// const { User } = require('../models/userModels');
// const { NotFoundError } = require('../../utils/errors/NotFoundError');
// const { BadRequestError } = require('../../utils/errors/BadRequestError');
// const { ConflictError } = require('../../utils/errors/ConflictError');

// async function aboutMe(req, res, next) {
//   try {
//     const user = await User.findById(req.user._id).orFail(() => new NotFoundError('Пользователь с таким id не найден'));
//     res.send(user);
//   } catch (error) {
//     if (error.name === 'CastError') {
//       next(new BadRequestError('Пользователь с таким id не найден'));
//     } else {
//       next(error);
//     }
//   }
// }

// async function patchUser(req, res, next) {
//   try {
//     const user = await User.findOneAndUpdate(
//       { _id: req.user._id },
//       { email: req.body.email, name: req.body.name },
//       {
//         new: true,
//         runValidators: true,
//       },
//     );
//     res.send(user);
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       next(new BadRequestError('Введены некорректные данные'));
//     } else if (error.name === 'MongoServerError') {
//       next(new ConflictError('Такая почта уже занята'));
//     } else {
//       next(error);
//     }
//   }
// }

// module.exports = {
//   aboutMe,
//   patchUser,
// };