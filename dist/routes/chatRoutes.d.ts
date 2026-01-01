declare const router: import("express-serve-static-core").Router;
/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Envia uma mensagem para a IA generativa (Gemini)
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Olá, pode me dizer os serviços da FuturoTec?"
 *     responses:
 *       200:
 *         description: Resposta da IA generativa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 reply:
 *                   type: string
 *                   example: "Claro! Aqui está um modelo de e-mail..."
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
export default router;
//# sourceMappingURL=chatRoutes.d.ts.map