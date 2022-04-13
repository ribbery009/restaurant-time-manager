import express from 'express';
import { Time } from '@mnwork/common';

const router = express.Router();

router.get('/api/time/get-time', async (req, res) => {

  const { activity, startDate, endDate, email } = req.query;

  const timeList = await Time.find();
  let usersList = {};
  let newRow = {};
  var respList = [] as any

  console.log("resplist: ", respList)

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
        else if (queryStart <= timeStart && queryEnd >= timeEnd) {
          newRow = time;
          respList.push(time);
        }


      })
    }
    else {
      usersList = timeList.map((time) => {
        const timeStart = new Date(time.start);
        const timeEnd = new Date(time.end);
        console.log("time: ", time)
        if (queryStart <= timeStart && queryEnd >= timeEnd && time.status === activity && time.user_email === email) {
          newRow = time;

          respList.push(time);
        }
        //összes
        else if (queryStart <= timeStart && queryEnd >= timeEnd && activity === "all" && time.user_email === email) {
          newRow = time;
          respList.push(time);
        }
        else if (queryStart <= timeStart && queryEnd >= timeEnd && time.status === activity && "all" === email) {
          newRow = time;
          respList.push(time);
        }
        else if (queryStart <= timeStart && queryEnd >= timeEnd && "all" === activity && "all" === email) {
          newRow = time;
          respList.push(time);
        }


      })
    }

  }

  console.log("respList: ", respList)
  console.log("respList: ", respList === [{}])
  // res.send(usersList ? (usersList) : ({}))
  if (!respList || respList === null) {
    res.send("no data");
  } else {
    res.status(201).send(respList)

  }


});

export { router as getTime };
