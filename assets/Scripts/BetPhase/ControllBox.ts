const {ccclass, property} = cc._decorator;

@ccclass
export default class ControllBox extends cc.Component {

    @property(cc.Node)
    mainBox: cc.Node = null;

    @property(cc.Prefab)
    historyBox: cc.Prefab = null;

    onHistoryClick()
    {
        this.SpawnNode(this.historyBox, cc.find("Canvas"));
        this.DisableNode(this.mainBox, false)
    }

    EnableNode(node: cc.Node)
    {
        node.active = true;
        node.scale = 0;
        cc.tween(node).to(0.7,{scale:1}, {easing: cc.easing.backOut}).start();
    }

    SpawnNode(prefab: cc.Prefab, parent: cc.Node)
    {
        let node = cc.instantiate(prefab);
        node.parent = parent;
        node.scale = 0;
        cc.tween(node).to(0.7,{scale:1}, {easing: cc.easing.backOut}).start();
    }

    DisableNode(node: cc.Node, destroy: boolean)
    {
        cc.tween(node).to(0.7,{scale:0}, {easing: cc.easing.backIn}).call(()=>{
            if(destroy)
                node.destroy();
            else
                node.active = false;
        }).start();
    }
}
