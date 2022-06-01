const Post = require('../models/modelPost')

exports.createPost = async (req, res) => {
    const { title, description, img_url, timestamps, author } = req.body

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

exports.findManyPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: error })    
    }
}

exports.findOnePost = async (req, res) => {
    const id = req.params.id
    
    try {
        const post = await Post.findOne({_id: id})
        
        if(!post) {
            res.status(422).json({ message: 'Post não encontrado' })
            return
        }

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: error})
    }
}