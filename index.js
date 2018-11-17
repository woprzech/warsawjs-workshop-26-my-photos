import {Image} from './image';
import butyIMG from './images/warsawjs.png';
import bydgoszczIMG from './images/confront.png';

console.log('warsawJS workshop');


let fileInput = document.getElementById('file-input');
fileInput.onchange = () => {
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            allImages.push(new Image(e.target.result));
            showedImages = allImages;
            render();
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
};

document.getElementById('show-favourites').addEventListener('click', () => {
    showedImages = allImages.filter(image => image.isFavourite());
    render()
});
document.getElementById('sort-images').addEventListener('click', () => {
    showedImages.sort((i1, i2) => i1.isFavourite() && i2.isFavourite() ? 0 : i1.isFavourite() ? -1 : 1);
    render();
});

const allImages = [new Image(butyIMG), new Image(bydgoszczIMG)];
let showedImages = allImages;

function render() {
    document.getElementById('images').innerHTML = '';
    showedImages
        .forEach((image) => image.show());
}

render(allImages);

