import express from "express";
import admin from "firebase-admin";

const router = express.Router();

const checkUserID = async (req, res, next) => {
  const idToken = req.headers.authorization;

  if (!idToken) return res.status(401).end();

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    if (decodedToken) {
      req.uid = decodedToken.uid;
      return next();
    } else {
      return res.status(401).end();
    }
  } catch (e) {
    return res.status(401).end();
  }
};

router.patch("/become_admin", checkUserID, async (req, res, next) => {
  try {
    await admin.auth().setCustomUserClaims(req.uid, { admin: true });
  } catch (e) {
    return next(e);
  }
  return res.end();
});

router.get("/admin_only", checkUserID, async (req, res, next) => {
  try {
    const user = await admin.auth().getUser(req.uid);

    if (user.customClaims && user.customClaims.admin === true) {
      return res.status(200).end();
    } else {
      return res.status(401).end();
    }
  } catch (e) {
    return next(e);
  }
});

export default router;
