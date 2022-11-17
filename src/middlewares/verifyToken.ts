import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader!.split(' ')[1]
        const decoded = jwt.verify(token, `${process.env.TOKEN_SECRET}`)
        next()
    } catch (error) {
        res.status(401)
    }
}

export default verifyAuthToken;