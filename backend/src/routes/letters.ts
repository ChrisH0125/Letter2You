import express from 'express'
import { getLetters } from '../controllers/letterController.js'

const router = express.Router()

router.get('/', getLetters)

export default router
