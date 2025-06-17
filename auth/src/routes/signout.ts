import express from "express";

const router = express.Router();

router.get("/api/signout", (req, res) => {
  req.session = null;

  res.send({});
});

export { router as signout };
