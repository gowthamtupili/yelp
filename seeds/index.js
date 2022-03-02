const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("Connection OPEN!!!");
    })
    .catch(err => {
        console.log("OH NO ERROR!")
        console.log(err);  
    });


const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = (Math.floor(Math.random() * 30) + 10);
        const camp = new Campground({
            author: '62074b2099997534a0a5673d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type : "Point",
                coordinates : [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            // image: 'https://source.unsplash.com/collection/483251',
            description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima vero quasi, recusandae iste, quibusdam quam sed numquam error ea provident a, architecto id. A eius perspiciatis minus obcaecati quos vel?',
            price,
            images: [ 
                {
                    url : "https://res.cloudinary.com/dbrkljjoz/image/upload/v1644837461/YelpCamp/yhiehvuxdfeoail6siaa.jpg",
                    filename : "YelpCamp/yhiehvuxdfeoail6siaa"
                },
                {
                    url : "https://res.cloudinary.com/dbrkljjoz/image/upload/v1644835451/YelpCamp/v9xtfvc7upv5qfetqlet.jpg",
                    filename : "YelpCamp/v9xtfvc7upv5qfetqlet"
                }
            ]
        })
        await camp.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
})