export class Image {

    constructor(id, fileName, isFavourite) {
        this.id = id;
        this.fileName = fileName;
        this.favourite = isFavourite;
    }

    show() {
        this.htmlElement = document.createElement('img');
        this.htmlElement.setAttribute('src', this.fileName);
        this.htmlElement.setAttribute('class', `images__image`);
        this.htmlElement.addEventListener('click', () => this.isFavourite() ? this.unmarkAsAFavourite() : this.markAsAFavourite());
        this.isFavourite() ? this.showAsAFavourite() : true;
        document.getElementById('images').appendChild(this.htmlElement);
    }

    unmarkAsAFavourite() {
        this.favourite = false;
        fetch(`http://localhost:3000/photos/${this.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({isFavourite: false})
        });
        this.showAsNotFavourite();
    }

    showAsNotFavourite() {
        this.htmlElement.classList.remove('image--favourite');
    }

    markAsAFavourite() {
        this.favourite = true;
        fetch(`http://localhost:3000/photos/${this.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({isFavourite: true})
        });
        this.showAsAFavourite();
    }

    showAsAFavourite() {
        this.htmlElement.classList.add('image--favourite');
    }

    isFavourite() {
        return this.favourite;
    }
}