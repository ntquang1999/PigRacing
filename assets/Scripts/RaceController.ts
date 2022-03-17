import Pig from "./Pig";
import RacingConfig from "./RacingConfig";

const { ccclass, property } = cc._decorator;

interface Event {
    time: number;
    type: number;
}

@ccclass
export default class RaceController extends cc.Component {


    @property([cc.Node])
    animal: cc.Node[] = [];

    @property(cc.Camera)
    camera: cc.Camera = null;

    @property(cc.Node)
    Cloud: cc.Node = null;

    @property(cc.Node)
    Grass: cc.Node = null;

    @property(cc.Button)
    beginBtn: cc.Button = null;

    
    animalSpeed = [];

    isRacing = [true, true, true, true, true, true];
    
    animalPosition = [0, 0, 0, 0, 0, 0];

    Valid = false;

    currentTime = 0;

    playing = false;

    finished = 0;

    counting = false;

    data = "";

    rank = [];

    protected start(): void {


        this.getData();
        this.beginBtn.node.on("click", () => this.begin());
    }

    urlParam(name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.search);
        return (results !== null) ? results[1] || 0 : false;
    }

    getData() {
        this.data = this.urlParam("data") + "";
        console.log(this.data);
    }

    begin() {
        if (RacingConfig.dataGenerated && !this.playing) {
            this.playing = true;
            this.beginBtn.node.active = false;
        }
    }

    protected update(dt: number): void {



        this.updateCameraPos();


        if (this.playing) {
            
            this.race(dt);
            
        }
    }

    updateCameraPos() {
        let cameraPos = (this.animalPosition[this.max(this.animalPosition)] + this.animalPosition[this.min(this.animalPosition)]) / 2;

        let screedWidth = cc.visibleRect.width;
        let maxCameraPos = RacingConfig.actualTrackLength - screedWidth / 2;
        let minCameraPos = RacingConfig.mapOffset + screedWidth / 2;

        cameraPos = cameraPos > minCameraPos ? cameraPos : minCameraPos;
        cameraPos = cameraPos > maxCameraPos ? maxCameraPos : cameraPos;

        let oldCameraPos = this.camera.node.x;
        this.camera.node.setPosition(cc.v2(cameraPos, this.camera.node.y));
        this.Grass.x += 0.3 * (cameraPos - oldCameraPos);
        this.Cloud.x += 0.6 * (cameraPos - oldCameraPos);
    }

    race(dt)
    {

        this.animalPosition = [this.animal[0].x, this.animal[1].x, this.animal[2].x, 
                               this.animal[3].x, this.animal[4].x, this.animal[5].x];
            
            if (this.currentTime == RacingConfig.maxTime + 1) this.playing = false;

            if (!this.counting) {
                this.schedule(() => {
                    this.currentTime++;
                }, 1);
                this.counting = true;
                this.animalSpeed = new Array(RacingConfig.animalBaseSpeed[0], RacingConfig.animalBaseSpeed[1], RacingConfig.animalBaseSpeed[2], 
                                             RacingConfig.animalBaseSpeed[3], RacingConfig.animalBaseSpeed[4], RacingConfig.animalBaseSpeed[5]);
            }


        for (let i = 0; i < RacingConfig.animalCount; i++) {
            if (this.animal[i].x <= (RacingConfig.trackLength + 200 + RacingConfig.offset)) {
                this.animal[i].x += (this.animalSpeed[i] * dt);
            }
            else if (this.isRacing[i]) {
                this.isRacing[i] = false;
                this.rank.push(i);
                if (this.rank.length == RacingConfig.animalCount) {
                    this.playing = false;
                }
                this.animal[i].getComponent(Pig).state = 0;
            }

            RacingConfig.event[i].forEach(element => {
                if (-element.time == this.currentTime) {
                    this.animalSpeed[i] += RacingConfig.ApplyEvent(element.type);
                    if (this.animalSpeed[i] < RacingConfig.animalSpeedLimit.lowest) 
                        this.animalSpeed[i] = RacingConfig.animalSpeedLimit.lowest;
                    if (this.animalSpeed[i] > RacingConfig.animalSpeedLimit.highest) 
                        this.animalSpeed[i] = RacingConfig.animalSpeedLimit.highest;
                    element.time = -1000;
                }
            });

            this.animal[i].getComponent(Pig).speed = this.animalSpeed[i];
        }
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
}
