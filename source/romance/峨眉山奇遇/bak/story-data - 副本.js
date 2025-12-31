// 峨眉山奇遇 - 简化版故事数据
const storyData = {

    // 故事基本信息
    title: "峨眉山奇遇",
    author: "酒煮三江看五岳",
    description: "在峨眉山，两个素不相识的灵魂在星光下相遇，许下了一个改变一生的约定",
    

    // 特征值显示配�?
    // type: "number" - 数值型特征值，直接显示数�?
    // type: "traits" - 特质型特征值，显示激活的特质列表
    statsConfig: [
        {
            label: "关系",
            key: "relationship",
            type: "number"
        },
        {
            label: "特质",
            key: "traits",
            type: "traits"
        }
    ],
    
    // 其他类型游戏�?statsConfig 示例�?
    // 
    // 示例1：冒险游�?
    // statsConfig: [
    //     { label: "生命�?, key: "health", type: "number" },
    //     { label: "金币", key: "gold", type: "number" },
    //     { label: "装备", key: "equipment", type: "traits" }
    // ]
    //
    // 示例2：恋爱游�?
    // statsConfig: [
    //     { label: "好感�?, key: "affection", type: "number" },
    //     { label: "特质", key: "traits", type: "traits" }
    // ]
    //
    // 示例3：悬疑游�?
    // statsConfig: [
    //     { label: "线索", key: "clues", type: "number" },
    //     { label: "时间", key: "time", type: "number" },
    //     { label: "状�?, key: "status", type: "traits" }
    // ]
    
    // 初始状�?
    initialState: {
        playerName: "旅行者",
        currentScene: "start",
        relationship: 0,
        traits: {
            patience: false,
            courage: false,
            compassion: false,
            art: false,
            wisdom: false
        },
        unlockedEndings: [],
        visitedScenes: []
    },




    // 场景数据
    scenes: {
        // 开始场景
        start: {
            background: "",
            text: `
                <p>清晨的薄雾如轻纱般笼罩着峨眉山，金色的阳光透过云层，为这座仙山披上了一层神秘的光晕。你站在山脚下，仰望着那若隐若现的山峰，心中涌起一股难以言喻的敬畏。</p>
                <p>作为一名热爱旅行和摄影的年轻人，你一直梦想着能亲自来到这里，用镜头捕捉这座佛教名山的灵气与美丽。空气中弥漫着松香和晨露的清新气息，远处传来阵阵鸟鸣，仿佛在欢迎你的到来。</p>
                <p>你调整了一下背包，深吸一口这纯净的空气，正准备踏上这段期待已久的旅程。就在这时，一个如清泉般悦耳的声音从旁边传来。</p>
                <p>"你也来登山吗？"</p>
                <p>你转过头，看到一位穿着淡蓝色长裙的年轻女子，她有着清澈如水的眼眸和温暖如春的笑容，手中拿着一本略显陈旧的素描本，看起来也是来寻找灵感的艺术家。</p>
                <p>她注意到你手中的相机，眼中闪过一丝好奇的光芒："你是摄影师吗？"</p>
            `,
            choices: [
                {
                    text: "是的，我是来拍摄峨眉山的美景的",
                    nextScene: "photographer",
                    effects: { relationship: 5 }
                },
                {
                    text: "只是个业余爱好者，你呢？",
                    nextScene: "amateur",
                    effects: { relationship: 3 }
                },
                {
                    text: "我更像是来寻找灵感的，和你一样",
                    nextScene: "seeker",
                    effects: { relationship: 8, traits: { art: true } }
                }
            ]
        },

        // 摄影师路线
        photographer: {
            background: "",
            text: `
                <p>"哇，专业摄影师！"女孩的眼睛瞬间亮了起来，像两颗闪烁的星星，"我叫林雨晴，是个自由插画师。我一直在寻找能给我带来灵感的风景，峨眉山是我梦寐已久的地方。"</p>
                <p>她小心翼翼地翻开自己的素描本，给你看了一些她画的风景画。每一幅画都充满了灵气和生命力，你能感受到她对自然的热爱和对艺术的执着。</p>
                <p>"你的照片一定也很美吧？"她期待地看着你，眼神中带着真诚的欣赏，"也许我们可以一起登山？互相交流一下艺术心得？"</p>
            `,
            choices: [
                {
                    text: "当然，我很乐意与你同行",
                    nextScene: "together",
                    effects: { relationship: 10 }
                },
                {
                    text: "我习惯一个人拍摄，但路上可以遇到",
                    nextScene: "separate",
                    effects: { relationship: 0 }
                },
                {
                    text: "如果你不介意我偶尔停下来拍照的话",
                    nextScene: "cautious",
                    effects: { relationship: 5, traits: { patience: true } }
                }
            ]
        },

        // 一起登山
        together: {
            background: "images/emei-mountain-entrance.jpg",
            text: `
                <p>林雨晴听到你的回答，脸上露出了灿烂的笑容："太好了！我正愁一个人登山有些孤单呢。"</p>
                <p>你们并肩走在山路上，阳光透过树叶洒下斑驳的光影。林雨晴不时停下来，在素描本上快速画下眼前的景色，而你则举起相机，捕捉那些转瞬即逝的美景。</p>
                <p>"峨眉山有这么多条路，"林雨晴指着前方的岔路口，"我们该走哪一条呢？"</p>
                <p>左边的路牌写着"报国寺方向"，右边的路牌写着"清音阁方向"，还有一条小路通向未知的密林。</p>
            `,
            choices: [
                {
                    text: "我们去报国寺吧，听说那里很灵验",
                    nextScene: "baoguo",
                    effects: { relationship: 5 }
                },
                {
                    text: "清音阁的风景应该很美，我们去那里",
                    nextScene: "qingyin",
                    effects: { relationship: 5 }
                },
                {
                    text: "走小路，也许会有意外的发现",
                    nextScene: "secret_path",
                    effects: { relationship: 3 }
                }
            ]
        },

        // 报国寺场景
        baoguo: {
            background: "images/baoguo-temple.jpg",
            text: `
                <p>报国寺的庄严氛围让你感到敬畏。你们静静地参观，不敢大声说话。</p>
                <p>林雨晴轻声说："这里的氛围真的很特别，让人不自觉地安静下来。"</p>
                <p>你点点头："是啊，寺庙确实有这种力量。"</p>
                <p>你们在寺庙里遇到了一位僧人，他正在打扫庭院。看到你们，他微笑着点头致意。</p>
                <p>"施主们是来参观的吗？"僧人问道。</p>
            `,
            choices: [
                {
                    text: "是的，我们对佛教文化很感兴趣",
                    nextScene: "cultural_interest",
                    effects: { relationship: 6 }
                },
                {
                    text: "我们是来寻找艺术灵感的",
                    nextScene: "art_inspiration",
                    effects: { relationship: 6 }
                }
            ]
        },

        // 清音阁场景
        qingyin: {
            background: "images/qingyin-pavilion.jpg",
            text: `
                <p>清音阁果然名不虚传，山水相映，景色宜人。林雨晴兴奋地找了个地方坐下，开始快速地在素描本上勾勒眼前的美景。</p>
                <p>"这里太美了，"她感叹道，"我感觉灵感像泉水一样涌出来。"</p>
                <p>你则忙着寻找最佳拍摄角度，想要将这份美丽永远定格。就在这时，林雨晴突然叫住你。</p>
                <p>"你看那边，"她指着远处的一座小桥，"有一只猴子！"</p>
            `,
            choices: [
                {
                    text: "猴子可能很凶，我们还是远观吧",
                    nextScene: "observe",
                    effects: { relationship: 4 }
                },
                {
                    text: "你先画，我去看看情况",
                    nextScene: "protect",
                    effects: { relationship: 8 }
                }
            ]
        },

        // 其他分支场景
        amateur: {
            background: "",
            text: `
                <p>林雨晴微笑着摇摇头："什么业余不业余的，艺术是相通的。我也是来寻找灵感的，"她拍了拍手中的素描本，"希望能在峨眉山找到一些特别的画面。"</p>
                <p>她看了看天空，又看了看山路："我们不如一起走？路上有个伴总是好的。"</p>
                <p>"对了，我叫林雨晴，是个自由插画师。你呢？"</p>
            `,
            choices: [
                {
                    text: "我叫[玩家姓名]，很高兴认识你",
                    nextScene: "introduction",
                    effects: { relationship: 7 }
                },
                {
                    text: "一起走也好，我对峨眉山不太熟悉",
                    nextScene: "guide",
                    effects: { relationship: 5 }
                },
                {
                    text: "我其实更想独自体验这座山",
                    nextScene: "alone",
                    effects: { relationship: -5 }
                }
            ]
        },

        seeker: {
            background: "",
            text: `
                <p>林雨晴惊喜地看着你："真的吗？太巧了！我也是来找灵感的。"她兴奋地翻开素描本，给你看她的画作，"你看，这是我之前在其他地方画的，希望能在这里创作出更好的作品。"</p>
                <p>她注意到你眼中的专注，微笑着说："我觉得我们有很多共同点。不如一起登山？也许我们能互相启发。"</p>
                <p>"我叫林雨晴，你呢？"</p>
            `,
            choices: [
                {
                    text: "我叫[玩家姓名]，能与你同行是我的荣幸",
                    nextScene: "honor",
                    effects: { relationship: 12 }
                },
                {
                    text: "当然，灵感往往在交流中迸发",
                    nextScene: "inspiration",
                    effects: { relationship: 10, traits: { wisdom: true } }
                },
                {
                    text: "我需要先独自感受一下，也许晚些时候会相遇",
                    nextScene: "solo",
                    effects: { relationship: 2 }
                }
            ]
        },

        // 新增场景：单独行动
        separate: {
            background: "images/emei-mountain-trail.jpg",
            text: `
                <p>林雨晴略显失望，但还是保持着微笑："好吧，我理解。每个人都有自己的节奏。"</p>
                <p>你们各自选择了不同的路线。你独自走在山路上，享受着这份宁静。但不知为何，心里总感觉少了点什么。</p>
                <p>在清音阁附近，你意外地又遇到了林雨晴。她正专注地画着眼前的瀑布，阳光洒在她的侧脸上，显得格外动人。</p>
            `,
            choices: [
                {
                    text: "悄悄离开，不打扰她",
                    nextScene: "quiet_leave",
                    effects: { relationship: -3 }
                },
                {
                    text: "上前打招呼，承认刚才的决定有些草率",
                    nextScene: "apology",
                    effects: { relationship: 8 }
                }
            ]
        },

        // 新增场景：谨慎同行
        cautious: {
            background: "images/emei-mountain-trail.jpg",
            text: `
                <p>林雨晴开心地点头："当然不介意！我也经常停下来画画，我们正好可以互相等待。"</p>
                <p>你们一起登山，你时不时停下来拍照，而林雨晴则在你拍照的时候寻找绘画的角度。这种默契的配合让你们都感到很舒服。</p>
                <p>"你知道吗，"林雨晴突然说，"我觉得你是个很细心的人。这种品质在艺术创作中很重要。"</p>
            `,
            choices: [
                {
                    text: "谢谢，我只是不想错过任何美好的瞬间",
                    nextScene: "appreciate",
                    effects: { relationship: 10 }
                },
                {
                    text: "其实我有时候会过于追求完美",
                    nextScene: "perfectionist",
                    effects: { relationship: 6 }
                }
            ]
        },

        // 新增场景：秘密小路
        secret_path: {
            background: "images/secret-path.jpg",
            text: `
                <p>你们选择了那条不起眼的小路。路越来越窄，但景色却越来越美。林雨晴兴奋地指着前方："看！这里有个小瀑布！"</p>
                <p>果然，在密林深处隐藏着一个美丽的瀑布，水流不大，但清澈见底。这里几乎没有其他游客，仿佛是为你们准备的专属景点。</p>
                <p>"太美了！"林雨晴立刻拿出素描本，"我要把这里画下来！"</p>
            `,
            choices: [
                {
                    text: "我也要拍下这个美景",
                    nextScene: "photograph_waterfall",
                    effects: { relationship: 8 }
                },
                {
                    text: "帮她找个更好的绘画角度",
                    nextScene: "help_painting",
                    effects: { relationship: 12 }
                }
            ]
        },

        // 新增场景：文化兴趣
        cultural_interest: {
            background: "images/baoguo-temple-interior.jpg",
            text: `
                <p>僧人微笑着点头："善哉善哉。佛教文化博大精深，施主们若有兴趣，可以参观一下我们的藏经阁。"</p>
                <p>在僧人的引导下，你们参观了藏经阁。林雨晴对古老的经书和壁画表现出浓厚的兴趣，不时向你分享她的见解。</p>
                <p>"这些古老的智慧，"她轻声说，"总能给人新的启发。"</p>
            `,
            choices: [
                {
                    text: "确实，佛教的智慧很深刻",
                    nextScene: "buddhist_wisdom",
                    effects: { relationship: 7 }
                },
                {
                    text: "我更感兴趣的是这里的建筑艺术",
                    nextScene: "architecture_art",
                    effects: { relationship: 5 }
                }
            ]
        },

        // 新增场景：艺术灵感
        art_inspiration: {
            background: "images/baoguo-temple-art.jpg",
            text: `
                <p>僧人眼睛一亮："艺术？这里的壁画和雕塑确实很有特色。特别是大雄宝殿的壁画，据说是明代的作品。"</p>
                <p>你们跟随僧人来到大雄宝殿。林雨晴被精美的壁画深深吸引，立刻拿出素描本开始临摹。</p>
                <p>"这些线条，这些色彩，"她喃喃自语，"真是太美了。"</p>
            `,
            choices: [
                {
                    text: "静静地欣赏她的创作过程",
                    nextScene: "watch_creation",
                    effects: { relationship: 9 }
                },
                {
                    text: "我也来拍一些细节照片",
                    nextScene: "detail_photos",
                    effects: { relationship: 6 }
                }
            ]
        },

        // 新增场景：观察猴子
        observe: {
            background: "images/monkey-view.jpg",
            text: `
                <p>你们保持距离观察着那只猴子。它看起来很温顺，正在树上吃果子。</p>
                <p>林雨晴轻声说："峨眉山的猴子很有名，但确实要小心。听说有些会抢游客的东西。"</p>
                <p>就在这时，又来了几只猴子，它们似乎对林雨晴的素描本很感兴趣。</p>
            `,
            choices: [
                {
                    text: "提醒她收好素描本",
                    nextScene: "protect_sketchbook",
                    effects: { relationship: 10 }
                },
                {
                    text: "我们换个地方吧，这里猴子太多了",
                    nextScene: "change_location",
                    effects: { relationship: 5 }
                }
            ]
        },

        // 新增场景：保护她
        protect: {
            background: "images/monkey-close.jpg",
            text: `
                <p>你小心翼翼地靠近猴子，林雨晴在你身后紧张地看着。猴子似乎对你没有敌意，只是好奇地打量着。</p>
                <p>"你真有勇气，"林雨晴佩服地说，"我都不敢靠那么近。"</p>
                <p>就在这时，猴子突然跳下树，向你们走来。林雨晴吓得后退了一步。</p>
            `,
            choices: [
                {
                    text: "站在原地不动，保持冷静",
                    nextScene: "stay_calm",
                    effects: { relationship: 12, traits: { courage: true } }
                },
                {
                    text: "慢慢后退，带她离开",
                    nextScene: "retreat_safely",
                    effects: { relationship: 8 }
                }
            ]
        },

        // 新增场景：自我介绍
        introduction: {
            background: "images/emei-mountain-trail.jpg",
            text: `
                <p>"[玩家姓名]，很好听的名字，"林雨晴微笑着说，"那我们就一起走吧。我对峨眉山还算熟悉，可以给你介绍一些不错的景点。"</p>
                <p>你们边走边聊，林雨晴告诉你她是个自由插画师，经常到各地采风。她的梦想是出版一本自己的画集。</p>
                <p>"你呢？"她问道，"除了旅行和摄影，还有什么爱好吗？"</p>
            `,
            choices: [
                {
                    text: "我也喜欢阅读和写作",
                    nextScene: "literature_love",
                    effects: { relationship: 8 }
                },
                {
                    text: "我对音乐也很感兴趣",
                    nextScene: "music_interest",
                    effects: { relationship: 7 }
                }
            ]
        },

        // 新增场景：需要引导
        guide: {
            background: "images/emei-mountain-trail.jpg",
            text: `
                <p>"太好了，"林雨晴开心地说，"我对峨眉山还算熟悉，可以当你的向导。"</p>
                <p>她开始给你介绍峨眉山的历史和景点，讲得生动有趣。你发现她不仅是个艺术家，还是个很好的讲述者。</p>
                <p>"你知道吗，"她突然神秘地说，"峨眉山有个传说..."</p>
            `,
            choices: [
                {
                    text: "什么传说？快告诉我",
                    nextScene: "mountain_legend",
                    effects: { relationship: 9 }
                },
                {
                    text: "我更想听你讲讲艺术创作的故事",
                    nextScene: "art_stories",
                    effects: { relationship: 8 }
                }
            ]
        },

        // 新增场景：独自体验
        alone: {
            background: "images/emei-mountain-solo.jpg",
            text: `
                <p>林雨晴的表情略显失落，但还是保持着礼貌："好吧，我理解。每个人都有自己的旅行方式。"</p>
                <p>你们分道扬镳。你独自走在山路上，享受着这份宁静。但不知为何，心里总感觉有些空落落的。</p>
                <p>在万年寺附近，你意外地又看到了林雨晴的身影。她正坐在石凳上画画，阳光洒在她的身上，显得格外孤独。</p>
            `,
            choices: [
                {
                    text: "继续独自前行",
                    nextScene: "continue_alone",
                    effects: { relationship: -10 }
                },
                {
                    text: "上前打招呼，承认刚才的决定有些草率",
                    nextScene: "regret_decision",
                    effects: { relationship: 15 }
                }
            ]
        },

        // 新增场景：感到荣幸
        honor: {
            background: "images/emei-mountain-trail.jpg",
            text: `
                <p>林雨晴被你的礼貌打动，脸上泛起淡淡的红晕："你太客气了。能遇到志同道合的人，我也很荣幸。"</p>
                <p>你们并肩走在山路上，聊着各自的艺术追求。你发现她不仅才华横溢，而且性格温柔，善解人意。</p>
                <p>"你知道吗，"她轻声说，"有时候我觉得，艺术创作就像是在寻找灵魂的共鸣。"</p>
            `,
            choices: [
                {
                    text: "我完全同意，艺术是灵魂的语言",
                    nextScene: "soul_language",
                    effects: { relationship: 12 }
                },
                {
                    text: "能遇到理解我艺术追求的人真好",
                    nextScene: "understanding",
                    effects: { relationship: 10 }
                }
            ]
        },

        // 新增场景：灵感交流
        inspiration: {
            background: "images/emei-mountain-inspiration.jpg",
            text: `
                <p>"说得真好！"林雨晴眼睛发亮，"我也有同感。不同的艺术形式之间确实能互相启发。"</p>
                <p>你们开始讨论各自的艺术理念。她向你展示她的画作，你给她看你的摄影作品。这种深入的交流让你们都感到兴奋。</p>
                <p>"我觉得，"她若有所思地说，"我们可以合作创作一些作品。"</p>
            `,
            choices: [
                {
                    text: "这个主意太棒了！",
                    nextScene: "collaboration",
                    effects: { relationship: 15 }
                },
                {
                    text: "我们可以先互相学习对方的艺术形式",
                    nextScene: "mutual_learning",
                    effects: { relationship: 12 }
                }
            ]
        },

        // 新增场景：独自感受
        solo: {
            background: "images/emei-mountain-solo.jpg",
            text: `
                <p>林雨晴理解地点点头："好的，我尊重你的选择。有时候独自感受确实能获得不同的体验。"</p>
                <p>你们约定在某个景点再见面。你独自走在山路上，享受着这份宁静，但心里总惦记着那个温柔的女孩。</p>
                <p>在金顶附近，你果然又遇到了林雨晴。她正在画日出，专注的神情让你不忍打扰。</p>
            `,
            choices: [
                {
                    text: "悄悄离开，让她专心创作",
                    nextScene: "respect_creation",
                    effects: { relationship: 5 }
                },
                {
                    text: "轻声打招呼，分享独自体验的感受",
                    nextScene: "share_experience",
                    effects: { relationship: 10 }
                }
            ]
        },

        // 新增场景：结局场景
        quiet_leave: {
            background: "images/emei-mountain-sunset.jpg",
            text: `
                <p>你选择了悄悄离开。虽然心里有些遗憾，但你尊重她的创作空间。</p>
                <p>傍晚时分，你在山脚下的小茶馆又遇到了林雨晴。她看起来有些疲惫，但看到你时还是露出了微笑。</p>
                <p>"今天的收获很大，"她说，"虽然我们选择了不同的路，但都找到了属于自己的灵感。"</p>
            `,
            choices: [
                {
                    text: "交换联系方式，约定下次再一起创作",
                    nextScene: "exchange_contact",
                    effects: { relationship: 15 }
                },
                {
                    text: "祝福她创作顺利，就此告别",
                    nextScene: "farewell",
                    effects: { relationship: 5 }
                }
            ]
        },

        apology: {
            background: "images/emei-mountain-waterfall.jpg",
            text: `
                <p>你走上前，有些不好意思地说："刚才的决定可能有些草率，其实我很想和你一起登山。"</p>
                <p>林雨晴惊喜地看着你："真的吗？太好了！其实我刚才也有些失落。"</p>
                <p>你们重新一起登山，这次的气氛更加融洽。在瀑布前，她为你画了一幅速写，而你则拍下了她专注创作的样子。</p>
            `,
            choices: [
                {
                    text: "邀请她一起吃晚饭",
                    nextScene: "dinner_invitation",
                    effects: { relationship: 20 }
                },
                {
                    text: "约定下次一起创作",
                    nextScene: "future_collaboration",
                    effects: { relationship: 15 }
                }
            ]
        },

        appreciate: {
            background: "images/emei-mountain-view.jpg",
            text: `
                <p>林雨晴欣赏地看着你："这种对美的敏感真的很难得。我觉得我们可以在艺术上有很多合作。"</p>
                <p>你们继续登山，互相分享着对美的理解。在金顶，你们一起欣赏了壮丽的云海。</p>
                <p>"今天真的很开心，"她说，"能遇到理解我艺术追求的人。"</p>
            `,
            choices: [
                {
                    text: "我也是，希望以后还能一起创作",
                    nextScene: "hopeful_future",
                    effects: { relationship: 18 }
                },
                {
                    text: "今天的经历给了我很多灵感",
                    nextScene: "inspired",
                    effects: { relationship: 15 }
                }
            ]
        },

        perfectionist: {
            background: "images/emei-mountain-detail.jpg",
            text: `
                <p>林雨晴理解地笑了："追求完美是艺术家的通病。我也经常为了一个细节纠结很久。"</p>
                <p>你们互相分享着创作中的困扰和心得。这种坦诚的交流让你们的关系更加亲近。</p>
                <p>"你知道吗，"她说，"有时候不完美反而更有魅力。"</p>
            `,
            choices: [
                {
                    text: "你说得对，我应该学会接受不完美",
                    nextScene: "accept_imperfection",
                    effects: { relationship: 12 }
                },
                {
                    text: "但完美主义也有它的价值",
                    nextScene: "value_perfectionism",
                    effects: { relationship: 10 }
                }
            ]
        },

        photograph_waterfall: {
            background: "images/waterfall-photo.jpg",
            text: `
                <p>你拿出相机，开始寻找最佳角度。林雨晴则在一旁安静地画画，不时抬头看看你的拍摄过程。</p>
                <p>"你的构图很有感觉，"她称赞道，"能让我看看你拍的照片吗？"</p>
                <p>你们互相欣赏着对方的作品，都感到收获颇丰。</p>
            `,
            choices: [
                {
                    text: "邀请她做你的模特",
                    nextScene: "model_invitation",
                    effects: { relationship: 20 }
                },
                {
                    text: "讨论艺术创作的心得",
                    nextScene: "art_discussion",
                    effects: { relationship: 15 }
                }
            ]
        },

        help_painting: {
            background: "images/painting-help.jpg",
            text: `
                <p>你细心地帮她调整位置和角度，让她能更好地捕捉瀑布的美。林雨晴感激地看着你。</p>
                <p>"你真是个细心的人，"她说，"很少有人会这么用心地帮助别人。"</p>
                <p>在她的画作完成后，她特意在角落画了一个小小的你，作为感谢。</p>
            `,
            choices: [
                {
                    text: "被她的细心感动",
                    nextScene: "touched",
                    effects: { relationship: 25 }
                },
                {
                    text: "邀请她一起创作更多作品",
                    nextScene: "more_collaboration",
                    effects: { relationship: 20 }
                }
            ]
        },

        // 新增结局场景
        exchange_contact: {
            background: "images/contact-exchange.jpg",
            text: `
                <p>你们交换了联系方式，约定以后有机会一起创作。虽然今天的相遇很短暂，但你们都相信这只是开始。</p>
                <p>林雨晴微笑着说："期待看到你的作品，也期待我们的下一次相遇。"</p>
                <p><strong>结局：新的开始</strong></p>
                <p>虽然故事暂时告一段落，但你们的艺术之旅才刚刚开始。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        farewell: {
            background: "images/farewell.jpg",
            text: `
                <p>你们互相祝福，然后各自离开。虽然有些遗憾，但你们都珍惜这次美好的相遇。</p>
                <p>林雨晴说："希望你的峨眉山之旅能带给你更多灵感。"</p>
                <p><strong>结局：美好的回忆</strong></p>
                <p>这次相遇成为了你们心中美好的回忆，虽然短暂，但永远难忘。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        dinner_invitation: {
            background: "images/dinner-scene.jpg",
            text: `
                <p>林雨晴欣然接受了你的邀请。在山下的小餐馆，你们边吃边聊，气氛十分融洽。</p>
                <p>"今天真的很开心，"她说，"能遇到志同道合的人真的很幸运。"</p>
                <p><strong>结局：志同道合</strong></p>
                <p>你们的友谊在艺术中生根发芽，未来的合作充满了无限可能。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        // 快速添加缺失的场景（简化版）
        buddhist_wisdom: {
            background: "images/temple-wisdom.jpg",
            text: `
                <p>你们继续讨论佛教智慧，林雨晴被你的见解深深吸引。</p>
                <p><strong>结局：智慧共鸣</strong></p>
                <p>你们的相遇不仅是艺术的碰撞，更是智慧的交流。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        architecture_art: {
            background: "images/architecture-art.jpg",
            text: `
                <p>你们专注于建筑艺术的讨论，发现彼此对美的理解惊人地相似。</p>
                <p><strong>结局：建筑之美</strong></p>
                <p>峨眉山的古建筑成为了你们共同的灵感源泉。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        watch_creation: {
            background: "images/watching-creation.jpg",
            text: `
                <p>你静静地欣赏她的创作过程，被她的专注和才华深深打动。</p>
                <p><strong>结局：创作之美</strong></p>
                <p>有时候，欣赏比参与更能体会艺术的魅力。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        detail_photos: {
            background: "images/detail-photos.jpg",
            text: `
                <p>你专注于拍摄细节，林雨晴则继续她的创作。你们在各自的领域都取得了收获。</p>
                <p><strong>结局：各自精彩</strong></p>
                <p>虽然选择了不同的创作方式，但都找到了属于自己的美。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        protect_sketchbook: {
            background: "images/protect-sketchbook.jpg",
            text: `
                <p>你及时提醒她收好素描本，避免了可能的损失。林雨晴感激地看着你。</p>
                <p><strong>结局：细心保护</strong></p>
                <p>你的细心让她感受到了温暖和安全感。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        change_location: {
            background: "images/change-location.jpg",
            text: `
                <p>你们决定换个地方，找到了一个更安全的观景点。</p>
                <p><strong>结局：安全第一</strong></p>
                <p>有时候，谨慎的选择能带来更好的体验。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        stay_calm: {
            background: "images/stay-calm.jpg",
            text: `
                <p>你保持冷静，猴子最终对你失去了兴趣，转身离开。</p>
                <p><strong>结局：勇气可嘉</strong></p>
                <p>你的冷静和勇气给林雨晴留下了深刻印象。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        retreat_safely: {
            background: "images/retreat-safely.jpg",
            text: `
                <p>你们慢慢后退，安全地离开了猴子的活动范围。</p>
                <p><strong>结局：安全撤退</strong></p>
                <p>明智的撤退有时比盲目的勇敢更有智慧。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        literature_love: {
            background: "images/literature-love.jpg",
            text: `
                <p>你们发现彼此都对文学有深厚的兴趣，话题更加深入。</p>
                <p><strong>结局：文学知己</strong></p>
                <p>艺术与文学的结合让你们的交流更加丰富多彩。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        music_interest: {
            background: "images/music-interest.jpg",
            text: `
                <p>音乐成为了你们的新话题，发现艺术形式之间有着奇妙的联系。</p>
                <p><strong>结局：音乐共鸣</strong></p>
                <p>不同的艺术形式在你们心中产生了美妙的共鸣。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        mountain_legend: {
            background: "images/mountain-legend.jpg",
            text: `
                <p>林雨晴讲述着峨眉山的传说，你被这些神秘的故事深深吸引。</p>
                <p><strong>结局：传说之美</strong></p>
                <p>古老的传说为你们的相遇增添了神秘的色彩。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        art_stories: {
            background: "images/art-stories.jpg",
            text: `
                <p>林雨晴分享着她的创作故事，你被她的艺术追求深深打动。</p>
                <p><strong>结局：创作故事</strong></p>
                <p>每个艺术家背后都有着动人的故事。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        continue_alone: {
            background: "images/continue-alone.jpg",
            text: `
                <p>你选择了继续独自前行，虽然有些遗憾，但尊重自己的选择。</p>
                <p><strong>结局：独自旅程</strong></p>
                <p>有时候，独自旅行也能带来独特的体验。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        regret_decision: {
            background: "images/regret-decision.jpg",
            text: `
                <p>你上前道歉，林雨晴欣然接受了你的歉意。</p>
                <p><strong>结局：重新开始</strong></p>
                <p>有时候，承认错误能带来更好的开始。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        soul_language: {
            background: "images/soul-language.jpg",
            text: `
                <p>你们深入讨论艺术与灵魂的关系，发现彼此的理解惊人地一致。</p>
                <p><strong>结局：灵魂共鸣</strong></p>
                <p>艺术成为了你们灵魂交流的语言。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        understanding: {
            background: "images/understanding.jpg",
            text: `
                <p>你们都为能遇到理解自己的人感到幸运。</p>
                <p><strong>结局：相互理解</strong></p>
                <p>理解是艺术交流中最珍贵的礼物。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        collaboration: {
            background: "images/collaboration.jpg",
            text: `
                <p>你们决定合作创作，开始了新的艺术旅程。</p>
                <p><strong>结局：艺术合作</strong></p>
                <p>合作让你们的创作达到了新的高度。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        mutual_learning: {
            background: "images/mutual-learning.jpg",
            text: `
                <p>你们决定先互相学习，为未来的合作打下基础。</p>
                <p><strong>结局：互相学习</strong></p>
                <p>学习是艺术创作中永不停歇的过程。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        respect_creation: {
            background: "images/respect-creation.jpg",
            text: `
                <p>你选择尊重她的创作空间，悄悄离开。</p>
                <p><strong>结局：尊重创作</strong></p>
                <p>有时候，不打扰是最好的支持。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        share_experience: {
            background: "images/share-experience.jpg",
            text: `
                <p>你分享独自体验的感受，林雨晴被你的真诚打动。</p>
                <p><strong>结局：真诚分享</strong></p>
                <p>真诚的分享让你们的距离更近了。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        future_collaboration: {
            background: "images/future-collaboration.jpg",
            text: `
                <p>你们约定未来继续合作，对艺术充满期待。</p>
                <p><strong>结局：未来可期</strong></p>
                <p>艺术的旅程永远充满无限可能。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        hopeful_future: {
            background: "images/hopeful-future.jpg",
            text: `
                <p>你们都对未来充满希望，约定继续一起创作。</p>
                <p><strong>结局：希望之光</strong></p>
                <p>希望是艺术创作中最美的光芒。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        inspired: {
            background: "images/inspired.jpg",
            text: `
                <p>今天的经历给了你很多灵感，你迫不及待想要开始新的创作。</p>
                <p><strong>结局：灵感迸发</strong></p>
                <p>灵感是艺术家最珍贵的财富。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        accept_imperfection: {
            background: "images/accept-imperfection.jpg",
            text: `
                <p>你学会了接受不完美，发现艺术因此更加真实。</p>
                <p><strong>结局：真实之美</strong></p>
                <p>真实往往比完美更有力量。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        value_perfectionism: {
            background: "images/value-perfectionism.jpg",
            text: `
                <p>你坚持完美主义的价值，相信精益求精是艺术的真谛。</p>
                <p><strong>结局：精益求精</strong></p>
                <p>追求完美是艺术家的永恒课题。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        model_invitation: {
            background: "images/model-invitation.jpg",
            text: `
                <p>林雨晴欣然接受了做你模特的邀请。</p>
                <p><strong>结局：模特之约</strong></p>
                <p>艺术合作让你们的关系更加紧密。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        art_discussion: {
            background: "images/art-discussion.jpg",
            text: `
                <p>你们深入讨论艺术创作，收获颇丰。</p>
                <p><strong>结局：艺术探讨</strong></p>
                <p>深入的交流是艺术成长的重要途径。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        touched: {
            background: "images/touched.jpg",
            text: `
                <p>你被她的细心深深感动，心中涌起温暖的感觉。</p>
                <p><strong>结局：感动时刻</strong></p>
                <p>有时候，小小的细节最能打动人心。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        },

        more_collaboration: {
            background: "images/more-collaboration.jpg",
            text: `
                <p>你们约定继续合作，对未来的创作充满期待。</p>
                <p><strong>结局：更多合作</strong></p>
                <p>合作让艺术创作更加丰富多彩。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "start",
                    effects: {}
                }
            ]
        }
    }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = storyData;
}