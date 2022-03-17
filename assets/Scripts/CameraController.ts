const { ccclass, property } = cc._decorator;


@ccclass
export default class CameraController extends cc.Component {
    @property(cc.Node)
    Cloud: cc.Node = null;

    @property(cc.Node)
    Grass: cc.Node = null;

    protected start(): void {
        
    }
}