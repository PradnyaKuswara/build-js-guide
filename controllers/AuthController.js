import { PrismaClient } from "@prisma/client";
import { loginValidation } from "../validations/AuthValidation.js"; 
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async (req, res) => {
    const { error } = loginValidation.validate(req.body);

    if(error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    const user = await prisma.users.findFirst({
        where: {
            email: req.body.email
        }
    });

    if(!user) {
        return res.status(400).json({
            message: 'email not found'
        });
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);

    if(!validPass){
        return res.status(400).json({
            message: 'password not match'
        });
    }

    const payload = {
        id: user.id,
        email: user.email,
        image: user.image   
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({
        user,
        message: 'login success',
        token
    });
}