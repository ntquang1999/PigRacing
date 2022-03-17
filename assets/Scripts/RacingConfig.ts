// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

interface Event {
    time:number;
    type: number;
}

@ccclass
export default class RacingConfig extends cc.Component {
    
    //Base speed of animal, auto generated
    static animalBaseSpeed = [0,0,0,0,0,0];
    
    //Race event of each animal, auto generated
    static event: Event[][] = [
        [], [], [], [], [], []
    ];
    
    //Number of animal, default is 6
    static animalCount = 6;
    
    //Time limit for a race in seconds
    static maxTime = 100;
    
    //Length of the track, do not change this
    static trackLength = 12790;
    
    //The actural length in world space cordinate, do not change this
    static actualTrackLength = 12260;

    //offset position of animal start point, do not change this
    static offset = -755;

    //offset position of camera start point, do not change this
    static mapOffset = -960;

    //Max distance between 2 animal, change this to config the race, lower the longer it take
    static maxDistance = 1200;

    //type of event, change this along side ApplyEvent function
    static typeCount = 9;

    //Base speed RANDOM range of an animal
    static baseSpeedRange = {"lowest": 300, "highest": 400};

    //Use fixed base speed
    static usingFixedBaseSpeed = false;

    //Base speed pre-determined of animals
    static baseSpeed = [300,300,300,300,300,300];

    //Range of time to spawn events
    static maxEventTime = 30;

    //Number of events
    static eventRange = {"lowest": 4, "highest": 10};

    //Speed limit of animal
    static animalSpeedLimit = {"lowest": 40, "highest": 1000};

    //Flag
    static dataGenerated = false;


    static ApplyEvent(type)
    {
        if (type == 0) return 20;
        if (type == 1) return 30;
        if (type == 2) return 40;
        if (type == 3) return -10;
        if (type == 4) return -20;
        if (type == 5) return -30;
        if (type == 6) return 50;
        if (type == 7) return 60;
        if (type == 8) return 70;
    }
}
