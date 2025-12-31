// 场景优化工具 - 智能图论分支优化算法
// 专门用于修复无法到达的场景，并通过图论理论智能补充分支深度和广度的场景点
// 支持AI模型填充场景文学描写内容
// 版本：2.0 - 智能分支优化版

const fs = require('fs');

// AI场景内容生成器框架
class AISceneContentGenerator {
    constructor() {
        this.sceneTemplates = this.initializeSceneTemplates();
        this.emotionalKeywords = this.initializeEmotionalKeywords();
    }
    
    initializeSceneTemplates() {
        return {
            'romantic': [
                '在{location}，{character}轻轻地说："{dialogue}"。{emotional_description}',
                '月光洒在{location}，{character}的眼神中闪烁着{emotion}的光芒。{action_description}',
                '{time}的{location}，空气中弥漫着{atmosphere}。{character}的{action}让{other_character}感到{feeling}。'
            ],
            'conflict': [
                '在{location}，{character}和{other_character}因为{reason}产生了激烈的{conflict_type}。{emotional_tension}',
                '{character}的话语像一把利剑刺向{other_character}的心。{conflict_escalation}',
                '空气中弥漫着紧张的气氛，{character}和{other_character}之间的{relationship_status}面临着严峻考验。'
            ],
            'resolution': [
                '经过深思熟虑，{character}决定{decision}。这个选择将带来{consequence}。',
                '在{location}，{character}和{other_character}终于达成了{resolution_type}。{emotional_resolution}',
                '{character}的{action}让一切都有了新的转机。{future_outlook}'
            ]
        };
    }
    
    initializeEmotionalKeywords() {
        return {
            'romantic': ['温柔', '甜蜜', '心动', '浪漫', '温馨', '美好'],
            'conflict': ['紧张', '激烈', '矛盾', '冲突', '误会', '失望'],
            'resolution': ['释然', '和解', '成长', '领悟', '平静', '希望']
        };
    }
    
    // 生成场景内容（框架方法，实际使用时需要接入AI模型）
    generateSceneContent(sceneType, context) {
        const templates = this.sceneTemplates[sceneType] || this.sceneTemplates['romantic'];
        const template = templates[Math.floor(Math.random() * templates.length)];
        
        // 这里可以接入实际的AI模型来填充内容
        // 目前使用占位符框架
        return this.fillTemplate(template, context);
    }
    
    fillTemplate(template, context) {
        let content = template;
        for (const [key, value] of Object.entries(context)) {
            content = content.replace(`{${key}}`, value || '未知');
        }
        return content;
    }
}

// 智能图论分支优化器类
class IntelligentGraphBranchOptimizer {
     constructor(storyData) {
         this.storyData = storyData;
         this.unreachableScenes = [];
         this.negativeScenes = [];
         this.endingScenes = [];
         this.circularReferences = [];
         this.sceneGraph = {};
         this.aiGenerator = new AISceneContentGenerator();
         this.branchAnalysis = {};
         this.depthAnalysis = {};
     }

    // 分析故事结构
    analyzeStoryStructure() {
        console.log('🔍 正在分析故事结构...');
        
        // 获取所有已定义的场景
        const allScenes = Object.keys(this.storyData.scenes);
        
        // 收集所有被引用的场景
        const referencedScenes = new Set();
        referencedScenes.add(this.storyData.initialState.currentScene);
        
        // 遍历所有场景的选择项
        for (const sceneName of allScenes) {
            const scene = this.storyData.scenes[sceneName];
            if (scene && scene.choices) {
                for (const choice of scene.choices) {
                    if (choice.nextScene) {
                        referencedScenes.add(choice.nextScene);
                    }
                }
            }
        }
        
        // 识别无法到达的场景
        this.unreachableScenes = allScenes.filter(
            scene => !referencedScenes.has(scene) && 
                     scene !== this.storyData.initialState.currentScene
        );
        
        // 识别负面场景（基于文本内容分析）
        this.identifyNegativeScenes();
        
        // 识别结局场景
        this.identifyEndingScenes();
        
        // 检测循环引用
        this.detectCircularReferences();
        
        // 构建场景图
        this.buildSceneGraph();
        
        console.log(`📊 分析完成:`);
        console.log(`   - 无法到达的场景: ${this.unreachableScenes.length} 个`);
        console.log(`   - 负面场景: ${this.negativeScenes.length} 个`);
        console.log(`   - 结局场景: ${this.endingScenes.length} 个`);
        console.log(`   - 循环引用: ${this.circularReferences.length} 个`);
    }

    // 智能分支深度和广度分析
    analyzeBranchDepthAndWidth() {
        console.log('🌳 正在分析分支深度和广度...');
        
        // 重置分析数据
        this.branchAnalysis = {};
        this.depthAnalysis = {};
        
        // 计算每个场景的分支宽度（出度）
        for (const sceneName of Object.keys(this.storyData.scenes)) {
            const scene = this.storyData.scenes[sceneName];
            const branchWidth = scene.choices ? scene.choices.length : 0;
            
            this.branchAnalysis[sceneName] = {
                width: branchWidth,
                depth: 0,
                needsExpansion: branchWidth < 2, // 分支数少于2需要扩展
                needsReduction: branchWidth > 3,  // 分支数大于3需要削减
                sceneType: this.classifySceneType(sceneName)
            };
        }
        
        // 计算分支深度（从开始场景到每个场景的最短路径）
        this.calculateBranchDepth();
        
        // 识别需要优化的分支点
        this.identifyBranchOptimizationPoints();
        
        console.log('📈 分支分析完成');
    }

    // 分类场景类型
    classifySceneType(sceneName) {
        const scene = this.storyData.scenes[sceneName];
        const text = scene.text || '';
        
        if (text.includes('浪漫') || text.includes('甜蜜') || text.includes('心动')) {
            return 'romantic';
        } else if (text.includes('冲突') || text.includes('误会') || text.includes('争吵')) {
            return 'conflict';
        } else if (text.includes('结局') || text.includes('结束') || text.includes('最后')) {
            return 'ending';
        } else if (text.includes('选择') || text.includes('决定') || text.includes('转折')) {
            return 'decision';
        }
        
        return 'normal';
    }

    // 计算分支深度（使用BFS算法）
    calculateBranchDepth() {
        const startScene = this.storyData.initialState.currentScene;
        const visited = new Set();
        const queue = [{ scene: startScene, depth: 0 }];
        
        visited.add(startScene);
        
        while (queue.length > 0) {
            const current = queue.shift();
            this.branchAnalysis[current.scene].depth = current.depth;
            
            const scene = this.storyData.scenes[current.scene];
            if (scene && scene.choices) {
                for (const choice of scene.choices) {
                    if (choice.nextScene && !visited.has(choice.nextScene)) {
                        visited.add(choice.nextScene);
                        queue.push({ scene: choice.nextScene, depth: current.depth + 1 });
                    }
                }
            }
        }
        
        // 记录最大深度
        this.maxDepth = Math.max(...Object.values(this.branchAnalysis).map(a => a.depth));
    }

    // 识别分支优化点
    identifyBranchOptimizationPoints() {
        this.optimizationPoints = {
            depthExpansion: [],    // 需要深度扩展的场景
            widthExpansion: [],    // 需要宽度扩展的场景
            widthReduction: []     // 需要宽度削减的场景
        };
        
        for (const [sceneName, analysis] of Object.entries(this.branchAnalysis)) {
            // 深度扩展：深度较浅且是决策点
            if (analysis.depth < 3 && analysis.sceneType === 'decision') {
                this.optimizationPoints.depthExpansion.push(sceneName);
            }
            
            // 宽度扩展：分支数少于2的重要场景
            if (analysis.width < 2 && (analysis.sceneType === 'decision' || analysis.sceneType === 'romantic')) {
                this.optimizationPoints.widthExpansion.push(sceneName);
            }
            
            // 宽度削减：分支数大于3的场景
            if (analysis.width > 3) {
                this.optimizationPoints.widthReduction.push(sceneName);
            }
        }
        
        console.log(`   - 需要深度扩展的场景: ${this.optimizationPoints.depthExpansion.length} 个`);
        console.log(`   - 需要宽度扩展的场景: ${this.optimizationPoints.widthExpansion.length} 个`);
        console.log(`   - 需要宽度削减的场景: ${this.optimizationPoints.widthReduction.length} 个`);
    }

    // 识别负面场景
    identifyNegativeScenes() {
        const negativeKeywords = [
            '失败', '失望', '遗憾', '错过', '分离', '分手', '冲突',
            '争吵', '误会', '悲伤', '痛苦', '后悔', '放弃', '离开'
        ];
        
        this.negativeScenes = Object.keys(this.storyData.scenes).filter(sceneName => {
            const scene = this.storyData.scenes[sceneName];
            if (!scene.text) return false;
            
            const text = scene.text.toLowerCase();
            return negativeKeywords.some(keyword => text.includes(keyword.toLowerCase()));
        });
        
        // 如果没有找到负面场景，创建一些
        if (this.negativeScenes.length === 0) {
            this.createNegativeScenes();
        }
    }

    // 识别结局场景
    identifyEndingScenes() {
        this.endingScenes = Object.keys(this.storyData.scenes).filter(sceneName => {
            const scene = this.storyData.scenes[sceneName];
            if (!scene) return false;
            
            // 多种方式识别结局
            if (scene.text && scene.text.includes('结局：')) return true;
            if (!scene.choices || scene.choices.length === 0) return true;
            if (sceneName.startsWith('ending_')) return true;
            
            // 检查是否只有重新开始选项
            if (scene.choices && scene.choices.length > 0) {
                const hasOnlyRestart = scene.choices.every(choice => 
                    choice.text && (choice.text.includes('重新开始') || choice.text.includes('重新开始故事'))
                );
                if (hasOnlyRestart) return true;
            }
            
            return false;
        });
    }

    // 构建场景图
    buildSceneGraph() {
        for (const sceneName of Object.keys(this.storyData.scenes)) {
            const scene = this.storyData.scenes[sceneName];
            this.sceneGraph[sceneName] = {
                scene: scene,
                connections: new Set(),
                isNegative: this.negativeScenes.includes(sceneName),
                isEnding: this.endingScenes.includes(sceneName),
                isUnreachable: this.unreachableScenes.includes(sceneName)
            };
            
            if (scene.choices) {
                for (const choice of scene.choices) {
                    if (choice.nextScene) {
                        this.sceneGraph[sceneName].connections.add(choice.nextScene);
                    }
                }
            }
        }
    }

    // 检测循环引用
    detectCircularReferences() {
        console.log('🔄 正在检测循环引用...');
        this.circularReferences = [];
        
        for (const startScene of Object.keys(this.storyData.scenes)) {
            const visited = new Set();
            const path = [];
            
            this.detectCycle(startScene, visited, path, startScene);
        }
        
        console.log(`   🔍 发现 ${this.circularReferences.length} 个循环引用`);
    }

    // 递归检测循环
    detectCycle(currentScene, visited, path, startScene) {
        if (visited.has(currentScene)) {
            // 找到循环
            const cycleStart = path.indexOf(currentScene);
            if (cycleStart !== -1) {
                const cycle = path.slice(cycleStart);
                cycle.push(currentScene);
                
                // 避免重复记录相同的循环
                const cycleKey = cycle.join('->');
                if (!this.circularReferences.some(ref => ref.join('->') === cycleKey)) {
                    this.circularReferences.push(cycle);
                    console.log(`   ⚠️ 循环引用: ${cycle.join(' -> ')}`);
                }
            }
            return;
        }
        
        visited.add(currentScene);
        path.push(currentScene);
        
        const scene = this.storyData.scenes[currentScene];
        if (scene && scene.choices) {
            for (const choice of scene.choices) {
                if (choice.nextScene) {
                    this.detectCycle(choice.nextScene, visited, path, startScene);
                }
            }
        }
        
        path.pop();
        visited.delete(currentScene);
    }

    // 修复循环引用
    fixCircularReferences() {
        console.log('🔧 正在修复循环引用...');
        
        for (const cycle of this.circularReferences) {
            console.log(`   🔄 修复循环: ${cycle.join(' -> ')}`);
            
            // 找到循环中的最后一个场景（通常是结局场景）
            const lastScene = cycle[cycle.length - 1];
            const secondLastScene = cycle[cycle.length - 2];
            
            // 检查最后一个场景是否是结局场景
            if (this.endingScenes.includes(lastScene)) {
                // 如果是结局场景，确保它不指向循环的开始
                const lastSceneData = this.storyData.scenes[lastScene];
                if (lastSceneData.choices) {
                    // 移除指向循环开始的选择
                    lastSceneData.choices = lastSceneData.choices.filter(choice => 
                        !cycle.includes(choice.nextScene)
                    );
                    
                    // 如果没有选择项了，添加重新开始选项
                    if (lastSceneData.choices.length === 0) {
                        lastSceneData.choices.push({
                            text: '重新开始故事',
                            nextScene: this.storyData.initialState.currentScene,
                            effects: [
                                { stat: 'relationship', change: 0 },
                                { stat: 'courage', change: 0 }
                            ]
                        });
                    }
                }
            } else {
                // 如果不是结局场景，创建过渡到结局的路径
                this.createTransitionToEnding(lastScene);
            }
        }
        
        console.log('✅ 循环引用修复完成');
    }

    // 创建过渡到结局的路径
    createTransitionToEnding(fromScene) {
        const fromSceneData = this.storyData.scenes[fromScene];
        
        if (!fromSceneData.choices) {
            fromSceneData.choices = [];
        }
        
        // 找到合适的结局
        const suitableEnding = this.findSuitableEnding(fromScene);
        
        if (suitableEnding) {
            // 添加过渡到结局的选择
            fromSceneData.choices.push({
                text: '做出最终决定',
                nextScene: suitableEnding,
                effects: [
                    { stat: 'relationship', change: 5 },
                    { stat: 'courage', change: 10 }
                ]
            });
            
            console.log(`   🌉 创建过渡: ${fromScene} → ${suitableEnding}`);
        }
    }

    // 为场景找到合适的结局
    findSuitableEnding(sceneName) {
        const scene = this.storyData.scenes[sceneName];
        const sceneText = scene.text || '';
        
        // 根据场景内容选择相应的结局
        if (sceneText.includes('浪漫') || sceneText.includes('甜蜜')) {
            return this.findEndingByTheme(['爱情', '幸福', '美好']);
        } else if (sceneText.includes('冲突') || sceneText.includes('误会')) {
            return this.findEndingByTheme(['和解', '成长', '理解']);
        } else if (sceneText.includes('选择') || sceneText.includes('决定')) {
            return this.findEndingByTheme(['成功', '成就', '未来']);
        }
        
        // 默认返回第一个结局
        return this.endingScenes.length > 0 ? this.endingScenes[0] : null;
    }

    // 连接孤立场景
    connectIsolatedScenes() {
        console.log('🔗 正在连接孤立场景...');
        
        // 重新分析孤立场景（可能已经被部分连接）
        this.analyzeStoryStructure();
        
        const isolatedScenes = this.unreachableScenes.filter(scene => 
            !this.negativeScenes.includes(scene) && !this.endingScenes.includes(scene)
        );
        
        console.log(`   📊 发现 ${isolatedScenes.length} 个孤立场景`);
        
        for (const isolatedScene of isolatedScenes) {
            console.log(`   🔍 处理孤立场景: ${isolatedScene}`);
            
            // 找到最适合连接的主线场景
            const bestConnectionPoint = this.findBestConnectionPoint(isolatedScene);
            
            if (bestConnectionPoint) {
                this.connectToMainStory(bestConnectionPoint, isolatedScene);
                console.log(`   ✅ 连接 ${bestConnectionPoint} → ${isolatedScene}`);
            }
        }
    }

    // 找到最适合连接孤立场景的主线场景
    findBestConnectionPoint(isolatedScene) {
        const isolatedSceneData = this.storyData.scenes[isolatedScene];
        const isolatedText = isolatedSceneData.text || '';
        
        let bestMatch = null;
        let bestScore = -1;
        
        // 遍历所有主线场景（非孤立场景）
        for (const sceneName of Object.keys(this.storyData.scenes)) {
            if (this.unreachableScenes.includes(sceneName)) continue;
            
            const sceneData = this.storyData.scenes[sceneName];
            const sceneText = sceneData.text || '';
            
            // 计算文本相似度
            const similarity = this.calculateTextSimilarity(isolatedText, sceneText);
            
            // 考虑场景类型匹配度
            const isolatedType = this.classifySceneType(isolatedScene);
            const sceneType = this.classifySceneType(sceneName);
            const typeMatch = isolatedType === sceneType ? 1 : 0.5;
            
            const totalScore = similarity * typeMatch;
            
            if (totalScore > bestScore) {
                bestScore = totalScore;
                bestMatch = sceneName;
            }
        }
        
        return bestMatch;
    }

    // 将孤立场景连接到主线故事
    connectToMainStory(mainScene, isolatedScene) {
        const mainSceneData = this.storyData.scenes[mainScene];
        
        if (!mainSceneData.choices) {
            mainSceneData.choices = [];
        }
        
        // 添加选择项指向孤立场景
        const isolatedSceneData = this.storyData.scenes[isolatedScene];
        const isolatedText = isolatedSceneData.text || '';
        
        let choiceText = '继续探索';
        if (isolatedText.includes('浪漫') || isolatedText.includes('甜蜜')) {
            choiceText = '体验浪漫时刻';
        } else if (isolatedText.includes('冲突') || isolatedText.includes('误会')) {
            choiceText = '面对挑战';
        } else if (isolatedText.includes('选择') || isolatedText.includes('决定')) {
            choiceText = '做出重要决定';
        }
        
        mainSceneData.choices.push({
            text: choiceText,
            nextScene: isolatedScene,
            effects: [
                { stat: 'relationship', change: 3 },
                { stat: 'courage', change: 2 }
            ]
        });
    }

    // 优化场景可达性
    optimizeSceneAccessibility() {
        console.log('🌐 正在优化场景可达性...');
        
        // 重新分析无法到达的场景
        this.analyzeStoryStructure();
        
        const remainingUnreachable = this.unreachableScenes.filter(scene => 
            !this.negativeScenes.includes(scene) && !this.endingScenes.includes(scene)
        );
        
        console.log(`   📊 剩余 ${remainingUnreachable.length} 个无法到达的场景`);
        
        if (remainingUnreachable.length > 0) {
            // 创建专门的连接场景来整合这些场景
            this.createIntegrationHub(remainingUnreachable);
        }
    }

    // 创建整合中心来连接多个无法到达的场景
    createIntegrationHub(unreachableScenes) {
        console.log('🏗️ 创建整合中心...');
        
        const hubName = 'story_integration_hub';
        
        // 创建整合中心场景
        this.storyData.scenes[hubName] = {
            text: '这是一个重要的故事转折点。在这里，你可以选择不同的路径继续你的冒险。',
            background: 'images/选择.jpg',
            choices: []
        };
        
        // 为每个无法到达的场景创建选择项
        for (const scene of unreachableScenes) {
            const sceneData = this.storyData.scenes[scene];
            const sceneText = sceneData.text || '';
            
            let choiceText = '探索这个路径';
            if (sceneText.includes('浪漫')) choiceText = '体验浪漫时刻';
            else if (sceneText.includes('冲突')) choiceText = '面对挑战';
            else if (sceneText.includes('选择')) choiceText = '做出决定';
            
            this.storyData.scenes[hubName].choices.push({
                text: choiceText,
                nextScene: scene,
                effects: [
                    { stat: 'relationship', change: 2 },
                    { stat: 'courage', change: 3 }
                ]
            });
        }
        
        // 找到主线中适合连接整合中心的场景
        const bestConnectionPoint = this.findBestHubConnectionPoint();
        
        if (bestConnectionPoint) {
            this.connectHubToMainStory(bestConnectionPoint, hubName);
            console.log(`   🌉 连接整合中心: ${bestConnectionPoint} → ${hubName}`);
        }
    }

    // 找到最适合连接整合中心的主线场景
    findBestHubConnectionPoint() {
        // 寻找决策点或转折点场景
        for (const sceneName of Object.keys(this.storyData.scenes)) {
            if (this.unreachableScenes.includes(sceneName)) continue;
            
            const sceneType = this.classifySceneType(sceneName);
            if (sceneType === 'decision' || sceneType === 'romantic') {
                return sceneName;
            }
        }
        
        // 如果没有找到合适的决策点，返回第一个主线场景
        for (const sceneName of Object.keys(this.storyData.scenes)) {
            if (!this.unreachableScenes.includes(sceneName)) {
                return sceneName;
            }
        }
        
        return null;
    }

    // 将整合中心连接到主线故事
    connectHubToMainStory(mainScene, hubName) {
        const mainSceneData = this.storyData.scenes[mainScene];
        
        if (!mainSceneData.choices) {
            mainSceneData.choices = [];
        }
        
        // 添加选择项指向整合中心
        mainSceneData.choices.push({
            text: '探索更多可能性',
            nextScene: hubName,
            effects: [
                { stat: 'relationship', change: 5 },
                { stat: 'courage', change: 5 }
            ]
        });
    }

    // 创建负面场景（如果没有）
    createNegativeScenes() {
        const negativeSceneTemplates = [
            {
                name: 'misunderstanding',
                text: '由于沟通不畅，产生了误会。你们的关系暂时陷入了僵局。',
                background: 'images/误会.jpg'
            },
            {
                name: 'conflict',
                text: '意见不合导致了一场争吵，气氛变得紧张起来。',
                background: 'images/冲突.jpg'
            },
            {
                name: 'disappointment',
                text: '期望落空，心中充满了失望。也许需要重新考虑这段关系。',
                background: 'images/失望.jpg'
            },
            {
                name: 'separation',
                text: '因为各自的目标不同，你们不得不暂时分开。',
                background: 'images/分离.jpg'
            }
        ];
        
        for (const template of negativeSceneTemplates) {
            if (!this.storyData.scenes[template.name]) {
                this.storyData.scenes[template.name] = {
                    text: template.text,
                    background: template.background,
                    choices: []
                };
                this.negativeScenes.push(template.name);
            }
        }
    }

    // 图论平滑算法 - 将无法到达的场景连接到负面场景
    applySmoothingAlgorithm() {
        console.log('🔄 正在应用图论平滑算法...');
        
        if (this.unreachableScenes.length === 0) {
            console.log('✅ 没有无法到达的场景需要优化');
            return;
        }

        // 为每个无法到达的场景找到最近的负面场景
        for (const unreachableScene of this.unreachableScenes) {
            const bestNegativeScene = this.findBestNegativeConnection(unreachableScene);
            
            if (bestNegativeScene) {
                this.connectToNegativeScene(bestNegativeScene, unreachableScene);
                console.log(`   🔗 连接 ${unreachableScene} → ${bestNegativeScene}`);
            }
        }

        // 为负面场景创建平滑过渡到结局
        this.createSmoothTransitionsToEndings();
        
        // 修复循环引用
        this.fixCircularReferences();
        
        // 连接孤立场景
        this.connectIsolatedScenes();
        
        // 优化场景可达性
        this.optimizeSceneAccessibility();
    }

    // 找到最佳的负面场景连接点
    findBestNegativeConnection(targetScene) {
        // 简单的策略：选择文本内容最相关的负面场景
        const targetText = this.storyData.scenes[targetScene]?.text || '';
        
        let bestMatch = null;
        let bestScore = -1;
        
        for (const negativeScene of this.negativeScenes) {
            const negativeText = this.storyData.scenes[negativeScene]?.text || '';
            const score = this.calculateTextSimilarity(targetText, negativeText);
            
            if (score > bestScore) {
                bestScore = score;
                bestMatch = negativeScene;
            }
        }
        
        return bestMatch || (this.negativeScenes.length > 0 ? this.negativeScenes[0] : null);
    }

    // 计算文本相似度（简单版）
    calculateTextSimilarity(text1, text2) {
        const words1 = new Set(text1.toLowerCase().split(/[\s\p{P}]/u).filter(Boolean));
        const words2 = new Set(text2.toLowerCase().split(/[\s\p{P}]/u).filter(Boolean));
        
        const intersection = new Set([...words1].filter(x => words2.has(x)));
        const union = new Set([...words1, ...words2]);
        
        return union.size === 0 ? 0 : intersection.size / union.size;
    }

    // 连接到负面场景
    connectToNegativeScene(negativeScene, targetScene) {
        const negativeSceneData = this.storyData.scenes[negativeScene];
        
        if (!negativeSceneData.choices) {
            negativeSceneData.choices = [];
        }
        
        // 添加一个选择项指向目标场景
        negativeSceneData.choices.push({
            text: '继续故事...',
            nextScene: targetScene,
            effects: [
                { stat: 'relationship', change: -5 },
                { stat: 'courage', change: -2 }
            ]
        });
    }

    // 创建平滑过渡到结局
    createSmoothTransitionsToEndings() {
        console.log('🌊 创建平滑过渡到结局...');
        
        for (const negativeScene of this.negativeScenes) {
            const bestEnding = this.findBestEndingForNegativeScene(negativeScene);
            
            if (bestEnding) {
                this.createTransitionPath(negativeScene, bestEnding);
                console.log(`   🌉 创建过渡: ${negativeScene} → ${bestEnding}`);
            }
        }
    }

    // 为负面场景找到最合适的结局
    findBestEndingForNegativeScene(negativeScene) {
        const negativeText = this.storyData.scenes[negativeScene]?.text || '';
        
        // 根据负面场景的主题选择相应的结局
        if (negativeText.includes('误会') || negativeText.includes('冲突')) {
            // 适合和解或遗憾结局
            return this.findEndingByTheme(['和解', '遗憾', '离别']);
        } else if (negativeText.includes('失望') || negativeText.includes('落空')) {
            // 适合成长或重新开始结局
            return this.findEndingByTheme(['成长', '重新开始', '自我提升']);
        } else if (negativeText.includes('分离') || negativeText.includes('分开')) {
            // 适合重逢或各自安好结局
            return this.findEndingByTheme(['重逢', '各自安好', '未来']);
        }
        
        // 默认返回第一个结局
        return this.endingScenes.length > 0 ? this.endingScenes[0] : null;
    }

    // 根据主题找到结局
    findEndingByTheme(themes) {
        for (const theme of themes) {
            for (const ending of this.endingScenes) {
                const endingText = this.storyData.scenes[ending]?.text || '';
                if (endingText.includes(theme)) {
                    return ending;
                }
            }
        }
        return this.endingScenes.length > 0 ? this.endingScenes[0] : null;
    }

    // 创建过渡路径
    createTransitionPath(fromScene, toEnding) {
        const fromSceneData = this.storyData.scenes[fromScene];
        
        if (!fromSceneData.choices) {
            fromSceneData.choices = [];
        }
        
        // 检查是否已经有指向该结局的选择
        const hasDirectConnection = fromSceneData.choices.some(
            choice => choice.nextScene === toEnding
        );
        
        if (!hasDirectConnection) {
            // 添加直接过渡选择
            fromSceneData.choices.push({
                text: '面对现实，继续前行',
                nextScene: toEnding,
                effects: [
                    { stat: 'courage', change: 10 },
                    { stat: 'relationship', change: -3 }
                ]
            });
        }
    }

    // 优化故事数据
    optimize(enableBranchExpansion = true) {
        console.log('🚀 开始优化故事数据...\n');
        
        this.analyzeStoryStructure();
        console.log('');
        
        // 智能分支分析
        this.analyzeBranchDepthAndWidth();
        console.log('');
        
        // 应用图论平滑算法
        this.applySmoothingAlgorithm();
        console.log('');
        
        // 应用智能分支补充算法（可选）
        if (enableBranchExpansion) {
            this.applyIntelligentBranchExpansion();
            console.log('');
        }
        
        // 验证优化结果
        this.validateOptimization();
        
        console.log('✅ 优化完成！');
        return this.storyData;
    }

    // 智能分支补充算法 - 基于图论理论补充分支深度和广度
    applyIntelligentBranchExpansion() {
        console.log('🌱 正在应用智能分支补充算法...');
        
        // 深度扩展：为浅层决策点添加更多层次
        this.expandBranchDepth();
        
        // 宽度扩展：为重要场景添加更多选择
        this.expandBranchWidth();
        
        // 宽度削减：优化过度分支的场景
        this.reduceExcessiveBranches();
        
        console.log('🎯 智能分支补充完成');
    }

    // 扩展分支深度
    expandBranchDepth() {
        for (const sceneName of this.optimizationPoints.depthExpansion) {
            console.log(`   📏 扩展深度: ${sceneName}`);
            
            const scene = this.storyData.scenes[sceneName];
            const currentDepth = this.branchAnalysis[sceneName].depth;
            
            // 为目标深度添加中间场景
            const targetDepth = currentDepth + 2;
            this.addIntermediateScenes(sceneName, targetDepth);
        }
    }

    // 扩展分支宽度
    expandBranchWidth() {
        for (const sceneName of this.optimizationPoints.widthExpansion) {
            console.log(`   📐 扩展宽度: ${sceneName}`);
            
            const scene = this.storyData.scenes[sceneName];
            const sceneType = this.branchAnalysis[sceneName].sceneType;
            
            // 根据场景类型添加适当的选择项
            this.addBranchChoices(sceneName, sceneType);
        }
    }

    // 削减过度分支
    reduceExcessiveBranches() {
        for (const sceneName of this.optimizationPoints.widthReduction) {
            console.log(`   ✂️ 削减分支: ${sceneName}`);
            
            const scene = this.storyData.scenes[sceneName];
            
            // 保留最重要的2-3个选择，合并或删除其他选择
            this.optimizeBranchChoices(sceneName);
        }
    }

    // 添加中间场景（深度扩展）
    addIntermediateScenes(baseSceneName, targetDepth) {
        const baseScene = this.storyData.scenes[baseSceneName];
        const sceneType = this.branchAnalysis[baseSceneName].sceneType;
        
        // 创建中间场景
        const intermediateSceneName = `${baseSceneName}_intermediate_${Date.now()}`;
        
        // 使用AI生成器创建场景内容
        const context = {
            location: '海边',
            character: '林星雨',
            other_character: '你',
            emotion: '期待',
            action: '漫步',
            atmosphere: '浪漫的气息'
        };
        
        const sceneContent = this.aiGenerator.generateSceneContent(sceneType, context);
        
        // 创建新场景
        this.storyData.scenes[intermediateSceneName] = {
            text: sceneContent,
            background: 'images/海边.jpg',
            choices: []
        };
        
        // 修改原场景的选择指向新场景
        if (baseScene.choices && baseScene.choices.length > 0) {
            // 将第一个选择指向中间场景
            baseScene.choices[0].nextScene = intermediateSceneName;
            
            // 为中间场景添加指向原目标的选择
            this.storyData.scenes[intermediateSceneName].choices = [
                {
                    text: '继续前行',
                    nextScene: baseScene.choices[0].nextScene,
                    effects: [{ stat: 'relationship', change: 5 }]
                }
            ];
        }
    }

    // 添加分支选择（宽度扩展）
    addBranchChoices(sceneName, sceneType) {
        const scene = this.storyData.scenes[sceneName];
        
        if (!scene.choices) {
            scene.choices = [];
        }
        
        // 根据场景类型添加适当的选择项
        const additionalChoices = this.generateAdditionalChoices(sceneType);
        
        // 添加新选择项（不超过3个总选择）
        const maxChoices = 3;
        const availableSlots = maxChoices - scene.choices.length;
        
        if (availableSlots > 0) {
            const choicesToAdd = additionalChoices.slice(0, availableSlots);
            scene.choices.push(...choicesToAdd);
        }
    }

    // 生成额外选择项
    generateAdditionalChoices(sceneType) {
        const choiceTemplates = {
            'romantic': [
                { text: '表达你的心意', nextScene: 'confession_path', effects: [{ stat: 'courage', change: 10 }] },
                { text: '保持现状，享受当下', nextScene: 'enjoy_moment', effects: [{ stat: 'relationship', change: 5 }] },
                { text: '提出约会邀请', nextScene: 'date_invitation', effects: [{ stat: 'romance', change: 8 }] }
            ],
            'conflict': [
                { text: '主动道歉', nextScene: 'apology', effects: [{ stat: 'relationship', change: 5 }] },
                { text: '冷静思考', nextScene: 'reflection', effects: [{ stat: 'wisdom', change: 8 }] },
                { text: '寻求第三方帮助', nextScene: 'mediation', effects: [{ stat: 'social', change: 6 }] }
            ],
            'decision': [
                { text: '勇敢面对', nextScene: 'face_challenge', effects: [{ stat: 'courage', change: 10 }] },
                { text: '谨慎考虑', nextScene: 'careful_consideration', effects: [{ stat: 'wisdom', change: 8 }] },
                { text: '寻求建议', nextScene: 'seek_advice', effects: [{ stat: 'social', change: 6 }] }
            ]
        };
        
        return choiceTemplates[sceneType] || choiceTemplates['decision'];
    }

    // 优化分支选择（宽度削减）
    optimizeBranchChoices(sceneName) {
        const scene = this.storyData.scenes[sceneName];
        
        if (!scene.choices || scene.choices.length <= 3) {
            return;
        }
        
        // 评估每个选择的重要性
        const choiceScores = scene.choices.map((choice, index) => ({
            index,
            choice,
            score: this.evaluateChoiceImportance(choice, sceneName)
        }));
        
        // 按重要性排序
        choiceScores.sort((a, b) => b.score - a.score);
        
        // 保留最重要的3个选择
        const bestChoices = choiceScores.slice(0, 3).map(item => item.choice);
        
        // 更新场景的选择项
        scene.choices = bestChoices;
    }

    // 评估选择项的重要性
    evaluateChoiceImportance(choice, sceneName) {
        let score = 0;
        
        // 基于文本长度和复杂性
        if (choice.text && choice.text.length > 5) score += 2;
        
        // 基于效果影响（安全处理effects字段）
        if (choice.effects && Array.isArray(choice.effects)) {
            score += choice.effects.reduce((sum, effect) => {
                if (effect && typeof effect.change === 'number') {
                    return sum + Math.abs(effect.change);
                }
                return sum;
            }, 0);
        }
        
        // 基于目标场景的重要性
        if (choice.nextScene) {
            const targetAnalysis = this.branchAnalysis[choice.nextScene];
            if (targetAnalysis) {
                if (targetAnalysis.sceneType === 'ending') score += 5;
                if (targetAnalysis.sceneType === 'decision') score += 3;
            }
        }
        
        return score;
    }

    // 验证优化结果
    validateOptimization() {
        console.log('🔍 验证优化结果...');
        
        // 重新分析无法到达的场景
        const allScenes = Object.keys(this.storyData.scenes);
        const referencedScenes = new Set();
        referencedScenes.add(this.storyData.initialState.currentScene);
        
        for (const sceneName of allScenes) {
            const scene = this.storyData.scenes[sceneName];
            if (scene && scene.choices) {
                for (const choice of scene.choices) {
                    if (choice.nextScene) {
                        referencedScenes.add(choice.nextScene);
                    }
                }
            }
        }
        
        const remainingUnreachable = allScenes.filter(
            scene => !referencedScenes.has(scene) && 
                     scene !== this.storyData.initialState.currentScene
        );
        
        console.log(`   - 优化前无法到达的场景: ${this.unreachableScenes.length} 个`);
        console.log(`   - 优化后无法到达的场景: ${remainingUnreachable.length} 个`);
        
        if (remainingUnreachable.length > 0) {
            console.log('   ⚠️ 仍有无法到达的场景:', remainingUnreachable.join(', '));
        } else {
            console.log('   ✅ 所有场景现在都可以到达！');
        }
    }
}

// 主函数
function optimizeStoryData(inputFile, outputFile, enableBranchExpansion = true) {
    try {
        console.log('📖 正在读取故事数据...');
        const storyContent = fs.readFileSync(inputFile, 'utf8');
        
        // 提取storyData对象
        const match = storyContent.match(/const storyData = ({[\s\S]*?});/);
        if (!match) {
            throw new Error('无法解析故事数据');
        }
        
        const storyData = eval('(' + match[1] + ')');
        
        // 创建优化器并执行优化
        const optimizer = new IntelligentGraphBranchOptimizer(storyData);
        const optimizedData = optimizer.optimize(enableBranchExpansion);
        
        // 保存优化后的数据
        const branchExpansionStatus = enableBranchExpansion ? '启用' : '禁用';
        const outputContent = `// 优化后的故事数据 - 智能图论分支优化算法
// 优化时间: ${new Date().toLocaleString()}
// 工具版本: 场景优化工具 v2.0 - 智能分支优化版
// 分支补充: ${branchExpansionStatus}

const storyData = ${JSON.stringify(optimizedData, null, 2)};`;
        
        fs.writeFileSync(outputFile, outputContent, 'utf8');
        console.log(`\n💾 优化后的数据已保存到: ${outputFile}`);
        
    } catch (error) {
        console.error(`❌ 优化失败: ${error.message}`);
        process.exit(1);
    }
}

// 命令行接口
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
        console.log(`
场景优化工具 - 智能图论分支优化算法 v2.0

用法: node scene-optimizer.js <输入文件> <输出文件> [--no-expansion]

参数:
  <输入文件>        输入的故事数据文件
  <输出文件>        优化后的输出文件
  --no-expansion    禁用智能分支补充功能（仅修复无法到达的场景）

示例:
  node scene-optimizer.js storydata-smart.js storydata-optimized.js          # 启用智能分支补充
  node scene-optimizer.js storydata-smart.js storydata-fixed.js --no-expansion # 仅修复无法到达场景
`);
        process.exit(1);
    }
    
    const inputFile = args[0];
    const outputFile = args[1];
    const enableBranchExpansion = !args.includes('--no-expansion');
    
    optimizeStoryData(inputFile, outputFile, enableBranchExpansion);
}

module.exports = { IntelligentGraphBranchOptimizer, AISceneContentGenerator, optimizeStoryData };