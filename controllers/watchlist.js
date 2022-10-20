const Watchlist = require('../models/Watchlist');
const { IMAGE_URL } = require('../config/URL');
const { response } = require('express');
require("dotenv").config({ path: "../config/.env" });

module.exports = {
    getList: async (req, res) => {
      if (req.user) {
        try {
            const media = await Watchlist.find({ user: req.user.id, title: 'watchlist' }).lean();
            res.render("watchlist.ejs", { watchlist: media[0], imageURL: IMAGE_URL });
        }catch(err){
            console.log(err)
        }
      } else {
        res.render("watchlist.ejs", {watchlist: 'media'});
      }
    },

    updateList: async (req, res) => {
        try {
            if (req.user) {
              const watchlist = await Watchlist.findOne({ user: req.user, title: 'watchlist' });
              const media = watchlist.media.find(media => media.id === req.body.id && media.mediaType === req.body.type);
              let query = ''
              console.log(req.body.id, req.body.type, 'asdfkjasdlkfkjalds;kjas;dlfkj')
              console.log(media)
              if (media != null) {
                await Watchlist.updateOne({user: req.user, title: 'watchlist'},{
                  $pull: { media: {
                    id: req.body.id,
                    mediaType: req.body.type,
                  }}
                })
              } else {
                await Watchlist.updateOne({ user: req.user, title: 'watchlist'}, {
                  $push: { media: {
                    id: req.body.id,
                    title: req.body.title,
                    poster_path: req.body.image,
                    mediaType: req.body.type,
                  }}
                });
              }
            }
            
            res.send()
          } catch (err) {
            console.log(err);
          }
    }
};
