const container = document.querySelector('.container');
const arrowBtns = ['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowBottom'];
let arrBlocks = [
    [2,2,0,0],
    [0,0,2,2],
    [2,0,2,0],
    [0,0,0,0]
]

const slideLeft = () => {
    arrBlocks.forEach(row => {
        row.forEach((column, index) => {
            if (column > 0) {
                for (let i = 0; i < 4; i++) {
                    if (index >= 0 &&
                        column === row[i - 1]
                    ) {
                        console.log('+');
                        row[index] += row[i - 1];
                    }
                }
            }
        })
        console.log(row)
    })
};

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

            break;
        case 'ArrowBottom':

            break;
    }

    if (arrowBtns.includes(event.code)) {
        randomNum();
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