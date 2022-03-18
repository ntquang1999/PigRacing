import RacingConfig from "./RacingConfig";

const { ccclass, property } = cc._decorator;


interface Event {
    time: number;
    type: number;
}

@ccclass
export default class Generator extends cc.Component {
    animalSpeed = [];

    animalBaseSpeed = [];

    animalPosition = [0, 0, 0, 0, 0, 0];

    event: Event[][] = [
        [], [], [], [], [], []
    ];

    fixedDeltatime = 0.02;
    oneSecondCountDeltatime = 50;

    Valid = false;

    counting = false;

    @property(cc.Label)
    tb: cc.Label = null;

    @property(cc.Node)
    btn: cc.Node = null;

    @property(cc.Node)
    panel: cc.Node = null;

    generate()
    {
        this.tb.node.active = true;
        this.btn.active = false;
        setTimeout(() => {
            this.generateWinner(1, 0, 2);
        }, 500);
        
    }

    generateWinner(id1, id2, id3) {

        let id = new Array(id1, id2, id3);

        if(id[this.max(id)] >= RacingConfig.animalCount)
        {
            console.log("AA");
            this.tb.string = "Thứ tự nhập vào không hợp lệ";
            return;
        }

        while (!this.Valid) {

            this.animalBaseSpeed = [0, 0, 0, 0, 0, 0];
            this.animalPosition = [0, 0, 0, 0, 0, 0];

            this.event[0] = [];
            this.event[1] = [];
            this.event[2] = [];
            this.event[3] = [];
            this.event[4] = [];
            this.event[5] = [];

            for (let i = 0; i < RacingConfig.animalCount; i++) {
                if(RacingConfig.usingFixedBaseSpeed)
                {
                    this.animalBaseSpeed = RacingConfig.baseSpeed;
                }
                else {
                    this.animalBaseSpeed[i] = this.getRandomInt(RacingConfig.baseSpeedRange.lowest, RacingConfig.baseSpeedRange.highest + 1);
                }
                

                for (let k = 0; k < this.getRandomInt(RacingConfig.eventRange.lowest, RacingConfig.eventRange.highest); k++) {
                    let time = this.getRandomInt(1, RacingConfig.maxEventTime);
                    let type = this.getRandomInt(0, RacingConfig.typeCount);
                    if(time >= RacingConfig.maxEventTime - 9) type = 6; 
                    if(time >= RacingConfig.maxEventTime - 8) type = 7; 
                    if(time >= RacingConfig.maxEventTime - 7) type = 8;
                    if(time >= RacingConfig.maxEventTime - 6) type = 9;  
                    
                    this.event[i].push({ "time": time, "type": type });
                }

            };
            this.Valid = this.checkValid(id1, id2, id3, RacingConfig.trackLength);
        }

        RacingConfig.animalBaseSpeed = this.animalBaseSpeed;
        RacingConfig.event = this.event;
        RacingConfig.dataGenerated = true;
        this.panel.active = false;
    }

    checkValid(id1, id2, id3, trackLength) {
        let rank = new Array();
        let i = 0;
        let count = 0;
        this.animalSpeed = new Array(this.animalBaseSpeed[0], this.animalBaseSpeed[1], this.animalBaseSpeed[2], this.animalBaseSpeed[3], this.animalBaseSpeed[4], this.animalBaseSpeed[5]);
        
        while (rank.length < RacingConfig.animalCount) {
            let drawable = false;
            for (let j = 0; j < RacingConfig.animalCount; j++) {

                if (this.animalPosition[this.max(this.animalPosition)] - this.animalPosition[this.min(this.animalPosition)] > RacingConfig.maxDistance) return false;
                this.animalPosition[j] += (this.animalSpeed[j] * this.fixedDeltatime);

                let finished = false;
                rank.forEach(element => {
                    if (element == j) finished = true;
                });
                if (!finished) if (this.animalPosition[j] >= trackLength) {
                    if (!drawable) {
                        rank.push(j);
                        drawable = true;
                    }
                    else return false;
                }

                this.event[j].forEach(element => {
                    if (element.time == i) {

                        this.animalSpeed[j] += RacingConfig.ApplyEvent(element.type);
                        if (this.animalSpeed[j] < RacingConfig.animalSpeedLimit.lowest) this.animalSpeed[j] = RacingConfig.animalSpeedLimit.lowest;
                        if (this.animalSpeed[j] > RacingConfig.animalSpeedLimit.highest) this.animalSpeed[j] = RacingConfig.animalSpeedLimit.highest;
                        element.time = - element.time;
                    }
                });
            }
            count++;
            if (count == this.oneSecondCountDeltatime) { i++; count = 0; }

        }


        return this.checkTop(id1, id2, id3, rank);

    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    min(array) {
        let min = array[0];
        let index = 0;

        for (let i = 0; i < RacingConfig.animalCount; i++) {
            if (array[i] < min) {
                index = i;
                min = array[i];
            }
        }
        return index;
    }

    max(array) {

        let max = array[0];
        let index = 0;

        for (let i = 0; i < RacingConfig.animalCount; i++) {
            if (array[i] > max) {
                index = i;
                max = array[i];
            }
        }
        return index;
    }

    checkTop(id1, id2, id3, rank) {

        if (id1 != rank[0]) return false;
        if (id2 != rank[1]) return false;
        if (id3 == -100) return true;
        if (id3 != rank[2]) return false;

        return true;
    }

}
