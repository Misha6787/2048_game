const container = document.querySelector('.container');
// block
// fill__block
// empty__block

let countBlocks = 16 - 1;
let arrayBlocks = [];
let oldArrayBlocks = arrayBlocks.sort();
const arrowBtns = ['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowBottom'];
let ifStart = true;

for (let i = 0; i <= countBlocks; i++) {
    arrayBlocks.push({
        index: i,
        value: 0
    })
}

// [
//     0,  1,  2,  3,
//     4,  5,  6,  7,
//     8,  9,  10, 11,
//     12, 13, 14, 15
// ]

const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    arr1.forEach((item, index) => {
        if (item.index !== arr2[index].index) return false;
    })
    return true;
}

const render = () => {
    container.innerHTML = '';
    arrayBlocks.forEach(item => {
        if (item.value > 0) {
            container.insertAdjacentHTML('beforeend',`
                <div class="block">
                    <div class="fill__block">${item.value}</div>
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
}

const randomNumbers = () => {
    const arrayForRandom = [];

    if (!arraysEqual(arrayBlocks, oldArrayBlocks) || ifStart) {
        arrayBlocks.forEach((item, index) => {
            if (item.value === 0) {
                arrayForRandom.push(index);
            }
        })

        for (let i = 0; i < 2; i++) {
            const randomIndex = Math.floor(Math.random(0, arrayForRandom.length) * 10);
            try {
                arrayBlocks[arrayForRandom[randomIndex]].value = 2;
            } catch {}
        }
        oldArrayBlocks = arrayBlocks.sort();
    }
    ifStart = false;

    render();
}

const verticalMove = () => {

}

// arrayBlocks[4].value = 2;
// arrayBlocks[7].value = 2;

const horizontalMove = move => {

    arrayBlocks.forEach((item, index) => {
        if (item.value !== 0) {
            const strokeNum = Math.floor(index / 4);
            let strokeArr = [];
            arrayBlocks.forEach((item, index) => {
                if (Math.floor(index / 4) === strokeNum) {
                    strokeArr.push({
                        index: item.index,
                        value: item.value
                    });
                }
            })

            strokeArr.sort((a, b) => b.value-a.value);

            if (move === 'left') {
                strokeArr.forEach((item, index)=> {
                    for (let i = 0; i < index; i++) {
                        if (item.value > 0 &&
                            index !== -1 &&
                            strokeArr[index - 1].value === item.value) {
                            strokeArr[index - 1].value = strokeArr[index - 1].value + item.value;
                            item.value = 0;
                        }
                    }
                })
            } else if (move === 'right') {
                strokeArr.forEach(item => {

                })
            }

            let count = 0;
            arrayBlocks.forEach((item, indexArr) => {
                if (Math.floor(indexArr / 4) === strokeNum) {
                    item.index = strokeArr[count].index;
                    item.value = strokeArr[count].value;
                    count++;
                }
            })

        }
    })
}

const moveBlocks = event => {
    switch (event.code) {
        case 'ArrowUp':

            break;
        case 'ArrowLeft':
            horizontalMove('left');
            break;
        case 'ArrowRight':
            horizontalMove('right');
            break;
        case 'ArrowBottom':

            break;
    }

    if (arrowBtns.includes(event.code)) {
        randomNumbers();
    }

    render();

    // console.log(event.code);
}

document.addEventListener('keydown', moveBlocks)

render();