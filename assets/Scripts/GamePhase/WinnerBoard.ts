import RacingConfig from "./RacingConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WinnerBoard extends cc.Component {

    @property([cc.Node])
    animal: cc.Node[] = [];

    @property([cc.Label])
    animalName: cc.Label[] = [];

    @property(sp.Skeleton)
    anim: sp.Skeleton = null;

    rank = [0,1,2,3,4,5]
    
    protected onEnable(): void {
        for(let i = 0; i< RacingConfig.animalCount; i++)
        {
            this.animal[i].active = true;
            this.animal[i].getComponent(sp.Skeleton).animation = "iddle" + (this.rank[i]+1);
            if(i<=2) this.animalName[i].string = RacingConfig.animalName[this.rank[i]];
        }
        this.anim.animation = "congratulation";
    }
}
