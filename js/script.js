const artistSlideGallery = document.querySelector('.artists-gallery .slides'); //контейнер для галереї
const artistSlides = artistSlideGallery.querySelectorAll('div'); //контейнер для слайдів галереї
const artistThumbnailContainer = document.querySelector('.artists-gallery .thumbnails'); //контейнер для кружків
const artistSlideWidth = 345; //ширина одного слайду

const imageSlideGallery = document.querySelector('.about-image-swiper .slides'); //контейнер для галереї
const imageSlides = imageSlideGallery.querySelectorAll('div'); //контейнер для слайдів галереї
const imageThumbnailContainer = document.querySelector('.about-image-swiper .thumbnails'); //контейнер для кружків
const imageSlideWidth = 375; //ширина одного слайду

//виявлення екрану мобільного пристрою
function detectMob() {
    return (window.innerWidth <= 480);
}

//відкривання меню навіагації
function openNav() {
    document.getElementById("myNav").style.width = "100%"
    document.getElementById("myNav").style.height = "100%";
}

//закривання меню навіагації на мобільному пристрої
function closeNav() {
    if (detectMob()) {
        document.getElementById("myNav").style.width = "0%";
    }
}

//оновлення елемента .thumbnails відповідно до позиції прокручування
function highThumbnail(slideGallery, container, width) {
    container
        .querySelectorAll('div.highlighted') //отримання виділених кружків
        .forEach(el => el.classList.remove('highlighted')); //видалення класу для виділених кружків
    const index = Math.floor(slideGallery.scrollLeft / width); //scrollLeft - кількість пікселів, на яку вміст елемента прокручується від його лівого краю
                                                                  //ділимо це значення на ширину - отримуємо потрібний індекс
    container
        .querySelector(`div[data-id="${index}"]`) //отримання кружка з потрібним індексом
        .classList.add('highlighted'); //додавання класу для виділення потрібного кружка
}

//прокручування галереї до заданого елемента
function scroll(el, slideGallery, width) {
    const index = parseInt(el.dataset.id, 10); //оскільки атрибути строкові, треба перевести в int
    slideGallery.scrollTo(index * width, 0); //прокрутка до вказаних координат
}

//надавання кожному кружку атрибуту data-id з індексом слайду
imageThumbnailContainer.innerHTML += [...imageSlides]
    .map((slide, i) => `<div data-id="${i}"></div>`)
    .join('');

//обробник події 'click' для кожного кружка
imageThumbnailContainer.querySelectorAll('div').forEach(el => {
    el.addEventListener('click', () => scroll(el, imageSlideGallery, imageSlideWidth));
});

//надавання кожному кружку атрибуту data-id з індексом слайду
artistThumbnailContainer.innerHTML += [...artistSlides]
    .map((slide, i) => `<div data-id="${i}"></div>`)
    .join('');

//обробник події 'click' для кожного кружка
artistThumbnailContainer.querySelectorAll('div').forEach(el => {
    el.addEventListener('click', () => scroll(el, artistSlideGallery, artistSlideWidth));
});

//обробник події 'scroll'
imageSlideGallery.addEventListener('scroll', () => highThumbnail(imageSlideGallery, imageThumbnailContainer, imageSlideWidth));
//виклик функції для дефолтного виділення кружка
highThumbnail(imageSlideGallery, imageThumbnailContainer, imageSlideWidth);

//обробник події 'scroll'
artistSlideGallery.addEventListener('scroll', () => highThumbnail(artistSlideGallery, artistThumbnailContainer, artistSlideWidth));
//виклик функції для дефолтного виділення кружка
highThumbnail(artistSlideGallery, artistThumbnailContainer, artistSlideWidth);