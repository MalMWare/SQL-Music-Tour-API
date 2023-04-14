const stages = require("express").Router()
const db = require('../models')
const { Stage } = db
const { Op } = require('sequelize')
   
// FIND ALL STAGES
stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll()
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})

//FIND A SPECIFIC STAGE
stages.get('/:id', async (req, res) => {
    try {
        const foundStages = await Stage.findOne({
            where:{ stage_id: req.params.id }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json({ message: 'server error'})
    }
})

//CREATE A STAGE
stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(201).json({
            message: 'Successfully insert a new stage',
            data: newStage
        })
    } catch(err) {
        res.status(500).json({ message: 'server error' })
    }
})

//UPDATE STAGE INFORMAION
stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({ 
            message: `Successfully updated ${updatedStages} stage(s)`
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'server error'})
    }
} )

// DELETE A STAGE
stages.delete('/:id', async (req, res) => {
    try {
        const deletedStages = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json({ message: 'server error'})
    }
})


// exports

module.exports = stages