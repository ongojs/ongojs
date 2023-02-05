const Article = require('./app/models/Article')

const article = new Article

// article
//  .create({
//     title: 'Hello world',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ',
//     author: 'Jane Doe',
//     tags: ['one', 'two', 'three'],
//     comments: [
//         {
//             author: 'Jane Doe',
//             content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ',
//             tags: ['one', 'two', 'three'],
//         }]
//  })

//  article.on('create', console.log)
//  article.on('create-error', console.log)

article.all()
article.on('all', console.log)
article.on('all-error', console.log)