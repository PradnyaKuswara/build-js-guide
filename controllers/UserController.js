import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { createUserValidation, updateUserValidation,  fileValidation } from "../validations/UserValidation.js";
import fs from 'fs';
import path from "path";

const prisma = new PrismaClient();

export const getUsers = async (req,res) => {
    try {
        const users = await prisma.users.findMany();

        if(users.length > 0) {
            return res.status(200).json({
                users: users,
                message: 'success get all data users'
            });
        }
        return res.status(400).json({
        users: null,
        message: "data users null",
        });
        
    } catch (error) {
        return res.status(500).json({
            message: 'failed get all data users'
        });
    }
}

export const createUser = async (req, res) => {
    const { error } = createUserValidation.validate(req.body);

    if(error) {
        const imagePath = path.join(process.cwd(), `public/images/${req.body.image}`);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    const request = req.body;

    const imagePath = `${process.env.APP_URL}/assets/images/${request.image}`;
    const hashedPassword = await bcrypt.hash(request.password,10);

    try {
        const user = await prisma.users.create({
            data: {
                name: request.name,
                email: request.email,
                password: hashedPassword,
                image: imagePath,
            },
        });

        return res.status(201).json({
            user,
            message: 'success create user'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const getUserbyId = async (req,res) => {
    const { id } = req.params;

    try {
        const user = await prisma.users.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        return res.status(200).json({
            user,
            message: 'success get user'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const updateUser = async (req,res) => {
    const { error } = updateUserValidation.validate(req.body);
    const fileError = fileValidation(req.file);

    if (error) {
        if(!fileError) {
            const requestImage = path.join(process.cwd(),`public/images/${req.body.image}`);
            fs.unlink(requestImage, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            });
        }
        
        return res.status(400).json({
            message: error.details,
        });
    }

    const {id} = req.params;
    const request = req.body;

    const user = await prisma.users.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    const hashedPassword = await bcrypt.hash(request.password, 10);
    let imagePath = user.image;

    if (!fileError) {
        const oldPath = user.image.split('/')[user.image.split('/').length - 1];
        const oldImage = path.join(process.cwd(),`public/images/${oldPath}`);
        fs.unlink(oldImage, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });

        imagePath = `${process.env.APP_URL}/assets/images/${req.body.image}`;
    }

    try {
        const newUser = await prisma.users.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name: request.name,
                email: request.email,
                password: hashedPassword,
                image: imagePath,
            }
        });
        return res.status(201).json({
            newUser,
            message: 'success update user'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const deleteUser = async (req,res) =>  {
    const {id} = req.params;

    try {
        const user = await prisma.users.delete({
            where: {
                id: parseInt(id),
            } 
        });  
        return res.status(200).json({
            user,
            message: 'success delete user'
        });  
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


