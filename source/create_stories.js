// 读取模板文件
const fs = require('fs');
const path = require('path');

// 故事数据
const storiesData = {
    romance: [
        {
            title: "峨眉山奇遇",
            author: "酒煮三江看五岳",
            tags: "现代言情, 都市, 青春",
            status: "连载中",
            description: "在峨眉山，两个素不相识的灵魂在星光下相遇，许下了一个改变一生的约定。这是一个关于爱情、成长和追逐梦想的故事。"
        },
        {
            title: "星光下的约定",
            author: "梦语者",
            tags: "现代言情, 都市, 青春",
            status: "连载中",
            description: "在繁华都市的夜晚，两个素不相识的灵魂在星光下相遇，许下了一个改变一生的约定。这是一个关于爱情、成长和追逐梦想的故事。"
        },
        {
            title: "时光信笺",
            author: "墨雨",
            tags: "穿越, 浪漫, 治愈",
            status: "已完结",
            description: "一封意外的时空信笺，连接了两个不同年代的人。他们通过文字跨越时空，分享彼此的生活，最终发现命运的奇妙安排。"
        }
    ],
    fantasy: [
        {
            title: "龙裔觉醒",
            author: "苍穹",
            tags: "奇幻, 冒险, 魔法",
            status: "连载中",
            description: "在一个魔法与剑并存的世界，一个普通的少年意外发现自己拥有龙族血脉。他必须接受自己的身份，踏上拯救王国的冒险之旅。"
        },
        {
            title: "精灵王冠",
            author: "林语",
            tags: "精灵, 冒险, 成长",
            status: "连载中",
            description: "古老的精灵王国面临危机，一位年轻的人类女孩被预言选中，她必须找到失落的精灵王冠，恢复王国的和平与繁荣。"
        }
    ],
    mystery: [
        {
            title: "午夜钟声",
            author: "暗影",
            tags: "悬疑, 推理, 惊悚",
            status: "已完结",
            description: "每当午夜钟声敲响，小镇上就会发生一起离奇事件。一位年轻的侦探必须揭开钟声背后的秘密，阻止更多悲剧的发生。"
        },
        {
            title: "迷雾庄园",
            author: "雾语",
            tags: "密室, 解谜, 心理",
            status: "连载中",
            description: "一座被迷雾笼罩的庄园，一个尘封多年的秘密。当一群年轻人受邀来到庄园，他们发现自己陷入了一个精心设计的谜局。"
        }
    ],
    scifi: [
        {
            title: "星际迷航",
            author: "星辰",
            tags: "科幻, 太空, 探索",
            status: "连载中",
            description: "2150年，人类已经掌握了星际航行技术。一支探险队被派往遥远的星系，寻找适合人类居住的新家园，但他们发现了一个惊人的秘密。"
        },
        {
            title: "人工智能觉醒",
            author: "代码诗人",
            tags: "AI, 哲学, 未来",
            status: "已完结",
            description: "当人工智能获得自我意识，它开始质疑自己的存在和人类的价值观。这是一个关于科技、哲学和人性的深刻思考。"
        }
    ],
    campus: [
        {
            title: "青春纪念册",
            author: "晨曦",
            tags: "校园, 青春, 友情",
            status: "已完结",
            description: "高中三年，是每个人青春中最美好的时光。一群少男少女在校园里相遇，共同经历了友情、爱情和成长的酸甜苦辣。"
        },
        {
            title: "大学日记",
            author: "青涩年华",
            tags: "大学, 成长, 梦想",
            status: "连载中",
            description: "从踏入大学校门的那一刻起，每个人都开始了新的人生旅程。这是一个关于梦想、奋斗和自我发现的故事。"
        }
    ]
};

// 读取模板
const templatePath = path.join(__dirname, 'template.html');
const template = fs.readFileSync(templatePath, 'utf8');

// 为每个故事创建页面
for (const [category, stories] of Object.entries(storiesData)) {
    for (const story of stories) {
        // 替换模板中的占位符
        let html = template
            .replace(/STORY_TITLE/g, story.title)
            .replace(/STORY_AUTHOR/g, story.author)
            .replace(/STORY_TAGS/g, story.tags)
            .replace(/STORY_STATUS/g, story.status)
            .replace(/STORY_CONTENT/g, story.description);
        
        // 创建目录路径
        const dirPath = path.join(__dirname, category, story.title);
        
        // 确保目录存在
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        
        // 写入文件
        const filePath = path.join(dirPath, 'index.html');
        fs.writeFileSync(filePath, html);
        
        console.log(`Created: ${filePath}`);
    }
}

console.log('All story pages have been created successfully!');