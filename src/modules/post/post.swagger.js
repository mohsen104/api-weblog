/**
 * @swagger
 * tags:
 *  name: Post
 *  description: Post Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreatePost:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  slugs:
 *                      type: array
 *                      items:
 *                          type: string
 *                  image:
 *                      type: string
 *                      format: binary
 *          EditPost:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  slugs:
 *                      type: array
 *                      items:
 *                          type: string
 *                  image:
 *                      type: string
 *                      format: binary
 *          AddComment:
 *              type: object
 *              required:
 *                  -   description
 *                  -   rate
 *              properties:
 *                  description:
 *                      type: string
 *                  rate:
 *                      type: number
 *          AnswerComment:
 *              type: object
 *              required:
 *                  -   description
 *              properties:
 *                  description:
 *                      type: string
 */

/**
 * @swagger
 *
 * /post/create:
 *  post:
 *      summary: create a post with user
 *      tags:
 *          -   Post
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/CreatePost'
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /post/edit/{id}:
 *  put:
 *      summary: edit a post
 *      tags:
 *          -   Post
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/EditPost'
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /post/add-comment/{id}:
 *  post:
 *      summary: add commnet for a post
 *      tags:
 *          -   Post
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/AddComment'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AddComment'
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /post/answer-comment/{id}:
 *  post:
 *      summary: answer for a commnet
 *      tags:
 *          -   Post
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/AnswerComment'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AnswerComment'
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /post/{id}:
 *  delete:
 *      summary: delete one post
 *      tags:
 *          -   Post
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /post/{id}:
 *  get:
 *      summary: get one post details
 *      tags:
 *          -   Post
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /post/all:
 *  get:
 *      summary: get all posts
 *      tags:
 *          -   Post
 *      parameters:
 *          - in: query
 *            name: page
 *            schema:
 *              type: integer
 *            description: The numbers of page items to return
 *          - in: query
 *            name: limit
 *            schema:
 *              type: integer
 *            description: The numbers of items to return
 *          - in: query
 *            name: sort
 *            schema:
 *              type: string
 *            description: The text of items sorted to return
 *          - in: query
 *            name: search
 *            schema:
 *              type: string
 *            description: The text of search in items
 *          - in: query
 *            name: from
 *            schema:
 *              type: string
 *            description: The text of from date of create post
 *          - in: query
 *            name: to
 *            schema:
 *              type: string
 *            description: The number of to date of create post
 *          - in: query
 *            name: slug
 *            schema:
 *              type: string
 *            description: The text of search in slug
 *      responses:
 *          200:
 *              description: success
 */