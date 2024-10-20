function CalcAttribute(){
    player.atk=n(10).mul(player.lv+1)
    player.hp=n(100).mul(player.lv+1)

    player.atk=player.atk.add(player.weaponLv[0]>=1?n(1000).mul(n(1.5).pow(player.weaponLv[0]-1)).mul(n(1.01).pow(player.weaponLv[1])):n(0))
    player.hp=player.hp.add(player.clothLv[0]>=1?n(10000).mul(n(1.5).pow(player.clothLv[0]-1)).mul(n(1.01).pow(player.clothLv[1])):n(0))

    player.atk=player.atk.mul(n(1.001).pow(player.lv))
    player.hp=player.hp.mul(n(1.001).pow(player.lv))

    for(let i=0;i<4;i++){
        player.hp=player.hp.mul(n(1).add(player.animalLv[i]==0?0:n(0.5).mul(n(1.1).pow(player.animalLv[i]-1)),0))
    }
    for(let i=0;i<5;i++){
        player.atk=player.atk.mul(n(1).add(player.skillLv[i]==0?0:n(0.5).mul(n(1.1).pow(player.skillLv[i]-1)),0))
    }

    player.atk=player.atk.mul(n(1).add(CalcGemMul(0).div(100)))
    player.hp=player.hp.mul(n(1).add(CalcGemMul(1).div(100)))

    player.atk=player.atk.mul(n(1.1).pow(player.swordLv))
    for(let i=0;i<5;i++){
        player.atk=player.atk.mul(n(1).add(player.soldierLv[i]==0?0:soldierName[i][1].div(100)).pow(player.soldierLv[i]))
        player.hp=player.hp.mul(n(1).add(player.soldierLv[i]==0?0:soldierName[i][2].div(100)).pow(player.soldierLv[i]))
    }

    player.spiritPoint=n(0)
    for(let i=0;i<5;i++){
        player.spiritPoint=player.spiritPoint.add(player.spiritLv[i]*(i+1))
    }
    player.atk=player.atk.mul(n(1.01).pow(player.spiritPoint))
    player.hp=player.hp.mul(n(1.01).pow(player.spiritPoint))

    player.daggerPoint=n(0)
    for(let i=0;i<4;i++){
        player.daggerPoint=player.daggerPoint.add(player.daggerLv[i]*(i+1))
    }

    for(let i=0;i<4;i++){
        player.atk=player.atk.mul(n(1.1).pow(Math.max(0,player.partLv[i])))
    }

    for(let i=0;i<5;i++){
        player.atk=player.atk.mul(n(1).add((i+1)*0.05).pow(player.pelletLv[i]))
        player.hp=player.hp.mul(n(1).add((i+1)*0.05).pow(player.pelletLv[i]))
    }

    player.hp=player.hp.mul(n(2).pow(player.orbLv))

    player.atkSpeed=5
    player.dropLuck=1
    player.expmoneyMul=1
    player.expMul=n(1)
    player.moneyMul=n(1)
    player.skillLuck=1
    player.qiandaoMul=n(2)
    player.qiandaoCD=86400
    player.swordCD=10
    player.swordPer=n(1.01)
    player.thingMul=n(1)
    if(player.exchangeCodeList.includes("794a01ec79ccc88dd1492824822c5b3d9ab049cae238eebd71db87295878ce91")){
        player.atkSpeed+=45
        player.dropLuck*=20
        player.expmoneyMul*=7.5
        player.skillLuck+=19
        player.qiandaoMul=n(50)
        player.qiandaoCD=43200
        player.swordCD=0.5
        player.swordPer=n(1.2)
    }
    else if(player.exchangeCodeList.includes("1516e9db625c9b9d95db1f211c58347b198901a3c4ac6949e66039db138954ac")){
        player.atkSpeed+=35
        player.dropLuck*=15
        player.expmoneyMul*=5
        player.skillLuck+=14
        player.qiandaoMul=n(20)
        player.qiandaoCD=43200
        player.swordCD=0.75
        player.swordPer=n(1.15)
    }
    else if(player.exchangeCodeList.includes("67b19dc018f9d3bd3e60411f8c526680d790c9b7857d165d75623d594bb22385")){
        player.atkSpeed+=25
        player.dropLuck*=10
        player.expmoneyMul*=3.5
        player.skillLuck+=9
        player.qiandaoMul=n(10)
        player.qiandaoCD=43200
        player.swordCD=1
        player.swordPer=n(1.10)
    }
    else if(player.exchangeCodeList.includes("ca2e83f083234c985da5e82f10ac733e1b6efd05683766539260fdb8b9a4f1ed")){
        player.atkSpeed+=20
        player.dropLuck*=6
        player.expmoneyMul*=2.5
        player.skillLuck+=5
        player.qiandaoMul=n(7)
        player.qiandaoCD=43200
        player.swordCD=2
        player.swordPer=n(1.07)
    }
    else if(player.exchangeCodeList.includes("04a83db3606e208c09a2410fa764cfdc76639427377b18faac308535e499760c")){
        player.atkSpeed+=10
        player.dropLuck*=4
        player.expmoneyMul*=2
        player.skillLuck+=3
        player.qiandaoMul=n(5)
        player.swordCD=3
        player.swordPer=n(1.05)
    }
    else if(player.exchangeCodeList.includes("dcc8111b8017e31dbd35ad4aad96be2ca3b83d3c901e52d4a95710542c71f81b")){
        player.atkSpeed+=5
        player.dropLuck*=3
        player.expmoneyMul*=1.5
        player.skillLuck+=2
        player.qiandaoMul=n(4)
        player.swordCD=5
        player.swordPer=n(1.03)
    }
    else if(player.exchangeCodeList.includes("a9633b80fceaf953fcbd4ba85936e5d26cd00514ab438f3e07825ab74ccb4e16")){
        player.atkSpeed+=5
        player.dropLuck*=2
        player.expmoneyMul*=1.2
        player.skillLuck+=1
        player.qiandaoMul=n(3)
        player.swordCD=7
        player.swordPer=n(1.02)
    }

    player.swordPower=player.swordPer.pow(n(Math.floor(player.swordLv/10)))

    player.expMul=player.expMul.mul(n(1).add(0.01*player.orbLv))
    player.moneyMul=player.moneyMul.mul(n(2).pow(player.orb1Lv))
    player.thingMul=player.thingMul.mul(n(1).add(0.01*player.orb1Lv))

    player.atk=player.atk.mul(player.qiandaoMul.pow(player.qiandaoTimes))
    player.hp=player.hp.mul(player.qiandaoMul.pow(player.qiandaoTimes))
}
// var dropList=[[100,200,"金钱",n(1e5),0.5]]
// var damageList=[["me",-50,-50,n(1e5),0.5]]
// var damageDrawList=[["me",1]]
var dropList=[]
var damageList=[]
var damageDrawList=[]
function ResetFight(){
    let x=n(1.1).pow(Math.min(player.monsterLv,5000))
    x=x.mul(n(1.2).pow(Math.max(0,Math.min(player.monsterLv-5000,5000))))
    x=x.mul(n(1.5).pow(Math.max(0,Math.min(player.monsterLv-10000,5000))))
    x=x.mul(n(2).pow(Math.max(0,Math.min(player.monsterLv-15000,5000))))
    x=x.mul(n(2.5).pow(Math.max(0,Math.min(player.monsterLv-20000,5000))))
    x=x.mul(n(3).pow(Math.max(0,Math.min(player.monsterLv-25000,5000))))
    x=x.mul(n(4).pow(Math.max(0,Math.min(player.monsterLv-30000,5000))))
    x=x.mul(n(5).pow(Math.max(0,Math.min(player.monsterLv-35000,5000))))
    x=x.mul(n(6).pow(Math.max(0,Math.min(player.monsterLv-40000,5000))))
    x=x.mul(n(7).pow(Math.max(0,Math.min(player.monsterLv-45000,5000))))
    x=x.mul(n(8).pow(Math.max(0,Math.min(player.monsterLv-50000,5000))))
    x=x.mul(n(10).pow(Math.max(0,Math.min(player.monsterLv-55000,5000))))
    x=x.mul(n(12).pow(Math.max(0,Math.min(player.monsterLv-60000,5000))))
    x=x.mul(n(15).pow(Math.max(0,Math.min(player.monsterLv-65000,5000))))
    x=x.mul(n(20).pow(Math.max(0,Math.min(player.monsterLv-70000,5000))))
    x=x.mul(n(25).pow(Math.max(0,Math.min(player.monsterLv-75000,5000))))
    x=x.mul(n(30).pow(Math.max(0,Math.min(player.monsterLv-80000,5000))))
    x=x.mul(n(40).pow(Math.max(0,Math.min(player.monsterLv-85000,5000))))
    x=x.mul(n(50).pow(Math.max(0,Math.min(player.monsterLv-90000,5000))))
    x=x.mul(n(75).pow(Math.max(0,Math.min(player.monsterLv-95000,5000))))
    x=x.mul(n(100).pow(Math.max(0,Math.min(player.monsterLv-100000,5000))))
    if(player.monsterLv>=100000){
        x=x.mul(n(100).pow(n(player.monsterLv/100000).pow(5).sub(1).mul(100000)))
    }
    player.monsterHp=x.mul(1000)
    player.monsterAtk=x
    player.hpnow=player.hp
    player.kuangbaoTime=0
    player.daggerLevel=n(0)
}
function DealDamage(str,dmg,extra){
    if(str=="me"){
        dropList.push([random()*550,random()*450,"经验",n(10).mul(player.monsterLv+1).mul(player.expmoneyMul).mul(player.expMul),0])
        player.exp=player.exp.add(n(10).mul(player.monsterLv+1).mul(player.expmoneyMul).mul(player.expMul))
        dropList.push([random()*550,random()*450,"金钱",n(dmg).mul(player.expmoneyMul).mul(player.moneyMul),0])
        player.money=player.money.add(n(dmg).mul(player.expmoneyMul).mul(player.moneyMul))
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
        player.daggerLevel=player.daggerLevel.add(player.daggerPoint)
        if(extra[0]=="sword"){
            player.monsterHp=player.monsterHp.div(player.swordPower)
        }
        else{
            player.monsterHp=player.monsterHp.sub(dmg)
        }
        if(player.monsterHp.lt(0)){
            player.monsterLv+=1
            ResetFight()
        }
    }
    else{
        if(player.shield.gt(0)){
            dmg=dmg.sub(player.shield).max(0)
            player.shield=n(0)
        }
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
            ls.push([i,n(1+Math.floor((player.monsterLv-things[i][1])/100)).mul(n(2).pow(Math.floor((player.monsterLv-things[i][1])/1000))).mul(player.thingMul)])
        }
    }
    return ls
}
function DealGet(dif){
    let tms=Math.floor(dif*player.atkSpeed)
    let ntms=tms
    for(let i=0;i<4;i++){
        if(player.animalLv[i]>0){
            ntms+=tms/5
        }
    }
    for(let i=0;i<4;i++){
        if(player.partLv[i]>0){
            ntms+=tms/10
        }
    }
    if(player.swordLv>=10){
        ntms+=tms/player.swordCD
    }
    player.exp=player.exp.add(n(10).mul(player.monsterLv+1).mul(player.expmoneyMul).mul(ntms).mul(player.expMul))
    player.money=player.money.add(n(player.atk).mul(player.expmoneyMul).mul(tms).mul(player.moneyMul))
    let swordTimes=Math.floor(dif/player.swordCD)
    ResetFight()
    while(swordTimes>player.monsterHp.div(player.atk.mul(n(5).mul(n(1.1).pow(player.skillLv[0])))).logBase(player.swordPower).toNumber()){
        console.log(player.monsterHp.div(player.atk.mul(n(5).mul(n(1.1).pow(player.skillLv[0])))).logBase(player.swordPower).toNumber())
        player.money=player.money.add(player.monsterHp)
        swordTimes-=player.monsterHp.div(player.atk.mul(n(5).mul(n(1.1).pow(player.skillLv[0])))).logBase(player.swordPower).toNumber()
        player.monsterLv+=1
        ResetFight()
    }
    let ls=ThingList()
    for(let i=0;i<ls.length;i++){
        player[things[ls[i][0]][2]]=player[things[ls[i][0]][2]].add(n(ls[i][1]).mul(Math.floor(tms*5*player.dropLuck/1000)))
    }
}
function DealFight(dif){
    player.atkTime=Math.max(0,player.atkTime)
    player.monsterAtkTime=Math.max(0,player.monsterAtkTime)
    for(let i=0;i<4;i++){
        player.animalAtkTime[i]=Math.max(0,player.animalAtkTime[i])
    }
    player.swordAtkTime=Math.max(0,player.swordAtkTime)
    for(let i=0;i<4;i++){
        player.partAtkTime[i]=Math.max(0,player.partAtkTime[i])
    }
    player.atkTime+=dif
    if(player.zhendangTime==0){
        player.monsterAtkTime+=dif
    }
    for(let i=0;i<4;i++){
        if(player.animalLv[i]>=1){
            player.animalAtkTime[i]+=dif*(random()+0.5)
        }
    }
    for(let i=0;i<4;i++){
        if(player.partLv[i]>=0){
            player.partAtkTime[i]+=dif*(random()+0.5)
        }
    }
    player.swordAtkTime+=dif
    let ct=0
    for(let i=0;i<damageDrawList.length;i++){
        damageDrawList[i][1]+=dif/1.2
        if(damageDrawList[i][1]>=1){
            let damage=(damageDrawList[i][0]=="me"?player.atk:player.monsterAtk).mul(damageDrawList[i][4])
            if(damageDrawList[i][2]=="sword"){
                damage=player.monsterHp.mul(player.swordPower.sub(1)).div(player.swordPower)
            }
            else if(damageDrawList[i][0]=="me"){
                if(player.kuangbaoTime>0)
                damage=damage.mul(5)
                damage=damage.mul(n(1.01).pow(player.daggerLevel))
            }
            if(damageDrawList[i][2]=="part"){
                player.shield=player.hpnow.add(player.shield).mul(2)
            }

            DealDamage(damageDrawList[i][0],damage,[damageDrawList[i][2],damageDrawList[i][3]])
            if(damageDrawList[i][7]<=player.skillLuck/100){
                if(damageDrawList[i][3]==0)player.kuangbaoTime=3
                if(damageDrawList[i][3]==1)player.zhendangTime=2
                if(damageDrawList[i][3]==2){
                    player.hpnow=player.hp.min(player.hpnow.add(player.hp.mul(0.2)))
                    damageList.push(["me",random()*(-150)+50,random()*(-100)-20,player.hp.mul(-0.2),0,[0,0]])
                }
                if(damageDrawList[i][3]==1)ct+=1
            }
            damageDrawList.splice(i,1)
            i--
        }
    }
    for(let i=0;i<damageDrawList.length;i++){
        if(ct>0 && damageDrawList[i][0]=="monster"){
            ct-=1
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
                    damageDrawList.push(["me",0,"skill",i,n(5).mul(n(1.1).pow(player.skillLv[i])),0,0,1])
                }
            }
        }
        if(hs==false){
            damageDrawList.push(["me",0,"normal",0,n(1),0,0,1])
        }
    }
    for(let i=0;i<4;i++){
        while(player.animalAtkTime[i]>=5/player.atkSpeed){
            player.animalAtkTime[i]-=5/player.atkSpeed
            damageDrawList.push(["me",0,"animal",i,n(0.25).mul(n(1.1).pow(player.animalLv[i])),random()*(-20)+10,random()*(-25)+10,random()])
        }
    }
    for(let i=0;i<4;i++){
        while(player.partAtkTime[i]>=10/player.atkSpeed){
            player.partAtkTime[i]-=10/player.atkSpeed
            damageDrawList.push(["me",0,"part",i,0,0,1])
        }
    }
    if(player.swordAtkTime>=player.swordCD){
        player.swordAtkTime-=player.swordCD
        if(player.swordLv>=10){
            damageDrawList.push(["me",0,"sword",0,n(0),0,0,1])
        }
    }
    while(player.monsterAtkTime>=1/player.monsterAtkSpeed){
        player.monsterAtkTime-=1/player.monsterAtkSpeed
        damageDrawList.push(["monster",0,"normal",0,n(1),0,0,1])
    }
}
function DrawFight(){
    // return ""
    if(document.getElementById("mycanvas")===null || document.getElementById("mycanvas")===undefined){
        return ""
    }
    let canvas=document.getElementById("mycanvas").getBoundingClientRect(),str=""
    str+="<table>"
    str+="<tr>"
    str+="<td style='width:150px;text-align:left'>你</td>"
    str+="<td style='width:300px;text-align:left'>　</td>"
    str+="<td style='width:150px;text-align:right'>"+monsterName[Math.min(100,Math.floor(player.monsterLv/1000))]+"</td>"
    str+="</tr>"
    str+="<tr>"
    if(player.shield.gt(0)) str+="<td style='width:150px;text-align:left'><text style='color:blue'>护盾 "+format(player.shield,0)+"</text></td>"
    else str+="<td style='width:150px;text-align:left'>血量 "+format(player.hpnow,0)+"</td>"
    str+="<td style='width:300px;text-align:left'>　</td>"
    str+="<td style='width:150px;text-align:right'>"+format(player.monsterHp,0)+" 血量</td>"
    str+="</tr>"
    str+="<tr>"
    str+="<td style='width:150px;text-align:left'>"+(player.kuangbaoTime>0?"<text style='color:red'>狂暴</text>":"")+"</td>"
    str+="<td style='width:300px;text-align:left'>　</td>"
    str+="<td style='width:150px;text-align:right'>"+(player.zhendangTime>0?"<text style='color:blue'>震荡</text>":"")+"</td>"
    str+="</tr>"
    str+="<tr>"
    str+="<td style='width:150px;text-align:left'>　</td>"
    str+="<td style='width:300px;text-align:left'>　</td>"
    str+="<td style='width:150px;text-align:right'>"+(player.daggerLevel.gt(0)?"碎甲×"+format(player.daggerLevel):"")+"</td>"
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
        if((damageList[i][5][0]=="part"?player.toggle[11]==0:damageList[i][5][0]=="sword"?player.toggle[9]==0:damageList[i][5][0]=="animal"?player.toggle[7]==0:damageList[i][5][0]=="skill"?player.toggle[5]==0:player.toggle[3]==0))
        str+=`<div style='
        color:${damageList[i][5][0]=="sword"?"gold":damageList[i][5][0]=="animal"?animalColor[damageList[i][5][1]]:damageList[i][5][0]=="skill"?skillColor[damageList[i][5][1]]:"red"};
        opacity:${Calc(damageList[i][4],2)};
        position:absolute;left:${x}px;top:${y}px'>-${format(damageList[i][3],0)}${damageList[i][5][0]=="skill"?"("+skillName[damageList[i][5][1]]+")":""}
        ${damageList[i][5][0]=="animal"?"("+animalName[damageList[i][5][1]]+")":""}
        ${damageList[i][5][0]=="sword"?"(破灭)":""}</div>`
    }
    for(let i=0;i<damageDrawList.length;i++){
        let x=document.getElementById("mycanvas").getBoundingClientRect().x+(damageDrawList[i][0]=="me"?50:550)
        +(damageDrawList[i][2]=="part"?0:damageDrawList[i][0]=="me"?500:-500)*damageDrawList[i][1]
        +(damageDrawList[i][2]=="part"&&damageDrawList[i][3]==2?250+254.95*Math.cos(Math.PI*(168.69-157.38*damageDrawList[i][1])/180):0)
        +(damageDrawList[i][2]=="part"&&damageDrawList[i][3]==3?250+254.95*Math.cos(Math.PI*(168.69-157.38*damageDrawList[i][1])/180):0)
        +(damageDrawList[i][2]=="part"&&damageDrawList[i][3]==0?250+291.55*Math.cos(Math.PI*(149.03-118.06*damageDrawList[i][1])/180):0)
        +(damageDrawList[i][2]=="part"&&damageDrawList[i][3]==1?250+291.55*Math.cos(Math.PI*(149.03-118.06*damageDrawList[i][1])/180):0)
        let y=document.getElementById("mycanvas").getBoundingClientRect().y+500+10+(damageDrawList[i][0]=="me"?0:-15)+(damageDrawList[i][2]=="sword"?-12.5:0)
        +(damageDrawList[i][2]=="part"&&damageDrawList[i][3]==2?50-254.95*Math.sin(Math.PI*(168.69-157.38*damageDrawList[i][1])/180):0)
        +(damageDrawList[i][2]=="part"&&damageDrawList[i][3]==3?-50+254.95*Math.sin(Math.PI*(168.69-157.38*damageDrawList[i][1])/180):0)
        +(damageDrawList[i][2]=="part"&&damageDrawList[i][3]==0?150-291.55*Math.sin(Math.PI*(149.03-118.06*damageDrawList[i][1])/180):0)
        +(damageDrawList[i][2]=="part"&&damageDrawList[i][3]==1?-150+291.55*Math.sin(Math.PI*(149.03-118.06*damageDrawList[i][1])/180):0)
        if((damageDrawList[i][2]=="part"?player.toggle[12]==0:damageDrawList[i][2]=="sword"?player.toggle[10]==0:damageDrawList[i][2]=="animal"?player.toggle[8]==0:damageDrawList[i][2]=="skill"?player.toggle[6]==0:player.toggle[4]==0))
        str+=`<div style='
        ${(damageDrawList[i][2]=="animal"&&damageDrawList[i][7]<=player.skillLuck/100)?"z-index:2;":""}
        ${damageDrawList[i][2]=="part"?"transform:rotate("+
            (damageDrawList[i][3]==2?-(168.69-157.38*damageDrawList[i][1])+45:
             damageDrawList[i][3]==3?(168.69-157.38*damageDrawList[i][1])-135:
             damageDrawList[i][3]==0?-(149.03-118.06*damageDrawList[i][1])+45:(149.03-118.06*damageDrawList[i][1])-135)+"deg);":""}
        ${damageDrawList[i][2]=="part"?"color:orange;":damageDrawList[i][2]=="animal"?"color:"+animalColor[damageDrawList[i][3]]+";":""}
        ${damageDrawList[i][0]=="me"?
            damageDrawList[i][2]=="skill"?"background-color:"+skillColor[damageDrawList[i][3]]:
            damageDrawList[i][2]=="animal"?"":
            damageDrawList[i][2]=="sword"?"":
            damageDrawList[i][2]=="part"?"":"background-color:blue"
            :"background-color:red"};position:absolute;left:${x+(damageDrawList[i][2]=="animal"?damageDrawList[i][5]:0)}px;top:${y+(damageDrawList[i][2]=="animal"?damageDrawList[i][6]:0)}px;
        height:${damageDrawList[i][2]=="sword"?"30px":"10px"};width:${damageDrawList[i][2]=="sword"?"30px":"10px"};
        ${damageDrawList[i][2]=="sword"?"border:3px solid red;clip-path:polygon(75% 0%,75% 100%,100% 100%,100% 0%);":""}
        ${damageDrawList[i][2]=="animal"?"font-size:5px":""}
        border-radius:${damageDrawList[i][2]=="skill"||damageDrawList[i][2]=="animal"?0:100}px'>
        ${(damageDrawList[i][2]=="animal"&&damageDrawList[i][7]<=player.skillLuck/100)?"<text style='text-shadow:0px 0px 10px "+animalColor[damageDrawList[i][3]]+"'>":""}
        ${damageDrawList[i][2]=="part"?"➷":damageDrawList[i][2]=="animal"?"▶":""}
        ${(damageDrawList[i][2]=="animal"&&damageDrawList[i][7]<=player.skillLuck/100)?"</text>":""}</div>`
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
function CalcNeed(xx){
    let x=xx
    if(x>=30)x=Math.pow(x/30,0.75)*30
    if(x>=60)x=Math.pow(x/60,0.5)*60
    return n(10).mul(n(1.2).pow(x)).floor()
}
const ExpNeed=[
    [200,n(10000)],[500,n(20000)],[1000,n(50000)],[1500,n(75000)],[2000,n(100000)],[3000,n(200000)],[4000,n(300000)],[6000,n(500000)],
    [7500,n(1e6)],[10000,n(2e6)],[15000,n(3e6)],[20000,n(4e6)],[25000,n(5e6)],[30000,n(7.5e6)],[40000,n(1e7)],[50000,n(1.2e7)],[60000,n(1.4e7)],
    [70000,n(1.6e7)],[80000,n(1.8e7)],[90000,n(2e7)],[100000,n(2.5e7)],[110000,n(3e7)],[120000,n(3.5e7)],[130000,n(4e7)],[140000,n(4.5e7)],
    [150000,n(5e7)],[160000,n(5.5e7)],[170000,n(6e7)],[180000,n(6.5e7)],[190000,n(7e7)],[200000,n(7.5e7)],[210000,n(8e7)],[220000,n(8.5e7)],
    [230000,n(9e7)],[240000,n(9.5e7)],[250000,n(1e8)],[260000,n(1.1e8)],[270000,n(1.2e8)],[280000,n(1.3e8)],[290000,n(1.4e8)],[300000,n(1.5e8)],
    [3.1e5,n(1.6e8)],[3.2e5,n(1.7e8)],[3.3e5,n(1.8e8)],[3.4e5,n(1.9e8)],[3.5e5,n(2.0e8)],[3.6e5,n(2.1e8)],[3.7e5,n(2.2e8)],[3.8e5,n(2.3e8)],[3.9e5,n(2.4e8)],[4.0e5,n(2.5e8)],
    [4.1e5,n(2.6e8)],[4.2e5,n(2.7e8)],[4.3e5,n(2.8e8)],[4.4e5,n(2.9e8)],[4.5e5,n(3.0e8)],[4.6e5,n(3.1e8)],[4.7e5,n(3.2e8)],[4.8e5,n(3.3e8)],[4.9e5,n(3.4e8)],[5.0e5,n(3.5e8)],
    [5.1e5,n(3.6e8)],[5.2e5,n(3.7e8)],[5.3e5,n(3.8e8)],[5.4e5,n(3.9e8)],[5.5e5,n(4.0e8)],[5.6e5,n(4.1e8)],[5.7e5,n(4.2e8)],[5.8e5,n(4.3e8)],[5.9e5,n(4.4e8)],[6.0e5,n(4.5e8)],
    [6.1e5,n(4.6e8)],[6.2e5,n(4.7e8)],[6.3e5,n(4.8e8)],[6.4e5,n(4.9e8)],[6.5e5,n(5.0e8)],[6.6e5,n(5.1e8)],[6.7e5,n(5.2e8)],[6.8e5,n(5.3e8)],[6.9e5,n(5.4e8)],[7.0e5,n(5.5e8)],
    [7.1e5,n(5.6e8)],[7.2e5,n(5.7e8)],[7.3e5,n(5.8e8)],[7.4e5,n(5.9e8)],[7.5e5,n(6.0e8)],[7.6e5,n(6.1e8)],[7.7e5,n(6.2e8)],[7.8e5,n(6.3e8)],[7.9e5,n(6.4e8)],[8.0e5,n(6.5e8)],
    [8.1e5,n(6.6e8)],[8.2e5,n(6.7e8)],[8.3e5,n(6.8e8)],[8.4e5,n(6.9e8)],[8.5e5,n(7.0e8)],[8.6e5,n(7.1e8)],[8.7e5,n(7.2e8)],[8.8e5,n(7.3e8)],[8.9e5,n(7.4e8)],[9.0e5,n(7.5e8)],
    [9.1e5,n(7.6e8)],[9.2e5,n(7.7e8)],[9.3e5,n(7.8e8)],[9.4e5,n(7.9e8)],[9.5e5,n(8.0e8)],[9.6e5,n(8.2e8)],[9.7e5,n(8.4e8)],[9.8e5,n(8.6e8)],[9.9e5,n(8.8e8)],[1.00e6,n(9.0e8)],
    [1.01e6,n(9.2e8)],[1.02e6,n(9.4e8)],[1.03e6,n(9.6e8)],[1.04e6,n(9.8e8)],[1.05e6,n(1.00e9)],[1.06e6,n(1.02e9)],[1.07e6,n(1.04e9)],[1.08e6,n(1.06e9)],[1.09e6,n(1.08e9)],[1.10e6,n(1.10e9)],
    [1.11e6,n(1.12e9)],[1.12e6,n(1.14e9)],[1.13e6,n(1.16e9)],[1.14e6,n(1.18e9)],[1.15e6,n(1.20e9)],[1.16e6,n(1.22e9)],[1.17e6,n(1.24e9)],[1.18e6,n(1.26e9)],[1.19e6,n(1.28e9)],[1.20e6,n(1.30e9)],
    [1.21e6,n(1.32e9)],[1.22e6,n(1.34e9)],[1.23e6,n(1.36e9)],[1.24e6,n(1.38e9)],[1.25e6,n(1.40e9)],[1.26e6,n(1.42e9)],[1.27e6,n(1.44e9)],[1.28e6,n(1.46e9)],[1.29e6,n(1.48e9)],[1.30e6,n(1.50e9)],
    [1.31e6,n(1.52e9)],[1.32e6,n(1.54e9)],[1.33e6,n(1.56e9)],[1.34e6,n(1.58e9)],[1.35e6,n(1.60e9)],[1.36e6,n(1.62e9)],[1.37e6,n(1.64e9)],[1.38e6,n(1.66e9)],[1.39e6,n(1.68e9)],[1.40e6,n(1.70e9)],
    [1.41e6,n(1.72e9)],[1.42e6,n(1.74e9)],[1.43e6,n(1.76e9)],[1.44e6,n(1.78e9)],[1.45e6,n(1.80e9)],[1.46e6,n(1.82e9)],[1.47e6,n(1.84e9)],[1.48e6,n(1.86e9)],[1.49e6,n(1.88e9)],[1.50e6,n(1.90e9)],
    [1.51e6,n(1.92e9)],[1.52e6,n(1.94e9)],[1.53e6,n(1.96e9)],[1.54e6,n(1.98e9)],[1.55e6,n(2.00e9)],[1.56e6,n(2.02e9)],[1.57e6,n(2.04e9)],[1.58e6,n(2.06e9)],[1.59e6,n(2.08e9)],
    [1.60e6,n(2.10e9)],[1.61e6,n(2.12e9)],[1.62e6,n(2.14e9)],[1.63e6,n(2.16e9)],[1.64e6,n(2.18e9)],[1.65e6,n(2.20e9)],[1.66e6,n(2.22e9)],[1.67e6,n(2.24e9)],[1.68e6,n(2.26e9)],[1.69e6,n(2.28e9)],
    [1.70e6,n(2.30e9)],[1.71e6,n(2.32e9)],[1.72e6,n(2.34e9)],[1.73e6,n(2.36e9)],[1.74e6,n(2.38e9)],[1.75e6,n(2.40e9)],[1.76e6,n(2.42e9)],[1.77e6,n(2.44e9)],[1.78e6,n(2.46e9)],[1.79e6,n(2.48e9)],
    [1.80e6,n(2.50e9)],[1.81e6,n(2.52e9)],[1.82e6,n(2.54e9)],[1.83e6,n(2.56e9)],[1.84e6,n(2.58e9)],[1.85e6,n(2.60e9)],[1.86e6,n(2.62e9)],[1.87e6,n(2.64e9)],[1.88e6,n(2.66e9)],[1.89e6,n(2.68e9)],
    [1.90e6,n(2.70e9)],[1.91e6,n(2.72e9)],[1.92e6,n(2.74e9)],[1.93e6,n(2.76e9)],[1.94e6,n(2.78e9)],[1.95e6,n(2.80e9)],[1.96e6,n(2.82e9)],[1.97e6,n(2.84e9)],[1.98e6,n(2.86e9)],[1.99e6,n(2.88e9)],
    [2.00e6,n(2.90e9)],[2.01e6,n(2.92e9)],[2.02e6,n(2.94e9)],[2.03e6,n(2.96e9)],[2.04e6,n(2.98e9)],[2.05e6,n(3.00e9)],[2.06e6,n(3.02e9)],[2.07e6,n(3.04e9)],[2.08e6,n(3.06e9)],[2.09e6,n(3.08e9)],
    [2.10e6,n(3.10e9)],[2.11e6,n(3.12e9)],[2.12e6,n(3.14e9)],[2.13e6,n(3.16e9)],[2.14e6,n(3.18e9)],[2.15e6,n(3.20e9)],[2.16e6,n(3.22e9)],[2.17e6,n(3.24e9)],[2.18e6,n(3.26e9)],[2.19e6,n(3.28e9)],
    [2.20e6,n(3.30e9)],[2.21e6,n(3.32e9)],[2.22e6,n(3.34e9)],[2.23e6,n(3.36e9)],[2.24e6,n(3.38e9)],[2.25e6,n(3.40e9)],[2.26e6,n(3.42e9)],[2.27e6,n(3.44e9)],[2.28e6,n(3.46e9)],[2.29e6,n(3.48e9)],
    [2.30e6,n(3.50e9)],[2.31e6,n(3.52e9)],[2.32e6,n(3.54e9)],[2.33e6,n(3.56e9)],[2.34e6,n(3.58e9)],[2.35e6,n(3.60e9)],[2.36e6,n(3.62e9)],[2.37e6,n(3.64e9)],[2.38e6,n(3.66e9)],[2.39e6,n(3.68e9)],
    [2.40e6,n(3.70e9)],[2.41e6,n(3.72e9)],[2.42e6,n(3.74e9)],[2.43e6,n(3.76e9)],[2.44e6,n(3.78e9)],[2.45e6,n(3.80e9)],[2.46e6,n(3.82e9)],[2.47e6,n(3.84e9)],[2.48e6,n(3.86e9)],[2.49e6,n(3.88e9)],
    [2.50e6,n(3.90e9)],[2.55e6,n(4.0e9)],
    [2.60e6,n(4.2e9)],[2.65e6,n(4.4e9)],[2.70e6,n(4.6e9)],[2.75e6,n(4.8e9)],[2.80e6,n(5.0e9)],[2.85e6,n(5.2e9)],[2.90e6,n(5.4e9)],[2.95e6,n(5.6e9)],[3.00e6,n(5.8e9)],
    [3.05e6,n(6.0e9)],[3.10e6,n(6.0e9)],[3.15e6,n(6.2e9)],[3.20e6,n(6.4e9)],[3.25e6,n(6.6e9)],[3.30e6,n(6.8e9)],[3.35e6,n(7.0e9)],[3.4e6,n(7.5e9)],[3.5e6,n(8.0e9)],
    [3.6e6,n(8.5e9)],[3.7e6,n(9.0e9)],[3.8e6,n(9.5e9)],[3.9e6,n(1.0e10)],[4.0e6,n(1.1e10)],[4.2e6,n(1.2e10)],[4.4e6,n(1.3e10)],[4.6e6,n(1.4e10)],[4.8e6,n(1.5e10)],
    [5.0e6,n(1.6e10)],[5.2e6,n(1.7e10)],[5.4e6,n(1.8e10)],[5.6e6,n(1.9e10)],[5.8e6,n(2.0e10)],[6.0e6,n(2.1e10)],[7e6,n(2.5e10)],[8e6,n(3e10)],[9e6,n(3.5e10)],
    [1.0e7,n(4e10)],[1.1e7,n(4.5e10)],[1.2e7,n(5e10)],[1.3e7,n(6e10)],[1.4e7,n(7e10)],[1.5e7,n(8e10)],[2e7,n(1e11)]
]
let lst=0
function CalcExpNeed(x){
    for(let i=lst;i<ExpNeed.length;i++,lst++){
        if(x<ExpNeed[i][0]){
            return ExpNeed[i][1]
        }
    }
    return n(1e308)
}
function AutoUpgrade(){
    while(player.exp.gte(CalcExpNeed(player.lv).mul(100))){
        player.exp=player.exp.sub(CalcExpNeed(player.lv).mul(100))
        player.lv+=100
    }
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
        return CalcNeed(player.weaponLv[0])
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
    else if(type==3){
        while(1){
            if(player.iron.gte(CalcWeaponNeed(1))){
                logs.push("消耗 陨铁×"+format(CalcWeaponNeed(1))+" 成功升阶武器")
                player.iron=player.iron.sub(CalcWeaponNeed(1))
                player.weaponLv[0]+=1
            }
            else{
                logs.push("陨铁不足")
                break
            }
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
            if(player.money.gte(CalcWeaponNeed(0).mul(194962390))){
                logs.push("消耗 金钱×"+format(CalcWeaponNeed(0).mul(194962390))+" 成功升级100次武器")
                player.money=player.money.sub(CalcWeaponNeed(0).mul(194962390))
                player.weaponLv[1]+=1000
            }
            else if(player.money.gte(CalcWeaponNeed(0))){
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
        return CalcNeed(player.clothLv[0])
    }
}
function UpgradeCloth(type){
    if(type==0){
        if(player.iron.gte(CalcClothNeed(1))){
            logs.push("消耗 陨铁×"+format(CalcClothNeed(1))+" 成功升阶盔甲")
            player.iron=player.iron.sub(CalcClothNeed(1))
            player.clothLv[0]+=1
        }
        else{
            logs.push("陨铁不足")
        }
    }
    else if(type==3){
        while(1){
            if(player.iron.gte(CalcClothNeed(1))){
                logs.push("消耗 陨铁×"+format(CalcClothNeed(1))+" 成功升阶盔甲")
                player.iron=player.iron.sub(CalcClothNeed(1))
                player.clothLv[0]+=1
            }
            else{
                logs.push("陨铁不足")
                break
            }
        }
    }
    else if(type==1){
        if(player.money.gte(CalcClothNeed(0))){
            logs.push("消耗 金钱×"+format(CalcClothNeed(0))+" 成功升级盔甲")
            player.money=player.money.sub(CalcClothNeed(0))
            player.clothLv[1]+=1
        }
        else{
            logs.push("金钱不足")
        }
    }
    else{
        while(1){
            if(player.money.gte(CalcClothNeed(0).mul(194962390))){
                logs.push("消耗 金钱×"+format(CalcClothNeed(0).mul(194962390))+" 成功升级100次盔甲")
                player.money=player.money.sub(CalcClothNeed(0).mul(194962390))
                player.clothLv[1]+=1000
            }
            else if(player.money.gte(CalcClothNeed(0))){
                logs.push("消耗 金钱×"+format(CalcClothNeed(0))+" 成功升级盔甲")
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
    return CalcNeed(player.skillLv[id])
}
function UpgradeSkill(id,type){
    if(type==0){
        if(player.skillbook.gte(CalcSkillNeed(id))){
            logs.push("消耗 技能书×"+format(CalcSkillNeed(id))+" 成功升阶技能")
            player.skillbook=player.skillbook.sub(CalcSkillNeed(id))
            player.skillLv[id]+=1
        }
        else{
            logs.push("技能书不足")
        }
    }
    else{
        while(1){
            if(player.skillbook.gte(CalcSkillNeed(id))){
                logs.push("消耗 技能书×"+format(CalcSkillNeed(id))+" 成功升阶技能")
                player.skillbook=player.skillbook.sub(CalcSkillNeed(id))
                player.skillLv[id]+=1
            }
            else{
                logs.push("技能书不足")
                return
            }
        }
    }
}
function CalcAnimalNeed(id){
    return CalcNeed(player.animalLv[id])
}
function UpgradeAnimal(id,type){
    if(type==0){
        if(player.animalrune.gte(CalcAnimalNeed(id))){
            logs.push("消耗 兽符×"+format(CalcAnimalNeed(id))+" 成功升阶神兽")
            player.animalrune=player.animalrune.sub(CalcAnimalNeed(id))
            player.animalLv[id]+=1
        }
        else{
            logs.push("兽符不足")
        }
    }
    else{
        while(1){
            if(player.animalrune.gte(CalcAnimalNeed(id))){
                logs.push("消耗 兽符×"+format(CalcAnimalNeed(id))+" 成功升阶神兽")
                player.animalrune=player.animalrune.sub(CalcAnimalNeed(id))
                player.animalLv[id]+=1
            }
            else{
                logs.push("兽符不足")
                return
            }
        }
    }
}
function QianDao(){
    player.qiandaoTimes+=1
    player.qiandaoTime=player.qiandaoCD
}
function CalcGemNeed(id){
    return CalcNeed(Math.floor(player.gemLv[id]/100))
}
function CalcGemMul(id){
    let x=n(Math.floor(player.gemLv[id]/100))
    x=x.add(1).mul(x).div(2)
    x=x.mul(100)
    x=x.add((1+Math.floor(player.gemLv[id]/100))*(player.gemLv[id]-Math.floor(player.gemLv[id]/100)*100))
    x=x.mul(n(1.5).pow(Math.floor(player.gemLv[id]/100)))
    return x
}
function UpgradeGem(id,type){
    if(type==0){
        if(player.gem.gte(CalcGemNeed(id))){
            logs.push("消耗 宝石碎片×"+format(CalcGemNeed(id))+" 成功合成"+(Math.floor(player.gemLv[id]/100)+1)+"阶"+["攻击","生命"][id]+"宝石")
            player.gem=player.gem.sub(CalcGemNeed(id))
            player.gemLv[id]+=1
        }
        else{
            logs.push("宝石碎片不足")
        }
    }
    else{
        while(1){
            if(player.gem.gte(CalcGemNeed(id).mul(100))){
                logs.push("消耗 宝石碎片×"+format(CalcGemNeed(id).mul(100))+" 成功合成"+(Math.floor(player.gemLv[id]/100)+1)+"阶"+["攻击","生命"][id]+"宝石")
                player.gem=player.gem.sub(CalcGemNeed(id).mul(100))
                player.gemLv[id]+=100
            }
            else if(player.gem.gte(CalcGemNeed(id))){
                logs.push("消耗 宝石碎片×"+format(CalcGemNeed(id))+" 成功合成"+(Math.floor(player.gemLv[id]/100)+1)+"阶"+["攻击","生命"][id]+"宝石")
                player.gem=player.gem.sub(CalcGemNeed(id))
                player.gemLv[id]+=1
            }
            else{
                logs.push("宝石碎片不足")
                return
            }
        }
    }
}
function CalcSwordNeed(){
    return CalcNeed(Math.floor(player.swordLv/10)).mul(10)
}
function UpgradeSword(type){
    if(type==0){
        if(player.steel.gte(CalcSwordNeed())){
            logs.push("消耗 精钢×"+format(CalcSwordNeed())+" 成功升级破灭之刃")
            player.steel=player.steel.sub(CalcSwordNeed())
            player.swordLv+=1
        }
        else{
            logs.push("精钢不足")
        }
    }
    else{
        while(1){
            if(player.steel.gte(CalcSwordNeed())){
                logs.push("消耗 精钢×"+format(CalcSwordNeed())+" 成功升级破灭之刃")
                player.steel=player.steel.sub(CalcSwordNeed())
                player.swordLv+=1
            }
            else{
                logs.push("精钢不足")
                return
            }
        }
    }
}
function CalcSoldierNeed(id){
    return CalcNeed(player.soldierLv[id]/2).floor()
}
function UpgradeSoldier(id,type){
    if(type==0){
        if(player.soldierrune.gte(CalcSoldierNeed(id))){
            logs.push("消耗 兵符×"+format(CalcSoldierNeed(id))+" 成功招募 1个"+soldierName[id][0])
            player.soldierrune=player.soldierrune.sub(CalcSoldierNeed(id))
            player.soldierLv[id]+=1
        }
        else{
            logs.push("兵符不足")
        }
    }
    else{
        while(1){
            if(player.soldierrune.gte(CalcSoldierNeed(id))){
                logs.push("消耗 兵符×"+format(CalcSoldierNeed(id))+" 成功招募 1个"+soldierName[id][0])
                player.soldierrune=player.soldierrune.sub(CalcSoldierNeed(id))
                player.soldierLv[id]+=1
            }
            else{
                logs.push("兵符不足")
                return
            }
        }
    }
}
function CalcSpiritNeed(id){
    return CalcNeed(player.spiritLv[id]/(5/(id+1))).floor()
}
function UpgradeSpirit(id,type){
    if(type==0){
        if(player.spirit.gte(CalcSpiritNeed(id))){
            logs.push("消耗 魂魄×"+format(CalcSpiritNeed(id))+" 成功升级"+spiritName[id])
            player.spirit=player.spirit.sub(CalcSpiritNeed(id))
            player.spiritLv[id]+=1
        }
        else{
            logs.push("魂魄不足")
        }
    }
    else{
        while(1){
            if(player.spirit.gte(CalcSpiritNeed(id))){
                logs.push("消耗 魂魄×"+format(CalcSpiritNeed(id))+" 成功升级"+spiritName[id])
                player.spirit=player.spirit.sub(CalcSpiritNeed(id))
                player.spiritLv[id]+=1
            }
            else{
                logs.push("魂魄不足")
                return
            }
        }
    }
}
function CalcPartNeed(id){
    return CalcNeed(player.partLv[id]/1.2).floor()
}
function UpgradePart(id,type){
    if(player.partLv[id]==-1){
        if(player.part.gte(n(1000).pow(id+1))){
            logs.push("消耗 装甲部件×"+format(n(1000).pow(id+1))+" 成功激活机炮槽"+(id+1))
            player.part=player.part.sub(n(1000).pow(id+1))
            player.partLv[id]=0
        }
        else{
            logs.push("装甲部件不足")
        }
        return
    }
    if(type==0){
        if(player.part.gte(CalcPartNeed(id))){
            logs.push("消耗 装甲部件×"+format(CalcPartNeed(id))+" 成功升级机炮"+(id+1))
            player.part=player.part.sub(CalcPartNeed(id))
            player.partLv[id]+=1
        }
        else{
            logs.push("装甲部件不足")
        }
    }
    else{
        while(1){
            if(player.part.gte(CalcPartNeed(id))){
                logs.push("消耗 装甲部件×"+format(CalcPartNeed(id))+" 成功升级机炮"+(id+1))
                player.part=player.part.sub(CalcPartNeed(id))
                player.partLv[id]+=1
            }
            else{
                logs.push("装甲部件不足")
                return
            }
        }
    }
}
function CalcOrbNeed(){
    return CalcNeed(player.orbLv/5).mul(10)
}
function UpgradeOrb(type){
    if(type==0){
        if(player.orb.gte(CalcOrbNeed())){
            logs.push("消耗 宝珠碎片×"+format(CalcOrbNeed())+" 成功升级生机宝珠")
            player.orb=player.orb.sub(CalcOrbNeed())
            player.orbLv+=1
        }
        else{
            logs.push("宝珠碎片不足")
        }
    }
    else{
        while(1){
            if(player.orb.gte(CalcOrbNeed())){
                logs.push("消耗 宝珠碎片×"+format(CalcOrbNeed())+" 成功升级生机宝珠")
                player.orb=player.orb.sub(CalcOrbNeed())
                player.orbLv+=1
            }
            else{
                logs.push("宝珠碎片不足")
                return
            }
        }
    }
}
function CalcOrb1Need(){
    return CalcNeed(player.orb1Lv*2).mul(10)
}
function UpgradeOrb1(type){
    if(type==0){
        if(player.orb.gte(CalcOrb1Need())){
            logs.push("消耗 宝珠碎片×"+format(CalcOrb1Need())+" 成功升级切割宝珠")
            player.orb=player.orb.sub(CalcOrb1Need())
            player.orb1Lv+=1
        }
        else{
            logs.push("宝珠碎片不足")
        }
    }
    else{
        while(1){
            if(player.orb.gte(CalcOrb1Need())){
                logs.push("消耗 宝珠碎片×"+format(CalcOrb1Need())+" 成功升级切割宝珠")
                player.orb=player.orb.sub(CalcOrb1Need())
                player.orb1Lv+=1
            }
            else{
                logs.push("宝珠碎片不足")
                return
            }
        }
    }
}
function CalcDaggerNeed(id){
    return CalcNeed(player.daggerLv[id]*(id+1)*10).mul(10)
}
function UpgradeDagger(id,type){
    if(type==0){
        if(player.dagger.gte(CalcDaggerNeed(id))){
            logs.push("消耗 断匕×"+format(CalcDaggerNeed(id))+" 成功升阶碎甲之"+["剑","刀","斧","锤"][id])
            player.dagger=player.dagger.sub(CalcDaggerNeed(id))
            player.daggerLv[id]+=1
        }
        else{
            logs.push("断匕不足")
        }
    }
    else{
        while(1){
            if(player.dagger.gte(CalcDaggerNeed(id))){
                logs.push("消耗 断匕×"+format(CalcDaggerNeed(id))+" 成功升阶碎甲之"+["剑","刀","斧","锤"][id])
                player.dagger=player.dagger.sub(CalcDaggerNeed(id))
                player.daggerLv[id]+=1
            }
            else{
                logs.push("断匕不足")
                return
            }
        }
    }
}
function CalcPelletNeed(id){
    return CalcNeed(player.pelletLv[id]*(id+1))
}
function UpgradePellet(id,type){
    if(type==0){
        if(player.pellet.gte(CalcPelletNeed(id))){
            logs.push("消耗 丹药×"+format(CalcPelletNeed(id))+" 成功炼制"+["一","二","三","四","五"][id]+"品丹药")
            player.pellet=player.pellet.sub(CalcPelletNeed(id))
            player.pelletLv[id]+=1
        }
        else{
            logs.push("丹药不足")
        }
    }
    else{
        while(1){
            if(player.pellet.gte(CalcPelletNeed(id))){
                logs.push("消耗 丹药×"+format(CalcPelletNeed(id))+" 成功炼制"+["一","二","三","四","五"][id]+"品丹药")
                player.pellet=player.pellet.sub(CalcPelletNeed(id))
                player.pelletLv[id]+=1
            }
            else{
                logs.push("丹药不足")
                return
            }
        }
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
        if(hash=="6e03027ede65b9cf2539cd58042a15c00f462d969ad6b9bb33c5feccb494b2c7" && !player.exchangeCodeList.includes(hash)){
            player.money=player.money.add(n(1e250))
            for(let i=0;i<things.length;i++){
                player[things[i][2]]=player[things[i][2]].add(10000000)
            }
            player.exchangeCodeList.push(hash);
        }
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
        else if(hash=="1516e9db625c9b9d95db1f211c58347b198901a3c4ac6949e66039db138954ac"){
            if(player.exchangeCodeList.includes(hash)){
                logs.push("该兑换码已经使用过")
            }
            else{
                player.exchangeCodeList.push(hash);
                logs.push("超极爽会员已激活")
            }
        }
        else if(hash=="794a01ec79ccc88dd1492824822c5b3d9ab049cae238eebd71db87295878ce91"){
            if(player.exchangeCodeList.includes(hash)){
                logs.push("该兑换码已经使用过")
            }
            else{
                player.exchangeCodeList.push(hash);
                logs.push("飞天爽会员已激活")
            }
        }
        else{
            logs.push("兑换码 无效")
        }
    })
}