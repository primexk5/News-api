require('dotenv').config();
const express = require("express");

const app = express();

app.use(express.json());
const news = [];

function generateBookId(array) {
    return array.length ? array[array.length - 1].id + 1 : 1;
}

// Create post
app.post('/api/post', (req, res) => {
    const { content, title, author, description, source, images } = req.body;

    if (!content || !title || !author || !description || !source || !images) {
        return res.status(400).send({
            success: false,
            message: 'All fields are required',
        });
    }

    const result = news.find((item) => item.title === title);
    if (result) {
        return res.status(409).send({
            success: false,
            message: "News with this title already exists",
        });
    }

    const newNews = {
        id: generateBookId(news),
        content,
        title,
        author,
        description,
        source,
        images
    };

    news.push(newNews);
    res.status(201).send({
        success: true,
        message: "News posted successfully",
        data: newNews
    });
});

// get all api 
app.get('/api/get', (req, res) => {
    res.send({
        success: true,
        message: "All news items",
        data: news
    });
});

// get news by id
app.get("/api/news/:id", (req, res) => {
    const { id } = req.params;
    const result = news.find((item) => item.id == id);
    if (result) {
        return res.status(200).send({
            success: true,
            message: "Successfully retrieved news",
            data: result,
        });
    }

    return res.status(404).send({
        success: false,
        message: "News not found",
    });
});

// delete
app.delete('/api/delete/:id', (req, res) => {
    const { id } = req.params;
    const index = news.findIndex((item) => item.id == id);

    if (index !== -1) {
        news.splice(index, 1);
        res.send({
            success: true,
            message: "News item deleted successfully"
        });
    } else {
        res.status(404).send({
            success: false,
            message: "News item not found"
        });
    }
});

app.get('/', (req, res) => {
    res.send({
        message: "Welcome to today's news"
    });
});

// update 
app.patch('/api/update:id', (req, res) => {
    const { id } = req.params;
    const { content, title, author, description, source, images } = req.body;

    const newsItem = news.find((item) => item.id == id);

    if (newsItem) {
        if (content !== undefined) newsItem.content = content;
        if (title !== undefined) newsItem.title = title;
        if (author !== undefined) newsItem.author = author;
        if (description !== undefined) newsItem.description = description;
        if (source !== undefined) newsItem.source = source;
        if (images !== undefined) newsItem.images = images;

        res.send({
            success: true,
            message: "News item updated successfully",
            data: newsItem
        });
    } else {
        res.status(404).send({
            success: false,
            message: "News item not found"
        });
    }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
