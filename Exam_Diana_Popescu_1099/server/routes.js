import express from "express";
import { jobPosting, Candidate } from "./entities.js";

const router = express.Router();

router
  .route("/candidate")
  .post(async (req, res) => postRecords(Candidate, req, res))
  .get(async (req, res) => getRecords(Candidate, req, res))
  .delete(async (req, res) => deleteRecords(Candidate, req, res));

router
  .route("/candidate/:id")
  .get(async (req, res) => getRecord(Candidate, req, res))
  .delete(async (req, res) => deleteRecord(Candidate, req, res))
  .put(async (req, res) => putRecord(Candidate, req, res));

router
  .route("/candidate/job/:id")
  .get(async (req, res) => getCandidates(Candidate, req, res));

router
  .route("/jobPosting")
  .post(async (req, res) => postRecords(jobPosting, req, res))
  .get(async (req, res) => getRecords(jobPosting, req, res))
  .delete(async (req, res) => deleteRecords(jobPosting, req, res));

router
  .route("/jobPosting/:id")
  .get(async (req, res) => getRecord(jobPosting, req, res))
  .delete(async (req, res) => deleteRecord(jobPosting, req, res))
  .put(async (req, res) => putRecord(jobPosting, req, res));

async function postRecords(Model, req, res) {
  try {
    let record = await Model.create(req.body);
    res
      .status(201)
      .location(
        `http://${req.headers.host}${req.baseUrl}${req.url}/${record.id}`
      )
      .send();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function getRecords(Model, req, res) {
  try {
    let records = await Model.findAll();
    if (records.length > 0) {
      res.status(200).json(records);
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json(error);
  }
}

async function deleteRecords(Model, req, res) {
  try {
    await Model.truncate();
    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getRecord(Model, req, res) {
  try {
    let record = await Model.findByPk(req.params.id);
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getCandidates(Model, req, res) {
  try {
    let record = await Model.findAll({
      where: { jobPostingId: req.params.id },
    });
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

async function putRecord(Model, req, res) {
  try {
    let record = await Model.findByPk(req.params.id);
    if (record) {
      await record.update(req.body);
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

async function deleteRecord(Model, req, res) {
  try {
    let record = await Model.findByPk(req.params.id);
    if (record) {
      await record.destroy();
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

export default router;
