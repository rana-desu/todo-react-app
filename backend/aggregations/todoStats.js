const mongoose = require('mongoose')

const userStatsPipeline = (userId) => [
  { $match: { user: new mongoose.Types.ObjectId(userId) } },
  {
    $facet: {
      totalCount: [{ $count: 'total' }],
      byStatus: [
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ],
      byCategory: [
        { $unwind: '$categories' },
        {
          $group: {
            _id: '$categories',
            count: { $sum: 1 },
          },
        },
      ],
    },
  },
  {
    $project: {
      total: { $arrayElemAt: ['$totalCount.total', 0] },
      requestedBy: 'user',
      byStatus: 1,
      byCategory: 1,
    },
  },
  {
    $addFields: {
      byStatus: {
        $map: {
          input: '$byStatus',
          as: 'item',
          in: {
            status: '$$item._id',
            count: '$$item.count',
            percent: {
              $multiply: [
                { $divide: ['$$item.count', '$total'] },
                100,
              ],
            },
          },
        },
      },
      byCategory: {
        $map: {
          input: '$byCategory',
          as: 'item',
          in: {
            category: '$$item._id',
            count: '$$item.count',
            percent: {
              $multiply: [
                { $divide: ['$$item.count', '$total'] },
                100,
              ],
            },
          },
        },
      },
    },
  },
]

const adminStatsPipeline = () => [
  { $unwind: '$categories' },
  {
    $group: {
      _id: {
        user: '$user',
        status: '$status',
        category: '$categories',
      },
    },
  },
  {
    $project: {
      user: '$_id.user',
      status: '$_id.status',
      category: '$_id.category',
    },
  },
  {
    $group: {
      _id: '$user',
      statuses: { $addToSet: '$status' },
      categories: { $addToSet: '$category' },
    },
  },
  {
    $facet: {
      totalUsers: [{ $count: 'total' }],
      byStatus: [
        { $unwind: '$statuses' },
        {
          $group: {
            _id: '$statuses',
            userCount: { $sum: 1 },
          },
        },
      ],
      byCategory: [
        { $unwind: '$categories' },
        {
          $group: {
            _id: '$categories',
            userCount: { $sum: 1 },
          },
        },
      ],
    },
  },
  {
    $project: {
      total: { $arrayElemAt: ['$totalUsers.total', 0] },
      requestedBy: 'admin',
      byStatus: 1,
      byCategory: 1,
    },
  },
  {
    $addFields: {
      byStatus: {
        $map: {
          input: '$byStatus',
          as: 'item',
          in: {
            status: '$$item._id',
            userCount: '$$item.userCount',
            percentOfUsers: {
              $multiply: [
                { $divide: ['$$item.userCount', '$total'] },
                100,
              ],
            },
          },
        },
      },
      byCategory: {
        $map: {
          input: '$byCategory',
          as: 'item',
          in: {
            category: '$$item._id',
            userCount: '$$item.userCount',
            percentOfUsers: {
              $multiply: [
                { $divide: ['$$item.userCount', '$total'] },
                100,
              ],
            },
          },
        },
      },
    },
  },
]

module.exports = {
  userStatsPipeline,
  adminStatsPipeline,
}
