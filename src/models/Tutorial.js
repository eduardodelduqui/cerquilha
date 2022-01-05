export default class Tutorial {
    constructor(author='',
                title='',
                description='',
                content='',
                imageUrl='',
                imageDescription='',
                date='',
                totalFavorite='',
                userId=5) {
        this.author = author;
        this.title = title;
        this.description = description;
        this.content = content;
        this.imageUrl = imageUrl;
        this.imageDescription = imageDescription;
        this.date = date;
        this.totalFavorite = totalFavorite;
        this.userId = userId;
    }
}