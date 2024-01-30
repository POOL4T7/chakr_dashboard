const { weekRevenue, lostDeals, tops, getGrowth } = require("./profit.controller");

const router=require("express").Router();

router.get("/tops", tops);
router.get("/growth", getGrowth);

module.exports=router;