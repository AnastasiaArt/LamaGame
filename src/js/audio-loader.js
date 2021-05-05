export class AudioLoader {
    constructor(audioFiles) {
        this.audioFiles = audioFiles;
        this.audios = {};
    }

    async load() {
        for (let name in this.audioFiles) {
            if (this.audioFiles.hasOwnProperty(name)) {
                await this.loadAudio(name, this.audioFiles[name]);
            }
        }
    }

    loadAudio(name, src) {
        const audio = new Audio();
        this.audios[name] = audio;
        audio.src = src;
        audio.load();
    }
}
