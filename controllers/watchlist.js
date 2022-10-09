//const Media = require('../models/Media');
const Watchlist = require('../models/Watchlist');
const { IMAGE_URL } = require('../config/URL');
require("dotenv").config({ path: "../config/.env" });

module.exports = {
    getList: async (req, res) => {
        try {
            const media = await Watchlist.find({ user: req.user.id, title: 'watchlist' }).lean();
            console.log(media)
            res.render("watchlist.ejs", { watchlist: media[0], imageURL: IMAGE_URL });
        }catch(err){
            console.log(err)
        }
    },

    add: async (req, res) => {
        console.log(req.body)
        try {
            await Watchlist.findOneAndUpdate({ user: req.user.id, title: 'watchlist'}, {
              $push: {media: {
                id: req.body.id,
                title: req.body.title,
                poster_path: "/" + req.body.image,
                mediaType: req.body.type,
              }},
            },
            {
              upsert: true,
            })
            // await Media.create({
            //   watchlist: req.user.id,
            //   id: req.body.id,
            //   title: req.body.title,
            //   poster_path: "/" + req.body.image,
            //   mediaType: req.body.type,
            // });
            console.log("item added");
          } catch (err) {
            console.log(err);
          }
    }
};
