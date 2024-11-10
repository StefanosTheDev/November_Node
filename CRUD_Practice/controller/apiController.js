const apiService = require('../service/apiService');
exports.listProductNames = async (req, res, next) => {
  try {
    const productNames = await apiService.listProductNames();
    res.status(200).json({
      status: 'success',
      data: productNames,
    });
  } catch (err) {
    next(err);
  }
};

exports.totalLoyaltyPoints = async (req, res, next) => {
  try {
    const points = await apiService.totalLoyaltyPoints();
    res.status(200).json({
      status: 'success',
      data: points,
    });
  } catch (err) {
    next(err);
  }
};
