const Media = require('../models/media')
require("dotenv").config({ path: "../config/.env" });

module.exports = {
    getList: async (req, res) => {
        try {
            const media = await Media.find({ user: req.user.id }).sort({ createdAt: "desc" }).lean();
            res.render("watchlist.ejs", { media: media });
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
              poster_path: req.body.image,
              mediaType: req.body.type,
            });
            console.log("item added");
            // location.reload(true);
          } catch (err) {
            console.log(err);
          }
    }
};
