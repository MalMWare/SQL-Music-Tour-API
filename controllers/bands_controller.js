const bands = require("express").Router()
const db = require('../models')
const { Band, Meet_Greet, Event, Set_Times } = db
const { Op } = require('sequelize')
   
// FIND ALL BANDS
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC BAND
bands.get('/:name', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { name: req.params.name  },
            include: [ 
                { 
                    model: Meet_Greet, 
                    as: "meet_greets"
                },
                { 
                    model: Set_Times,
                    as: "set_times"
                }
            ] 
        })
        res.status(200).json(foundBand)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


//CREATE A BAND 
bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(201).json({
            message: 'Successfully insert a new band',
            data: newBand
        })
    } catch(err) {
        res.status(500).json({ message: 'server error' })
    }
})

//UPDATE BAND INFORMAION
bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({ 
            message: `Successfully updated ${updatedBands} band(s)`
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'server error'})
    }
} )

// DELETE A BAND
bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json({ message: 'server error'})
    }
})


// exports

module.exports = bands