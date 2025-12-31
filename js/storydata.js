// 故事数据集合 - 包含分类配置和故事数据
const storiesCollection = {


    romance: {
        name: '现代言情',
        icon: 'fa-heart',
        stories: [
            {
                id: "romance_001",
                title: "峨眉山奇遇",
                author: "传习者戚",
                cover: "images/cover.jpg",
                description: "在峨眉山，两个素不相识的灵魂在星光下相遇，许下了一个改变一生的约定。这是一个关于爱情、成长和追逐梦想的故事。",
                tags: "现代言情, 景区观光, 青春",
                status: "已完结",
                externalLink: "./source/romance/峨眉山奇遇/index.html",
                isRecommended: true,
                recommendReason: "现代言情与探险的新探索，年轻人必读！"
            },
            {
                id: "romance_002",
                title: "星光下的约定",
                author: "梦语者",
                cover: "images/cover.jpg",
                description: "在繁华都市的夜晚，两个素不相识的灵魂在星光下相遇，许下了一个改变一生的约定。这是一个关于爱情、成长和追逐梦想的故事。",
                tags: "现代言情, 都市, 青春",
                status: "开始中",
                externalLink: "./source/romance/星光下的约定/index.html",
                isRecommended: false,
                recommendReason: ""
            }  
        ]
    },




    fantasy: {
        name: '奇幻冒险',
        icon: 'fa-dragon',
        stories: [
            {
                id: "fantasy_001",
                title: "龙裔觉醒",
                author: "苍穹",
                cover: "images/cover.jpg",
                description: "在一个魔法与剑并存的世界，一个普通的少年意外发现自己拥有龙族血脉。他必须接受自己的身份，踏上拯救王国的冒险之旅。",
                tags: "奇幻, 冒险, 魔法",
                status: "期待中",
                externalLink: "./source/fantasy/龙裔觉醒/index.html",
                isRecommended: false,
                recommendReason: "魔法与剑的完美结合，龙族血脉的传奇冒险！"
            },
            {
                id: "fantasy_002",
                title: "精灵王冠",
                author: "林语",
                cover: "images/cover.jpg",
                description: "古老的精灵王国面临危机，一位年轻的人类女孩被预言选中，她必须找到失落的精灵王冠，恢复王国的和平与繁荣。",
                tags: "精灵, 冒险, 成长",
                status: "期待中",
                externalLink: "./source/fantasy/精灵王冠/index.html",
                isRecommended: false,
                recommendReason: ""
            }
        ]
    },






    mystery: {
        name: '悬疑推理',
        icon: 'fa-user-secret',
        stories: [
            
            {
                id: "mystery_001",
                title: "化名 Lady Thalia",
                author: "外国互动小说鉴赏",
                cover: "images/cover.jpg",
                description: "双主角（盗贼/侦探）、身份危机、调查与伪装、对话选择影响剧情、维多利亚时代伦敦背景、幽默与悬疑并存。",
                tags: "身份危机, 悬疑, 幽默",
                status: "已完结",
                externalLink: "./source/mystery/化名/index.html",
                isRecommended: true,
                recommendReason: "身份危机, 悬疑, 幽默。对话选择影响剧情"
            } ,         

            {
                id: "mystery_002",
                title: "迷雾庄园",
                author: "雾语",
                cover: "images/cover.jpg",
                description: "一座被迷雾笼罩的庄园，一个尘封多年的秘密。当一群年轻人受邀来到庄园，他们发现自己陷入了一个精心设计的谜局。",
                tags: "密室, 解谜, 心理",
                status: "敬请期待",
                externalLink: "./source/mystery/迷雾庄园/index.html",
                isRecommended: false,
                recommendReason: "迷雾中的庄园，尘封的秘密，精心设计的谜局等你来解！"
            },
             {
                id: "mystery_003",
                title: "木塔谍影",
                author: "传习者戚",
                cover: "images/cover.jpg",
                description: "互动故事基于「作家新干线·短篇小说」范小天｜《木塔谍影》改编。讲述了公安干警为保护应县木塔这一国宝级文物，与境外势力斗智斗勇的故事。",
                tags: "悬疑, 推理, 担当",
                status: "已完结",
                externalLink: "./source/mystery/木塔谍影/index.html",
                isRecommended: true,
                recommendReason: "贺岁新作。通过互动叙事，体验互动推进剧情的乐趣。也亲身体验文物保护工作的艰辛与危险，增强文物保护意识。"
            },
             {
                id: "mystery_004",
                title: "午夜钟声",
                author: "暗影",
                cover: "images/cover.jpg",
                description: "每当午夜钟声敲响，小镇上就会发生一起离奇事件。一位年轻的侦探必须揭开钟声背后的秘密，阻止更多悲剧的发生。",
                tags: "悬疑, 推理, 惊悚",
                status: "敬请期待......",
                externalLink: "./source/mystery/午夜钟声/index.html",
                isRecommended: false,
                recommendReason: ""
            }
            
        ]
    },










    scifi: {
        name: '科幻未来',
        icon: 'fa-rocket',
        stories: [
            {
                id: "scifi_001",
                title: "星际迷航",
                author: "星辰",
                cover: "images/cover.jpg",
                description: "2150年，人类已经掌握了星际航行技术。一支探险队被派往遥远的星系，寻找适合人类居住的新家园，但他们发现了一个惊人的秘密。",
                tags: "科幻, 太空, 探索",
                status: "期待",
                externalLink: "./source/scifi/星际迷航/index.html",
                isRecommended: false,
                recommendReason: ""
            },
            {
                id: "scifi_002",
                title: "人工智能觉醒",
                author: "代码诗人",
                cover: "images/cover.jpg",
                description: "当人工智能获得自我意识，它开始质疑自己的存在和人类的价值观。这是一个关于科技、哲学和人性的深刻思考。",
                tags: "AI, 哲学, 未来",
                status: "期待",
                externalLink: "./source/scifi/人工智能觉醒/index.html",
                isRecommended: false,
                recommendReason: "AI获得自我意识，对科技与人性深刻思考的科幻佳作！"
            }
        ]
    },





    campus: {
        name: '春色满园',
        icon: 'fa-graduation-cap',
        stories: [
            {
                id: "campus_001",
                title: "师傅传授的职场秘诀",
                author: "晨曦",
                cover: "images/cover.jpg",
                description: "师傅秦雍城,带有人在社会如同江湖的信念并且有一套人生哲学。高考落榜的一群少男少女在古城和师傅相遇相识，他们共同经历了友情、爱情和到成长的酸甜苦辣。后经师傅指点走向财务自由。",
                tags: "校园, 青春, 友情",
                status: "敬请期待",
                externalLink: "./source/campus/职场秘诀/index.html",
                isRecommended: false,
                recommendReason: "江湖信念可以指导人生。"
            },
            {
                id: "campus_002",
                title: "大学讲师日记",
                author: "青涩年华",
                cover: "images/cover.jpg",
                description: "大学也是社会。每个人都有自己的人生旅程。这是一个关于大学老师梦想、奋斗和自我发现的故事。",
                tags: "大学校园, 成长, 梦想",
                status: "期待中",
                externalLink: "./source/campus/大学讲师日记/index.html",
                isRecommended: false,
                recommendReason: ""
            }
        ]
    }
};