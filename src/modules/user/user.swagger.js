/**
 * @swagger
 * tags:
 *  name: User
 *  description: User Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          ChangeProfile:
 *              type: object
 *              properties:
 *                  fullName:
 *                      type: string
 *                  bio:
 *                      type: string
 *                  profile:
 *                      type: string
 *                      format: binary
 */

/**
 * @swagger
 *
 * /user/change-profile/{id}:
 *  put:
 *      summary: set profile user
 *      tags:
 *          -   User
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/ChangeProfile'
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /user/{id}:
 *  get:
 *      summary: get one user details
 *      tags:
 *          -   User
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: success
 */
