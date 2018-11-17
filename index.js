import {Image} from './image';

console.log('warsawJS workshop');

let currentImages;

let fileInput = document.getElementById('file-input');
fileInput.onchange = () => {
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = async (e) =>  {
            const fileName = e.target.result;
            await fetch(`http://localhost:3000/photos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({url: fileName, isFavourite: false})
            });
            render();
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
};

document.getElementById('show-favourites').addEventListener('click', async () => {
    const allImages = await getAllImages();
    currentImages = allImages.filter(image => image.isFavourite());
    renderGallery();

});
document.getElementById('sort-images').addEventListener('click', () => {
    currentImages.sort((i1, i2) => i1.isFavourite() && i2.isFavourite() ? 0 : i1.isFavourite() ? -1 : 1);
    renderGallery();
});


function renderGallery() {
    document.getElementById('images').innerHTML = '';
    currentImages
        .forEach((image) => image.show());
}

async function getAllImages() {
    const response = await fetch('http://localhost:3000/photos');
    const imagesData = await response.json();
    return  imagesData.map(image => new Image(image.id, image.url, image.isFavourite));
};

async function render() {
    currentImages = await getAllImages();

    renderGallery();
}

render();
