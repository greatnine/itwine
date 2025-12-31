# 故事数据结构可视化报告

## 📋 报告概述
- **生成时间**: 2025/12/30 11:53:26
- **故事标题**: 星光下的约定
- **作者**: 陈晨

## 🗺️ Mermaid有向图
以下图表直观展示了故事的分支走向和场景关系：

```mermaid
graph TD
    %% 样式定义
    classDef startNode fill:#90EE90,stroke:#333,stroke-width:2px;
    classDef endingNode fill:#FFB6C1,stroke:#333,stroke-width:2px;
    classDef branchNode fill:#87CEEB,stroke:#333,stroke-width:2px;
    classDef normalNode fill:#F0F0F0,stroke:#333,stroke-width:1px;

    meet("meet
"
                那是一个夏日的傍晚，你独自..."")
    class meet startNode;
    take_photo("take_photo
"
                你接过相机，女孩走到海边，..."")
    class take_photo branchNode;
    starlight_walk("starlight_walk
"
                夜幕降临，你们坐在栈桥的长..."")
    class starlight_walk branchNode;
    opportunity("opportunity
"
                几天后，你意外地收到了一家..."")
    class opportunity normalNode;
    collaboration("collaboration
"
                最终，你们都被录用了。你负..."")
    class collaboration normalNode;
    farewell("farewell
"
                展览筹备进入最后阶段，你们..."")
    class farewell normalNode;
    special_promise("special_promise
"
                "晓星，我们做个约定吧。"..."")
    class special_promise normalNode;
    reunion("reunion
"
                半年后的一天，你接到了一个..."")
    class reunion normalNode;
    new_beginning("new_beginning
"
                "陈晨，我有个想法，"林晓..."")
    class new_beginning normalNode;
    eternal_promise("eternal_promise
"
                星光下，两个曾经迷茫的灵魂..."")
    class eternal_promise endingNode;
    confession("confession
"
                你深吸一口气，认真地看着林..."")
    class confession endingNode;
    career_success("career_success
"
                你们全身心投入到摄影展的筹..."")
    class career_success endingNode;
    refuse_polite("refuse_polite
"这是自动生成的场景 'refuse_polite'。请根据需..."")
    class refuse_polite normalNode;
    photography_enthusiast("photography_enthusiast
"这是自动生成的场景 'photography_enthusi..."")
    class photography_enthusiast normalNode;
    sunset_together("sunset_together
"这是自动生成的场景 'sunset_together'。请根..."")
    class sunset_together normalNode;
    busy_but_interested("busy_but_interested
"这是自动生成的场景 'busy_but_interested..."")
    class busy_but_interested normalNode;
    starlight_talk("starlight_talk
"这是自动生成的场景 'starlight_talk'。请根据..."")
    class starlight_talk normalNode;
    secret_spot("secret_spot
"这是自动生成的场景 'secret_spot'。请根据需要完..."")
    class secret_spot normalNode;
    searching("searching
"这是自动生成的场景 'searching'。请根据需要完善内..."")
    class searching normalNode;
    designer_dream("designer_dream
"这是自动生成的场景 'designer_dream'。请根据..."")
    class designer_dream normalNode;
    admiration("admiration
"这是自动生成的场景 'admiration'。请根据需要完善..."")
    class admiration normalNode;
    romantic_dream("romantic_dream
"这是自动生成的场景 'romantic_dream'。请根据..."")
    class romantic_dream normalNode;
    support("support
"这是自动生成的场景 'support'。请根据需要完善内容。..."")
    class support normalNode;
    focus("focus
"这是自动生成的场景 'focus'。请根据需要完善内容。..."")
    class focus normalNode;
    joint_project("joint_project
"这是自动生成的场景 'joint_project'。请根据需..."")
    class joint_project normalNode;
    starlight_center("starlight_center
"这是自动生成的场景 'starlight_center'。请..."")
    class starlight_center normalNode;
    interactive("interactive
"这是自动生成的场景 'interactive'。请根据需要完..."")
    class interactive normalNode;
    theme_discussion("theme_discussion
"这是自动生成的场景 'theme_discussion'。请..."")
    class theme_discussion normalNode;
    our_story("our_story
"这是自动生成的场景 'our_story'。请根据需要完善内..."")
    class our_story normalNode;
    support_dream("support_dream
"这是自动生成的场景 'support_dream'。请根据需..."")
    class support_dream normalNode;
    respect_choice("respect_choice
"这是自动生成的场景 'respect_choice'。请根据..."")
    class respect_choice normalNode;
    stay_question("stay_question
"这是自动生成的场景 'stay_question'。请根据需..."")
    class stay_question normalNode;
    airport_farewell("airport_farewell
"这是自动生成的场景 'airport_farewell'。请..."")
    class airport_farewell normalNode;
    keep_in_touch("keep_in_touch
"这是自动生成的场景 'keep_in_touch'。请根据需..."")
    class keep_in_touch normalNode;
    future_dreams("future_dreams
"这是自动生成的场景 'future_dreams'。请根据需..."")
    class future_dreams normalNode;
    emotional_hug("emotional_hug
"这是自动生成的场景 'emotional_hug'。请根据需..."")
    class emotional_hug normalNode;
    tibet_stories("tibet_stories
"这是自动生成的场景 'tibet_stories'。请根据需..."")
    class tibet_stories normalNode;
    compliment("compliment
"这是自动生成的场景 'compliment'。请根据需要完善..."")
    class compliment normalNode;
    remember_promise("remember_promise
"这是自动生成的场景 'remember_promise'。请..."")
    class remember_promise normalNode;
    reunion_hug("reunion_hug
"这是自动生成的场景 'reunion_hug'。请根据需要完..."")
    class reunion_hug normalNode;
    exhibition_preparation("exhibition_preparation
"这是自动生成的场景 'exhibition_preparat..."")
    class exhibition_preparation normalNode;
    book_concept("book_concept
"这是自动生成的场景 'book_concept'。请根据需要..."")
    class book_concept normalNode;
    ending_default("ending_default
"故事暂时告一段落。感谢您的参与！..."")
    class ending_default endingNode;

    %% 连接关系
    meet --> |"当然可以，我很乐意帮忙"| take_photo
    meet --> |"抱歉，我有点赶时间"| refuse_polite
    meet --> |"你也是摄影爱好者吗？"| photography_enthusiast
    meet --> |"这里的夕阳真美，要不要一起欣赏？"| sunset_together
    take_photo --> |"好啊，我很乐意"| starlight_walk
    take_photo --> |"抱歉，我还有点事"| busy_but_interested
    take_photo --> |"你对星空摄影感兴趣吗？"| starlight_talk
    take_photo --> |"我知道一个更好的观星地点"| secret_spot
    starlight_walk --> |"我还在寻找自己的方向"| searching
    starlight_walk --> |"我想成为一名优秀的设计师"| designer_dream
    starlight_walk --> |"看到你这么坚定，我真的很佩服"| admiration
    starlight_walk --> |"我的梦想是和你一起看遍世界各地的星空"| romantic_dream
    opportunity --> |"发现新的路径..."| farewell
    collaboration --> |"发现新的路径..."| searching
    farewell --> |"发现新的路径..."| meet
    special_promise --> |"发现新的路径..."| reunion_hug
    reunion --> |"发现新的路径..."| collaboration
    new_beginning --> |"发现新的路径..."| airport_farewell
    eternal_promise --> |"发现新的路径..."| reunion
    confession --> |"发现新的路径..."| collaboration
    career_success --> |"发现新的路径..."| starlight_talk
    refuse_polite --> |"继续故事..."| ending_default
    photography_enthusiast --> |"继续故事..."| ending_default
    sunset_together --> |"继续故事..."| ending_default
    busy_but_interested --> |"继续故事..."| ending_default
    starlight_talk --> |"继续故事..."| ending_default
    secret_spot --> |"继续故事..."| ending_default
    searching --> |"继续故事..."| ending_default
    designer_dream --> |"继续故事..."| ending_default
    admiration --> |"继续故事..."| ending_default
    romantic_dream --> |"继续故事..."| ending_default
    support --> |"发现新的路径..."| designer_dream
    focus --> |"发现新的路径..."| romantic_dream
    joint_project --> |"发现新的路径..."| keep_in_touch
    starlight_center --> |"继续故事..."| ending_default
    interactive --> |"继续故事..."| ending_default
    theme_discussion --> |"继续故事..."| ending_default
    our_story --> |"继续故事..."| ending_default
    support_dream --> |"发现新的路径..."| compliment
    respect_choice --> |"发现新的路径..."| starlight_talk
    stay_question --> |"发现新的路径..."| support
    airport_farewell --> |"继续故事..."| ending_default
    keep_in_touch --> |"继续故事..."| ending_default
    future_dreams --> |"继续故事..."| ending_default
    emotional_hug --> |"继续故事..."| ending_default
    tibet_stories --> |"发现新的路径..."| special_promise
    compliment --> |"发现新的路径..."| support
    remember_promise --> |"继续故事..."| ending_default
    reunion_hug --> |"发现新的路径..."| support
    exhibition_preparation --> |"发现新的路径..."| take_photo
    book_concept --> |"发现新的路径..."| take_photo
    ending_default --> |"重新开始"| meet
```

## 📊 图例说明
- 🟢 **绿色节点**: 起始场景
- 🔵 **蓝色节点**: 分支点（多个选择）
- 🎀 **粉色节点**: 结局场景
- ⚪ **白色节点**: 普通场景
- **箭头标签**: 选择文本

# 故事分支分析报告

## 📊 总体统计
- **总场景数**: 43
- **结局场景**: 4 个
- **最大分支深度**: 3
- **分支点数量**: 3

## 🌳 分支结构分析
### meet (4个选择)
- **选择**: "当然可以，我很乐意帮忙" → take_photo
- **选择**: "抱歉，我有点赶时间" → refuse_polite
- **选择**: "你也是摄影爱好者吗？" → photography_enthusiast
- **选择**: "这里的夕阳真美，要不要一起欣赏？" → sunset_together

### take_photo (4个选择)
- **选择**: "好啊，我很乐意" → starlight_walk
- **选择**: "抱歉，我还有点事" → busy_but_interested
- **选择**: "你对星空摄影感兴趣吗？" → starlight_talk
- **选择**: "我知道一个更好的观星地点" → secret_spot

### starlight_walk (4个选择)
- **选择**: "我还在寻找自己的方向" → searching
- **选择**: "我想成为一名优秀的设计师" → designer_dream
- **选择**: "看到你这么坚定，我真的很佩服" → admiration
- **选择**: "我的梦想是和你一起看遍世界各地的星空" → romantic_dream

## 🎯 结局可达性分析
- **eternal_promise**: 深度 0, 分支ID 0
- **confession**: 深度 0, 分支ID 0
- **career_success**: 深度 0, 分支ID 0
- **ending_default**: 深度 2, 分支ID 1

## 💡 优化建议
- ⚠️ 故事深度较浅，建议增加更多层次的选择
## 🔍 技术细节
- **可视化工具**: Mermaid.js
- **图表类型**: 有向图 (Directed Graph)
- **节点数量**: 43
- **连接数量**: 52
