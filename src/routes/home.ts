import { Router, Request, Response } from "express";
import { deleteByEmail, getAll, getByEmail, updateByEmail } from "../models/crud"

const router = Router();

// router.get('', getByEmail, (req, res) => {
//     res.send('Lista de usuarios');
// })

/**
 * @swagger
 * /home:
 *   get:
 *     summary: Get user list
 *     description: Returns a message indicating that this is the user list.
 *     tags: [Home]  
 *     responses:
 *       200:
 *         description: Successful operation. Returns the message "User list".
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: User list
 *       500:
 *         description: Internal server error.
 */
router.get('', getAll, (req, res) => {
    res.send('Lista de usuarios');
});

/**
 * @swagger
 * /home:
 *   delete:
 *     summary: Delete user by email
 *     description: Deletes a user from the database based on the provided email.
 *     tags: [Home] 
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         description: The email of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation. Returns a confirmation message.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: User deleted
 *       400:
 *         description: Bad request. The user may not exist or the email is invalid.
 *       500:
 *         description: Internal server error.
 */
router.delete('', deleteByEmail, (req, res) => {
    res.send('User deleted');
});

/**
 * @swagger
 * /home:
 *   put:
 *     summary: Update user email
 *     description: Updates a user's name and/or status based on the provided email.
 *     tags: [Home] 
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         description: The email of the user to update.
 *         schema:
 *           type: string
 *           example: user@example.com
 *       - in: query
 *         name: name
 *         required: false
 *         description: The new name of the user.
 *         schema:
 *           type: string
 *           example: New Name
 *       - in: query
 *         name: status
 *         required: false
 *         description: The new status of the user.
 *         schema:
 *           type: string
 *           example: active
 *     responses:
 *       200:
 *         description: Successful operation. Returns the updated user data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *                 status:
 *                   type: string
 *       204:
 *         description: No content. The user was updated successfully.
 *       400:
 *         description: Bad request. The user may not exist or the email is invalid.
 *       500:
 *         description: Internal server error.
 */
router.put('', updateByEmail, (req, res) => {
    res.send('Email updated');
});


export default router;
