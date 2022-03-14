import express, { Request, Response } from 'express';
import { validateRequest } from '@mnwork/common';
import { Time } from '@mnwork/common';

const router = express.Router();
/*
status=
-work
-working
-off
-sick
-closed restaurant
-holiday

 start: Date;
    end: Date;
    live_start: Date;
    live_end: Date;
    name: string;
    user_email: string;
    creator: string;
    late: boolean;
    late_time_min: number;
    isHere: boolean;
    status: string;
*/
router.post(
  '/api/time/newtime',
  validateRequest,
  async (req: Request, res: Response) => {
    const { start,end,name,creator,status,user_id} = req.body;
    const late_time_min=0;
    const late = false;
    const isHere = false;
    const live_start =new Date(); 
    const live_end = new Date();
    const time = Time.build({start,end,name,late,late_time_min,creator,isHere,status,live_start,live_end,user_id});
    
    time.save();
    console.log(time)
    res.status(201).send(time);
  }
);

export { router as newtime };
