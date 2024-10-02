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
        // dif*=0.1
        player.tmtmtm=Date.now()/1e3
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
                str+="<td><button "+(i>0?"style='margin-left:-10px'":"")+" onclick='player.nowBigTab="+'"'+subTabList[i]+'"'+";player.fightSub=0'>"+subTabList[i]+"</button></td>"
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
                str+=`<br><div>正在挑战 ${monsterName[Math.floor(player.monsterLv/1000)]}·${player.monsterLv+1}级 <button onclick='player.fightSub=1'>掉落详细</button></div>`
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
                        str+="<td style='width:100px;text-align:left'>"+things[ls[i][0]][0]+"×"+format(ls[i][1])+"</td>"
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
                if(player.exchangeCodeList.includes("67b19dc018f9d3bd3e60411f8c526680d790c9b7857d165d75623d594bb22385")){
                    str+="极爽会员<br>经验金钱收益+250%<br>攻速+25<br>材料掉落概率加9倍<br>技能触发概率+9%<br>签到收益提升至×2<br>签到间隔缩短至12h<br>"
                }
                else if(player.exchangeCodeList.includes("ca2e83f083234c985da5e82f10ac733e1b6efd05683766539260fdb8b9a4f1ed")){
                    str+="超爽会员<br>经验金钱收益+150%<br>攻速+15<br>材料掉落概率加5倍<br>技能触发概率+5%<br>签到收益提升至×1.5<br>签到间隔缩短至12h<br>"
                }
                else if(player.exchangeCodeList.includes("04a83db3606e208c09a2410fa764cfdc76639427377b18faac308535e499760c")){
                    str+="很爽会员<br>经验金钱收益+100%<br>攻速+10<br>材料掉落概率加3倍<br>技能触发概率+3%<br>签到收益提升至×1.5<br>"
                }
                else if(player.exchangeCodeList.includes("dcc8111b8017e31dbd35ad4aad96be2ca3b83d3c901e52d4a95710542c71f81b")){
                    str+="略爽会员<br>经验金钱收益+50%<br>攻速+5<br>材料掉落概率加2倍<br>技能触发概率+2%<br>签到收益提升至×1.3<br>"
                }
                else if(player.exchangeCodeList.includes("a9633b80fceaf953fcbd4ba85936e5d26cd00514ab438f3e07825ab74ccb4e16")){
                    str+="微爽会员<br>经验金钱收益+20%<br>攻速+2<br>材料掉落概率加1倍<br>技能触发概率+1%<br>签到收益提升至×1.2<br>"
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
                str+="攻击+"+format(player.weaponLv[0]>=1?n(1000).mul(n(1.5).pow(player.weaponLv[0]-1)).mul(n(1.01).pow(player.weaponLv[1])):n(0))+"<br><br>"
                if(player.weaponLv[0]>=1){
                    str+="升级需要 金钱×"+format(CalcWeaponNeed(0))+" <button onclick='UpgradeWeapon(1)'>升级</button>"
                    str+="<button onclick='UpgradeWeapon(2)' style='margin-left:2px'>连续升级</button><br><br>"
                }
                str+="升阶需要 陨铁×"+format(CalcWeaponNeed(1))+" <button onclick='UpgradeWeapon(0)'>升阶</button><br>"
                str+="下一阶 "+weaponName[Math.min(player.weaponLv[0]+1,99)]+(player.weaponLv[0]+1>=99?"·"+(player.weaponLv[0]+1-99)+"阶":"")+"<br>"
                str+="<br>每一阶令武器增益×1.5<br>每一级令武器增益×1.01"
            }
            else if(player.nowBigTab=="盔甲"){
                str+="当前盔甲 "+clothName[Math.min(player.clothLv[0],99)]+(player.clothLv[0]>=99?"·"+(player.clothLv[0]-99)+"阶":"")+"·"+player.clothLv[1]+"级<br>"
                str+="生命+"+format(player.clothLv[0]>=1?n(10000).mul(n(1.5).pow(player.clothLv[0]-1)).mul(n(1.01).pow(player.clothLv[1])):n(0))+"<br><br>"
                if(player.clothLv[0]>=1){
                    str+="升级需要 金钱×"+format(CalcClothNeed(0))+" <button onclick='UpgradeCloth(1)'>升级</button>"
                    str+="<button onclick='UpgradeCloth(2)' style='margin-left:2px'>连续升级</button><br><br>"
                }
                str+="升阶需要 陨铁×"+format(CalcClothNeed(1))+" <button onclick='UpgradeCloth(0)'>升阶</button><br>"
                str+="下一阶 "+clothName[Math.min(player.clothLv[0]+1,99)]+(player.clothLv[0]+1>=99?"·"+(player.clothLv[0]+1-99)+"阶":"")+"<br>"
                str+="<br>每一阶令盔甲增益×1.5<br>每一级令盔甲增益×1.01"
            }
            else if(player.nowBigTab=="技能"){
                str+="<table>"
                for(let i=0;i<skillName.length;i++){
                    str+="<tr>"
                    str+="<td style='width:150px;text-align:left'>"+skillName[i]+"·"+player.skillLv[i]+"阶 "
                    str+="<text style='color:"+skillColor[i]+"'>■</td>"
                    str+="<td style='width:150px;text-align:left'>伤害系数"+format(player.skillLv[i]==0?0:n(500).mul(n(1.1).pow(player.skillLv[i]-1)),0)+"%</td>"
                    str+="<td style='width:150px;text-align:left'>攻击+"+format(player.skillLv[i]==0?0:n(50).mul(n(1.1).pow(player.skillLv[i]-1)),0)+"%</td>"
                    str+="<td style='width:100px'></td>"
                    str+="<td style='width:250px;text-align:right'>消耗 技能书×"+format(CalcSkillNeed(i),0)+" <button onclick='UpgradeSkill("+i+")'>升阶</button>"
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
                    str+="<td style='width:150px;text-align:left'>伤害系数"+format(player.animalLv[i]==0?0:n(25).mul(n(1.1).pow(player.animalLv[i]-1)),0)+"%</td>"
                    str+="<td style='width:150px;text-align:left'>生命+"+format(player.animalLv[i]==0?0:n(50).mul(n(1.1).pow(player.animalLv[i]-1)),0)+"%</td>"
                    str+="<td style='width:100px'></td>"
                    str+="<td style='width:250px;text-align:right'>消耗 兽符×"+format(CalcAnimalNeed(i),0)+" <button onclick='UpgradeAnimal("+i+")'>升阶</button>"
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
                +"<td style='width:200px;text-align:right'>消耗宝石碎片×"+format(CalcGemNeed(0),0)+"<button onclick='UpgradeGem(0,0)'>合成</button></td><td><button style='margin-left:-10px' onclick='UpgradeGem(0,1)'>连续合成</button></td></tr>"
                str+="<tr><td style='width:200px;text-align:left'>"+Math.floor(player.gemLv[1]/100+1)+"阶生命宝石 ("+(player.gemLv[1]-Math.floor(player.gemLv[1]/100)*100)
                +"/100)</td><td style='width:150px;text-align:left'>生命+"+format(CalcGemMul(1),0)+"%</td>"
                +"<td style='width:200px;text-align:right'>消耗宝石碎片×"+format(CalcGemNeed(1),0)+"<button onclick='UpgradeGem(1,0)'>合成</button></td><td><button style='margin-left:-10px' onclick='UpgradeGem(1,1)'>连续合成</button></td></tr>"
                str+="</table>"
                str+="<br>每一阶宝石合成满以后提升对应属性1.5倍"
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