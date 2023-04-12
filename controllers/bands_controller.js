const bands = require("express").Router()
const db = require('../models')
const { Band } = db

// FIND ALL BANDS
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll()
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json({message: 'server error'})
        console.log(err)
    }
})

//FIND A SPECIFIC BAND
bands.get('/:id', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where:{ band_id: req.params.id }
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json({ message: 'server error'})
    }
})

//CREATE A BAND 
bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
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