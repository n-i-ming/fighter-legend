function CalcAttribute(){
    player.atk=n(10).mul(player.lv+1)
    player.hp=n(100).mul(player.lv+1)

    player.atk=player.atk.add(player.weaponLv[0]>=1?n(1000).mul(n(1.5).pow(player.weaponLv[0]-1)).mul(n(1.01).pow(player.weaponLv[1])):n(0))
    player.hp=player.hp.add(player.clothLv[0]>=1?n(10000).mul(n(1.5).pow(player.clothLv[0]-1)).mul(n(1.01).pow(player.clothLv[1])):n(0))

    player.atk=player.atk.mul(n(1.001).pow(player.lv))
    player.hp=player.hp.mul(n(1.001).pow(player.lv))

    player.atkSpeed=5
    player.dropLuck=1
    player.expmoneyMul=1
    player.skillLuck=1
    if(player.exchangeCodeList.includes("67b19dc018f9d3bd3e60411f8c526680d790c9b7857d165d75623d594bb22385")){
        player.atkSpeed+=25
        player.dropLuck*=10
        player.expmoneyMul*=3.5
        player.skillLuck+=9
    }
    else if(player.exchangeCodeList.includes("ca2e83f083234c985da5e82f10ac733e1b6efd05683766539260fdb8b9a4f1ed")){
        player.atkSpeed+=20
        player.dropLuck*=6
        player.expmoneyMul*=2.5
        player.skillLuck+=5
    }
    else if(player.exchangeCodeList.includes("04a83db3606e208c09a2410fa764cfdc76639427377b18faac308535e499760c")){
        player.atkSpeed+=10
        player.dropLuck*=4
        player.expmoneyMul*=2
        player.skillLuck+=3
    }
    else if(player.exchangeCodeList.includes("dcc8111b8017e31dbd35ad4aad96be2ca3b83d3c901e52d4a95710542c71f81b")){
        player.atkSpeed+=5
        player.dropLuck*=3
        player.expmoneyMul*=1.5
        player.skillLuck+=2
    }
    else if(player.exchangeCodeList.includes("a9633b80fceaf953fcbd4ba85936e5d26cd00514ab438f3e07825ab74ccb4e16")){
        player.atkSpeed+=5
        player.dropLuck*=2
        player.expmoneyMul*=1.2
        player.skillLuck+=1
    }
}
// var dropList=[[100,200,"金钱",n(1e5),0.5]]
// var damageList=[["me",-50,-50,n(1e5),0.5]]
// var damageDrawList=[["me",1]]
var dropList=[]
var damageList=[]
var damageDrawList=[]
function ResetFight(){
    player.monsterHp=n(1.1).pow(player.monsterLv).mul(1000)
    player.monsterAtk=n(1.1).pow(player.monsterLv).mul(1)
    player.hpnow=player.hp
}
function DealDamage(str,dmg,extra){
    if(str=="me"){
        dropList.push([random()*550,random()*450,"经验",n(10).mul(player.monsterLv+1).mul(player.expmoneyMul),0])
        player.exp=player.exp.add(n(10).mul(player.monsterLv+1).mul(player.expmoneyMul))
        dropList.push([random()*550,random()*450,"金钱",n(dmg).mul(player.expmoneyMul),0])
        player.money=player.money.add(n(dmg).mul(player.expmoneyMul))
        let ls=ThingList()
        for(let i=0;i<ls.length;i++){
            if(random()<=5*player.dropLuck/1000){
                dropList.push([random()*550,random()*450,things[ls[i][0]][0],ls[i][1],0])
                player[things[ls[i][0]][2]]=player[things[ls[i][0]][2]].add(ls[i][1])
            }
        }
    }
    damageList.push([str,random()*(-150)+50,random()*(-100)-20,n(dmg),0,extra])
    if(str=="me"){
        player.monsterHp=player.monsterHp.sub(dmg)
        if(player.monsterHp.lt(0)){
            player.monsterLv+=1
            ResetFight()
        }
    }
    else{
        player.hpnow=player.hpnow.sub(dmg)
        if(player.hpnow.lt(0)){
            ResetFight()
        }
    }
}
function ThingList(){
    let ls=[]
    for(let i=0;i<things.length;i++){
        if(player.monsterLv>=things[i][1]){
            ls.push([i,n(1+Math.floor((player.monsterLv-things[i][1])/100))])
        }
    }
    return ls
}
function DealGet(dif){
    let tms=Math.floor(dif*player.atkSpeed)
    player.exp=player.exp.add(n(10).mul(player.monsterLv+1).mul(player.expmoneyMul).mul(tms))
    player.money=player.money.add(n(player.atk).mul(player.expmoneyMul).mul(tms))
    let ls=ThingList()
    for(let i=0;i<ls.length;i++){
        player[things[ls[i][0]][2]]=player[things[ls[i][0]][2]].add(n(ls[i][1]).mul(Math.floor(tms*5*player.dropLuck/1000)))
    }
}
function DealFight(dif){
    player.atkTime+=dif
    player.monsterAtkTime+=dif
    for(let i=0;i<damageDrawList.length;i++){
        damageDrawList[i][1]+=dif/1.2
        if(damageDrawList[i][1]>=1){
            let damage=(damageDrawList[i][0]=="me"?player.atk:player.monsterAtk).mul(damageDrawList[i][4])
            DealDamage(damageDrawList[i][0],damage,[damageDrawList[i][2],damageDrawList[i][3]])
            damageDrawList.splice(i,1)
            i--
        }
    }
    for(let i=0;i<dropList.length;i++){
        dropList[i][4]+=dif
        if(dropList[i][4]>=2){
            dropList.splice(i,1)
            i--
        }
    }
    for(let i=0;i<damageList.length;i++){
        damageList[i][4]+=dif
        if(damageList[i][4]>=2){
            damageList.splice(i,1)
            i--
        }
    }

    while(player.atkTime>=1/player.atkSpeed){
        player.atkTime-=1/player.atkSpeed
        let hs=false
        for(let i=0;i<skillName.length;i++){
            if(player.skillLv[i]>=1){
                if(random()<=player.skillLuck/100){
                    hs=true
                    damageDrawList.push(["me",0,"skill",i,n(5).mul(n(1.1).pow(player.skillLv[i]))])
                }
            }
        }
        if(hs==false){
            damageDrawList.push(["me",0,"normal",0,n(1)])
        }
    }
    while(player.monsterAtkTime>=1/player.monsterAtkSpeed){
        player.monsterAtkTime-=1/player.monsterAtkSpeed
        damageDrawList.push(["monster",0,"normal",0,n(1)])
    }
}
function DrawFight(){
    if(document.getElementById("mycanvas")===null || document.getElementById("mycanvas")===undefined){
        return ""
    }
    let canvas=document.getElementById("mycanvas").getBoundingClientRect(),str=""
    str+="<table>"
    str+="<tr>"
    str+="<td style='width:150px;text-align:left'>你</td>"
    str+="<td style='width:300px;text-align:left'>　</td>"
    str+="<td style='width:150px;text-align:right'>"+monsterName[Math.floor(player.monsterLv/1000)]+"</td>"
    str+="</tr>"
    str+="<tr>"
    str+="<td style='width:150px;text-align:left'>血量 "+format(player.hpnow,0)+"</td>"
    str+="<td style='width:300px;text-align:left'>　</td>"
    str+="<td style='width:150px;text-align:right'>"+format(player.monsterHp,0)+" 血量</td>"
    str+="</tr>"
    str+="</table>"
    for(let i=0;i<dropList.length;i++){
        let x=document.getElementById("mycanvas").getBoundingClientRect().x+dropList[i][0]
        let y=document.getElementById("mycanvas").getBoundingClientRect().y+dropList[i][1]
        if((dropList[i][2]=="金钱" && player.toggle[1]==0)
        || (dropList[i][2]=="经验" && player.toggle[0]==0)
        || (dropList[i][2]!="经验" && dropList[i][2]!="金钱" && player.toggle[2]==0))
        str+=`<div style='
        z-index:${dropList[i][2]=="金钱"?1:dropList[i][2]=="经验"?0:2};
        opacity:${Calc(dropList[i][4],2)};
        position:absolute;left:${x}px;top:${y}px'>
        <text style='color:${dropList[i][2]=="金钱"?"gold":dropList[i][2]=="经验"?"green":"blue"}'>${dropList[i][2]}</text>+${format(dropList[i][3],0)}</div>`
    }
    for(let i=0;i<damageList.length;i++){
        let x=document.getElementById("mycanvas").getBoundingClientRect().x+damageList[i][1]+(damageList[i][0]=="me"?600:0)
        let y=document.getElementById("mycanvas").getBoundingClientRect().y+damageList[i][2]+500
        if((damageList[i][5][0]=="skill"?player.toggle[5]==0:player.toggle[3]==0))
        str+=`<div style='
        color:${damageList[i][5][0]=="skill"?skillColor[damageList[i][5][1]]:"red"};
        opacity:${Calc(damageList[i][4],2)};
        position:absolute;left:${x}px;top:${y}px'>-${format(damageList[i][3],0)}${damageList[i][5][0]=="skill"?"("+skillName[damageList[i][5][1]]+")":""}</div>`
    }
    for(let i=0;i<damageDrawList.length;i++){
        let x=document.getElementById("mycanvas").getBoundingClientRect().x+(damageDrawList[i][0]=="me"?50:550)+(damageDrawList[i][0]=="me"?500:-500)*damageDrawList[i][1]
        let y=document.getElementById("mycanvas").getBoundingClientRect().y+500+10+(damageDrawList[i][0]=="me"?0:-15)
        if((damageDrawList[i][2]=="skill"?player.toggle[6]==0:player.toggle[4]==0))
        str+=`<div style='
        background-color:${damageDrawList[i][0]=="me"?damageDrawList[i][2]=="skill"?skillColor[damageDrawList[i][3]]:"blue"
            :"red"};position:absolute;left:${x}px;top:${y}px;
        height:10px;width:10px;border-radius:${damageDrawList[i][2]=="skill"?0:10}px'></div>`
    }
    return str
}
function Calc(x,al){
    if(x<al*0.8){
        return 1
    }
    else{
        return (al-x)/al*5
    }
}
function CalcExpNeed(x){
    if(x<=200)return n(10000)
    if(x<=500)return n(20000)
    if(x<=1000)return n(50000)
    if(x<=1500)return n(75000)
    if(x<=2000)return n(100000)
    if(x<=3000)return n(200000)
    if(x<=4000)return n(300000)
    if(x<=5000)return n(500000)
    if(x<=7500)return n(1e6)
    if(x<=10000)return n(2e6)
    if(x<=15000)return n(3e6)
    if(x<=20000)return n(4e6)
    if(x<=25000)return n(5e6)
    if(x<=30000)return n(7.5e6)
    if(x<=40000)return n(1e7)
    return n(1e308)
}
function AutoUpgrade(){
    while(player.exp.gte(CalcExpNeed(player.lv))){
        player.exp=player.exp.sub(CalcExpNeed(player.lv))
        player.lv+=1
    }
}
function CalcWeaponNeed(type){
    if(type==0){
        return n(10000).mul(n(1.015).pow(player.weaponLv[1]))
    }
    else{
        return n(10).mul(n(1.2).pow(player.weaponLv[0])).floor()
    }
}
function UpgradeWeapon(type){
    if(type==0){
        if(player.iron.gte(CalcWeaponNeed(1))){
            logs.push("消耗 陨铁×"+format(CalcWeaponNeed(1))+" 成功升阶武器")
            player.iron=player.iron.sub(CalcWeaponNeed(1))
            player.weaponLv[0]+=1
        }
        else{
            logs.push("陨铁不足")
        }
    }
    else if(type==1){
        if(player.money.gte(CalcWeaponNeed(0))){
            logs.push("消耗 金钱×"+format(CalcWeaponNeed(0))+" 成功升级武器")
            player.money=player.money.sub(CalcWeaponNeed(0))
            player.weaponLv[1]+=1
        }
        else{
            logs.push("金钱不足")
        }
    }
    else{
        while(1){
            if(player.money.gte(CalcWeaponNeed(0))){
                logs.push("消耗 金钱×"+format(CalcWeaponNeed(0))+" 成功升级武器")
                player.money=player.money.sub(CalcWeaponNeed(0))
                player.weaponLv[1]+=1
            }
            else{
                logs.push("金钱不足")
                break
            }
        }
    }
}
function CalcClothNeed(type){
    if(type==0){
        return n(10000).mul(n(1.015).pow(player.clothLv[1]))
    }
    else{
        return n(10).mul(n(1.2).pow(player.clothLv[0])).floor()
    }
}
function UpgradeCloth(type){
    if(type==0){
        if(player.iron.gte(CalcClothNeed(1))){
            logs.push("消耗 陨铁×"+format(CalcClothNeed(1))+" 成功升阶武器")
            player.iron=player.iron.sub(CalcClothNeed(1))
            player.clothLv[0]+=1
        }
        else{
            logs.push("陨铁不足")
        }
    }
    else if(type==1){
        if(player.money.gte(CalcClothNeed(0))){
            logs.push("消耗 金钱×"+format(CalcClothNeed(0))+" 成功升级武器")
            player.money=player.money.sub(CalcClothNeed(0))
            player.clothLv[1]+=1
        }
        else{
            logs.push("金钱不足")
        }
    }
    else{
        while(1){
            if(player.money.gte(CalcClothNeed(0))){
                logs.push("消耗 金钱×"+format(CalcClothNeed(0))+" 成功升级武器")
                player.money=player.money.sub(CalcClothNeed(0))
                player.clothLv[1]+=1
            }
            else{
                logs.push("金钱不足")
                break
            }
        }
    }
}
function CalcSkillNeed(id){
    return n(30).mul(n(1.2).pow(player.skillLv[id])).floor()
}
function UpgradeSkill(id){
    if(player.skillbook.gte(CalcSkillNeed(id))){
        logs.push("消耗 技能书×"+format(CalcSkillNeed(id))+" 成功升阶技能")
        player.skillbook=player.skillbook.sub(CalcSkillNeed(id))
        player.skillLv[id]+=1
    }
    else{
        logs.push("技能书不足")
    }
}
function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    return crypto.subtle.digest("SHA-256", msgBuffer)
      .then(hashBuffer => {
        return Array.prototype.map.call(
          new Uint8Array(hashBuffer),
          x => (`00${x.toString(16)}`).slice(-2)
        ).join('');
      });
}
var logs=[]
function DealExchangeCode(){
    sha256(document.getElementById("exchangeCode").value).then(hash=>{
        if(hash=="a9633b80fceaf953fcbd4ba85936e5d26cd00514ab438f3e07825ab74ccb4e16"){
            if(player.exchangeCodeList.includes(hash)){
                logs.push("该兑换码已经使用过")
            }
            else{
                player.exchangeCodeList.push(hash);
                logs.push("微爽会员已激活")
            }
        }
        else if(hash=="dcc8111b8017e31dbd35ad4aad96be2ca3b83d3c901e52d4a95710542c71f81b"){
            if(player.exchangeCodeList.includes(hash)){
                logs.push("该兑换码已经使用过")
            }
            else{
                player.exchangeCodeList.push(hash);
                logs.push("略爽会员已激活")
            }
        }
        else if(hash=="04a83db3606e208c09a2410fa764cfdc76639427377b18faac308535e499760c"){
            if(player.exchangeCodeList.includes(hash)){
                logs.push("该兑换码已经使用过")
            }
            else{
                player.exchangeCodeList.push(hash);
                logs.push("很爽会员已激活")
            }
        }
        else if(hash=="ca2e83f083234c985da5e82f10ac733e1b6efd05683766539260fdb8b9a4f1ed"){
            if(player.exchangeCodeList.includes(hash)){
                logs.push("该兑换码已经使用过")
            }
            else{
                player.exchangeCodeList.push(hash);
                logs.push("超爽会员已激活")
            }
        }
        else if(hash=="67b19dc018f9d3bd3e60411f8c526680d790c9b7857d165d75623d594bb22385"){
            if(player.exchangeCodeList.includes(hash)){
                logs.push("该兑换码已经使用过")
            }
            else{
                player.exchangeCodeList.push(hash);
                logs.push("极爽会员已激活")
            }
        }
        else{
            logs.push("兑换码 无效")
        }
    })
}