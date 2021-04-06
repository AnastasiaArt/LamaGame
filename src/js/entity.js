import {Vector} from './vector.js';

export default class Entity {
    constructor() {
        this.pos = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
    }
}
