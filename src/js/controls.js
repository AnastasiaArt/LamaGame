export class Controls {
    constructor() {
        this.jump = false;
        this.down = false;
        this.keyMap = new Map([
            [40, 'down'], [32, 'jump'], [13, 'enter']
        ]);
        document.addEventListener('keydown', (event) => this.update(event, true));
        document.addEventListener('keyup', (event) => this.update(event, false));
    }

    update(event, pressed) {
        if (this.keyMap.has(event.keyCode)) {
            event.preventDefault();
            event.stopPropagation();
            this[this.keyMap.get(event.keyCode)] = pressed;
        }
    }
}
