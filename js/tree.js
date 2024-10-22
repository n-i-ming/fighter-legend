var keys={
    a:false,b:false,c:false,d:false,e:false,f:false,g:false,
    h:false,i:false,j:false,k:false,l:false,m:false,n:false,
    o:false,p:false,q:false,r:false,s:false,t:false,
    u:false,v:false,w:false,x:false,y:false,z:false,
    space: false,shift:false,
}
var strstrstr="abcdefghijklmnopqrstuvwxyz"
var charToNum={"a":65,"b":66,"c":67,"d":68,"e":69,"f":70,"g":71,
    "h":72,"i":73,"j":74,"k":75,"l":76,"m":77,"n":78,
    "o":79,"p":80,"q":81,"r":82,"s":83,"t":84,
    "u":85,"v":86,"w":87,"x":88,"y":89,"z":90}
function keydown(event) {
    if(event.keyCode==16){
        keys["shift"]=true;
    }
    else if(event.keyCode==32){
        keys["space"]=true;
    }
    else if(event.keyCode>=65 && event.keyCode<=90){
        keys[strstrstr[event.keyCode-65]]=true
    }
}
function keyup(event){
    if(event.keyCode==16){
        keys["shift"]=false;
    }
    else if(event.keyCode==32){
        keys["space"]=false;
    }
    else if(event.keyCode>=65 && event.keyCode<=90){
        keys[strstrstr[event.keyCode-65]]=false
    }
}
function random() {
    player.seed1 >>>= 0; player.seed2 >>>= 0; player.seed3 >>>= 0; player.seed4 >>>= 0;
    let cast32 = (player.seed1 + player.seed2) | 0;
    player.seed1 = player.seed2 ^ player.seed2 >>> 9;
    player.seed2 = player.seed3 + (player.seed3 << 3) | 0;
    player.seed3 = (player.seed3 << 21 | player.seed3 >>> 11);
    player.seed4 = player.seed4 + 1 | 0;
    cast32 = cast32 + player.seed4 | 0;
    player.seed3 = player.seed3 + cast32 | 0;
    return (cast32 >>> 0) / 4294967296;
}
addLayer("tree-tab",{
    update(diff){
        //update fix
        document.getElementById("outer")["style"]["background-color"]="rgba(0,0,0,"+player.themeId*0.1+")"
        if(document.getElementsByClassName("upgTable")[0]===undefined && document.getElementsByClassName("upgTable")[0]===null){

        }
        else{
            document.getElementById("text")["style"]["left"]=(document.getElementsByClassName("upgTable")[0].getBoundingClientRect().width-document.getElementById("text").getBoundingClientRect().width)/2+"px"
        }
        while(player.toggle.length<100){
            player.toggle.push(0)
        }
        if(player.tmtmtm==0){
            player.tmtmtm=Date.now()/1e3
        }
        player.devSpeed=1
        let dif=(Date.now()/1e3-player.tmtmtm)
        // dif*=100
        player.tmtmtm=Date.now()/1e3
        dif=Math.min(dif,8*3600)
        player.kuangbaoTime=Math.max(player.kuangbaoTime-dif,0)
        player.zhendangTime=Math.max(player.zhendangTime-dif,0)
        player.qiandaoTime=Math.min(Math.max(player.qiandaoTime-dif,0),player.qiandaoCD)
        AutoUpgrade()
        CalcAttribute()
        if(dif<0.1){
            DealFight(dif)
        }
        else{
            DealGet(dif)
        }
    },
    tabFormat:[
        "blank",
        "blank",
        ["display-text",function(){
            let str=""
            str+="<table><tr>"
            for(let i=0;i<subTabList.length;i++){
                if(subTabList[i]=="换行"){
                    str+="</tr><tr>"
                }
                else{
                    str+="<td><button "+(i>0&&(subTabList[i-1]!="换行")?"style='margin-left:-10px'":"")+" onclick='player.nowBigTab="+'"'+subTabList[i]+'"'+";player.fightSub=0'>"+subTabList[i]+"</button></td>"
                }
            }
            str+="</tr></table>"
            return str
        }],
        "blank",
        ["display-text",function(){
            let str=""
            if(player.nowBigTab=='属性'){
                str+="<table>"
                str+="<tr><td style='text-align:left;width:60px'>等级</td><td style='text-align:left;width:200px'>"+format(player.lv,0)+"</td></tr>"
                str+="<tr><td style='text-align:left' colspan=2>每级独立提升攻击、生命0.1%</td></tr>"
                str+="<tr><td style='text-align:left;width:60px'>经验</td><td style='text-align:left;width:200px'>"+format(player.exp,0)+"/"+format(CalcExpNeed(player.lv,0))+"</td></tr>"
                str+="<tr><td style='text-align:left;width:60px'>金钱</td><td style='text-align:left;width:200px'>"+format(player.money,0)+"</td></tr>"
                str+="<tr><td style='text-align:left;width:60px'>攻击</td><td style='text-align:left;width:200px'>"+format(player.atk,0)+"</td></tr>"
                str+="<tr><td style='text-align:left;width:60px'>生命</td><td style='text-align:left;width:200px'>"+format(player.hp,0)+"</td></tr>"
                str+="<tr><td>　</td></tr>"
                str+="<tr><td style='text-align:left;width:60px'>攻速</td><td style='text-align:left;width:200px'>"+format(player.atkSpeed,0)+"</td></tr>"
                str+="</table>"
            }
            else if(player.nowBigTab=="战斗"){
                str+=`<br><div>正在挑战 ${monsterName[Math.min(100,Math.floor(player.monsterLv/1000))]}·${player.monsterLv+1}级 <button onclick='player.fightSub=1'>掉落详细</button></div>`
                if(player.fightSub==0){
                }
                else{
                    let ls=ThingList()
                    str+="<br><br>"
                    str+="<table>"
                        str+="<tr>"
                        str+="<td style='width:100px;text-align:left'>物品</td>"
                        str+="<td style='width:200px;text-align:right'>几率</td>"
                        str+="</tr>"
                    for(let i=0;i<ls.length;i++){
                        str+="<tr>"
                        str+="<td style='width:200px;text-align:left'>"+things[ls[i][0]][0]+"×"+format(ls[i][1])+"</td>"
                        str+="<td style='width:200px;text-align:right'>"+5*player.dropLuck+"/1000</td>"
                        str+="</tr>"
                    }
                    str+="</table>"
                    str+="<br><br><button onclick='player.fightSub=0'>返回</button>"
                }
            }
            else if(player.nowBigTab=="兑换"){
                str+="兑换码<br>"
                str+="<input id='exchangeCode' style='width:400px'>"
                str+="<button onclick='DealExchangeCode()'>确认</button>"
                str+="<br><br>"
                if(player.exchangeCodeList.includes("794a01ec79ccc88dd1492824822c5b3d9ab049cae238eebd71db87295878ce91")){
                    str+="飞天爽会员<br>经验金钱收益+550%<br>攻速+45<br>材料掉落概率加19倍<br>技能触发概率+19%<br>签到收益提升至×50<br>签到间隔缩短至12h<br>破灭冷却缩短至0.5s<br>破灭效果提升至每阶/1.2<br>"
                }
                else if(player.exchangeCodeList.includes("1516e9db625c9b9d95db1f211c58347b198901a3c4ac6949e66039db138954ac")){
                    str+="超极爽会员<br>经验金钱收益+400%<br>攻速+35<br>材料掉落概率加14倍<br>技能触发概率+14%<br>签到收益提升至×20<br>签到间隔缩短至12h<br>破灭冷却缩短至0.75s<br>破灭效果提升至每阶/1.15<br>"
                }
                else if(player.exchangeCodeList.includes("67b19dc018f9d3bd3e60411f8c526680d790c9b7857d165d75623d594bb22385")){
                    str+="极爽会员<br>经验金钱收益+250%<br>攻速+25<br>材料掉落概率加9倍<br>技能触发概率+9%<br>签到收益提升至×10<br>签到间隔缩短至12h<br>破灭冷却缩短至1s<br>破灭效果提升至每阶/1.10<br>"
                }
                else if(player.exchangeCodeList.includes("ca2e83f083234c985da5e82f10ac733e1b6efd05683766539260fdb8b9a4f1ed")){
                    str+="超爽会员<br>经验金钱收益+150%<br>攻速+15<br>材料掉落概率加5倍<br>技能触发概率+5%<br>签到收益提升至×7<br>签到间隔缩短至12h<br>破灭冷却缩短至2s<br>破灭效果提升至每阶/1.07<br>"
                }
                else if(player.exchangeCodeList.includes("04a83db3606e208c09a2410fa764cfdc76639427377b18faac308535e499760c")){
                    str+="很爽会员<br>经验金钱收益+100%<br>攻速+10<br>材料掉落概率加3倍<br>技能触发概率+3%<br>签到收益提升至×5<br>破灭冷却缩短至3s<br>破灭效果提升至每阶/1.05<br>"
                }
                else if(player.exchangeCodeList.includes("dcc8111b8017e31dbd35ad4aad96be2ca3b83d3c901e52d4a95710542c71f81b")){
                    str+="略爽会员<br>经验金钱收益+50%<br>攻速+5<br>材料掉落概率加2倍<br>技能触发概率+2%<br>签到收益提升至×4<br>破灭冷却缩短至5s<br>破灭效果提升至每阶/1.03<br>"
                }
                else if(player.exchangeCodeList.includes("a9633b80fceaf953fcbd4ba85936e5d26cd00514ab438f3e07825ab74ccb4e16")){
                    str+="微爽会员<br>经验金钱收益+20%<br>攻速+2<br>材料掉落概率加1倍<br>技能触发概率+1%<br>签到收益提升至×3<br>破灭冷却缩短至7s<br>破灭效果提升至每阶/1.02<br>"
                }
            }
            else if(player.nowBigTab=="设置"){
                str+="经验显示<button onclick='player.toggle[0]=!player.toggle[0]'>"+(player.toggle[0]==0?"开":"关")+"</button><br><br>"
                str+="金钱显示<button onclick='player.toggle[1]=!player.toggle[1]'>"+(player.toggle[1]==0?"开":"关")+"</button><br><br>"
                str+="材料显示<button onclick='player.toggle[2]=!player.toggle[2]'>"+(player.toggle[2]==0?"开":"关")+"</button><br><br>"
                str+="普通攻击伤害显示<button onclick='player.toggle[3]=!player.toggle[3]'>"+(player.toggle[3]==0?"开":"关")+"</button><br><br>"
                str+="普通攻击动画显示<button onclick='player.toggle[4]=!player.toggle[4]'>"+(player.toggle[4]==0?"开":"关")+"</button><br><br>"
                str+="技能攻击伤害显示<button onclick='player.toggle[5]=!player.toggle[5]'>"+(player.toggle[5]==0?"开":"关")+"</button><br><br>"
                str+="技能攻击动画显示<button onclick='player.toggle[6]=!player.toggle[6]'>"+(player.toggle[6]==0?"开":"关")+"</button><br><br>"
                str+="神兽攻击伤害显示<button onclick='player.toggle[7]=!player.toggle[7]'>"+(player.toggle[7]==0?"开":"关")+"</button><br><br>"
                str+="神兽攻击动画显示<button onclick='player.toggle[8]=!player.toggle[8]'>"+(player.toggle[8]==0?"开":"关")+"</button><br><br>"
                str+="破灭攻击伤害显示<button onclick='player.toggle[9]=!player.toggle[9]'>"+(player.toggle[9]==0?"开":"关")+"</button><br><br>"
                str+="破灭攻击动画显示<button onclick='player.toggle[10]=!player.toggle[10]'>"+(player.toggle[10]==0?"开":"关")+"</button><br><br>"
                str+="机炮攻击伤害显示<button onclick='player.toggle[11]=!player.toggle[11]'>"+(player.toggle[11]==0?"开":"关")+"</button><br><br>"
                str+="机炮攻击动画显示<button onclick='player.toggle[12]=!player.toggle[12]'>"+(player.toggle[12]==0?"开":"关")+"</button><br><br>"
            }
            else if(player.nowBigTab=="武器"){
                str+="拥有陨铁 "+format(player.iron,0)+"<br>"+"拥有金钱 "+format(player.money,0)
                str+="<br><br>"
            }
            else if(player.nowBigTab=="盔甲"){
                str+="拥有陨铁 "+format(player.iron,0)+"<br>"+"拥有金钱 "+format(player.money,0)
                str+="<br><br>"
            }
            else if(player.nowBigTab=="技能"){
                str+="拥有技能书 "+format(player.skillbook,0)+"<br>"
                str+="技能书从200级怪物起开始掉落<br>"
                str+="技能触发概率 "+player.skillLuck+"%<br>"
                str+="<br>"
            }
            else if(player.nowBigTab=="神兽"){
                str+="拥有兽符 "+format(player.animalrune,0)+"<br>"
                str+="兽符从300级怪物起开始掉落<br>"
                str+="神兽技能触发概率 "+player.skillLuck+"%<br>"
                str+="<br>"
            }
            else if(player.nowBigTab=="签到"){
                str+="每次签到令攻击和生命×"+format(player.qiandaoMul)+"<br>"
                str+="你已签到"+player.qiandaoTimes+"次<br>"
                str+="你的攻击和生命×"+format(player.qiandaoMul.pow(player.qiandaoTimes))+"<br>"
                str+="<br>"
                str+="距离下次签到还剩 "+formatTime(player.qiandaoTime)+"<br><br>"
            }
            else if(player.nowBigTab=="宝石"){
                str+="拥有宝石碎片 "+format(player.gem,0)+"<br>"
                str+="宝石碎片从500级怪物起开始掉落<br>"
                str+="<br>"
            }
            else if(player.nowBigTab=="破灭"){
                str+="拥有精钢 "+format(player.steel,0)+"<br>"
                str+="精钢从800级怪物起开始掉落<br>"
                str+="<br>"
            }
            else if(player.nowBigTab=="士兵"){
                str+="拥有兵符 "+format(player.soldierrune,0)+"<br>"
                str+="兵符从1000级怪物起开始掉落<br>"
                str+="<br>"
            }
            else if(player.nowBigTab=="图鉴"){
                str+="拥有魂魄 "+format(player.spirit,0)+"<br>"
                str+="魂魄从1500级怪物起开始掉落<br>"
                str+="<br>"
                str+="每点精魄使攻击、生命独立提升1%<br>"
                str+="你总计拥有"+format(player.spiritPoint,0)+"点精魄<br>"
                str+="攻击、生命累计×"+format(n(1.01).pow(player.spiritPoint),0)+"<br>"
                str+="<br>"
            }
            else if(player.nowBigTab=="机炮"){
                str+="拥有装甲部件 "+format(player.part,0)+"<br>"
                str+="装甲部件从2000级怪物起开始掉落<br>"
                str+="<br>"
            }
            else if(player.nowBigTab=="宝珠"){
                str+="拥有宝珠碎片 "+format(player.orb,0)+"<br>"
                str+="宝珠碎片从3000级怪物起开始掉落<br>"
                str+="<br>"
            }
            else if(player.nowBigTab=="碎甲"){
                str+="拥有断匕 "+format(player.dagger,0)+"<br>"
                str+="断匕从4000级怪物起开始掉落<br>"
                str+="<br>"
                str+="每点碎甲使每次攻击叠一层碎甲状态<br>"
                str+="每层碎甲状态使非破灭攻击伤害独立提升1%<br>"
                str+="你总计拥有"+format(player.daggerPoint,0)+"点碎甲<br>"
                str+="<br>"
            }
            else if(player.nowBigTab=="丹药"){
                str+="拥有丹药 "+format(player.pellet,0)+"<br>"
                str+="丹药从5000级怪物起开始掉落<br>"
                str+="<br>"
            }
            else if(player.nowBigTab=="混沌"){
                str+="拥有混沌晶石 "+format(player.chaos,0)+"<br>"
                str+="混沌晶石从10000级怪物起开始掉落<br>"
                str+="<br>"
            }
            return str
        }],
        ["display-text",function(){
            let str=""
            if(player.nowBigTab=="战斗"){
                if(player.fightSub==0){
                    str+="<canvas id='mycanvas' style='width:600px;height:500px'>"
                    str+="</canvas>"
                    str+=DrawFight()
                }
            }
            else if(player.nowBigTab=="武器"){
                str+="当前武器 "+weaponName[Math.min(player.weaponLv[0],99)]+(player.weaponLv[0]>=99?"·"+(player.weaponLv[0]-99)+"阶":"")+"·"+player.weaponLv[1]+"级<br>"
                str+="攻击+"+format(player.weaponLv[0]>=1?n(1000).mul(n(1.5).mul(n(1.02).pow(player.chaosLv[0])).pow(player.weaponLv[0]-1)).mul(n(1.01).pow(player.weaponLv[1])):n(0))+"<br><br>"
                if(player.weaponLv[0]>=1){
                    str+="升级需要 金钱×"+format(CalcWeaponNeed(0))+" <button onclick='UpgradeWeapon(1)'>升级</button>"
                    str+="<button onclick='UpgradeWeapon(2)' style='margin-left:2px'>连续升级</button><br><br>"
                }
                str+="升阶需要 陨铁×"+format(CalcWeaponNeed(1))+" <button onclick='UpgradeWeapon(0)'>升阶</button>"
                str+="<button onclick='UpgradeWeapon(3)' style='margin-left:2px'>连续升阶</button><br>"
                str+="下一阶 "+weaponName[Math.min(player.weaponLv[0]+1,99)]+(player.weaponLv[0]+1>=99?"·"+(player.weaponLv[0]+1-99)+"阶":"")+"<br>"
                str+="<br>每一阶令武器增益×"+format(n(1.5).mul(n(1.02).pow(player.chaosLv[0])),2)+"<br>每一级令武器增益×1.01"
            }
            else if(player.nowBigTab=="盔甲"){
                str+="当前盔甲 "+clothName[Math.min(player.clothLv[0],99)]+(player.clothLv[0]>=99?"·"+(player.clothLv[0]-99)+"阶":"")+"·"+player.clothLv[1]+"级<br>"
                str+="生命+"+format(player.clothLv[0]>=1?n(10000).mul(n(1.5).mul(n(1.02).pow(player.chaosLv[1])).pow(player.clothLv[0]-1)).mul(n(1.01).pow(player.clothLv[1])):n(0))+"<br><br>"
                if(player.clothLv[0]>=1){
                    str+="升级需要 金钱×"+format(CalcClothNeed(0))+" <button onclick='UpgradeCloth(1)'>升级</button>"
                    str+="<button onclick='UpgradeCloth(2)' style='margin-left:2px'>连续升级</button><br><br>"
                }
                str+="升阶需要 陨铁×"+format(CalcClothNeed(1))+" <button onclick='UpgradeCloth(0)'>升阶</button>"
                str+="<button onclick='UpgradeCloth(3)' style='margin-left:2px'>连续升阶</button><br>"
                str+="下一阶 "+clothName[Math.min(player.clothLv[0]+1,99)]+(player.clothLv[0]+1>=99?"·"+(player.clothLv[0]+1-99)+"阶":"")+"<br>"
                str+="<br>每一阶令盔甲增益×"+format(n(1.5).mul(n(1.02).pow(player.chaosLv[1])),2)+"<br>每一级令盔甲增益×1.01"
            }
            else if(player.nowBigTab=="技能"){
                str+="<table>"
                for(let i=0;i<skillName.length;i++){
                    str+="<tr>"
                    str+="<td style='width:150px;text-align:left'>"+skillName[i]+"·"+player.skillLv[i]+"阶 "
                    str+="<text style='color:"+skillColor[i]+"'>■</td>"
                    str+="<td style='width:200px;text-align:left'>伤害系数"+format(player.skillLv[i]==0?0:n(500).mul(n(1.1).mul(n(1.004).pow(player.chaosLv[2])).pow(player.skillLv[i]-1)),0)+"%</td>"
                    str+="<td style='width:150px;text-align:left'>攻击+"+format(player.skillLv[i]==0?0:n(50).mul(n(1.1).mul(n(1.004).pow(player.chaosLv[2])).pow(player.skillLv[i]-1)),0)+"%</td>"
                    str+="<td style='width:100px'></td>"
                    str+="<td style='width:300px;text-align:right'>消耗 技能书×"+format(CalcSkillNeed(i),0)+" <button onclick='UpgradeSkill("+i+",0)'>升阶</button>"
                    +"</td><td><button style='margin-left:-10px' onclick='UpgradeSkill("+i+",1)'>一键升阶</button></td>"
                    str+="</tr>"
                }
                str+="</table>"
            }
            else if(player.nowBigTab=="神兽"){
                str+="<table>"
                for(let i=0;i<animalName.length;i++){
                    str+="<tr>"
                    str+="<td style='width:150px;text-align:left'>"+animalName[i]+"·"+player.animalLv[i]+"阶 "
                    str+="<text style='color:"+animalColor[i]+"'>▶</text></td>"
                    str+="<td style='width:200px;text-align:left'>伤害系数"+format(player.animalLv[i]==0?0:n(25).mul(n(1.1).mul(n(1.005).pow(player.chaosLv[3])).pow(player.animalLv[i]-1)),0)+"%</td>"
                    str+="<td style='width:150px;text-align:left'>生命+"+format(player.animalLv[i]==0?0:n(50).mul(n(1.1).mul(n(1.005).pow(player.chaosLv[3])).pow(player.animalLv[i]-1)),0)+"%</td>"
                    str+="<td style='width:100px'></td>"
                    str+="<td style='width:250px;text-align:right'>消耗 兽符×"+format(CalcAnimalNeed(i),0)+" <button onclick='UpgradeAnimal("+i+",0)'>升阶</button>"
                    +"</td><td><button style='margin-left:-10px' onclick='UpgradeAnimal("+i+",1)'>一键升阶</button></td>"
                    str+="</tr>"
                }
                str+="</table>"
                str+="<br>神兽攻击速度为本体的五分之一<br><br>"
                str+="<table>"
                str+="<tr><td style='width:200px'>青龙特殊技能-狂暴 <text style='color:"+animalColor[0]+";text-shadow:0 0 10px "+animalColor[0]+"'>▶</text></td>"
                str+="<td style='text-align:left'>接下来3秒内 , 玩家攻击×5</text></tr>"
                str+="<tr><td style='width:200px'>白虎特殊技能-震荡 <text style='color:"+animalColor[1]+";text-shadow:0 0 10px "+animalColor[1]+"'>▶</text></td>"
                str+="<td style='text-align:left'>接下来2秒内 , 怪物停止攻击</text></tr>"
                str+="<tr><td style='width:200px'>朱雀特殊技能-治愈 <text style='color:"+animalColor[2]+";text-shadow:0 0 10px "+animalColor[2]+"'>▶</text></td>"
                str+="<td style='text-align:left'>回复最大生命值的20%</text></tr>"
                str+="<tr><td style='width:200px'>白虎特殊技能-坚甲 <text style='color:"+animalColor[3]+";text-shadow:0 0 10px "+animalColor[3]+"'>▶</text></td>"
                str+="<td style='text-align:left'>抵消离玩家最近的一枚子弹</text></tr>"
            }
            else if(player.nowBigTab=="签到"){
                if(player.qiandaoTime==0)
                str+="<button onclick='QianDao()'>签到</button>"
            }
            else if(player.nowBigTab=="宝石"){
                str+="<table>"
                str+="<tr><td style='width:200px;text-align:left'>"+Math.floor(player.gemLv[0]/100+1)+"阶攻击宝石 ("+(player.gemLv[0]-Math.floor(player.gemLv[0]/100)*100)
                +"/100)</td><td style='width:150px;text-align:left'>攻击+"+format(CalcGemMul(0),0)+"%</td>"
                +"<td style='width:300px;text-align:right'>消耗宝石碎片×"+format(CalcGemNeed(0),0)+"<button onclick='UpgradeGem(0,0)'>合成</button></td><td><button style='margin-left:-10px' onclick='UpgradeGem(0,1)'>连续合成</button></td></tr>"
                str+="<tr><td style='width:200px;text-align:left'>"+Math.floor(player.gemLv[1]/100+1)+"阶生命宝石 ("+(player.gemLv[1]-Math.floor(player.gemLv[1]/100)*100)
                +"/100)</td><td style='width:150px;text-align:left'>生命+"+format(CalcGemMul(1),0)+"%</td>"
                +"<td style='width:300px;text-align:right'>消耗宝石碎片×"+format(CalcGemNeed(1),0)+"<button onclick='UpgradeGem(1,0)'>合成</button></td><td><button style='margin-left:-10px' onclick='UpgradeGem(1,1)'>连续合成</button></td></tr>"
                str+="</table>"
                str+="<br>每一阶宝石合成满以后提升对应属性"+format(n(1.5).mul(n(1.025).pow(player.chaosLv[4])))+"倍"
            }
            else if(player.nowBigTab=="破灭"){
                str+="<table>"
                str+="<tr><td style='width:200px;text-align:left'>"+Math.floor(player.swordLv/10)+"阶·"+(player.swordLv-Math.floor(player.swordLv/10)*10)
                +"级·破灭之刃</td><td style='width:150px;text-align:left'>攻击+"+format(n(1.1).pow(player.swordLv).sub(1).mul(100),0)+"%</td>"
                +"<td style='width:250px;text-align:right'>消耗精钢×"+format(CalcSwordNeed(),0)+"</td><td><button onclick='UpgradeSword(1)'>连续升级</button></td></tr>"
                str+="</table>"
                str+="<br>每"+player.swordCD+"秒发射一道伤害值为怪物当前生命/"+format(player.swordPower,1)+"的剑气"
            }
            else if(player.nowBigTab=="士兵"){
                str+="<table>"
                for(let i=0;i<soldierName.length;i++){
                    str+="<tr>"
                    str+="<td style='width:150px;text-align:left'>"+soldierName[i][0]+"·"+player.soldierLv[i]+"个</td>"
                    str+="<td style='width:150px;text-align:left'>攻击+"+format(player.soldierLv[i]==0?0:soldierName[i][1].div(100).add(1).pow(player.soldierLv[i]).sub(1).mul(100),0)+"%</td>"
                    str+="<td style='width:150px;text-align:left'>生命+"+format(player.soldierLv[i]==0?0:soldierName[i][2].div(100).add(1).pow(player.soldierLv[i]).sub(1).mul(100),0)+"%</td>"
                    str+="<td style='width:100px'></td>"
                    str+="<td style='width:250px;text-align:right'>消耗 兵符×"+format(CalcSoldierNeed(i),0)+" <button onclick='UpgradeSoldier("+i+",0)'>招募</button>"
                    +"</td><td><button style='margin-left:-10px' onclick='UpgradeSoldier("+i+",1)'>一键招募</button></td>"
                    str+="</tr>"
                }
                str+="</table>"
            }
            else if(player.nowBigTab=="图鉴"){
                str+="<table>"
                for(let i=0;i<spiritName.length;i++){
                    str+="<tr>"
                    str+="<td style='width:150px;text-align:left'>"+spiritName[i]+"·"+player.spiritLv[i]+"级</td>"
                    str+="<td style='width:150px;text-align:left'>精魄+"+format(player.spiritLv[i]*(i+1),0)+"点</td>"
                    str+="<td style='width:100px'></td>"
                    str+="<td style='width:250px;text-align:right'>消耗 魂魄×"+format(CalcSpiritNeed(i),0)+" <button onclick='UpgradeSpirit("+i+",0)'>升级</button>"
                    +"</td><td><button style='margin-left:-10px' onclick='UpgradeSpirit("+i+",1)'>一键升级</button></td>"
                    str+="</tr>"
                }
                str+="</table>"
            }
            else if(player.nowBigTab=="机炮"){
                str+="<table>"
                for(let i=0;i<4;i++){
                    str+="<tr>"
                    if(player.partLv[i]==-1){
                        str+="<td style='width:150px;text-align:left'>激活机炮槽"+(i+1)+"</td>"
                        str+="<td style='width:150px;text-align:left'>　</td>"
                        str+="<td style='width:100px'>　</td>"
                        str+="<td style='width:200px;text-align:right'>消耗 装甲部件"+format(n(1000).pow(i+1))+"</td><td><button onclick='UpgradePart("+i+",0)'>激活</button></td>"
                    }
                    else{
                        str+="<td style='width:150px;text-align:left'>机炮"+(i+1)+"·"+player.partLv[i]+"级</td>"
                        str+="<td style='width:150px;text-align:left'>攻击+"+format(n(1.1).pow(player.partLv[i]).sub(1).mul(100),0)+"%</td>"
                        str+="<td style='width:100px'></td>"
                        str+="<td style='width:300px;text-align:right'>消耗 装甲部件×"+format(CalcPartNeed(i),0)+" <button onclick='UpgradePart("+i+",0)'>升级</button>"
                        +"</td><td><button style='margin-left:-10px' onclick='UpgradePart("+i+",1)'>一键升级</button></td>"
                    }
                    str+="</tr>"
                }
                str+="</table>"
                str+="<br>机炮攻击速度为本体的十分之一<br><br>"
                str+="机炮每次攻击会令护盾值变为原先护盾值和生命值之和的两倍<br>"
                str+="护盾值可以减免等量伤害<br>"
                str+="护盾值在受到一次伤害后清零<br>"
            }
            else if(player.nowBigTab=="宝珠"){
                str+="<table>"
                str+="<tr><td style='width:200px;text-align:left'>生机宝珠·"+player.orbLv+"级</td>"
                str+="<td style='width:150px;text-align:left'>生命×"+format(n(2).pow(player.orbLv),0)+"</td>"
                str+="<td style='width:150px;text-align:left'>经验收益+"+format(n(1).add(player.orbLv*0.01).sub(1).mul(100),0)+"%</td>"
                str+="<td style='width:250px;text-align:right'>消耗宝珠碎片×"+format(CalcOrbNeed(),0)+"</td><td><button onclick='UpgradeOrb(1)'>连续升级</button></td></tr>"
                
                str+="<tr><td style='width:200px;text-align:left'>切割宝珠·"+player.orb1Lv+"级</td>"
                str+="<td style='width:150px;text-align:left'>金币收益×"+format(n(2).pow(player.orb1Lv),0)+"</td>"
                str+="<td style='width:150px;text-align:left'>材料收益+"+format(n(1).add(player.orb1Lv*0.01).sub(1).mul(100),0)+"%</td>"
                str+="<td style='width:250px;text-align:right'>消耗宝珠碎片×"+format(CalcOrb1Need(),0)+"</td><td><button onclick='UpgradeOrb1(1)'>连续升级</button></td></tr>"
                str+="</table>"
            }
            else if(player.nowBigTab=="碎甲"){
                str+="<table>"
                for(let i=0;i<4;i++){
                    str+="<tr>"
                    str+="<td style='width:150px;text-align:left'>碎甲之"+["剑","刀","斧","锤"][i]+"·"+player.daggerLv[i]+"阶</td>"
                    str+="<td style='width:150px;text-align:left'>碎甲+"+format(player.daggerLv[i]*(i+1),0)+"点</td>"
                    str+="<td style='width:100px'></td>"
                    str+="<td style='width:250px;text-align:right'>消耗 断匕×"+format(CalcDaggerNeed(i),0)+" <button onclick='UpgradeDagger("+i+",0)'>升阶</button>"
                    +"</td><td><button style='margin-left:-10px' onclick='UpgradeDagger("+i+",1)'>一键升阶</button></td>"
                    str+="</tr>"
                }
                str+="</table>"
            }
            else if(player.nowBigTab=="丹药"){
                str+="<table>"
                for(let i=0;i<5;i++){
                    str+="<tr>"
                    str+="<td style='width:150px;text-align:left'>"+["一","二","三","四","五"][i]+"品丹药·"+player.pelletLv[i]+"个</td>"
                    str+="<td style='width:150px;text-align:left'>攻击+"+format(n(1).add(0.05*(i+1)).pow(player.pelletLv[i]).sub(1).mul(100),0)+"%</td>"
                    str+="<td style='width:150px;text-align:left'>生命+"+format(n(1).add(0.05*(i+1)).pow(player.pelletLv[i]).sub(1).mul(100),0)+"%</td>"
                    str+="<td style='width:100px'></td>"
                    str+="<td style='width:250px;text-align:right'>消耗 丹药×"+format(CalcPelletNeed(i),0)+" <button onclick='UpgradePellet("+i+",0)'>炼制</button>"
                    +"</td><td><button style='margin-left:-10px' onclick='UpgradePellet("+i+",1)'>一键炼制</button></td>"
                    str+="</tr>"
                }
                str+="</table>"
            }
            else if(player.nowBigTab=="混沌"){
                str+="<table>"
                str+="<tr><td style='width:200px;text-align:left'>混沌武器·"+player.chaosLv[0]+"级</td>"
                str+="<td style='width:300px;text-align:left'>每阶武器独立增益×"+format(n(1.02).pow(player.chaosLv[0]),2)+"</td>"
                str+="<td style='width:250px;text-align:right'>消耗 混沌晶石×"+format(CalcChaosNeed(0),0)+"</td><td><button onclick='UpgradeChaos(0,0)'>升级</button></td><td><button style='margin-left:-10px' onclick='UpgradeChaos(0,1)'>连续升级</button></td></tr>"
                str+="<tr><td style='width:200px;text-align:left'>混沌盔甲·"+player.chaosLv[1]+"级</td>"
                str+="<td style='width:300px;text-align:left'>每阶盔甲独立增益×"+format(n(1.02).pow(player.chaosLv[1]),2)+"</td>"
                str+="<td style='width:250px;text-align:right'>消耗 混沌晶石×"+format(CalcChaosNeed(1),0)+"</td><td><button onclick='UpgradeChaos(1,0)'>升级</button></td><td><button style='margin-left:-10px' onclick='UpgradeChaos(1,1)'>连续升级</button></td></tr>"
                str+="<tr><td style='width:200px;text-align:left'>混沌技能·"+player.chaosLv[2]+"级</td>"
                str+="<td style='width:300px;text-align:left'>每阶技能独立增益×"+format(n(1.004).pow(player.chaosLv[2]),2)+"</td>"
                str+="<td style='width:250px;text-align:right'>消耗 混沌晶石×"+format(CalcChaosNeed(2),0)+"</td><td><button onclick='UpgradeChaos(2,0)'>升级</button></td><td><button style='margin-left:-10px' onclick='UpgradeChaos(2,1)'>连续升级</button></td></tr>"
                str+="<tr><td style='width:200px;text-align:left'>混沌神兽·"+player.chaosLv[3]+"级</td>"
                str+="<td style='width:300px;text-align:left'>每阶神兽独立增益×"+format(n(1.005).pow(player.chaosLv[3]),2)+"</td>"
                str+="<td style='width:250px;text-align:right'>消耗 混沌晶石×"+format(CalcChaosNeed(3),0)+"</td><td><button onclick='UpgradeChaos(3,0)'>升级</button></td><td><button style='margin-left:-10px' onclick='UpgradeChaos(3,1)'>连续升级</button></td></tr>"
                str+="<tr><td style='width:200px;text-align:left'>混沌宝石·"+player.chaosLv[4]+"级</td>"
                str+="<td style='width:300px;text-align:left'>每阶宝石独立增益×"+format(n(1.025).pow(player.chaosLv[4]),2)+"</td>"
                str+="<td style='width:250px;text-align:right'>消耗 混沌晶石×"+format(CalcChaosNeed(4),0)+"</td><td><button onclick='UpgradeChaos(4,0)'>升级</button></td><td><button style='margin-left:-10px' onclick='UpgradeChaos(4,1)'>连续升级</button></td></tr>"
                str+="</table>"
            }
            return str
        }],
        "blank",
        "blank",
        ["display-text",function(){
            let str=""
            str+="<div style='padding-left:10px;padding-top:10px;text-align:left;height:400px;width:600px;border:2px solid black;overflow:auto'>"
            for(let i=logs.length-1;i>=Math.max(0,logs.length-100);i--){
                str+=logs[i]
                str+="<br>"
            }
            str+="</div>"
            return str
        }]
    ],
    previousTab: "",
    leftTab: true,
})