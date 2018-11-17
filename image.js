export class Image {

    constructor(fileName) {
        this.fileName = fileName;
    }

    show() {
        this.htmlElement = document.createElement('img');
        this.htmlElement.setAttribute('src', this.fileName);
        this.htmlElement.setAttribute('class', `images__image`);
        this.htmlElement.addEventListener('click', () => this.isFavourite() ? this.unmarkAsAFavourite() : this.markAsAFavourite());
        this.isFavourite() ? this.markAsAFavourite() : this.unmarkAsAFavourite();
        document.getElementById('images').appendChild(this.htmlElement);
    }

    unmarkAsAFavourite() {
        this.favourite = false;
        this.htmlElement.classList.remove('image--favourite');
    }

    markAsAFavourite() {
        this.favourite = true;
        this.htmlElement.classList.add('image--favourite');
    }

    isFavourite() {
        return this.favourite;
    }
}