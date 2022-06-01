const Post = require('../models/modelPost')

exports.createPost = async (req, res) => {
    const { title, description, img_url, author } = req.body

    if (!title) {
        res.status(422).json({ error: 'O título é obrigatório!' })
        return
    }
    if (!description) {
        res.status(422).json({ error: 'A descrição é obrigatório!' })
        return
    }
    if (!author) {
        res.status(422).json({ error: 'O autor é obrigatório!' })
        return
    }

    const post = {
        title,
        description, 
        img_url, 
        timestamps, 
        author
    }

    try {
        await Post.create(post)
        res.status(201).json({ message: 'Post criado com sucesso'})
    } catch (error) {
        res.status(500).json({ error: error })
    }
}