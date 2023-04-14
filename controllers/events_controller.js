const events = require("express").Router()
const db = require('../models')
const { Event } = db
const { Op } = require('sequelize')
   
// FIND ALL EVENTS
events.get('/', async (req, res) => {
    try {
        const foundEvent = await Event.findAll({
            order: [ [ 'start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})


//FIND A SPECIFIC EVENT
events.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where:{ event_id: req.params.id }
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json({ message: 'server error'})
    }
})

//CREATE A EVENT 
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(201).json({
            message: 'Successfully insert a new band',
            data: newEvent
        })
    } catch(err) {
        res.status(500).json({ message: 'server error' })
    }
})

//UPDATE EVENT INFORMAION
events.put('/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({ 
            message: `Successfully updated ${updatedEvent} event(s)`
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'server error'})
    }
} )

// DELETE A EVENT
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvent} event(s)`
        })
    } catch(err) {
        res.status(500).json({ message: 'server error'})
    }
})


// exports

module.exports = events