const container = document.querySelector('.container');
const arrowBtns = ['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowBottom'];
let arrBlocks = [
    // [4,4,2,2],
    // [2,2,4,4],
    // [2,4,0,4],
    // [2,0,2,4]
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]

// Универсальная функция сортировки плит
const slide = (row, indexRow) => {
    let dubplicatIndex = -1;
    row.forEach((column, index) => {
        if (column > 0) {
            for (let i = index; i > 0; i--) {
                if (row[i - 1] === 0) {
                    row[i - 1] = column;
                    row[i] = 0;
                    const element = document.querySelector(`[data-index='${indexRow + ' ' + i}']`);
                    if (element) element.dataset.index = `${indexRow} ${i - 1}`;

                } else if (row[i - 1] === column && i - 1 !== dubplicatIndex) {
                    row[i - 1] += column;
                    row[i] = 0;
                    dubplicatIndex = i - 1;
                    const element = document.querySelector(`[data-index='${indexRow + ' ' + i}']`)
                    return;
                } else if (row[i - 1] > 0 && row[i - 1] !== column) return;
            }
        }
    })
}

// Создание массива с колонками
const createVerticalArr = () => {
    let arrBlocksVert = [[],[],[],[]];
    arrBlocks.forEach(row => {
        row.forEach((item, index) => {
            arrBlocksVert[index].push(item);
        })
    })
    return arrBlocksVert;
}

// Движение влево
const slideLeft = () => {
    arrBlocks.forEach((row, index) => {
        slide(row, index);
    })
};

// Движение вправо
const slideRight = () => {
    arrBlocks.forEach((row, index) => {
        row.reverse();
        slide(row, index);
        row.reverse();
    })
};

// Движение вверх
const slideUp = () => {
    // Создаем массив колонок
    let arrBlocksVert = createVerticalArr();

    arrBlocksVert.forEach((column, index) => {
        slide(column, index);

        // Дублируем все изменения в основной массив что бы рендер мог вывести новые данные
        column.forEach((item, i) => {
            arrBlocks[i][index] = item;
        })
    })
};

// Движение вниз
const slideDown = () => {
    // Создаем массив колонок
    let arrBlocksVert = createVerticalArr();

    arrBlocksVert.forEach((column, index) => {
        column.reverse();
        slide(column, index);
        column.reverse();

        // Дублируем все изменения в основной массив что бы рендер мог вывести новые данные
        column.forEach((item, i) => {
            arrBlocks[i][index] = item;
        })
    })
}

// Проверка на заполненность полей
const isFull = () => {
    let full = false;
    arrBlocks.forEach(row => {
        row.forEach(column => {
            if (column === 0) {
                full = true;
            }
        })
    })
    return full;
}

// Создание рандомных плит на поле
const randomNum = () => {
    for (let i = 0; i < 1; i++) {
        if (isFull()) {
            let found = false;
            while (!found) {
                const row = Math.floor(Math.random() * 4);
                const column = Math.floor(Math.random() * 4);
                if (arrBlocks[row][column] === 0) {
                    arrBlocks[row][column] = 2;
                    found = true;
                    container.insertAdjacentHTML('beforeend',`
                    <div class="block fill__block" data-index="${row + ' ' + column}">
                        <div class="block__text x2">2</div>
                    </div>`);
                }
            }
        }
    }
};

// Обработка нажатий на кнопки и вызов соответствующих функций
const moveBlocks = event => {
    switch (event.code) {
        case 'ArrowUp':
            slideUp();
            break;
        case 'ArrowLeft':
            slideLeft();
            break;
        case 'ArrowRight':
            slideRight();
            break;
        case 'ArrowDown':
            slideDown();
            break;
    }

    if (arrowBtns.includes(event.code)) {
        //randomNum();
    }

    render();
};

// Вывод данных на страницу
const render = () => {
    const blocks = document.querySelectorAll('.block.fill__block');

    if (blocks) blocks.forEach(item => {
        const indexes = item.getAttribute('data-index'),
            top = indexes[0],
            left = indexes[2];

        item.className = `block fill__block indexex__${top}-${left}`;

        // item.style.top = `calc(15px * ${top + 1} + 106px * ${top});`


        // item.style.left = `calc(15px * ${left + 1} + 106px * ${left});`

        console.log('complete render')
    })

    //console.log(blocks[0].getAttribute('data-index')[2])


    // for (let i = 0; i < blocks.length; i++) {
    //     const indexes = blocks[i].getAttribute('data-index'),
    //         top = indexes[0],
    //         left = indexes[2];
    //
    //     console.log(15 * (left + 1) + 106 * left);
    //
    //     blocks[i].style.top = `calc(15px * ${top + 1} + 106px * ${top});`
    //     blocks[i].style.left = `calc(15px * ${left + 1} + 106px * ${left});`
    //
    //     console.log('complete render')
    // }

    // container.innerHTML = '';
    // arrBlocks.forEach(row => {
    //     const rowItem = document.createElement('div');
    //     rowItem.classList.add('row');
    //     container.insertAdjacentElement('beforeend', rowItem);
    //     row.forEach((itemRow, index) => {
    //         if (itemRow > 0) {
    //             rowItem.insertAdjacentHTML('beforeend',`
    //             <div class="block">
    //                 <div class="fill__block x${itemRow}">${itemRow}</div>
    //             </div>
    //         `);
    //         } else {
    //             rowItem.insertAdjacentHTML('beforeend',`
    //             <div class="block">
    //                 <div class="empty__block"></div>
    //             </div>
    //         `);
    //         }
    //     })
    // })
};

// Создание первых плит для начала игры
randomNum();
// Первый вывод плит на странице
render();

// Обработка события нажатия на клавиши
document.addEventListener('keydown', moveBlocks);