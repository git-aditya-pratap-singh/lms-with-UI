import express from "express";
import TagsControllers from "./modules/tags.controllers";

const tagsRoutes = express.Router();
const INSTANCE_OF_TAGS = new TagsControllers();

tagsRoutes.get('/getCourseTags', INSTANCE_OF_TAGS.getCourseTags);

export default tagsRoutes;