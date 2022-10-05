const Media = require('../models/media')
const { IMAGE_URL } = require('../config/URL');
require("dotenv").config({ path: "../config/.env" });

module.exports = {
    getList: async (req, res) => {
      console.log(IMAGE_URL)
        try {
            const media = await Media.find({ user: req.user.id }).sort({ createdAt: "desc" }).lean();
            res.render("watchlist.ejs", { media: media, imageURL: IMAGE_URL });
        }catch(err){
            console.log(err)
        }
    },

    add: async (req, res) => {
        console.log(req.body)
        try {
            await Media.create({
              user: req.user.id,
              id: req.body.id,
              title: req.body.title,
              poster_path: "/" + req.body.image,
              mediaType: req.body.type,
            });
            console.log("item added");
          } catch (err) {
            console.log(err);
          }
    }
};
