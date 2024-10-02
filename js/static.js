var logs=[]
function addedPlayerData() { return {
    themeId:0,tmtmtm:0,
    seed1:Math.floor(Math.random()*4294967296),seed2:Math.floor(Math.random()*4294967296),
    seed3:Math.floor(Math.random()*4294967296),seed4:Math.floor(Math.random()*4294967296),
    nowBigTab:"属性",fightSub:0,dropLuck:1,expmoneyMul:1,exchangeCodeList:[],toggle:[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    skillLuck:1,qiandaoTimes:0,qiandaoTime:0,qiandaoMul:n(1.1),qiandaoCD:86400,
    lv:0,hp:n(0),atk:n(0),hpnow:n(0),
    atkSpeed:5,atkTime:0,
    exp:n(0),money:n(0),

    monsterLv:0,monsterHp:n(1000),monsterAtk:n(1),
    monsterAtkSpeed:2,monsterAtkTime:0,
    kuangbaoTime:0,zhendangTime:0,
    iron:n(0),skillbook:n(0),animalrune:n(0),gem:n(0),

    weaponLv:[0,0],clothLv:[0,0],skillLv:[0,0,0,0,0],animalLv:[0,0,0,0],animalAtkTime:[0,0,0,0],
    gemLv:[0,0]
}}

const subTabList=[
    "属性","兑换","签到","设置","战斗","武器","盔甲","技能","神兽","宝石"
]
const things=[["陨铁",0,"iron"],["技能书",200,"skillbook"],["兽符",300,"animalrune"],["宝石碎片",500,"gem"]]
const monsterName=[
    "野猪","小狼","兔子","野兔","狐狸","山鸡","鹿","猫头鹰","野狼","巨鼠","蝙蝠","狼蛛","血狼","风暴鹰","瘟疫鼠","毒蛇","石怪","狼人","狼骑士","巨型蟾蜍","暴躁牛","烈焰蝙蝠",
    "狼群领主","冰霜熊","黑色巨龙","迷雾幻影","幽灵骷髅","狂战士","黑暗法师","血色骑士","地狱犬","鬼火","深渊裂缝","战斗犀牛","巨型蜘蛛","亡灵法师","瘟疫精灵","风暴巨人","剑齿虎",
    "地底巨兽","冰封骑士","雷霆龙","火焰精灵","地狱火焰","亡者之王","邪恶女巫","幽暗魅影","深渊领主","血色巨龙","毁灭者","绝望鬼魂","幽灵骑士","龙之卫士","天启者","寒冰精灵","狂暴巨兽",
    "复仇者","猩红女巫","黑暗领主","毁灭之影","失落的灵魂","幽暗魔王","混沌行者","末日使者","迷雾巨人","绝望者","噬魂者","巨型幽灵","地狱恶魔","暴风王","天使的堕落","恶魔骑士",
    "堕落之魂","恐惧统治者","幽冥之王","冰霜巨龙","深渊之子","灵魂收割者","灾难之主","暴风巨龙","罪恶女王","亡者君主","绝望魔王","幽灵刺客","巨兽领主","狂怒者","终结者","末日狂欢者",
    "混沌魔神","恶魔之王","灵魂操控者","凶恶吞噬者","冥界统治者","毁灭魔王","绝望魔神","混沌领主","漆黑主宰","恐怖幻影","终极恶魔","绝望之龙"
]
const weaponName=[
    "铁剑","铜斧","木杖","铁锤","刀锋剑","锋利匕首","精钢剑","钢铁战斧","铁质钉锤","银色长枪","龙鳞剑","冰霜匕首","烈焰刀","暴风斧","鬼火法杖","水银剑","魔法杖","重型战锤",
    "狂暴斧","吞噬者","黑色骑士剑","银焰刀","血腥匕首","光辉长剑","诅咒之剑","暗影之刃","天使之槌","幽灵剑","超级战斧","毁灭者","混沌长刀","狂战士之斧","天雷剑","风暴法杖",
    "战争之刃","烈焰长枪","恶魔之刃","炼狱之剑","九天神剑","破坏者","暗黑之刃","王者之剑","妖精之弓","玄冰之斧","地狱之剑","魔法法杖","钢铁猎弓","杀戮之剑","灵魂收割者","黑曜石斧",
    "末日剑","决斗刀","狂风之矛","荒野猎弓","英雄之刃","恶徒斧","噬魂长剑","骷髅之剑","冥界长矛","猩红法杖","深渊之剑","绝望之斧","天罚之剑","魔龙之剑","天火之斧","玄武剑",
    "妖异之杖","终极猎弓","复仇者之刃","血腥刀锋","光明之剑","劫掠者","龙之战斧","月影之刃","弑神之剑","王者之斧","魔力长枪","绝境之刀","傀儡之剑","幽暗长刀","破军之剑",
    "风暴之矛","末日之刃","黑暗法杖","战神之剑","天选之剑","惊雷之斧","星辰之剑","破灭者","天降之剑","噬灵之刀","刀剑合一","神秘之斧","刀锋狂潮","重铸之剑","战神之锤",
    "幽冥斩","大地之斧","永恒之剑","破碎者"
]
const clothName=[
    "布衣","皮甲","锁子甲","钢铁盔甲","重型铠甲","战斗护甲","魔法法袍","鱼鳞甲","铁质护甲","青铜盔甲","精钢护甲","白银盔甲","龙鳞甲","火焰盔甲","冰霜盔甲","暗影斗篷",
    "光辉护甲","重铸甲","魔焰护甲","妖精护甲","神秘法袍","血色铠甲","守护者盔甲","亡灵甲","战士铠甲","铠甲斗篷","护心甲","暗黑铠甲","死亡骑士铠甲","巨人盔甲","狂战士护甲",
    "天使之甲","魔龙盔甲","炼狱铠甲","风暴铠甲","绝望护甲","不屈之甲","星辰护甲","黑曜石铠甲","冰霜斗篷","神圣盔甲","英勇护甲","破碎者盔甲","野兽护甲","恐惧护甲","幽灵斗篷",
    "无畏盔甲","猎手护甲","混沌斗篷","光明铠甲","天选护甲","秘银盔甲","圣光铠甲","恶魔护甲","刀锋护甲","剑圣铠甲","地狱护甲","战斗法袍","终焉之甲","复仇者护甲","征服者盔甲",
    "杀戮护甲","绝境护甲","黑暗斗篷","深渊护甲","冥界铠甲","魔力铠甲","巨兽护甲","天罚铠甲","雷霆护甲","死灵护甲","月影斗篷","狂怒护甲","风之护甲","狩猎盔甲","幽冥铠甲",
    "末日护甲","星空护甲","无畏斗篷","灵魂护甲","暗影护甲","血腥盔甲","炼狱斗篷","毁灭护甲","天火盔甲","猎手斗篷","绝望之甲","永恒护甲","禁忌之甲","英雄护甲","巫师法袍","圣坛护甲",
    "神秘斗篷","终极之甲","破碎圣甲","诅咒之袍","英雄护甲","劫掠之铠","幽冥护甲","破碎铠"
]
const skillName=[
    "金刚断","木刃斩","水流袭","火焰炎","土岩击",
]
const skillColor=[
    "yellow","lime","lightblue","red","brown"
]
const animalName=[
    "青龙","白虎","朱雀","玄武"
]
const animalColor=[
    "rgb(0,206,209)","rgb(255,255,240)","rgb(227,66,52)","rgb(25,25,25)"
]