import express from 'express';
import { Time } from '@mnwork/common';

const router = express.Router();

router.get('/api/time/get-time', async (req, res) => {

  const { activity, startDate, endDate, email } = req.query;

  const timeList = await Time.find();
  let usersList = {};
  let newRow = {};
  var respList = new Array();

  if (activity && startDate && endDate && email) {
    let queryStart = new Date(new Date(JSON.stringify(startDate)).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));
    // var dateQuery = queryStart.getFullYear() + '/' + (queryStart.getMonth() + 1) + '/' + queryStart.getDate();

    let queryEnd = new Date(new Date(JSON.stringify(endDate)).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));
    // var dateEndQuery = queryEnd.getFullYear() + '/' + (queryEnd.getMonth() + 1) + '/' + queryEnd.getDate();
    
    if (email === "all") {
      usersList = timeList.map((time) => {
        const timeStart = new Date(time.start);
        const timeEnd = new Date(time.end);

        if (queryStart <= timeStart && queryEnd >= timeEnd && time.status === activity) {
          newRow = time;

          respList.push(time);
        }
        //összes
        else if (queryStart <= timeStart && queryEnd >= timeEnd ) {
          newRow = time;
          respList.push(time);
        }


      })
    }
    else {
      usersList = timeList.map((time) => {
        const timeStart = new Date(time.start);
        const timeEnd = new Date(time.end);
        
        if (queryStart <= timeStart && queryEnd >= timeEnd && time.status === activity && time.user_email === email) {
          newRow = time;

          respList.push(time);
        }
        // //összes
        // else if (queryStart <= timeStart && queryEnd >= timeEnd && activity === "mindegyik" && time.user_email === email) {
        //   newRow = time;
        //   respList.push(time);
        // }
        else if (queryStart <= timeStart && queryEnd >= timeEnd && time.late == true && time.user_email === email && activity==="késés") {
          newRow = time;
          respList.push(time);
        }
       


      })
    }

  }

  // res.send(usersList ? (usersList) : ({}))
  if (!respList || respList === null || respList.length == 0) {
    res.send("no data");
  } else {
    res.status(201).send(respList)

  }


});

export { router as getTime };
