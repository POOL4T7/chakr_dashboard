const Profit = require("./profit.model");


exports.tops = async (req, res) => {
  try {
    const top = await Profit.aggregate([
      {
        $addFields: {
          convertedTimestamp: {
            $dateFromString: {
              dateString: {
                $concat: [
                  { $substr: ["$timestamp", 0, 10] },
                  "T",
                  { $substr: ["$timestamp", 11, 8] },
                  "Z",
                ],
              },
            },
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$convertedTimestamp" },
            month: { $month: "$convertedTimestamp" },
          },
          totalRevenue: { $sum: "$profitPercentage" },
        },
      },
      {
        $sort: {
          totalRevenue: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);
    const highestProfitMonth = top[0];

    if (highestProfitMonth) {
      const year = highestProfitMonth._id.year;
      const month = highestProfitMonth._id.month;
      const totalRevenue = highestProfitMonth.totalRevenue;

      console.log(
        `The month with the highest profit is ${month}/${year} with a total revenue of ${totalRevenue}`
      );
    } else {
      console.log("No data available.");
    }
    return res.status(200).json({
      success: true,
      data: {
        top: top,
      },
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: e.message,
      message: "Server error",
    });
  }
};

exports.getGrowth = async (req, res) => {
  try {
    const filters = [
      {
        $addFields: {
          convertedTimestamp: {
            $dateFromString: {
              dateString: {
                $concat: [
                  { $substr: ["$timestamp", 0, 10] },
                  "T",
                  { $substr: ["$timestamp", 11, 8] },
                  "Z",
                ],
              },
            },
          },
        },
      },
    ];
    if (req.query.q == "all") {
      filters.push(
        {
          $group: {
            _id: { year: { $year: "$convertedTimestamp" } },
            totalRevenue: { $sum: "$profitPercentage" },
          },
        },
        {
          $sort: {
            "_id.year": 1,
          },
        }
      );
    } else {
      filters.push(
        {
          $match: {
            convertedTimestamp: {
              $gte: new Date(`${req.query.q}-01-01T00:00:00Z`),
              $lt: new Date(`${Number(req.query.q) + 1}-01-01T00:00:00Z`),
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$convertedTimestamp" },
              month: { $month: "$convertedTimestamp" },
            },
            totalRevenue: { $sum: "$profitPercentage" },
          },
        },
        {
          $sort: {
            "_id.month": 1,
          },
        }
      );
    }

    const growth = await Profit.aggregate(filters);

    return res.status(200).json({
      success: true,
      data: {
        growth: growth,
      },
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: e.message,
      message: "Server error",
    });
  }
};

const downsampleData = async (targetPoints) => {
  try {
    const dataLength = await Profit.countDocuments();
    const ratio = dataLength / targetPoints;

    const downsampledData = await Profit.aggregate([
      {
        $group: {
          _id: {
            $multiply: [
              {
                $floor: {
                  $divide: [
                    { $indexOfArray: [dataLength, "$$ROOT._id"] },
                    ratio,
                  ],
                },
              },
              ratio,
            ],
          },
          timestamp: { $first: "$timestamp" },
          profitPercentage: { $avg: "$profitPercentage" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return downsampledData;
  } catch (error) {
    throw error;
  }
};
