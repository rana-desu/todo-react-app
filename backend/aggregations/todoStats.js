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
        {
          $group: {
            _id: '$category',
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
  {
    $group: {
      _id: { user: '$user', status: '$status', category: '$category' },
    },
  },
  {
    $group: {
      _id: '$_id.user',
      statuses: { $addToSet: '$_id.status' },
      categories: { $addToSet: '$_id.category' },
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