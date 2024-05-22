const db = require('../../models');
const response = require('../../res/response');


exports.getadminByid = async (req, res) => {
    try{
        const admin = await db.admin.find();
        if(!admin) return response(404, res, 'error', 'admin not found');
        response(200, res, admin, 'Success get admin');

    }catch(err){
        response(500, res, 'error', err.message || 'Some error occurred while get admin.');
    }
};


exports.postadmin = async (req, res) => {
    try{
        const {name, nik, nohp, userName, password} = req.body;
        const countadmin = await db.admin.countDocuments();
        if(countadmin >= 2){
            return response(400, res, 'error', 'admin already full');
        }
        const newadmin = new db.admin({
            name,
            nik,
            nohp,
            password
        });
        await newadmin.save();
        return response(200, res, newadmin, 'Success post admin');
    }catch(err){
        response(500, res, 'error', err.message || 'Some error occurred while post admin.');
    }
}
