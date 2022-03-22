// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Pig extends cc.Component {

    @property(sp.Skeleton)
    anim: sp.Skeleton = null;

    state = 0;

    @property
    id = 0;

    speed = 0;

    protected update(dt: number): void {
        
        if(this.state == 0) 
        {
            this.setAnimation("iddle" + this.id, 1);

        }
            
        else if(this.state == 1)
        {
            this.setAnimation("run" + this.id, 2);
            this.changeSpeed(this.speed);
        }
            
    }

    setAnimation(name: string, timeScale: number)
    {
        if(this.anim.animation != name) this.anim.animation = name;
        this.anim.timeScale = timeScale;
    }

    changeSpeed(speed: number)
    {
        this.anim.timeScale = (2*speed)/350;
    }
}
