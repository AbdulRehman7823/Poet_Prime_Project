const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/authenticate");
const User = require("../../models/User");

router.post("/readerDetail/delete/:id", verifyToken, async (req, res) => {
  try {
    const poet = await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $pull: { poetsAppointmentHistory: { readerId: req.body.readerId } },
      }
    ).exec();
    if (poet) res.status(200).send(poet);
    else res.status(422).send({ message: "There  is no Poet with this ID" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "There is some Error " + err.message });
  }
});

router.put("/readerDetail/update/:id", verifyToken, async (req, res) => {
  try {
    const poet = await User.findById(req.params.id);
    if (poet && poet.userType == "poet") {
      const appointments = poet.poetsAppointmentHistory;

      var flag = 0;
      await appointments.map((val) => {
        if (val.readerId === req.body.readerId) {
          val.username = req.body.data.username;
          val.age = req.body.data.age;
          val.symptoms = req.body.data.symptoms;
          val.diagnosis = req.body.data.diagnosis;
          val.prescription = req.body.data.prescription;
          val.dateTime = req.body.data.dateTime;
          val.rescheduleVisit = req.body.data.rescheduleVisit;
          flag = 1;
        }
      });

      if (flag == 1) {
        await poet.save();
        return res.status(200).send({ message: "Successfully Updated" });
      } else {
        return res.status(422).send({ message: "There is something wrong" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "There is some Error " + err.message });
  }
});



router.post("/readerDetail/:id", verifyToken, async (req, res) => {
  console.log(req.body);
  try {
    const poet = await User.findById(req.params.id);
    if (poet && poet.userType == "poet") {
      let obj = {
        readerId: req.body.readerId,
        username: req.body.data.username,
        age: req.body.data.age,
        interest: req.body.data.interest
      };
      console.log(obj);
      poet.poetsAppointmentHistory.push(obj);
      await poet.save();
      console.log(obj);
      res.status(200).send(obj);
    } else {
      res.status(422).send({ message: "There  is no poet with this ID" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "There is some Error " + err.message });
  }
});




router.get("/poetReaderHistory/:id", verifyToken, async (req, res) => {
  try {
    const poet = await User.findById(req.params.id);
    console.log(poet);
    if (poet && poet.userType == "poet") {
      const readersHistory = poet.poetsAppointmentHistory;
      console.log(readersHistory);
      if (readersHistory.length > 0) {
        res.status(200).send(readersHistory);
      } else {
        res.status(200).send([]);
      }
    } else {
      res.status(422).send({ message: "There  is no poet with this ID" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "There is some Error " + err.message });
  }
});


router.get("/readers/:id", verifyToken, async (req, res) => {
  try {
    const poet = await User.findById(req.params.id);
    if (poet && poet.userType == "poet") {
      const readers = poet.poetCustomers;
      console.log(readers);
      if (readers.length > 0) {
        res.status(200).send(readers);
      } else {
        res.status(200).send([]);
      }
    } else {
      res.status(422).send({ message: "There  is no poet with this ID" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "There is some Error " + err.message });
  }
});

router.get("/acceptedReaders/:id", verifyToken, async (req, res) => {
  try {
    const poet = await User.findById(req.params.id);
    if (poet && poet.userType == "poet") {
      const readers = poet.poetAccepts;
      console.log(readers);
      if (readers.length > 0) {
        const records = await User.find().where("_id").in(readers).exec();
        console.log(records);
        res.status(200).send(records);
      } else {
        res
          .status(422)
          .send({ message: "No Request Accepted by the current poet" });
      }
    } else {
      res.status(422).send({ message: "There  is no poet with this ID" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "There is some Error " + err.message });
  }
});

router.post("/accept/:id", verifyToken, async (req, res) => {
  try {
    const poet = await User.findById(req.params.id);
    const readerId = req.body;

    let isExist = false;
    const poetCustomers = poet.poetCustomers;
    await poetCustomers.map((value) => {
      console.log("ss" + value.id);
      console.log("pp" + readerId._id);
      if (value.id == readerId._id) {
        isExist = true;
        return;
      }
    });

    if (!isExist) {
      return res.status(422).send({
        message: "There is no Request From given reader to current poet",
      });
    } else if (poet && poet.userType == "poet") {
      const readers = poet.poetAccepts;

      readers.push(readerId);
      await User.findByIdAndUpdate(readerId, {
        $pull: { poets: { _id: req.params.id } },
      }).exec();
      await User.findByIdAndUpdate(poet, {
        $pull: { poetCustomers: { _id: readerId._id } },
      }).exec();

      poet.poetAccepts = readers;
      await poet.save();
      res.status(200).send(poet);
    } else {
      res.status(422).send({ message: "There  is no poet with this ID" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "There is some Error " + err.message });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const poet = await User.findById(req.params.id);
    if (poet) {
      res.status(200).send(poet);
    } else {
      res.status(422).send({ message: "There  is no poet with this ID." });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = router;
