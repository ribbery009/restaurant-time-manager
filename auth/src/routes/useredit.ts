import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest,BadRequestError } from '@mnwork/common';
import { User } from '@mnwork/common';

const router = express.Router();

router.post(
  '/api/users/useredit',
  [
    body('email').isEmail().withMessage('Nem megfelelő e-mail.'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Jelszó minimum 4, de maximum 20 karakter hosszúságú engedélyezett.'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password,name,rule,job_title,phone,city,address,postcode,id } = req.body;

    let existingUser = await User.findOne({ "_id" : id });

    if (!existingUser) {
      throw new BadRequestError('Nem találom a felhasználót!');
    }

    await User.deleteOne({ email:email });
  
    existingUser = User.build({email, password,name,rule,job_title,phone,city,address,postcode});


    await existingUser.save();

    res.status(201).send(existingUser);
  }
);

export { router as userEditRouter };
