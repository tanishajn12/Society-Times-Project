const express =  require("express");
const Event = require('../models/Event');
const Review = require('../models/Review');

const {validateEvent, isLoggedIn, isAdmin, isEventAuthor}=require('../middleware');

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

//new form
// user must be logged in to add an product
router.get("/event/new", isLoggedIn, isAdmin, (req,res)=>{
    try{
        res.render('events/new'); 
    }

    catch(e) {
        res.render('error', {err : e.message})
    }
   
})

//adding 
//validate product -> first check and then add
router.post('/events', isLoggedIn, isAdmin, validateEvent, async (req, res) => {
    try {
        let { name, img, date, time, society, venue, type, desc, registerLink} = req.body; // Destructure the event fields from the request body
        await Event.create({
            name,
            img,
            date: new Date(date), // Ensure date is properly formatted
            time,
            society,
            venue,
            type,
            desc,
            registerLink,
            author:req.user._id
        });
        req.flash('success', 'Event Added Successfully');
        res.redirect('/events'); // Redirect to the events page or appropriate route
    } catch (e) {
        // req.flash('error', 'Error adding event');
        res.render('error', { err: e.message }); // Render error page with the error message
    }
});

//show particular event
router.get('/events/:id',  isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        let foundEvent = await Event.findById(id).populate('reviews');
        res.render('events/show', { foundEvent, success:req.flash('msg')});
    } catch (e) {
       
        res.render('error', { err: e.message });
    }
});

router.get('/events/:id/edit',  async (req,res)=> {
    try{
        let {id} = req.params;
        let foundEvent = await Event.findById(id);
        console.log(foundEvent);
        res.render('events/edit',{foundEvent})
    }

    catch(e) {
        res.render('error', {err : e.message})
    }
})

//actually changing the product
router.patch('/events/:id', isLoggedIn, validateEvent, isAdmin, isEventAuthor,  async(req, res) => {
    // console.log("Patch route hit");
    try {
        let {id} = req.params;
        let {name, img, date, time, society, venue, type, desc,registerLink } = req.body;
        // console.log("Received data:", req.body);

        const event = await Event.findByIdAndUpdate(id, {name, img, date, time, society, venue, type, desc , registerLink});
        // console.log("Updated Event : " , event);

        req.flash('success', 'Event Edited Successfully');
        res.redirect(`/events/${id}`);  
    }
    
    catch (e) {
       
        res.render('error', { err: e.message });
    }
});

router.delete('/events/:id', isLoggedIn, isAdmin, isEventAuthor, async (req, res) => {
    try {
        let { id } = req.params;
        let foundEvent = await Event.findById(id);
        
        //deleting reviews before deleting events
        for(let ids of foundEvent.reviews) {
            await Review.findByIdAndDelete(ids);
        }

        await Event.findByIdAndDelete(id);
        req.flash('success', 'Event Deleted Successfully');
        res.redirect('/events');
    } 
    
    catch (e) {
        res.render('error', { err: e.message });
    }
});

module.exports = router;
