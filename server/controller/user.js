const { wrapAsync, givesError, } = require('../helpers')
const User = require('../models/user')


const functions = {
    Delete: wrapAsync(async (req, res) => {
        let delStatus = await User.deleteOne({ _id: req.params.id })        
        if (delStatus.deletedCount == 1)
            res.status(200).json({ deletedData: delStatus, msg: ` data ${req.params.id} is deleted` })
        else if (delStatus.deletedCount == 0)
            throw givesError(404, `cannot delete, check the id`)
        else throw givesError(500, `internal server error while deleting`)
    }),
    Patch: wrapAsync(async (req, res) => {
        let values = { ...req.body }       
        let updateData = await User.findByIdAndUpdate(req.params.id, values,{new:true})
        if (updateData) res.status(200).json({ updateData, msg: `data with id ${req.params.id} updated ` })
        else throw givesError(404, `data with id of ${req.params.id}`)
    })
}


module.exports = functions
