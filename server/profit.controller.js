const Profit = require("./profit.model");

const months = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

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

    const growth = await Profit.aggregate([
      ...filters,
      {
        $project: {
          _id: 1,
          value: { $round: ["$totalRevenue", 2] },
        },
      },
    ]);
    const formattedGrowth = growth.map((entry) => ({
      label:
        req.query.q === "all"
          ? entry._id.year.toString()
          : months[`${entry._id.month.toString().padStart(2, "0")}`],
      value: entry.value.toString(),
    }));
    return res.status(200).json({
      success: true,
      data: {
        growth: formattedGrowth,
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
