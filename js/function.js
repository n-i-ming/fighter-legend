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

    for(let i=0;i<4;i++){
        player.atk=player.atk.mul(n(1.1).pow(Math.max(0,player.partLv[i])))
    }

    player.atkSpeed=5
    player.dropLuck=1
    player.expmoneyMul=1
    player.skillLuck=1
    player.qiandaoMul=n(2)
    player.qiandaoCD=86400
    player.swordCD=10
    player.swordPower=Math.min(49.5,0.5*Math.floor(player.swordLv/10))
    if(player.exchangeCodeList.includes("794a01ec79ccc88dd1492824822c5b3d9ab049cae238eebd71db87295878ce91")){
        player.atkSpeed+=45
        player.dropLuck*=20
        player.expmoneyMul*=7.5
        player.skillLuck+=19
        player.qiandaoMul=n(50)
        player.qiandaoCD=43200
        player.swordCD=0.5
        player.swordPower*=2
    }
    else if(player.exchangeCodeList.includes("1516e9db625c9b9d95db1f211c58347b198901a3c4ac6949e66039db138954ac")){
        player.atkSpeed+=35
        player.dropLuck*=15
        player.expmoneyMul*=5
        player.skillLuck+=14
        player.qiandaoMul=n(20)
        player.qiandaoCD=43200
        player.swordCD=0.75
        player.swordPower*=2
    }
    else if(player.exchangeCodeList.includes("67b19dc018f9d3bd3e60411f8c526680d790c9b7857d165d75623d594bb22385")){
        player.atkSpeed+=25
        player.dropLuck*=10
        player.expmoneyMul*=3.5
        player.skillLuck+=9
        player.qiandaoMul=n(10)
        player.qiandaoCD=43200
        player.swordCD=1
        player.swordPower*=2
    }
    else if(player.exchangeCodeList.includes("ca2e83f083234c985da5e82f10ac733e1b6efd05683766539260fdb8b9a4f1ed")){
        player.atkSpeed+=20
        player.dropLuck*=6
        player.expmoneyMul*=2.5
        player.skillLuck+=5
        player.qiandaoMul=n(7)
        player.qiandaoCD=43200
        player.swordCD=2
    }
    else if(player.exchangeCodeList.includes("04a83db3606e208c09a2410fa764cfdc76639427377b18faac308535e499760c")){
        player.atkSpeed+=10
        player.dropLuck*=4
        player.expmoneyMul*=2
        player.skillLuck+=3
        player.qiandaoMul=n(5)
        player.swordCD=3
    }
    else if(player.exchangeCodeList.includes("dcc8111b8017e31dbd35ad4aad96be2ca3b83d3c901e52d4a95710542c71f81b")){
        player.atkSpeed+=5
        player.dropLuck*=3
        player.expmoneyMul*=1.5
        player.skillLuck+=2
        player.qiandaoMul=n(4)
        player.swordCD=5
    }
    else if(player.exchangeCodeList.includes("a9633b80fceaf953fcbd4ba85936e5d26cd00514ab438f3e07825ab74ccb4e16")){
        player.atkSpeed+=5
        player.dropLuck*=2
        player.expmoneyMul*=1.2
        player.skillLuck+=1
        player.qiandaoMul=n(3)
        player.swordCD=7
    }

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
    x=x.mul(n(15).pow(Math.max(0,Math.min(player.monsterLv-65000,10000000))))
    player.monsterHp=x.mul(1000)
    player.monsterAtk=x
    player.hpnow=player.hp
    player.kuangbaoTime=0
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
            ls.push([i,n(1+Math.floor((player.monsterLv-things[i][1])/100)).mul(n(2).pow(Math.floor((player.monsterLv-things[i][1])/1000)))])
        }
    }
    return ls
}
function DealGet(dif){
    let tms=Math.floor(dif*player.atkSpeed)
    player.exp=player.exp.add(n(10).mul(player.monsterLv+1).mul(player.expmoneyMul).mul(tms))
    player.money=player.money.add(n(player.atk).mul(player.expmoneyMul).mul(tms))
    let swordTimes=Math.floor(dif/player.swordCD)
    ResetFight()
    for(let i=0;i<swordTimes;i++){
        player.money=player.money.add(player.monsterHp.mul(player.swordPower).div(100).min(n(1e10).pow(Math.floor(player.swordLv/10)).mul(1e100)))
        player.monsterHp=player.monsterHp.sub(player.monsterHp.mul(player.swordPower).div(100).min(n(1e10).pow(Math.floor(player.swordLv/10)).mul(1e100)))
        if(player.monsterHp.lt(player.atk.mul(n(5).mul(n(1.1).pow(player.skillLv[0]))))){
            player.monsterLv+=1
            ResetFight()
        }
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
        player.animalAtkTime[i]+=dif*(random()+0.5)
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
                damage=player.monsterHp.mul(player.swordPower).div(100).min(n(1e10).pow(Math.floor(player.swordLv/10)).mul(1e100))
            }
            else if(damageDrawList[i][0]=="me" && player.kuangbaoTime>0){
                damage=damage.mul(5)
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
    str+="<td style='width:150px;text-align:right'>"+monsterName[Math.floor(player.monsterLv/1000)]+"</td>"
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
    [3.1e5,n(1.6e8)],[3.2e5,n(1.7e8)],[3.3e5,n(1.8e8)],[3.4e5,n(1.9e8)],[3.5e5,n(2.0e8)],
]
function CalcExpNeed(x){
    for(let i=0;i<ExpNeed.length;i++){
        if(x<ExpNeed[i][0]){
            return ExpNeed[i][1]
        }
    }
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
            if(player.money.gte(CalcClothNeed(0))){
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
            if(player.gem.gte(CalcGemNeed(id))){
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