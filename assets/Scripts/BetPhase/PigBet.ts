// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class PigBet extends cc.Component {

    @property(cc.Node)
    winsIcon: cc.Node = null;

    @property(cc.Node)
    placeIcon: cc.Node = null;

    @property(cc.Node)
    showIcon: cc.Node = null;

    @property(cc.Node)
    pig: cc.Node = null;

    @property(cc.Label)
    PigName: cc.Label = null;

    @property(cc.Label)
    rateWins: cc.Label = null;

    @property(cc.Label)
    ratePlace: cc.Label = null;

    @property(cc.Label)
    rateShow: cc.Label = null;

    @property(cc.Label)
    amountWins: cc.Label = null;

    @property(cc.Label)
    amountPlace: cc.Label = null;

    @property(cc.Label)
    amountShow: cc.Label = null;

    @property([cc.SpriteFrame])
    chipSprite: cc.SpriteFrame[] = [];

    protected start(): void {
        
    }

    setProperties(pigID, rateWins, ratePlace, rateShow)
    {
        this.pig.getComponent(sp.Skeleton).animation = "iddle" + pigID;
        this.rateWins.string = rateWins;
        this.ratePlace.string = ratePlace;
        this.rateShow.string = rateShow;
    }

    setBet(type, cropType, amount)
    {
        if(type == 1) 
        {
            this.amountWins.string = amount; 
            this.winsIcon.getComponent(cc.Sprite).spriteFrame = this.chipSprite[cropType];
        } else
        if(type == 2) 
        {
            this.amountPlace.string = amount; 
            this.placeIcon.getComponent(cc.Sprite).spriteFrame = this.chipSprite[cropType];
        } else
        if(type == 3) 
        {
            this.amountShow.string = amount; 
            this.showIcon.getComponent(cc.Sprite).spriteFrame = this.chipSprite[cropType];
        }

        //BetController.showLoadingIcon()
        //CallAPI
        //
    }
}
