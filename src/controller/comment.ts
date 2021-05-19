import { Request, Response } from "express";
import Comments from "../model/Comments";
import { isAuthorized } from "./auth";

export const martialList = async (req: Request, res: Response) => {
  try {
    const commentsData = await Comments.findAll({
      where: { Martials_id: req.params.martialid },
    });
    res.status(200).json({ data: commentsData, message: "ok" });
  } catch (e) {
    res.status(404).json({ message: "Not Found" });
  }
};
export const userList = async (req: Request, res: Response) => {
  try {
    const commentsUserData = await Comments.findAll({
      where: { Users_id: req.params.userid },
    });
    res.status(200).json({ data: commentsUserData, message: "ok" });
  } catch (e) {
    res.status(404).json({ message: "Not Found" });
  }
};
export const create = async (req: Request, res: Response) => {
  // if (!isAuthorized(req)) {
  //   res.status(403).json({ message: "Invalid Access Token" });
  //   return;
  // }
  try {
    const { comment, userid, martialid } = req.body;
    const createData = await Comments.create({
      comment,
      Users_id: userid,
      Martials_id: martialid,
    });
    res
      .status(201)
      .json({ data: { Comments_id: createData.id }, message: "created" });
  } catch (e) {
    res.status(404).json({ message: "Not Found" });
  }
};
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentid } = req.body;
    const findData = await Comments.findOne({ where: { id: commentid } });
    if (!findData) {
      res.status(404).json({ message: "Not Found" });
    }
    const data = await Comments.destroy({
      where: { id: commentid },
    });
    res.status(200).json({ message: "ok" });
  } catch (e) {
    res.status(404).json({ message: "Not Found" });
  }
};
export const update = (req: Request, res: Response) => {
  try {
    res.status(200).send("working...");
  } catch (e) {
    console.log("error...");
  }
};
