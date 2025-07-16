import express from "express";
import { searchPosts } from "../controllers/search/searchPosts";
import { searchPostsByTags } from "../controllers/search/searchByTags";
const searchRouter = express.Router();

searchRouter.get("/searchPosts", searchPosts);
searchRouter.get("/tags", searchPostsByTags);

export default searchRouter;
