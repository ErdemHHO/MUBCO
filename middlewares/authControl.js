

const jwt = require('jsonwebtoken')
const Kullanici=require('../models/kullaniciModel')

//BURADA authControl MiddleWarei Oluşturdum Fakat Kullanmıyorum


const authControl=async(req,res,next)=>{
    const {authorization}=req.headers;

    if(!authorization){
        return res.status(401).json({msg:'Yetkilendirme Token\'ı Gerekli'})
    }

    const token=authorization.split(' ')[1];

    try {
        const {_id}=jwt.verify(token,process.env.SECRET_KEY);

        req.kullanici=await Kullanici.findOne({_id}).select('_id')
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({msg:'İstek Yetkili Değil'});
    }
}

module.exports=authControl;