
const createController = (model) => {
  const getAll = async (req, res, next) => {
    try {
      const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1)
      const limit = Math.min(
        100,
        Math.max(1, Number.parseInt(req.query.limit, 10) || 10)
      )
      const skip = (page - 1) * limit

      const [items, total] = await Promise.all([
        model.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        model.countDocuments(),
      ])

      return res.status(200).json({
        success: true,
        data: items,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      })
    } catch (error) {
      next(error)
    }
  }

  const getById = async (req, res, next) => {
    try {
      const item = await model.findById(req.params.id).lean()

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Record not found',
        })
      }

      return res.status(200).json({
        success: true,
        data: item,
      })
    } catch (error) {
      next(error)
    }
  }

  const create = async (req, res, next) => {
    try {
      const item = await model.create(req.body)

      return res.status(201).json({
        success: true,
        message: 'Record created successfully',
        data: item,
      })
    } catch (error) {
      next(error)
    }
  }

  const update = async (req, res, next) => {
    try {
      const item = await model.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      )

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Record not found',
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Record updated successfully',
        data: item,
      })
    } catch (error) {
      next(error)
    }
  }

  const remove = async (req, res, next) => {
    try {
      const item = await model.findByIdAndDelete(req.params.id)

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Record not found',
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Record deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  return { getAll, getById, create, update, remove }
}

module.exports = createController
