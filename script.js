const container = document.querySelector('.container');
const arrowBtns = ['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowBottom'];
let arrBlocks = [
    [4,4,2,2],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]

const slideLeft = () => {
    arrBlocks.forEach(row => {
        row.forEach((column, index) => {
            if (column > 0) {
                for (let i = index; i > 0; i--) {
                    if (row[i - 1] === 0) {
                        row[i - 1] = column;
                        row[i] = 0;
                    } else if (row[i - 1] === column) {
                        row[i - 1] += column;
                        row[i] = 0;
                        return;
                    } else if (row[i - 1] > 0 && row[i - 1] !== column) return;
                }
            }
        })
    })
};

const slideRight = () => { // исправить баг с построением
    arrBlocks.forEach(row => {
        row.forEach((column, index) => {
            if (column > 0) {
                // console.log(column, index)
                for (let i = index; i < 4; i++) {
                    // console.log(i);
                    if (row[i + 1] === 0) {
                        row[i + 1] = column;
                        row[i] = 0;
                    } else if (row[i + 1] === column) {
                        // console.log(row)
                        // console.log(column)
                        row[i + 1] += column;
                        row[i] = 0;
                        return;
                    } else if (row[i + 1] > 0 && row[i + 1] !== column) return;
                }
            }
        })
    })
}

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

const randomNum = () => {
    for (let i = 0; i < 2; i++) {
        if (isFull()) {
            let found = false;
            while (!found) {
                const row = Math.floor(Math.random() * 4);
                const column = Math.floor(Math.random() * 4);
                if (arrBlocks[row][column] === 0) {
                    arrBlocks[row][column] = 2;
                    found = true;
                }
            }
        }
    }
};

//randomNum();

const moveBlocks = event => {
    switch (event.code) {
        case 'ArrowUp':

            break;
        case 'ArrowLeft':
            slideLeft();
            break;
        case 'ArrowRight':
            slideRight();
            break;
        case 'ArrowBottom':

            break;
    }

    if (arrowBtns.includes(event.code)) {
        //randomNum();
    }

    render();
};

document.addEventListener('keydown', moveBlocks);

const render = () => {
    container.innerHTML = '';
    arrBlocks.forEach(row => {
        row.forEach(itemRow => {
            if (itemRow > 0) {
                container.insertAdjacentHTML('beforeend',`
                <div class="block">
                    <div class="fill__block">${itemRow}</div>
                </div>
            `);
            } else {
                container.insertAdjacentHTML('beforeend',`
                <div class="block">
                    <div class="empty__block"></div>
                </div>
            `);
            }
        })
    })
};

render();