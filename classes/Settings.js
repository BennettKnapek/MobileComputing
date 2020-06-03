// Contains all settings that can be set in the app
class Settings {
    constructor (bpm) {
        this.target_bpm = bpm;
    }
}

const Crnt_Settings = new Settings(100);

export default Crnt_Settings