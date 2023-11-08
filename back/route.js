import express from 'express';
const router = express.Router();
import * as getController from './getController.js';
import * as postController from './postController.js';
import * as insertItemController from './insertItemController.js';
import * as archiveDeleteController from './archiveDeleteController.js';

router.get("/items", getController.getAllItems)
router.get("/items/:name", getController.searchByNameDesc)
router.get("/items/id/:id", getController.getItemById)
router.get("/category", getController.getAllCategories)
router.get("/colors", getController.getColorList)
router.get("/sub_category", getController.getAllSubcategories)
router.get("/search_bar/category/:motcle", getController.searchCategory)
router.get("/search_bar/sub_categ/:motcle", getController.searchSubcategory)

router.use("/admin/*", postController.checkAuthAdmin)
router.post("/admin/postItem", insertItemController.postItem)
router.post("/admin/editItem", postController.editItem)
router.post("/admin/changeItemStatus", postController.changeItemStatus)
router.post("/admin/archiveItem", archiveDeleteController.archiveItem)
router.post("/admin/restoreItem", archiveDeleteController.restoreItem)
router.post("/admin/deleteItem", archiveDeleteController.deleteItem)
router.post("/admin/postColor", postController.postColor)
router.post("/admin/postCateg", postController.postCategory)
router.post("/admin/postSubCateg", postController.postSubcategory)

export default router
