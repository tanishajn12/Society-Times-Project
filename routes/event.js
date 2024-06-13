const express=  require("express");
const Event = require('../models/Event');
const router = express.Router(); //same work as app

router.get("/events", async (req,res)=> {
    try{
        let events = await Event.find({});
        res.render("events/index",{events})
    }

    catch(e) {
        res.render('error', {err : e.message})
    }
});

router.get("/event/new", (req,res)=>{
    try{
        res.render('events/new'); 
    }

    catch(e) {
        res.render('error', {err : e.message})
    }
   
})
//adding 
//validate product -> first check and then add
router.post('/events', async (req, res) => {
    try {
        const { name, img, date, time, society, venue, type, desc, registerLink } = req.body; // Destructure the event fields from the request body
        const newEvent = new Event({
            name,
            img,
            date: new Date(date), // Ensure date is properly formatted
            time,
            society,
            venue,
            type,
            desc,
            registerLink
        });
        await newEvent.save(); // Save the new event to the database
        // req.flash('success', 'Event Added Successfully');
        res.redirect('/events'); // Redirect to the events page or appropriate route
    } catch (e) {
        // req.flash('error', 'Error adding event');
        res.render('error', { err: e.message }); // Render error page with the error message
    }
});

//show particular event
router.get('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const foundEvent = await Event.findById(id);
        
        if (!foundEvent) {
            // req.flash('error', 'Event not found');
            return res.redirect('/events');
        }
        
        res.render('events/show', { foundEvent});
    } catch (e) {
        // req.flash('error', 'Error fetching event details');
        res.render('error', { err: e.message });
    }
});

router.get('/events/:id/edit',  async (req,res)=> {
    try{
        let {id} = req.params;
        let foundEvent = await Event.findById(id);
        res.render('events/edit',{foundEvent})
    }

    catch(e) {
        res.render('error', {err : e.message})
    }
})

//actually changing the product
router.patch('/events/:id',  async(req, res) => {
    try {
        let { id } = req.params;
        let { name, img, date, time, society, venue, type, desc, registerLink } = req.body;

        await Event.findByIdAndUpdate(id, { name, img, date, time, society, venue, type, desc, registerLink });

        // req.flash('success', 'Event Edited Successfully');
        res.redirect('/events');  
    }
    
    catch (e) {
        // req.flash('error', 'Error updating event');
        res.render('error', { err: e.message });
    }
});

router.delete('/events/:id', async (req, res) => {
    try {
        let { id } = req.params;
        await Event.findByIdAndDelete(id);
        // req.flash('success', 'Event Deleted Successfully');
        res.redirect('/events');
    } catch (e) {
        // req.flash('error', 'Error deleting event');
        res.render('error', { err: e.message });
    }
});

module.exports = router;
