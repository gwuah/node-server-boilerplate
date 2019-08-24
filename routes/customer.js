const controllers = require("../controllers/customer");

module.exports = function(router) {
  router.post("/customers", async (req, res, next) => {
    try {
      const response = await controllers.create(req.query, req.body);
      if (!response.error) {
        return res.status(200).json({
          status: true,
          message: "Customer created successfully",
          customer: response.data
        });
      } else {
        return res.status(200).json({
          status: false,
          message: "Failed to create customer",
          customer: response.data
        });
      }
    } catch (error) {
      return next(error);
    }
  });
};
