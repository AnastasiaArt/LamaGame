export class Controls {
    constructor() {
        this.jump = false;
        this.down = false;
        document.addEventListener('mousedown', (event) => this.update(event, true));
    }

    update(event) {
        event.preventDefault();
        event.stopPropagation();
    }
}
