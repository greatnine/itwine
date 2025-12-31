// 智能生成的故事数据 - 保证场景完整性
// 生成时间: 2025/12/30 13:09:27
// 工具版本: 2.0

const storyData = {
  "title": "星光下的约定",
  "author": "陈晨",
  "description": "在青岛的海边，两个陌生人在星光下相遇，许下了一个改变一生的约定",
  "statsConfig": [
    {
      "label": "关系",
      "key": "relationship",
      "type": "number"
    },
    {
      "label": "勇气",
      "key": "courage",
      "type": "number"
    },
    {
      "label": "浪漫",
      "key": "romance",
      "type": "number"
    },
    {
      "label": "特质",
      "key": "traits",
      "type": "traits"
    }
  ],
  "initialState": {
    "playerName": "陈晨",
    "currentScene": "Start",
    "relationship": 0,
    "courage": 0,
    "romance": 0,
    "traits": {
      "photography": false,
      "adventurous": false,
      "creative": false,
      "persistent": false,
      "romantic": false,
      "confident": false
    },
    "unlockedEndings": [],
    "visitedScenes": []
  },
  "scenes": {
    "Start": {
      "background": "images/海边.jpg",
      "text": "\n                <p>那是一个夏日的傍晚，你独自一人漫步在青岛的海边。夕阳的余晖洒在海面上，波光粼粼，美得令人心醉。作为一名刚刚毕业的大学生，你来到这座海滨城市寻找工作机会，同时也想在这片陌生的土地上寻找属于自己的方向。</p>\n                <p>\"对不起，能帮我拍张照片吗？\"一个温柔的声音打断了你的沉思。</p>\n                <p>你转过身，看到一个穿着白色连衣裙的女孩，她有着清澈的眼眸和甜美的笑容，手中拿着一部相机。海风吹拂着她的长发，夕阳的光芒为她镀上了一层金色的轮廓。</p>\n            ",
      "choices": [
        {
          "text": "帮助拍照",
          "nextScene": "take_photo",
          "effects": [
            {
              "stat": "relationship",
              "change": 5
            },
            {
              "stat": "courage",
              "change": 3
            }
          ]
        },
        {
          "text": "开始对话",
          "nextScene": "starlight_talk",
          "effects": [
            {
              "stat": "relationship",
              "change": 3
            },
            {
              "stat": "romance",
              "change": 5
            }
          ]
        },
        {
          "text": "做出最终决定",
          "nextScene": "eternal_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": 5
            },
            {
              "stat": "courage",
              "change": 10
            }
          ]
        },
        {
          "text": "继续故事",
          "nextScene": "starlight_walk",
          "effects": [
            {
              "stat": "relationship",
              "change": 3
            },
            {
              "stat": "courage",
              "change": 2
            }
          ]
        },
        {
          "text": "继续故事",
          "nextScene": "refuse_polite",
          "effects": [
            {
              "stat": "relationship",
              "change": 3
            },
            {
              "stat": "courage",
              "change": 2
            }
          ]
        },
        {
          "text": "继续故事",
          "nextScene": "sunset_together",
          "effects": [
            {
              "stat": "relationship",
              "change": 3
            },
            {
              "stat": "courage",
              "change": 2
            }
          ]
        },
        {
          "text": "继续故事",
          "nextScene": "busy_but_interested",
          "effects": [
            {
              "stat": "relationship",
              "change": 3
            },
            {
              "stat": "courage",
              "change": 2
            }
          ]
        },
        {
          "text": "继续故事",
          "nextScene": "secret_spot",
          "effects": [
            {
              "stat": "relationship",
              "change": 3
            },
            {
              "stat": "courage",
              "change": 2
            }
          ]
        },
        {
          "text": "继续故事",
          "nextScene": "admiration",
          "effects": [
            {
              "stat": "relationship",
              "change": 3
            },
            {
              "stat": "courage",
              "change": 2
            }
          ]
        },
        {
          "text": "继续故事",
          "nextScene": "opportunity",
          "effects": [
            {
              "stat": "relationship",
              "change": 3
            },
            {
              "stat": "courage",
              "change": 2
            }
          ]
        },
        {
          "text": "继续故事",
          "nextScene": "farewell",
          "effects": [
            {
              "stat": "relationship",
              "change": 3
            },
            {
              "stat": "courage",
              "change": 2
            }
          ]
        },
        {
          "text": "继续故事",
          "nextScene": "special_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": 3
            },
            {
              "stat": "courage",
              "change": 2
            }
          ]
        },
        {
          "text": "继续故事",
          "nextScene": "searching",
          "effects": [
            {
              "stat": "relationship",
              "change": 3
            },
            {
              "stat": "courage",
              "change": 2
            }
          ]
        }
      ]
    },
    "take_photo": {
      "background": "images/栈桥.jpg",
      "text": "\n                <p>你接过相机，女孩走到海边，海风吹拂着她的长发，夕阳的光芒为她镀上了一层金色的轮廓。你按下快门，捕捉下了这个美丽的瞬间。</p>\n                <p>\"谢谢你，\"她接过相机，看了看照片，\"拍得真好。我叫林晓星，是来这里参加摄影展的。\"</p>\n                <p>\"我叫陈晨，刚来青岛找工作。\"你自我介绍道。</p>\n                <p>\"真巧，我也是摄影爱好者，\"她眼睛一亮，\"要不要一起去栈桥那边看看？听说那里的夜景很美。\"</p>\n            ",
      "choices": [
        {
          "text": "做出最终决定",
          "nextScene": "eternal_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": 5
            },
            {
              "stat": "courage",
              "change": 10
            }
          ]
        },
        {
          "text": "做出最终决定",
          "nextScene": "eternal_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": 5
            },
            {
              "stat": "courage",
              "change": 10
            }
          ]
        },
        {
          "text": "做出最终决定",
          "nextScene": "eternal_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": 5
            },
            {
              "stat": "courage",
              "change": 10
            }
          ]
        },
        {
          "text": "继续故事",
          "nextScene": "photography_enthusiast",
          "effects": [
            {
              "stat": "relationship",
              "change": 3
            },
            {
              "stat": "courage",
              "change": 2
            }
          ]
        }
      ]
    },
    "starlight_walk": {
      "background": "images/星空.jpg",
      "text": "\n                <p>夜幕降临，你们坐在栈桥的长椅上，仰望着满天繁星。银河横跨天际，星星点点，宛如撒在黑色绒布上的钻石。</p>\n                <p>\"我从小就喜欢看星星，\"林晓星轻声说，\"每当我感到迷茫或者孤独的时候，就会抬头看看星空。它们让我觉得，无论遇到什么困难，这个世界上总有一些永恒不变的东西。\"</p>\n                <p>\"我理解这种感觉，\"你点点头，\"就像现在，看着这些星星，突然觉得自己的烦恼都变得渺小了。\"</p>\n                <p>她转过头，星光映在她的眼眸中：\"陈晨，你有什么梦想吗？\"</p>\n            ",
      "choices": [
        {
          "text": "做出最终决定",
          "nextScene": "eternal_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": 5
            },
            {
              "stat": "courage",
              "change": 10
            }
          ]
        },
        {
          "text": "做出最终决定",
          "nextScene": "eternal_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": 5
            },
            {
              "stat": "courage",
              "change": 10
            }
          ]
        },
        {
          "text": "做出最终决定",
          "nextScene": "eternal_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": 5
            },
            {
              "stat": "courage",
              "change": 10
            }
          ]
        },
        {
          "text": "返回之前的场景",
          "nextScene": "Ending_default",
          "effects": [
            {
              "stat": "wisdom",
              "change": 2
            }
          ]
        }
      ]
    },
    "opportunity": {
      "background": "images/办公室.jpg",
      "text": "\n                <p>几天后，你意外地收到了一家设计公司的面试通知。更巧的是，这家公司正好需要一名懂摄影的设计师。你想到了林晓星，便联系了她。</p>\n                <p>\"真的吗？太感谢你了！\"电话那头传来她兴奋的声音，\"我正好有一些作品可以展示。\"</p>\n                <p>面试那天，林晓星带来了她精心准备的摄影作品集。当面试官看到她的星空摄影作品时，都被深深震撼了。</p>\n                <p>\"这些照片太美了，\"面试官赞叹道，\"我们正好在筹备一个关于城市与自然的展览，你的作品非常适合。\"</p>\n            ",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "Ending_default"
        },
        {
          "text": "继续前进",
          "nextScene": "collaboration",
          "effects": [
            {
              "stat": "wisdom",
              "change": 2
            }
          ]
        }
      ]
    },
    "collaboration": {
      "background": "images/工作室.jpg",
      "text": "\n                <p>最终，你们都被录用了。你负责展览的视觉设计，而林晓星则提供她的摄影作品。这意外的合作让你们都很开心。</p>\n                <p>\"看来我们的相遇真的是缘分，\"下班后，林晓星对你说，\"要不是那天在海边遇到你，我可能就错过这个机会了。\"</p>\n                <p>接下来的日子里，你们开始了紧张而充实的合作。每天下班后，你们都会一起讨论展览的细节，有时候甚至会工作到深夜。</p>\n                <p>\"陈晨，你觉得这个布局怎么样？\"林晓星指着设计稿问。</p>\n            ",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "Ending_default"
        },
        {
          "text": "继续故事...",
          "nextScene": "Ending_default",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "继续故事...",
          "nextScene": "new_beginning",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "继续故事...",
          "nextScene": "confession",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "继续故事...",
          "nextScene": "career_success",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "继续故事...",
          "nextScene": "focus",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "继续故事...",
          "nextScene": "joint_project",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "继续故事...",
          "nextScene": "starlight_center",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "继续故事...",
          "nextScene": "interactive",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "继续故事...",
          "nextScene": "theme_discussion",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "继续故事...",
          "nextScene": "our_story",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "继续故事...",
          "nextScene": "support_dream",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "继续故事...",
          "nextScene": "respect_choice",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "继续故事...",
          "nextScene": "stay_question",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "继续故事...",
          "nextScene": "future_dreams",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "继续故事...",
          "nextScene": "emotional_hug",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "继续故事...",
          "nextScene": "tibet_stories",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "继续故事...",
          "nextScene": "remember_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "继续故事...",
          "nextScene": "exhibition_preparation",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "继续故事...",
          "nextScene": "book_concept",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "面对现实，继续前行",
          "nextScene": "Ending_default",
          "effects": [
            {
              "stat": "courage",
              "change": 10
            },
            {
              "stat": "relationship",
              "change": -3
            }
          ]
        }
      ]
    },
    "farewell": {
      "background": "images/机场.jpg",
      "text": "\n                <p>展览筹备进入最后阶段，你们都感到既紧张又兴奋。为了放松心情，林晓星提议再去一次海边。</p>\n                <p>那是一个晴朗的夜晚，你们再次来到了栈桥。星空比上次更加璀璨，银河清晰可见。</p>\n                <p>\"陈晨，我有件事想告诉你，\"林晓星突然认真地说，\"下个月，我可能要离开青岛了。\"</p>\n                <p>\"我收到了一个去西藏拍摄星空的机会，\"她解释道，\"那是我一直梦想的地方，那里的星空被誉为世界上最美的星空之一。\"</p>\n                <p>她的声音有些颤抖：\"这个机会很难得，但我...我舍不得这里的一切。\"</p>\n            ",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "meet"
        },
        {
          "text": "面对现实，继续前行",
          "nextScene": "eternal_promise",
          "effects": [
            {
              "stat": "courage",
              "change": 10
            },
            {
              "stat": "relationship",
              "change": -3
            }
          ]
        }
      ]
    },
    "special_promise": {
      "background": "images/约定.jpg",
      "text": "\n                <p>\"晓星，我们做个约定吧。\"你认真地说。</p>\n                <p>\"什么约定？\"她抬起头，眼中闪烁着期待的光芒。</p>\n                <p>\"无论你走到哪里，都要记得追逐自己的梦想，\"你认真地说，\"而我也会在这里继续努力，找到属于自己的方向。等你在西藏拍到了最美的星空，一定要回来举办一场真正的个人摄影展。\"</p>\n                <p>她感动地点点头：\"好，我答应你。那你也答应我，无论遇到什么困难，都不要放弃寻找自己的星星。\"</p>\n                <p>\"我答应你，\"你伸出手，\"星光为证，我们的约定。\"</p>\n                <p>她轻轻握住你的手：\"星光为证。\"</p>\n                <p>星光下，你们的约定仿佛被永恒定格。</p>\n            ",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "reunion_hug"
        },
        {
          "text": "继续故事...",
          "nextScene": "eternal_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": -5
            },
            {
              "stat": "courage",
              "change": -2
            }
          ]
        },
        {
          "text": "返回之前的场景",
          "nextScene": "meet",
          "effects": [
            {
              "stat": "wisdom",
              "change": 2
            }
          ]
        }
      ]
    },
    "reunion": {
      "background": "images/重逢.jpg",
      "text": "\n                <p>半年后的一天，你接到了一个陌生的电话。\"陈晨，是我，晓星。我回来了！\"</p>\n                <p>你激动得差点跳起来：\"真的吗？你现在在哪里？\"</p>\n                <p>\"我在机场，刚下飞机，\"她的声音中带着兴奋，\"我有好多故事要告诉你，还有...我带来了世界上最美的星空照片。\"</p>\n                <p>你们约在了第一次见面的海边。当你赶到时，看到林晓星站在夕阳下，比半年前更加成熟自信。</p>\n                <p>\"陈晨！\"她看到你，开心地跑过来，\"好久不见！\"</p>\n                <p>她的眼中闪烁着熟悉的光芒，但似乎还带着一丝犹豫。</p>\n            ",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "collaboration"
        }
      ]
    },
    "new_beginning": {
      "background": "images/新开始.jpg",
      "text": "\n                <p>\"陈晨，我有个想法，\"林晓星突然说，\"我想在青岛举办一场真正的个人摄影展，就叫做'星光下的约定'。\"</p>\n                <p>\"这个主意太棒了！\"你兴奋地说，\"我可以帮你设计整个展览。\"</p>\n                <p>\"不仅如此，\"她神秘地笑了笑，\"我还想邀请你一起合作。这半年，我不仅拍了照片，还写了很多关于星空的故事。我觉得我们可以把这些故事和照片结合起来，创作一本摄影集。\"</p>\n                <p>你被她的话深深打动。你们再次握手，就像半年前在星空下那样。但这一次，你们的手握得更紧，因为你们都明白，这不仅仅是一个约定，更是一个新的开始。</p>\n            ",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "airport_farewell"
        }
      ]
    },
    "eternal_promise": {
      "background": "images/永恒.jpg",
      "text": "\n                <p>星光下，两个曾经迷茫的灵魂找到了彼此的方向。你们知道，这只是一个开始，在未来的日子里，还会有更多的星星等待你们去追逐，更多的约定等待你们去实现。</p>\n                <p>\"陈晨，你还记得我们第一次在这里相遇的情景吗？\"林晓星问。</p>\n                <p>\"当然记得，\"你微笑着说，\"那天你请我帮你拍照，然后我们一起来这里看星星。\"</p>\n                <p>\"那时候的我，还在为未来的方向迷茫，\"她回忆道，\"但是现在，我找到了自己的星星。而这一切，都是从那个意外的相遇开始的。\"</p>\n                <p>她突然认真地看着你：\"陈晨，我想和你做一个新的约定。无论未来我们走到哪里，无论遇到什么困难，都要记得今天的星空，记得我们曾经在这里许下的约定。我们要一起追逐更多的星星，创造更多的美好回忆。\"</p>\n                <p>你握住她的手：\"好，我答应你。这是我们的永恒约定。\"</p>\n                <p><strong>结局：永恒的星光</strong></p>\n                <p>在青岛的海边，在璀璨的星空下，有两个灵魂因为一个美丽的约定而永远相连。他们的故事才刚刚开始，而星光将永远见证他们的爱情与梦想。</p>\n            ",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "reunion"
        }
      ]
    },
    "confession": {
      "background": "images/告白.jpg",
      "text": "\n                <p>你深吸一口气，认真地看着林晓星：\"晓星，这半年来，我每天都在想你。我想问你...你愿意成为我的女朋友吗？\"</p>\n                <p>林晓星的脸瞬间红了，眼中闪烁着惊喜的泪光：\"陈晨，我...我也一直在等你这句话。我愿意！\"</p>\n                <p>你们紧紧相拥，星光为你们的爱情作证。这一刻，所有的等待和思念都变得值得。</p>\n                <p><strong>结局：星光恋人</strong></p>\n                <p>从青岛的海边到西藏的星空，你们的爱情跨越了时间和空间。在星光下许下的约定，终于开花结果。</p>\n            ",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "Ending_default"
        }
      ]
    },
    "career_success": {
      "background": "images/成功.jpg",
      "text": "\n                <p>你们全身心投入到摄影展的筹备中。展览取得了巨大的成功，林晓星的星空摄影作品受到了艺术界的高度评价。</p>\n                <p>\"陈晨，谢谢你一直以来的支持，\"林晓星感动地说，\"没有你，就没有今天的成功。\"</p>\n                <p>\"这是我们一起努力的结果，\"你微笑着说，\"我们的约定，终于实现了。\"</p>\n                <p><strong>结局：星光事业</strong></p>\n                <p>你们的合作不仅创造了艺术上的成功，更证明了梦想的力量。星光见证了你们的成长与成就。</p>\n            ",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "Ending_default"
        }
      ]
    },
    "refuse_polite": {
      "text": "<p>这是自动生成的场景 'refuse_polite'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "继续故事...",
          "nextScene": "Ending_default"
        },
        {
          "text": "做出最终决定",
          "nextScene": "eternal_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": 5
            },
            {
              "stat": "courage",
              "change": 10
            }
          ]
        },
        {
          "text": "返回之前的场景",
          "nextScene": "Ending_default",
          "effects": [
            {
              "stat": "wisdom",
              "change": 2
            }
          ]
        }
      ]
    },
    "photography_enthusiast": {
      "text": "<p>这是自动生成的场景 'photography_enthusiast'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "继续故事...",
          "nextScene": "Ending_default"
        },
        {
          "text": "做出最终决定",
          "nextScene": "eternal_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": 5
            },
            {
              "stat": "courage",
              "change": 10
            }
          ]
        },
        {
          "text": "返回之前的场景",
          "nextScene": "Ending_default",
          "effects": [
            {
              "stat": "wisdom",
              "change": 2
            }
          ]
        }
      ]
    },
    "sunset_together": {
      "text": "<p>这是自动生成的场景 'sunset_together'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "继续故事...",
          "nextScene": "Ending_default"
        },
        {
          "text": "做出最终决定",
          "nextScene": "eternal_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": 5
            },
            {
              "stat": "courage",
              "change": 10
            }
          ]
        },
        {
          "text": "返回之前的场景",
          "nextScene": "Ending_default",
          "effects": [
            {
              "stat": "wisdom",
              "change": 2
            }
          ]
        }
      ]
    },
    "busy_but_interested": {
      "text": "<p>这是自动生成的场景 'busy_but_interested'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "继续故事...",
          "nextScene": "Ending_default"
        },
        {
          "text": "做出最终决定",
          "nextScene": "eternal_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": 5
            },
            {
              "stat": "courage",
              "change": 10
            }
          ]
        },
        {
          "text": "返回之前的场景",
          "nextScene": "Ending_default",
          "effects": [
            {
              "stat": "wisdom",
              "change": 2
            }
          ]
        }
      ]
    },
    "starlight_talk": {
      "text": "<p>这是自动生成的场景 'starlight_talk'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "继续故事...",
          "nextScene": "Ending_default"
        },
        {
          "text": "做出最终决定",
          "nextScene": "eternal_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": 5
            },
            {
              "stat": "courage",
              "change": 10
            }
          ]
        }
      ]
    },
    "secret_spot": {
      "text": "<p>这是自动生成的场景 'secret_spot'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "继续故事...",
          "nextScene": "Ending_default"
        },
        {
          "text": "做出最终决定",
          "nextScene": "eternal_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": 5
            },
            {
              "stat": "courage",
              "change": 10
            }
          ]
        },
        {
          "text": "返回之前的场景",
          "nextScene": "Ending_default",
          "effects": [
            {
              "stat": "wisdom",
              "change": 2
            }
          ]
        }
      ]
    },
    "searching": {
      "text": "<p>这是自动生成的场景 'searching'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "继续故事...",
          "nextScene": "Ending_default"
        },
        {
          "text": "做出最终决定",
          "nextScene": "eternal_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": 5
            },
            {
              "stat": "courage",
              "change": 10
            }
          ]
        },
        {
          "text": "返回之前的场景",
          "nextScene": "meet",
          "effects": [
            {
              "stat": "wisdom",
              "change": 2
            }
          ]
        }
      ]
    },
    "designer_dream": {
      "text": "<p>这是自动生成的场景 'designer_dream'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "继续故事...",
          "nextScene": "Ending_default"
        },
        {
          "text": "做出最终决定",
          "nextScene": "eternal_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": 5
            },
            {
              "stat": "courage",
              "change": 10
            }
          ]
        },
        {
          "text": "继续故事",
          "nextScene": "romantic_dream",
          "effects": [
            {
              "stat": "relationship",
              "change": 3
            },
            {
              "stat": "courage",
              "change": 2
            }
          ]
        }
      ]
    },
    "admiration": {
      "text": "<p>这是自动生成的场景 'admiration'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "继续故事...",
          "nextScene": "Ending_default"
        },
        {
          "text": "做出最终决定",
          "nextScene": "eternal_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": 5
            },
            {
              "stat": "courage",
              "change": 10
            }
          ]
        },
        {
          "text": "返回之前的场景",
          "nextScene": "Ending_default",
          "effects": [
            {
              "stat": "wisdom",
              "change": 2
            }
          ]
        }
      ]
    },
    "romantic_dream": {
      "text": "<p>这是自动生成的场景 'romantic_dream'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "继续故事...",
          "nextScene": "Ending_default"
        },
        {
          "text": "做出最终决定",
          "nextScene": "eternal_promise",
          "effects": [
            {
              "stat": "relationship",
              "change": 5
            },
            {
              "stat": "courage",
              "change": 10
            }
          ]
        },
        {
          "text": "继续前进",
          "nextScene": "Ending_Good",
          "effects": [
            {
              "stat": "relationship",
              "change": 5
            },
            {
              "stat": "romance",
              "change": 5
            }
          ]
        }
      ]
    },
    "support": {
      "text": "<p>这是自动生成的场景 'support'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "designer_dream"
        }
      ]
    },
    "focus": {
      "text": "<p>这是自动生成的场景 'focus'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "Ending_default"
        }
      ]
    },
    "joint_project": {
      "text": "<p>这是自动生成的场景 'joint_project'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "keep_in_touch"
        }
      ]
    },
    "starlight_center": {
      "text": "<p>这是自动生成的场景 'starlight_center'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "继续故事...",
          "nextScene": "Ending_default"
        }
      ]
    },
    "interactive": {
      "text": "<p>这是自动生成的场景 'interactive'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "继续故事...",
          "nextScene": "Ending_default"
        }
      ]
    },
    "theme_discussion": {
      "text": "<p>这是自动生成的场景 'theme_discussion'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "继续故事...",
          "nextScene": "Ending_default"
        }
      ]
    },
    "our_story": {
      "text": "<p>这是自动生成的场景 'our_story'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "继续故事...",
          "nextScene": "Ending_default"
        }
      ]
    },
    "support_dream": {
      "text": "<p>这是自动生成的场景 'support_dream'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "compliment"
        }
      ]
    },
    "respect_choice": {
      "text": "<p>这是自动生成的场景 'respect_choice'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "Ending_default"
        }
      ]
    },
    "stay_question": {
      "text": "<p>这是自动生成的场景 'stay_question'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "Ending_default"
        }
      ]
    },
    "airport_farewell": {
      "text": "<p>这是自动生成的场景 'airport_farewell'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "继续故事...",
          "nextScene": "Ending_default"
        }
      ]
    },
    "keep_in_touch": {
      "text": "<p>这是自动生成的场景 'keep_in_touch'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "继续故事...",
          "nextScene": "Ending_default"
        }
      ]
    },
    "future_dreams": {
      "text": "<p>这是自动生成的场景 'future_dreams'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "继续故事...",
          "nextScene": "Ending_default"
        }
      ]
    },
    "emotional_hug": {
      "text": "<p>这是自动生成的场景 'emotional_hug'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "继续故事...",
          "nextScene": "Ending_default"
        }
      ]
    },
    "tibet_stories": {
      "text": "<p>这是自动生成的场景 'tibet_stories'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "Ending_default"
        }
      ]
    },
    "compliment": {
      "text": "<p>这是自动生成的场景 'compliment'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "Ending_Good"
        }
      ]
    },
    "remember_promise": {
      "text": "<p>这是自动生成的场景 'remember_promise'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "继续故事...",
          "nextScene": "Ending_Bad"
        }
      ]
    },
    "reunion_hug": {
      "text": "<p>这是自动生成的场景 'reunion_hug'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "support"
        }
      ]
    },
    "exhibition_preparation": {
      "text": "<p>这是自动生成的场景 'exhibition_preparation'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "Ending_Bad"
        }
      ]
    },
    "book_concept": {
      "text": "<p>这是自动生成的场景 'book_concept'。请根据需要完善内容。</p>",
      "choices": [
        {
          "text": "发现新的路径...",
          "nextScene": "Ending_default"
        }
      ]
    },
    "Ending_default": {
      "text": "<p>故事暂时告一段落。感谢您的参与！</p>",
      "choices": [
        {
          "text": "重新开始故事",
          "nextScene": "meet",
          "effects": [
            {
              "stat": "relationship",
              "change": 0
            },
            {
              "stat": "courage",
              "change": 0
            }
          ]
        }
      ]
    },
    "Ending_Bad": {
      "text": "<p>故事暂时告一段落。感谢您的参与！Ending_Bad</p>",
      "choices": [
        {
          "text": "重新开始故事",
          "nextScene": "meet",
          "effects": [
            {
              "stat": "relationship",
              "change": 0
            },
            {
              "stat": "courage",
              "change": 0
            }
          ]
        }
      ]
    }, 
    "Ending_Good": {
      "text": "<p>恭喜您，故事结束了！Ending_Good</p>",
      "choices": [
        {
          "text": "重新开始故事",
          "nextScene": "meet",
          "effects": [
            {
              "stat": "relationship",
              "change": 0
            },
            {
              "stat": "courage",
              "change": 0
            }
          ]
        }
      ]
    }




  },
  "metadata": {
    "totalScenes": 43,
    "totalChoices": 104,
    "createdDate": "2025-12-30T05:09:27.918Z",
    "toolVersion": "1.0"
  }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = storyData;
}
