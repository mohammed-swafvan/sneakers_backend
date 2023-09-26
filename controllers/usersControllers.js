const { response } = require('express');
const User = require('../models/User');

module.exports = {
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);

            const {password, __v, updatedAt, createdAt, ...userData} = user._doc;

            response.status(200).json(userData);
        } catch (error) {
            response.status(500).json(error);
        }
    },

    delete: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.user.id);
            response.status(200).json("User successfully deleted");
        } catch (error) {
            response.status(500).json(error);
        }
    },
}