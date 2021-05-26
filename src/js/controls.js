export class Controls {
    constructor() {
        this.jump = false;
        this.down = false;
        this.keyMap = new Map([
            [40, 'down'], [32, 'jump'], [13, 'enter']
        ]);
        document.addEventListener('touchstart', (event) => this.update(event, true));
        document.addEventListener('touchend', (event) => this.update(event, false));
    }

    update(event, pressed) {
            this.jump = pressed;
            console.log(this.jump)
    }
}
