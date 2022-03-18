import RaceController from "./RaceController";
import RacingConfig from "./RacingConfig";

const { ccclass, property } = cc._decorator;


@ccclass
export default class RankBox extends cc.Component {
    @property([cc.Node])
    animal: cc.Node[] = [];

    @property([cc.Node])
    animalIcon: cc.Node[] = [];

    @property([cc.Label])
    animalName: cc.Label[] = [];

    @property(RaceController)
    controller: RaceController = null;

    rankPostiton = [474,272,87,-113,-313,-505];

    rankID = [-1,-1,-1,-1,-1,-1];

    positionLock = [false,false,false,false,false,false];

    protected start(): void {
        for(let i = 0; i< RacingConfig.animalCount; i++)
        {
            this.animalIcon[i].active = true;
            this.animalName[i].string = RacingConfig.animalName[i];
        }
    }

    protected update(dt: number): void {
        if(this.controller.playing)
            this.checkPosition();
    }

    checkPosition()
    {
        let rank = [this.animal[0].x,this.animal[1].x,this.animal[2].x,this.animal[3].x,this.animal[4].x,this.animal[5].x];
        
        for(let i =0; i<this.controller.rank.length;i++)
        {
            rank[this.controller.rank[i]] = 1000000000/(i+1);
        }

        rank.sort((n1,n2) => n2 - n1);

        for(let no =0; no<6;no++)
        {
            for(let i = 0; i<6;i++)
            {
                if(this.animal[no].x == rank[i])
                {
                    if(this.rankID[i] != no)
                    {
                        this.rankID[i] = no;
                        cc.tween(this.animalIcon[no]).to(0.8,{position:cc.v3(this.rankPostiton[i],this.animalIcon[no].y,this.animalIcon[no].z)}).start();
                    }   
                }
            }
        }
        
    }
}