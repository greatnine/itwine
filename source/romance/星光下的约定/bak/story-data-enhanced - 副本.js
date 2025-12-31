// 星光下的约定 - 智能优化版互动故事数据
const storyData = {

    // 故事基本信息
    title: "星光下的约定",
    author: "陈晨",
    description: "在青岛的海边，两个陌生人在星光下相遇，许下了一个改变一生的约定",

    // 特征值显示配置
    statsConfig: [
        {
            label: "关系",
            key: "relationship",
            type: "number"
        },
        {
            label: "勇气",
            key: "courage",
            type: "number"
        },
        {
            label: "浪漫",
            key: "romance",
            type: "number"
        },
        {
            label: "特质",
            key: "traits",
            type: "traits"
        }
    ],
    
    // 初始状态
    initialState: {
        playerName: "陈晨",
        currentScene: "meet",
        relationship: 0,
        courage: 0,
        romance: 0,
        traits: {
            photography: false,
            adventurous: false,
            creative: false,
            persistent: false,
            romantic: false,
            confident: false
        },
        unlockedEndings: [],
        visitedScenes: []
    },

    // 场景数据 - 智能优化版
    scenes: {
        // 相遇场景 - 增强版
        meet: {
            background: "images/海边.jpg",
            text: `
                <p>那是一个夏日的傍晚，你独自一人漫步在青岛的海边。夕阳的余晖洒在海面上，波光粼粼，美得令人心醉。作为一名刚刚毕业的大学生，你来到这座海滨城市寻找工作机会，同时也想在这片陌生的土地上寻找属于自己的方向。</p>
                <p>"对不起，能帮我拍张照片吗？"一个温柔的声音打断了你的沉思。</p>
                <p>你转过身，看到一个穿着白色连衣裙的女孩，她有着清澈的眼眸和甜美的笑容，手中拿着一部相机。海风吹拂着她的长发，夕阳的光芒为她镀上了一层金色的轮廓。</p>
            `,
            choices: [
                {
                    text: "当然可以，我很乐意帮忙",
                    nextScene: "take_photo",
                    effects: { relationship: 5, romance: 3 }
                },
                {
                    text: "抱歉，我有点赶时间",
                    nextScene: "refuse_polite",
                    effects: { relationship: -3, courage: -2 }
                },
                {
                    text: "你也是摄影爱好者吗？",
                    nextScene: "photography_enthusiast",
                    effects: { relationship: 8, traits: { photography: true } }
                },
                {
                    text: "这里的夕阳真美，要不要一起欣赏？",
                    nextScene: "sunset_together",
                    effects: { relationship: 10, romance: 5, traits: { romantic: true } }
                }
            ]
        },

        // 拍照场景 - 增强版
        take_photo: {
            background: "images/栈桥.jpg",
            text: `
                <p>你接过相机，女孩走到海边，海风吹拂着她的长发，夕阳的光芒为她镀上了一层金色的轮廓。你按下快门，捕捉下了这个美丽的瞬间。</p>
                <p>"谢谢你，"她接过相机，看了看照片，"拍得真好。我叫林晓星，是来这里参加摄影展的。"</p>
                <p>"我叫陈晨，刚来青岛找工作。"你自我介绍道。</p>
                <p>"真巧，我也是摄影爱好者，"她眼睛一亮，"要不要一起去栈桥那边看看？听说那里的夜景很美。"</p>
            `,
            choices: [
                {
                    text: "好啊，我很乐意",
                    nextScene: "starlight_walk",
                    effects: { relationship: 10, romance: 5 }
                },
                {
                    text: "抱歉，我还有点事",
                    nextScene: "busy_but_interested",
                    effects: { relationship: 3 }
                },
                {
                    text: "你对星空摄影感兴趣吗？",
                    nextScene: "starlight_talk",
                    effects: { relationship: 12, traits: { photography: true } }
                },
                {
                    text: "我知道一个更好的观星地点",
                    nextScene: "secret_spot",
                    effects: { relationship: 15, courage: 5, traits: { adventurous: true } }
                }
            ]
        },

        // 星光漫步场景 - 增强版
        starlight_walk: {
            background: "images/星空.jpg",
            text: `
                <p>夜幕降临，你们坐在栈桥的长椅上，仰望着满天繁星。银河横跨天际，星星点点，宛如撒在黑色绒布上的钻石。</p>
                <p>"我从小就喜欢看星星，"林晓星轻声说，"每当我感到迷茫或者孤独的时候，就会抬头看看星空。它们让我觉得，无论遇到什么困难，这个世界上总有一些永恒不变的东西。"</p>
                <p>"我理解这种感觉，"你点点头，"就像现在，看着这些星星，突然觉得自己的烦恼都变得渺小了。"</p>
                <p>她转过头，星光映在她的眼眸中："陈晨，你有什么梦想吗？"</p>
            `,
            choices: [
                {
                    text: "我还在寻找自己的方向",
                    nextScene: "searching",
                    effects: { relationship: 8, courage: 3 }
                },
                {
                    text: "我想成为一名优秀的设计师",
                    nextScene: "designer_dream",
                    effects: { relationship: 10, traits: { creative: true } }
                },
                {
                    text: "看到你这么坚定，我真的很佩服",
                    nextScene: "admiration",
                    effects: { relationship: 15, courage: 5, traits: { confident: true } }
                },
                {
                    text: "我的梦想是和你一起看遍世界各地的星空",
                    nextScene: "romantic_dream",
                    effects: { relationship: 20, romance: 10, traits: { romantic: true } }
                }
            ]
        },

        // 工作机会场景 - 增强版
        opportunity: {
            background: "images/办公室.jpg",
            text: `
                <p>几天后，你意外地收到了一家设计公司的面试通知。更巧的是，这家公司正好需要一名懂摄影的设计师。你想到了林晓星，便联系了她。</p>
                <p>"真的吗？太感谢你了！"电话那头传来她兴奋的声音，"我正好有一些作品可以展示。"</p>
                <p>面试那天，林晓星带来了她精心准备的摄影作品集。当面试官看到她的星空摄影作品时，都被深深震撼了。</p>
                <p>"这些照片太美了，"面试官赞叹道，"我们正好在筹备一个关于城市与自然的展览，你的作品非常适合。"</p>
            `,
            choices: [
                {
                    text: "全力支持林晓星展示作品",
                    nextScene: "support",
                    effects: { relationship: 20, courage: 5 }
                },
                {
                    text: "提出合作展览的想法",
                    nextScene: "collaboration",
                    effects: { relationship: 25, traits: { creative: true } }
                },
                {
                    text: "专注于自己的面试表现",
                    nextScene: "focus",
                    effects: { relationship: 10, courage: 3 }
                },
                {
                    text: "建议创建一个联合项目",
                    nextScene: "joint_project",
                    effects: { relationship: 30, traits: { creative: true, persistent: true } }
                }
            ]
        },

        // 合作场景 - 增强版
        collaboration: {
            background: "images/工作室.jpg",
            text: `
                <p>最终，你们都被录用了。你负责展览的视觉设计，而林晓星则提供她的摄影作品。这意外的合作让你们都很开心。</p>
                <p>"看来我们的相遇真的是缘分，"下班后，林晓星对你说，"要不是那天在海边遇到你，我可能就错过这个机会了。"</p>
                <p>接下来的日子里，你们开始了紧张而充实的合作。每天下班后，你们都会一起讨论展览的细节，有时候甚至会工作到深夜。</p>
                <p>"陈晨，你觉得这个布局怎么样？"林晓星指着设计稿问。</p>
            `,
            choices: [
                {
                    text: "把星空系列放在中心位置",
                    nextScene: "starlight_center",
                    effects: { relationship: 15, romance: 5 }
                },
                {
                    text: "建议加入更多互动元素",
                    nextScene: "interactive",
                    effects: { relationship: 18, traits: { creative: true } }
                },
                {
                    text: "讨论展览的主题和理念",
                    nextScene: "theme_discussion",
                    effects: { relationship: 20, traits: { creative: true } }
                },
                {
                    text: "提议加入我们的相遇故事",
                    nextScene: "our_story",
                    effects: { relationship: 25, romance: 10, traits: { romantic: true } }
                }
            ]
        },

        // 离别场景 - 增强戏剧冲突
        farewell: {
            background: "images/机场.jpg",
            text: `
                <p>展览筹备进入最后阶段，你们都感到既紧张又兴奋。为了放松心情，林晓星提议再去一次海边。</p>
                <p>那是一个晴朗的夜晚，你们再次来到了栈桥。星空比上次更加璀璨，银河清晰可见。</p>
                <p>"陈晨，我有件事想告诉你，"林晓星突然认真地说，"下个月，我可能要离开青岛了。"</p>
                <p>"我收到了一个去西藏拍摄星空的机会，"她解释道，"那是我一直梦想的地方，那里的星空被誉为世界上最美的星空之一。"</p>
                <p>她的声音有些颤抖："这个机会很难得，但我...我舍不得这里的一切。"</p>
            `,
            choices: [
                {
                    text: "支持她去追逐梦想",
                    nextScene: "support_dream",
                    effects: { relationship: 25, traits: { persistent: true } }
                },
                {
                    text: "表达不舍但尊重她的选择",
                    nextScene: "respect_choice",
                    effects: { relationship: 20, romance: 8 }
                },
                {
                    text: "提出做一个特别的约定",
                    nextScene: "special_promise",
                    effects: { relationship: 30, romance: 15, traits: { romantic: true } }
                },
                {
                    text: "问她是否愿意为了我留下来",
                    nextScene: "stay_question",
                    effects: { relationship: 15, romance: 20, traits: { romantic: true } }
                }
            ]
        },

        // 约定场景 - 增强版
        special_promise: {
            background: "images/约定.jpg",
            text: `
                <p>"晓星，我们做个约定吧。"你认真地说。</p>
                <p>"什么约定？"她抬起头，眼中闪烁着期待的光芒。</p>
                <p>"无论你走到哪里，都要记得追逐自己的梦想，"你认真地说，"而我也会在这里继续努力，找到属于自己的方向。等你在西藏拍到了最美的星空，一定要回来举办一场真正的个人摄影展。"</p>
                <p>她感动地点点头："好，我答应你。那你也答应我，无论遇到什么困难，都不要放弃寻找自己的星星。"</p>
                <p>"我答应你，"你伸出手，"星光为证，我们的约定。"</p>
                <p>她轻轻握住你的手："星光为证。"</p>
                <p>星光下，你们的约定仿佛被永恒定格。</p>
            `,
            choices: [
                {
                    text: "送她到机场，祝福她一路顺风",
                    nextScene: "airport_farewell",
                    effects: { relationship: 35, romance: 10 }
                },
                {
                    text: "约定保持联系，分享彼此的进展",
                    nextScene: "keep_in_touch",
                    effects: { relationship: 40, romance: 15 }
                },
                {
                    text: "承诺等她回来一起实现更多梦想",
                    nextScene: "future_dreams",
                    effects: { relationship: 45, romance: 20, traits: { romantic: true } }
                },
                {
                    text: "给她一个拥抱，表达深深的不舍",
                    nextScene: "emotional_hug",
                    effects: { relationship: 50, romance: 25, traits: { romantic: true } }
                }
            ]
        },

        // 重逢场景 - 增强版
        reunion: {
            background: "images/重逢.jpg",
            text: `
                <p>半年后的一天，你接到了一个陌生的电话。"陈晨，是我，晓星。我回来了！"</p>
                <p>你激动得差点跳起来："真的吗？你现在在哪里？"</p>
                <p>"我在机场，刚下飞机，"她的声音中带着兴奋，"我有好多故事要告诉你，还有...我带来了世界上最美的星空照片。"</p>
                <p>你们约在了第一次见面的海边。当你赶到时，看到林晓星站在夕阳下，比半年前更加成熟自信。</p>
                <p>"陈晨！"她看到你，开心地跑过来，"好久不见！"</p>
                <p>她的眼中闪烁着熟悉的光芒，但似乎还带着一丝犹豫。</p>
            `,
            choices: [
                {
                    text: "欢迎回来，西藏怎么样？",
                    nextScene: "tibet_stories",
                    effects: { relationship: 50, romance: 15 }
                },
                {
                    text: "你变得更漂亮了",
                    nextScene: "compliment",
                    effects: { relationship: 55, romance: 20 }
                },
                {
                    text: "我们的约定，你还记得吗？",
                    nextScene: "remember_promise",
                    effects: { relationship: 60, romance: 25, traits: { romantic: true } }
                },
                {
                    text: "直接给她一个久违的拥抱",
                    nextScene: "reunion_hug",
                    effects: { relationship: 65, romance: 30, traits: { romantic: true } }
                }
            ]
        },

        // 新开始场景 - 增强版
        new_beginning: {
            background: "images/新开始.jpg",
            text: `
                <p>"陈晨，我有个想法，"林晓星突然说，"我想在青岛举办一场真正的个人摄影展，就叫做'星光下的约定'。"</p>
                <p>"这个主意太棒了！"你兴奋地说，"我可以帮你设计整个展览。"</p>
                <p>"不仅如此，"她神秘地笑了笑，"我还想邀请你一起合作。这半年，我不仅拍了照片，还写了很多关于星空的故事。我觉得我们可以把这些故事和照片结合起来，创作一本摄影集。"</p>
                <p>你被她的话深深打动。你们再次握手，就像半年前在星空下那样。但这一次，你们的手握得更紧，因为你们都明白，这不仅仅是一个约定，更是一个新的开始。</p>
            `,
            choices: [
                {
                    text: "开始筹备摄影展",
                    nextScene: "exhibition_preparation",
                    effects: { relationship: 65, romance: 20 }
                },
                {
                    text: "讨论摄影集的创作理念",
                    nextScene: "book_concept",
                    effects: { relationship: 70, romance: 25 }
                },
                {
                    text: "许下永恒的约定",
                    nextScene: "eternal_promise",
                    effects: { relationship: 80, romance: 35, traits: { romantic: true } }
                },
                {
                    text: "问她是否愿意成为你的女朋友",
                    nextScene: "confession",
                    effects: { relationship: 90, romance: 50, traits: { romantic: true, confident: true } }
                }
            ]
        },

        // 多重结局系统
        eternal_promise: {
            background: "images/永恒.jpg",
            text: `
                <p>星光下，两个曾经迷茫的灵魂找到了彼此的方向。你们知道，这只是一个开始，在未来的日子里，还会有更多的星星等待你们去追逐，更多的约定等待你们去实现。</p>
                <p>"陈晨，你还记得我们第一次在这里相遇的情景吗？"林晓星问。</p>
                <p>"当然记得，"你微笑着说，"那天你请我帮你拍照，然后我们一起来这里看星星。"</p>
                <p>"那时候的我，还在为未来的方向迷茫，"她回忆道，"但是现在，我找到了自己的星星。而这一切，都是从那个意外的相遇开始的。"</p>
                <p>她突然认真地看着你："陈晨，我想和你做一个新的约定。无论未来我们走到哪里，无论遇到什么困难，都要记得今天的星空，记得我们曾经在这里许下的约定。我们要一起追逐更多的星星，创造更多的美好回忆。"</p>
                <p>你握住她的手："好，我答应你。这是我们的永恒约定。"</p>
                <p><strong>结局：永恒的星光</strong></p>
                <p>在青岛的海边，在璀璨的星空下，有两个灵魂因为一个美丽的约定而永远相连。他们的故事才刚刚开始，而星光将永远见证他们的爱情与梦想。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "meet",
                    effects: {}
                }
            ]
        },

        // 告白结局
        confession: {
            background: "images/告白.jpg",
            text: `
                <p>你深吸一口气，认真地看着林晓星："晓星，这半年来，我每天都在想你。我想问你...你愿意成为我的女朋友吗？"</p>
                <p>林晓星的脸瞬间红了，眼中闪烁着惊喜的泪光："陈晨，我...我也一直在等你这句话。我愿意！"</p>
                <p>你们紧紧相拥，星光为你们的爱情作证。这一刻，所有的等待和思念都变得值得。</p>
                <p><strong>结局：星光恋人</strong></p>
                <p>从青岛的海边到西藏的星空，你们的爱情跨越了时间和空间。在星光下许下的约定，终于开花结果。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "meet",
                    effects: {}
                }
            ]
        },

        // 事业结局
        career_success: {
            background: "images/成功.jpg",
            text: `
                <p>你们全身心投入到摄影展的筹备中。展览取得了巨大的成功，林晓星的星空摄影作品受到了艺术界的高度评价。</p>
                <p>"陈晨，谢谢你一直以来的支持，"林晓星感动地说，"没有你，就没有今天的成功。"</p>
                <p>"这是我们一起努力的结果，"你微笑着说，"我们的约定，终于实现了。"</p>
                <p><strong>结局：星光事业</strong></p>
                <p>你们的合作不仅创造了艺术上的成功，更证明了梦想的力量。星光见证了你们的成长与成就。</p>
            `,
            choices: [
                {
                    text: "重新开始故事",
                    nextScene: "meet",
                    effects: {}
                }
            ]
        }
    }
};