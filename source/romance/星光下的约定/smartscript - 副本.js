// 智能脚本设计工具 - smartscript.js
// 专门用于生成场景永远不会缺失的storydata.js
// 版本：2.0 - 增强版
// 作者：AI助手

const fs = require('fs');
const path = require('path');

// 命令行参数处理
const args = process.argv.slice(2);
let inputFile = '';
let outputFile = 'storydata-smart.js';
let validateOnly = false;
let autoFix = false;
let generateReport = false;
let reportFormat = 'html';
let analyzeDepth = false;
let analyzeEmotion = false;
let analyzeBalance = false;

// 解析参数
for (let i = 0; i < args.length; i++) {
    if (args[i] === '-i' || args[i] === '--input') {
        inputFile = args[++i];
    } else if (args[i] === '-o' || args[i] === '--output') {
        outputFile = args[++i];
    } else if (args[i] === '-v' || args[i] === '--validate') {
        validateOnly = true;
    } else if (args[i] === '-a' || args[i] === '--autofix') {
        autoFix = true;
    } else if (args[i] === '-r' || args[i] === '--report') {
        generateReport = true;
    } else if (args[i] === '-f' || args[i] === '--format') {
        reportFormat = args[++i];
    } else if (args[i] === '-d' || args[i] === '--depth') {
        analyzeDepth = true;
    } else if (args[i] === '-e' || args[i] === '--emotion') {
        analyzeEmotion = true;
    } else if (args[i] === '-b' || args[i] === '--balance') {
        analyzeBalance = true;
    } else if (args[i] === '-A' || args[i] === '--all') {
        analyzeDepth = true;
        analyzeEmotion = true;
        analyzeBalance = true;
        generateReport = true;
    } else if (args[i] === '-h' || args[i] === '--help') {
        showHelp();
        process.exit(0);
    } else if (!inputFile) {
        inputFile = args[i];
    }
}

function showHelp() {
    console.log(`
智能脚本设计工具 v2.0 - 确保故事数据结构完整性

用法: node smartscript.js [选项] <输入文件>

选项:
  -i, --input <文件>       输入故事数据文件
  -o, --output <文件>      输出文件 (默认: storydata-smart.js)
  -v, --validate          仅验证，不修复
  -a, --autofix           自动修复问题
  -r, --report            生成详细报告
  -f, --format <格式>      报告格式: html, json, txt (默认: html)
  -d, --depth             分析故事路径深度
  -e, --emotion           分析情感系统
  -b, --balance           分析故事平衡性
  -A, --all               执行所有分析
  -h, --help              显示帮助信息

示例:
  node smartscript.js -i storydata.js -v                    # 仅验证
  node smartscript.js storydata.js -a                        # 自动修复
  node smartscript.js -i input.js -o output.js -A            # 全面分析
  node smartscript.js -i storydata.js -r -f json             # 生成JSON报告
  node smartscript.js -i storydata.js -d -e                  # 深度和情感分析
`);
}

// 工具信息
console.log('=== 智能脚本设计工具 ===');
console.log('功能：确保故事数据结构完整性');
console.log('版本：1.0\n');

// 检查输入文件
if (!inputFile) {
    console.error('❌ 请指定输入文件路径');
    showHelp();
    process.exit(1);
}

if (!fs.existsSync(inputFile)) {
    console.error(`❌ 输入文件不存在: ${inputFile}`);
    process.exit(1);
}

// 读取故事数据
console.log('📖 正在读取故事数据...');
let storyData;
try {
    const storyContent = fs.readFileSync(inputFile, 'utf8');
    // 提取storyData对象
    const match = storyContent.match(/const storyData = ({[\s\S]*?});/);
    if (match) {
        storyData = eval('(' + match[1] + ')');
    } else {
        // 尝试直接执行文件
        const module = {};
        eval(storyContent);
        storyData = module.exports;
    }
} catch (error) {
    console.error(`❌ 读取故事数据失败: ${error.message}`);
    process.exit(1);
}

// 场景完整性验证函数
function testStoryIntegrity(storyData) {
    const results = {
        totalScenes: 0,
        definedScenes: [],
        referencedScenes: new Set(),
        missingScenes: [],
        isolatedScenes: [],
        scenesWithoutChoices: [],
        cycles: [],
        isValid: false
    };
    
    // 获取所有已定义的场景
    results.definedScenes = Object.keys(storyData.scenes);
    results.totalScenes = results.definedScenes.length;
    
    // 收集所有被引用的场景
    // 初始场景
    results.referencedScenes.add(storyData.initialState.currentScene);
    
    // 遍历所有场景的选择项
    for (const sceneName of results.definedScenes) {
        const scene = storyData.scenes[sceneName];
        if (scene.choices) {
            for (const choice of scene.choices) {
                if (choice.nextScene) {
                    results.referencedScenes.add(choice.nextScene);
                }
            }
        }
    }
    
    results.referencedScenes = Array.from(results.referencedScenes);
    
    // 检查缺失的场景
    results.missingScenes = results.referencedScenes.filter(
        scene => !results.definedScenes.includes(scene)
    );
    
    // 检查孤立场景
    results.isolatedScenes = results.definedScenes.filter(
        scene => !results.referencedScenes.includes(scene) && 
                 scene !== storyData.initialState.currentScene
    );
    
    // 检查没有选择项的场景
    results.scenesWithoutChoices = results.definedScenes.filter(
        scene => !storyData.scenes[scene].choices || 
                 storyData.scenes[scene].choices.length === 0
    );
    
    // 检查循环引用
    results.cycles = findStoryCycles(storyData);
    
    // 判断是否有效
    results.isValid = results.missingScenes.length === 0 &&
                     results.isolatedScenes.length === 0 &&
                     results.scenesWithoutChoices.length === 0;
    
    return results;
}

// 查找故事中的循环引用
function findStoryCycles(storyData) {
    const cycles = [];
    const visited = {};
    const recursionStack = {};
    
    function dfs(currentScene, path) {
        if (recursionStack[currentScene]) {
            // 发现循环，但需要检查是否是合理的重新开始循环
            const cycleStart = path.indexOf(currentScene);
            const cycle = path.slice(cycleStart).concat(currentScene);
            
            // 排除合理的重新开始循环：Start -> ... -> Start
            if (currentScene === 'Start' && path.includes('Start')) {
                // 这是合理的重新开始循环，不报告为错误
                return;
            }
            
            // 排除结局场景的重新开始循环
            if (currentScene === 'start' && path.includes('start')) {
                return;
            }
            
            cycles.push(cycle.join(' -> '));
            return;
        }
        
        if (visited[currentScene]) {
            return;
        }
        
        visited[currentScene] = true;
        recursionStack[currentScene] = true;
        
        const scene = storyData.scenes[currentScene];
        if (scene && scene.choices) {
            for (const choice of scene.choices) {
                if (choice.nextScene) {
                    // 排除结局场景的重新开始选项
                    if (scene.text && scene.text.includes('结局：') && choice.nextScene === 'start') {
                        continue;
                    }
                    dfs(choice.nextScene, path.concat(currentScene));
                }
            }
        }
        
        delete recursionStack[currentScene];
    }
    
    dfs(storyData.initialState.currentScene, []);
    return cycles;
}

// 分析故事路径深度
function analyzeStoryDepth(storyData) {
    console.log('📊 正在分析故事路径深度...');
    
    const depthInfo = {
        maxDepth: 0,
        minDepth: Infinity,
        avgDepth: 0,
        pathsToEndings: [],
        unreachableScenes: [],
        deadEnds: [],
        endings: [],
        convergencePoints: []
    };
    
    // 智能识别结局场景（多种识别方式）
    const endingScenes = Object.keys(storyData.scenes).filter(scene => {
        const sceneData = storyData.scenes[scene];
        if (!sceneData) return false;
        
        // 方式1：文本中包含"结局："字样
        if (sceneData.text && sceneData.text.includes('结局：')) {
            return true;
        }
        
        // 方式2：没有选择项的场景
        if (!sceneData.choices || sceneData.choices.length === 0) {
            return true;
        }
        
        // 方式3：只有"重新开始"选项的场景
        if (sceneData.choices && sceneData.choices.length > 0) {
            const hasOnlyRestart = sceneData.choices.every(choice => 
                choice.text && (choice.text.includes('重新开始') || choice.text.includes('重新开始故事'))
            );
            if (hasOnlyRestart) {
                return true;
            }
        }
        
        // 方式4：选择项都指向同一个场景且该场景是结局
        if (sceneData.choices && sceneData.choices.length > 0) {
            const nextScenes = sceneData.choices.map(choice => choice.nextScene).filter(Boolean);
            if (nextScenes.length > 0 && new Set(nextScenes).size === 1) {
                const nextScene = nextScenes[0];
                const nextSceneData = storyData.scenes[nextScene];
                if (nextSceneData && nextSceneData.text && nextSceneData.text.includes('结局：')) {
                    return true;
                }
            }
        }
        
        return false;
    });
    
    // 分析每个结局场景
    for (const ending of endingScenes) {
        const scene = storyData.scenes[ending];
        const hasRestartToStart = scene.choices && scene.choices.some(
            choice => choice.nextScene === 'start'
        );
        
        depthInfo.endings.push({
            name: ending,
            hasRestartToStart: hasRestartToStart,
            description: scene.text || ''
        });
        
        const paths = findAllPaths(storyData, storyData.initialState.currentScene, ending);
        
        for (const path of paths) {
            const depth = path.length;
            depthInfo.pathsToEndings.push({
                ending: ending,
                depth: depth,
                path: path.join(' -> ')
            });
            
            if (depth > depthInfo.maxDepth) {
                depthInfo.maxDepth = depth;
            }
            if (depth < depthInfo.minDepth) {
                depthInfo.minDepth = depth;
            }
        }
    }
    
    // 计算平均深度
    if (depthInfo.pathsToEndings.length > 0) {
        const totalDepth = depthInfo.pathsToEndings.reduce((sum, p) => sum + p.depth, 0);
        depthInfo.avgDepth = Math.round(totalDepth / depthInfo.pathsToEndings.length);
    }
    
    // 检查无法到达的场景
    const reachableScenes = new Set();
    const queue = [storyData.initialState.currentScene];
    const visited = new Set();
    
    while (queue.length > 0) {
        const current = queue.shift();
        if (visited.has(current)) continue;
        visited.add(current);
        reachableScenes.add(current);
        
        const scene = storyData.scenes[current];
        if (scene && scene.choices) {
            for (const choice of scene.choices) {
                // 排除结局场景的重新开始选项
                if (scene.text && scene.text.includes('结局：') && choice.nextScene === 'start') {
                    continue;
                }
                if (choice.nextScene && !visited.has(choice.nextScene)) {
                    queue.push(choice.nextScene);
                }
            }
        }
    }
    
    depthInfo.unreachableScenes = Object.keys(storyData.scenes).filter(
        scene => !reachableScenes.has(scene)
    );
    
    // 查找死胡同（没有选择项或选择项都指向自己的场景，排除结局场景）
    for (const sceneName of Object.keys(storyData.scenes)) {
        const scene = storyData.scenes[sceneName];
        
        // 排除结局场景
        if (scene.text && scene.text.includes('结局：')) {
            continue;
        }
        
        if (!scene.choices || scene.choices.length === 0) {
            depthInfo.deadEnds.push(sceneName);
        } else {
            const allSelfRef = scene.choices.every(
                choice => choice.nextScene === sceneName
            );
            if (allSelfRef) {
                depthInfo.deadEnds.push(sceneName);
            }
        }
    }
    
    // 分析收束汇合点（宽度变小的场景）
    depthInfo.convergencePoints = findConvergencePoints(storyData);
    
    // 结局数量判断和分层跳转建议
    const endingCount = depthInfo.endings.length;
    depthInfo.endingCount = endingCount;
    depthInfo.endingRecommendations = [];
    depthInfo.hierarchicalPlan = [];
    
    if (endingCount > 5) {
        console.log(`⚠️  检测到 ${endingCount} 个结局，超过建议的 5 个上限`);
        depthInfo.endingRecommendations.push(`当前故事有 ${endingCount} 个结局，建议控制在 5 个以内`);
        depthInfo.endingRecommendations.push('过多的结局可能导致玩家体验分散，建议合并相似结局');
        depthInfo.endingRecommendations.push('');
        depthInfo.endingRecommendations.push('🎯 分层跳转优化方案：');
        
        // 设计5个主要结局场景
        const mainEndings = [
            { name: '艺术合作结局', theme: '合作创作', description: '与林雨晴建立长期艺术合作关系' },
            { name: '情感共鸣结局', theme: '情感发展', description: '与林雨晴建立深厚情感联系' },
            { name: '个人成长结局', theme: '自我提升', description: '通过经历获得个人艺术成长' },
            { name: '遗憾分离结局', theme: '离别遗憾', description: '因各种原因未能继续发展关系' },
            { name: '意外惊喜结局', theme: '意外收获', description: '获得意想不到的艺术或人生收获' }
        ];
        
        // 计算需要多少层中间场景
        const layersNeeded = Math.ceil((endingCount - 5) / 3) + 1;
        
        depthInfo.endingRecommendations.push(`1. 设计 5 个主要结局：${mainEndings.map(e => e.name).join('、')}`);
        depthInfo.endingRecommendations.push(`2. 创建 ${layersNeeded} 层中间场景，每层 3-5 个场景`);
        depthInfo.endingRecommendations.push(`3. 将 ${endingCount} 个现有结局分 ${layersNeeded} 步跳转到 5 个主要结局`);
        depthInfo.endingRecommendations.push('');
        depthInfo.endingRecommendations.push('📋 具体分层方案：');
        
        // 生成分层跳转计划
        for (let layer = 1; layer <= layersNeeded; layer++) {
            const endingsInThisLayer = Math.min(endingCount - (layer - 1) * 3, 3);
            const targetLayer = layer === layersNeeded ? '主要结局' : `第${layer + 1}层`;
            
            depthInfo.endingRecommendations.push(`第${layer}层：${endingsInThisLayer}个场景 → ${targetLayer}`);
            depthInfo.hierarchicalPlan.push({
                layer: layer,
                scenes: endingsInThisLayer,
                target: targetLayer
            });
        }
        
        depthInfo.endingRecommendations.push('');
        depthInfo.endingRecommendations.push('💡 实施建议：');
        depthInfo.endingRecommendations.push('1. 分析现有结局的主题相似性，按主题分组');
        depthInfo.endingRecommendations.push('2. 为每组设计一个过渡场景，自然引导到主要结局');
        depthInfo.endingRecommendations.push('3. 确保每层跳转的剧情逻辑自然流畅');
        depthInfo.endingRecommendations.push('4. 保持玩家选择的影响力和参与感');
        
        // 分析结局相似性，提供具体合并建议
        if (endingCount > 0) {
            depthInfo.endingRecommendations.push('');
            depthInfo.endingRecommendations.push('📊 当前结局分析：');
            depthInfo.endings.forEach((ending, index) => {
                const theme = analyzeEndingTheme(ending.description);
                depthInfo.endingRecommendations.push(`${index + 1}. ${ending.name} (${theme}): ${ending.description.substring(0, 40)}...`);
            });
        }
    } else if (endingCount === 0) {
        console.log('⚠️  未检测到任何结局场景');
        depthInfo.endingRecommendations.push('未检测到任何结局场景，建议添加至少 1 个结局');
        depthInfo.endingRecommendations.push('结局场景可以通过以下方式标识：');
        depthInfo.endingRecommendations.push('1. 文本中包含"结局："字样');
        depthInfo.endingRecommendations.push('2. 没有选择项的场景');
        depthInfo.endingRecommendations.push('3. 只有"重新开始"选项的场景');
    } else {
        console.log(`✅ 检测到 ${endingCount} 个结局，数量合理`);
        depthInfo.endingRecommendations.push(`当前有 ${endingCount} 个结局，数量合理，无需优化`);
    }
    
    return depthInfo;
}

// 查找收束汇合点
function findConvergencePoints(storyData) {
    const convergencePoints = [];
    const startScene = storyData.initialState.currentScene;
    
    // 计算每个场景的入度（有多少场景指向它）
    const inDegree = {};
    const sceneLevels = {};
    
    // 初始化
    for (const sceneName of Object.keys(storyData.scenes)) {
        inDegree[sceneName] = 0;
        sceneLevels[sceneName] = 0;
    }
    
    // 计算每个场景的深度（从起点到该场景的最短路径）
    const levelQueue = [{ scene: startScene, level: 0 }];
    const levelVisited = new Set();
    
    while (levelQueue.length > 0) {
        const { scene, level } = levelQueue.shift();
        if (levelVisited.has(scene)) continue;
        levelVisited.add(scene);
        sceneLevels[scene] = Math.max(sceneLevels[scene], level);
        
        const sceneData = storyData.scenes[scene];
        if (sceneData && sceneData.choices) {
            for (const choice of sceneData.choices) {
                if (choice.nextScene && choice.nextScene !== 'start') {
                    inDegree[choice.nextScene]++;
                    levelQueue.push({ scene: choice.nextScene, level: level + 1 });
                }
            }
        }
    }
    
    // 查找收束点（入度大于1的场景）
    for (const sceneName of Object.keys(storyData.scenes)) {
        if (sceneName === startScene) continue;
        
        const scene = storyData.scenes[sceneName];
        
        // 排除结局场景
        if (scene.text && scene.text.includes('结局：')) continue;
        
        if (inDegree[sceneName] > 1) {
            convergencePoints.push({
                name: sceneName,
                level: sceneLevels[sceneName],
                inDegree: inDegree[sceneName],
                description: scene.text || ''
            });
        }
    }
    
    // 按深度排序
    convergencePoints.sort((a, b) => a.level - b.level);
    
    return convergencePoints;
}

// 查找从起点到终点的所有路径
function findAllPaths(storyData, start, end, visited = new Set(), path = []) {
    if (start === end) {
        return [path.concat(start)];
    }
    
    if (visited.has(start)) {
        return [];
    }
    
    const scene = storyData.scenes[start];
    if (!scene || !scene.choices) {
        return [];
    }
    
    const newVisited = new Set(visited);
    newVisited.add(start);
    
    const allPaths = [];
    for (const choice of scene.choices) {
        if (choice.nextScene) {
            // 排除结局场景的重新开始选项
            if (scene.text && scene.text.includes('结局：') && choice.nextScene === 'start') {
                continue;
            }
            const paths = findAllPaths(storyData, choice.nextScene, end, newVisited, path.concat(start));
            allPaths.push(...paths);
        }
    }
    
    return allPaths;
}

// 分析情感系统
function analyzeEmotionSystem(storyData) {
    console.log('💖 正在分析情感系统...');
    
    const emotionInfo = {
        totalChoices: 0,
        choicesWithEffects: 0,
        emotionChanges: [],
        extremeChanges: [],
        emotionStats: {
            positive: 0,
            negative: 0,
            neutral: 0
        },
        recommendations: []
    };
    
    // 遍历所有场景的选择项
    for (const sceneName of Object.keys(storyData.scenes)) {
        const scene = storyData.scenes[sceneName];
        if (scene && scene.choices) {
            for (const choice of scene.choices) {
                emotionInfo.totalChoices++;
                
                if (choice.effects) {
                    emotionInfo.choicesWithEffects++;
                    
                    // 分析情感变化
                    for (const [key, value] of Object.entries(choice.effects)) {
                        if (key === 'relationship' || key.includes('emotion') || key.includes('好感')) {
                            const change = {
                                scene: sceneName,
                                choice: choice.text,
                                key: key,
                                value: value
                            };
                            emotionInfo.emotionChanges.push(change);
                            
                            // 统计正负变化
                            if (value > 0) {
                                emotionInfo.emotionStats.positive++;
                            } else if (value < 0) {
                                emotionInfo.emotionStats.negative++;
                            } else {
                                emotionInfo.emotionStats.neutral++;
                            }
                            
                            // 检查极端变化
                            if (Math.abs(value) > 20) {
                                emotionInfo.extremeChanges.push(change);
                            }
                        }
                    }
                }
            }
        }
    }
    
    // 生成建议
    const effectRatio = emotionInfo.choicesWithEffects / emotionInfo.totalChoices;
    if (effectRatio < 0.3) {
        emotionInfo.recommendations.push('建议增加更多带有情感影响的选择项，以增强玩家参与感');
    }
    
    if (emotionInfo.extremeChanges.length > 5) {
        emotionInfo.recommendations.push('极端情感变化较多，建议调整以保持情感发展的连贯性');
    }
    
    const posNegRatio = emotionInfo.emotionStats.positive / Math.max(emotionInfo.emotionStats.negative, 1);
    if (posNegRatio < 0.5) {
        emotionInfo.recommendations.push('负面情感变化较多，建议增加一些正面的互动选择');
    } else if (posNegRatio > 3) {
        emotionInfo.recommendations.push('正面情感变化过多，可能缺乏戏剧冲突，建议增加一些负面选择');
    }
    
    return emotionInfo;
}

// 分析故事平衡性
function analyzeStoryBalance(storyData) {
    console.log('⚖️  正在分析故事平衡性...');
    
    const balanceInfo = {
        branchDistribution: {},
        endingDistribution: {},
        sceneComplexity: {},
        choiceDistribution: [],
        recommendations: []
    };
    
    // 分析场景复杂度（选择项数量）
    const complexityMap = {};
    for (const sceneName of Object.keys(storyData.scenes)) {
        const scene = storyData.scenes[sceneName];
        const choiceCount = scene.choices ? scene.choices.length : 0;
        complexityMap[choiceCount] = (complexityMap[choiceCount] || 0) + 1;
        balanceInfo.sceneComplexity[sceneName] = choiceCount;
    }
    
    balanceInfo.choiceDistribution = Object.entries(complexityMap)
        .map(([choices, count]) => ({ choices: parseInt(choices), scenes: count }))
        .sort((a, b) => b.choices - a.choices);
    
    // 分析分支分布
    const startScene = storyData.initialState.currentScene;
    const firstChoices = storyData.scenes[startScene]?.choices || [];
    
    for (const choice of firstChoices) {
        if (choice.nextScene) {
            const branchSize = countBranchSize(storyData, choice.nextScene);
            balanceInfo.branchDistribution[choice.text] = branchSize;
        }
    }
    
    // 分析结局分布
    const endingScenes = Object.keys(storyData.scenes).filter(
        scene => scene.startsWith('ending_')
    );
    
    for (const ending of endingScenes) {
        const paths = findAllPaths(storyData, startScene, ending);
        balanceInfo.endingDistribution[ending] = paths.length;
    }
    
    // 生成建议
    const avgChoices = emotionInfo => {
        const totalChoices = Object.values(balanceInfo.sceneComplexity).reduce((a, b) => a + b, 0);
        return totalChoices / Object.keys(balanceInfo.sceneComplexity).length;
    };
    
    const avgChoiceCount = avgChoices(balanceInfo);
    if (avgChoiceCount < 2) {
        balanceInfo.recommendations.push('平均选择项较少，建议增加更多选择以丰富游戏体验');
    } else if (avgChoiceCount > 4) {
        balanceInfo.recommendations.push('平均选择项较多，可能造成选择困难，建议适当简化');
    }
    
    // 检查分支平衡性
    const branchSizes = Object.values(balanceInfo.branchDistribution);
    if (branchSizes.length > 0) {
        const maxSize = Math.max(...branchSizes);
        const minSize = Math.min(...branchSizes);
        if (maxSize / minSize > 3) {
            balanceInfo.recommendations.push('分支规模差异较大，建议平衡各分支的内容丰富度');
        }
    }
    
    // 检查结局可达性
    const endingPaths = Object.values(balanceInfo.endingDistribution);
    const unreachableEndings = endingScenes.filter(
        ending => balanceInfo.endingDistribution[ending] === 0
    );
    
    if (unreachableEndings.length > 0) {
        balanceInfo.recommendations.push(`发现${unreachableEndings.length}个无法到达的结局: ${unreachableEndings.join(', ')}`);
    }
    
    return balanceInfo;
}

// 计算分支大小（从某个场景可到达的场景数）
function countBranchSize(storyData, startScene, visited = new Set()) {
    if (visited.has(startScene)) {
        return 0;
    }
    
    visited.add(startScene);
    let count = 1;
    
    const scene = storyData.scenes[startScene];
    if (scene && scene.choices) {
        for (const choice of scene.choices) {
            if (choice.nextScene) {
                count += countBranchSize(storyData, choice.nextScene, visited);
            }
        }
    }
    
    return count;
}

// 智能修复函数
function repairStoryData(storyData, validationResults) {
    console.log('🔧 正在智能修复故事数据...');
    
    // 修复缺失的场景
    for (const missingScene of validationResults.missingScenes) {
        console.log(`  创建缺失场景: ${missingScene}`);
        storyData.scenes[missingScene] = {
            text: `<p>这是自动生成的场景 '${missingScene}'。请根据需要完善内容。</p>`,
            choices: [
                {
                    text: "继续故事...",
                    nextScene: "ending_default"
                }
            ]
        };
    }
    
    // 修复孤立场景
    for (const isolatedScene of validationResults.isolatedScenes) {
        console.log(`  修复孤立场景: ${isolatedScene}`);
        
        // 为孤立场景添加通往其他场景的路径
        const availableScenes = Object.keys(storyData.scenes).filter(
            scene => scene !== isolatedScene
        );
        
        if (availableScenes.length > 0) {
            const randomScene = availableScenes[Math.floor(Math.random() * availableScenes.length)];
            storyData.scenes[isolatedScene].choices = [
                {
                    text: "发现新的路径...",
                    nextScene: randomScene
                }
            ];
        }
    }
    
    // 修复没有选择项的场景
    for (const sceneName of validationResults.scenesWithoutChoices) {
        console.log(`  为场景添加选择项: ${sceneName}`);
        
        // 检查是否应该是一个结局场景
        if (sceneName.startsWith('ending_')) {
            storyData.scenes[sceneName].choices = [
                {
                    text: "重新开始故事",
                    nextScene: storyData.initialState.currentScene
                }
            ];
        } else {
            // 添加默认的选择项
            storyData.scenes[sceneName].choices = [
                {
                    text: "继续前进...",
                    nextScene: "ending_default"
                }
            ];
        }
    }
    
    // 确保有默认结局
    if (!storyData.scenes["ending_default"]) {
        console.log('  创建默认结局场景');
        storyData.scenes["ending_default"] = {
            text: "<p>故事暂时告一段落。感谢您的参与！</p>",
            choices: [
                {
                    text: "重新开始",
                    nextScene: storyData.initialState.currentScene
                }
            ]
        };
    }
    
    return storyData;
}

// 优化故事数据
function optimizeStoryData(storyData) {
    console.log('✨ 正在优化故事数据结构...');
    
    // 添加故事统计信息
    storyData.metadata = {
        totalScenes: Object.keys(storyData.scenes).length,
        totalChoices: Object.values(storyData.scenes).reduce((sum, scene) => 
            sum + (scene.choices ? scene.choices.length : 0), 0
        ),
        createdDate: new Date().toISOString(),
        toolVersion: "1.0"
    };
    
    return storyData;
}

// 保存故事数据
function saveStoryData(storyData, outputPath) {
    const jsContent = `// 智能生成的故事数据 - 保证场景完整性
// 生成时间: ${new Date().toLocaleString('zh-CN')}
// 工具版本: 2.0

const storyData = ${JSON.stringify(storyData, null, 2)};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = storyData;
}
`;
    
    try {
        fs.writeFileSync(outputPath, jsContent, 'utf8');
        console.log(`✅ 故事数据已保存到: ${outputPath}`);
    } catch (error) {
        console.error(`❌ 保存失败: ${error.message}`);
    }
}

// 生成HTML报告
function generateHTMLReport(validationResults, depthInfo, emotionInfo, balanceInfo, outputPath) {
    const timestamp = new Date().toLocaleString('zh-CN');
    
    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>故事数据分析报告</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Microsoft YaHei', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.1em;
            opacity: 0.9;
        }
        
        .section {
            padding: 30px;
            border-bottom: 1px solid #eee;
        }
        
        .section h2 {
            color: #667eea;
            font-size: 1.8em;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 3px solid #667eea;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .stat-card {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        
        .stat-card.success {
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
        }
        
        .stat-card.warning {
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
        }
        
        .stat-card.error {
            background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
        }
        
        .stat-card h3 {
            font-size: 2em;
            color: #333;
            margin-bottom: 5px;
        }
        
        .stat-card p {
            color: #666;
            font-size: 0.9em;
        }
        
        .list {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            margin: 10px 0;
        }
        
        .list-item {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        
        .list-item:last-child {
            border-bottom: none;
        }
        
        .list-item .label {
            font-weight: bold;
            color: #333;
        }
        
        .list-item .value {
            color: #666;
            margin-left: 10px;
        }
        
        .recommendations {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }
        
        .recommendations h3 {
            color: #856404;
            margin-bottom: 10px;
        }
        
        .recommendations ul {
            list-style-position: inside;
            color: #856404;
        }
        
        .recommendations li {
            margin: 5px 0;
        }
        
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 0.9em;
        }
        
        .badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 0.8em;
            font-weight: bold;
            margin-left: 5px;
        }
        
        .badge-success {
            background: #28a745;
            color: white;
        }
        
        .badge-warning {
            background: #ffc107;
            color: #333;
        }
        
        .badge-error {
            background: #dc3545;
            color: white;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 故事数据分析报告</h1>
            <p>生成时间: ${timestamp}</p>
        </div>
        
        <div class="section">
            <h2>✅ 完整性验证</h2>
            <div class="stats-grid">
                <div class="stat-card ${validationResults.isValid ? 'success' : 'error'}">
                    <h3>${validationResults.totalScenes}</h3>
                    <p>总场景数</p>
                </div>
                <div class="stat-card ${validationResults.missingScenes.length === 0 ? 'success' : 'error'}">
                    <h3>${validationResults.missingScenes.length}</h3>
                    <p>缺失场景</p>
                </div>
                <div class="stat-card ${validationResults.isolatedScenes.length === 0 ? 'success' : 'warning'}">
                    <h3>${validationResults.isolatedScenes.length}</h3>
                    <p>孤立场景</p>
                </div>
                <div class="stat-card ${validationResults.scenesWithoutChoices.length === 0 ? 'success' : 'warning'}">
                    <h3>${validationResults.scenesWithoutChoices.length}</h3>
                    <p>无选择项场景</p>
                </div>
            </div>
            
            ${validationResults.missingScenes.length > 0 ? `
            <div class="list">
                <h3>❌ 缺失的场景:</h3>
                ${validationResults.missingScenes.map(scene => `<div class="list-item"><span class="label">${scene}</span></div>`).join('')}
            </div>
            ` : ''}
            
            ${validationResults.isolatedScenes.length > 0 ? `
            <div class="list">
                <h3>⚠️ 孤立的场景:</h3>
                ${validationResults.isolatedScenes.map(scene => `<div class="list-item"><span class="label">${scene}</span></div>`).join('')}
            </div>
            ` : ''}
            
            ${validationResults.scenesWithoutChoices.length > 0 ? `
            <div class="list">
                <h3>⚠️ 无选择项的场景:</h3>
                ${validationResults.scenesWithoutChoices.map(scene => `<div class="list-item"><span class="label">${scene}</span></div>`).join('')}
            </div>
            ` : ''}
        </div>
        
        ${depthInfo ? `
        <div class="section">
            <h2>📊 路径深度分析</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>${depthInfo.maxDepth}</h3>
                    <p>最大深度</p>
                </div>
                <div class="stat-card">
                    <h3>${depthInfo.minDepth === Infinity ? 0 : depthInfo.minDepth}</h3>
                    <p>最小深度</p>
                </div>
                <div class="stat-card">
                    <h3>${depthInfo.avgDepth}</h3>
                    <p>平均深度</p>
                </div>
                <div class="stat-card ${depthInfo.pathsToEndings.length > 0 ? 'success' : 'warning'}">
                    <h3>${depthInfo.pathsToEndings.length}</h3>
                    <p>结局路径数</p>
                </div>
            </div>
            
            ${depthInfo.unreachableScenes.length > 0 ? `
            <div class="list">
                <h3>⚠️ 无法到达的场景:</h3>
                ${depthInfo.unreachableScenes.map(scene => `<div class="list-item"><span class="label">${scene}</span></div>`).join('')}
            </div>
            ` : ''}
            
            ${depthInfo.deadEnds.length > 0 ? `
            <div class="list">
                <h3>⚠️ 死胡同场景:</h3>
                ${depthInfo.deadEnds.map(scene => `<div class="list-item"><span class="label">${scene}</span></div>`).join('')}
            </div>
            ` : ''}
        </div>
        ` : ''}
        
        ${emotionInfo ? `
        <div class="section">
            <h2>💖 情感系统分析</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>${emotionInfo.totalChoices}</h3>
                    <p>总选择项</p>
                </div>
                <div class="stat-card">
                    <h3>${emotionInfo.choicesWithEffects}</h3>
                    <p>带效果的选择</p>
                </div>
                <div class="stat-card">
                    <h3>${emotionInfo.emotionStats.positive}</h3>
                    <p>正面变化</p>
                </div>
                <div class="stat-card">
                    <h3>${emotionInfo.emotionStats.negative}</h3>
                    <p>负面变化</p>
                </div>
            </div>
            
            ${emotionInfo.recommendations.length > 0 ? `
            <div class="recommendations">
                <h3>💡 建议:</h3>
                <ul>
                    ${emotionInfo.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
            ` : ''}
        </div>
        ` : ''}
        
        ${balanceInfo ? `
        <div class="section">
            <h2>⚖️ 故事平衡性分析</h2>
            <div class="list">
                <h3>选择项分布:</h3>
                ${balanceInfo.choiceDistribution.map(item => `
                    <div class="list-item">
                        <span class="label">${item.choices} 个选择项:</span>
                        <span class="value">${item.scenes} 个场景</span>
                    </div>
                `).join('')}
            </div>
            
            ${Object.keys(balanceInfo.branchDistribution).length > 0 ? `
            <div class="list">
                <h3>分支规模:</h3>
                ${Object.entries(balanceInfo.branchDistribution).map(([branch, size]) => `
                    <div class="list-item">
                        <span class="label">${branch}:</span>
                        <span class="value">${size} 个场景</span>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${balanceInfo.recommendations.length > 0 ? `
            <div class="recommendations">
                <h3>💡 建议:</h3>
                <ul>
                    ${balanceInfo.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
            ` : ''}
        </div>
        ` : ''}
        
        <div class="footer">
            <p>🤖 智能脚本设计工具 v2.0 | 生成时间: ${timestamp}</p>
        </div>
    </div>
</body>
</html>`;
    
    try {
        fs.writeFileSync(outputPath, html, 'utf8');
        console.log(`✅ HTML报告已生成: ${outputPath}`);
    } catch (error) {
        console.error(`❌ 生成报告失败: ${error.message}`);
    }
}

// 生成JSON报告
function generateJSONReport(validationResults, depthInfo, emotionInfo, balanceInfo, outputPath) {
    const report = {
        timestamp: new Date().toISOString(),
        validation: validationResults,
        depth: depthInfo,
        emotion: emotionInfo,
        balance: balanceInfo
    };
    
    try {
        fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf8');
        console.log(`✅ JSON报告已生成: ${outputPath}`);
    } catch (error) {
        console.error(`❌ 生成报告失败: ${error.message}`);
    }
}

// 生成文本报告
function generateTextReport(validationResults, depthInfo, emotionInfo, balanceInfo, outputPath) {
    let text = `故事数据分析报告\n`;
    text += `${'='.repeat(50)}\n`;
    text += `生成时间: ${new Date().toLocaleString('zh-CN')}\n\n`;
    
    text += `【完整性验证】\n`;
    text += `- 总场景数: ${validationResults.totalScenes}\n`;
    text += `- 缺失场景: ${validationResults.missingScenes.length}\n`;
    text += `- 孤立场景: ${validationResults.isolatedScenes.length}\n`;
    text += `- 无选择项场景: ${validationResults.scenesWithoutChoices.length}\n`;
    text += `- 循环引用: ${validationResults.cycles.length}\n\n`;
    
    if (depthInfo) {
        text += `【路径深度分析】\n`;
        text += `- 最大深度: ${depthInfo.maxDepth}\n`;
        text += `- 最小深度: ${depthInfo.minDepth === Infinity ? 0 : depthInfo.minDepth}\n`;
        text += `- 平均深度: ${depthInfo.avgDepth}\n`;
        text += `- 结局路径数: ${depthInfo.pathsToEndings.length}\n\n`;
    }
    
    if (emotionInfo) {
        text += `【情感系统分析】\n`;
        text += `- 总选择项: ${emotionInfo.totalChoices}\n`;
        text += `- 带效果的选择: ${emotionInfo.choicesWithEffects}\n`;
        text += `- 正面变化: ${emotionInfo.emotionStats.positive}\n`;
        text += `- 负面变化: ${emotionInfo.emotionStats.negative}\n`;
        
        if (emotionInfo.recommendations.length > 0) {
            text += `\n建议:\n`;
            emotionInfo.recommendations.forEach(rec => {
                text += `  - ${rec}\n`;
            });
        }
        text += '\n';
    }
    
    if (balanceInfo) {
        text += `【故事平衡性分析】\n`;
        text += `- 选择项分布:\n`;
        balanceInfo.choiceDistribution.forEach(item => {
            text += `  ${item.choices} 个选择项: ${item.scenes} 个场景\n`;
        });
        
        if (balanceInfo.recommendations.length > 0) {
            text += `\n建议:\n`;
            balanceInfo.recommendations.forEach(rec => {
                text += `  - ${rec}\n`;
            });
        }
        text += '\n';
    }
    
    try {
        fs.writeFileSync(outputPath, text, 'utf8');
        console.log(`✅ 文本报告已生成: ${outputPath}`);
    } catch (error) {
        console.error(`❌ 生成报告失败: ${error.message}`);
    }
}

// 主执行流程
console.log('🔍 开始验证故事完整性...');
const validationResults = testStoryIntegrity(storyData);

// 显示验证结果
console.log('\n=== 验证结果 ===');
console.log(`总场景数: ${validationResults.totalScenes}`);
console.log(`缺失场景: ${validationResults.missingScenes.length}`, 
    validationResults.missingScenes.length === 0 ? '✅' : '❌');
console.log(`孤立场景: ${validationResults.isolatedScenes.length}`, 
    validationResults.isolatedScenes.length === 0 ? '✅' : '⚠️');
console.log(`无选择项场景: ${validationResults.scenesWithoutChoices.length}`, 
    validationResults.scenesWithoutChoices.length === 0 ? '✅' : '⚠️');
console.log(`循环引用: ${validationResults.cycles.length}`, 
    validationResults.cycles.length === 0 ? '✅' : '❌');

// 显示详细信息
if (validationResults.missingScenes.length > 0) {
    console.log('\n❌ 缺失的场景:');
    validationResults.missingScenes.forEach(scene => console.log(`  - ${scene}`));
}

if (validationResults.isolatedScenes.length > 0) {
    console.log('\n⚠️  孤立的场景:');
    validationResults.isolatedScenes.forEach(scene => console.log(`  - ${scene}`));
}

if (validationResults.scenesWithoutChoices.length > 0) {
    console.log('\n⚠️  无选择项的场景:');
    validationResults.scenesWithoutChoices.forEach(scene => console.log(`  - ${scene}`));
}

if (validationResults.cycles.length > 0) {
    console.log('\n❌ 循环引用:');
    validationResults.cycles.forEach(cycle => console.log(`  - ${cycle}`));
}

// 判断是否需要修复
if (validationResults.isValid) {
    console.log('\n✅ 故事数据结构完整！');
} else {
    console.log('\n❌ 发现数据结构问题！');
}

// 执行深度分析
let depthInfo = null;
if (analyzeDepth) {
    depthInfo = analyzeStoryDepth(storyData);
    
    console.log('\n=== 路径深度分析 ===');
    console.log(`最大深度: ${depthInfo.maxDepth}`);
    console.log(`最小深度: ${depthInfo.minDepth === Infinity ? 0 : depthInfo.minDepth}`);
    console.log(`平均深度: ${depthInfo.avgDepth}`);
    console.log(`结局路径数: ${depthInfo.pathsToEndings.length}`);
    console.log(`结局数量: ${depthInfo.endingCount}`);
    
    if (depthInfo.endingRecommendations.length > 0) {
        console.log('\n💡 结局建议:');
        depthInfo.endingRecommendations.forEach(rec => console.log(`  - ${rec}`));
    }
    
    if (depthInfo.unreachableScenes.length > 0) {
        console.log(`\n⚠️  无法到达的场景: ${depthInfo.unreachableScenes.length}`);
        depthInfo.unreachableScenes.forEach(scene => console.log(`  - ${scene}`));
    }
    
    if (depthInfo.deadEnds.length > 0) {
        console.log(`\n⚠️  死胡同场景: ${depthInfo.deadEnds.length}`);
        depthInfo.deadEnds.forEach(scene => console.log(`  - ${scene}`));
    }
}

// 执行情感系统分析
let emotionInfo = null;
if (analyzeEmotion) {
    emotionInfo = analyzeEmotionSystem(storyData);
    
    console.log('\n=== 情感系统分析 ===');
    console.log(`总选择项: ${emotionInfo.totalChoices}`);
    console.log(`带效果的选择: ${emotionInfo.choicesWithEffects}`);
    console.log(`正面变化: ${emotionInfo.emotionStats.positive}`);
    console.log(`负面变化: ${emotionInfo.emotionStats.negative}`);
    
    if (emotionInfo.recommendations.length > 0) {
        console.log('\n💡 建议:');
        emotionInfo.recommendations.forEach(rec => console.log(`  - ${rec}`));
    }
}

// 执行平衡性分析
let balanceInfo = null;
if (analyzeBalance) {
    balanceInfo = analyzeStoryBalance(storyData);
    
    console.log('\n=== 故事平衡性分析 ===');
    console.log('选择项分布:');
    balanceInfo.choiceDistribution.forEach(item => {
        console.log(`  ${item.choices} 个选择项: ${item.scenes} 个场景`);
    });
    
    if (Object.keys(balanceInfo.branchDistribution).length > 0) {
        console.log('\n分支规模:');
        Object.entries(balanceInfo.branchDistribution).forEach(([branch, size]) => {
            console.log(`  ${branch}: ${size} 个场景`);
        });
    }
    
    if (balanceInfo.recommendations.length > 0) {
        console.log('\n💡 建议:');
        balanceInfo.recommendations.forEach(rec => console.log(`  - ${rec}`));
    }
}

// 生成报告
if (generateReport) {
    console.log('\n📄 正在生成报告...');
    
    const reportPath = path.join(
        path.dirname(inputFile),
        `story-report.${reportFormat}`
    );
    
    switch (reportFormat.toLowerCase()) {
        case 'html':
            generateHTMLReport(validationResults, depthInfo, emotionInfo, balanceInfo, reportPath);
            break;
        case 'json':
            generateJSONReport(validationResults, depthInfo, emotionInfo, balanceInfo, reportPath);
            break;
        case 'txt':
        case 'text':
            generateTextReport(validationResults, depthInfo, emotionInfo, balanceInfo, reportPath);
            break;
        default:
            console.error(`❌ 不支持的报告格式: ${reportFormat}`);
            console.log('支持的格式: html, json, txt, text');
    }
}

// 根据参数执行相应操作
if (validateOnly) {
    console.log('\n验证完成，未进行修复。');
    process.exit(0);
}

if (!validationResults.isValid || autoFix) {
    if (!autoFix) {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        rl.question('是否自动修复问题？(y/n) ', (answer) => {
            rl.close();
            if (answer.toLowerCase() !== 'y') {
                console.log('已取消修复操作。');
                process.exit(0);
            }
            
            executeRepair();
        });
    } else {
        executeRepair();
    }
} else {
    console.log('故事数据完整，无需修复。');
}

function executeRepair() {
    // 执行修复
    const repairedData = repairStoryData(storyData, validationResults);
    const optimizedData = optimizeStoryData(repairedData);
    
    // 验证修复结果
    const finalValidation = testStoryIntegrity(optimizedData);
    
    if (finalValidation.isValid) {
        console.log('\n✅ 修复完成！故事数据结构现在完整。');
    } else {
        console.log('\n⚠️  修复后仍存在问题，请手动检查。');
    }
    
    // 保存修复后的数据
    saveStoryData(optimizedData, outputFile);
    
    console.log('\n🎉 智能脚本设计工具 v2.0 执行完成！');
}

// 分析结局主题
function analyzeEndingTheme(description) {
    if (!description) return '未知';
    
    const text = description.toLowerCase();
    
    // 关键词匹配
    if (text.includes('合作') || text.includes('创作') || text.includes('一起')) {
        return '合作创作';
    }
    if (text.includes('情感') || text.includes('感情') || text.includes('共鸣') || text.includes('心动')) {
        return '情感发展';
    }
    if (text.includes('成长') || text.includes('提升') || text.includes('学习') || text.includes('进步')) {
        return '自我提升';
    }
    if (text.includes('遗憾') || text.includes('分离') || text.includes('告别') || text.includes('离开')) {
        return '离别遗憾';
    }
    if (text.includes('惊喜') || text.includes('意外') || text.includes('收获') || text.includes('发现')) {
        return '意外收获';
    }
    if (text.includes('艺术') || text.includes('创作') || text.includes('作品')) {
        return '艺术成就';
    }
    if (text.includes('友谊') || text.includes('朋友') || text.includes('知己')) {
        return '友谊发展';
    }
    if (text.includes('冒险') || text.includes('探索') || text.includes('旅程')) {
        return '冒险经历';
    }
    
    return '其他';
}

// 生成分层跳转的具体场景建议
function generateHierarchicalJumpPlan(endingCount, currentEndings) {
    const plan = {
        mainEndings: [
            { name: '艺术合作结局', theme: '合作创作' },
            { name: '情感共鸣结局', theme: '情感发展' },
            { name: '个人成长结局', theme: '自我提升' },
            { name: '遗憾分离结局', theme: '离别遗憾' },
            { name: '意外惊喜结局', theme: '意外收获' }
        ],
        layers: [],
        recommendations: []
    };
    
    // 计算需要的层数
    const layersNeeded = Math.max(1, Math.ceil((endingCount - 5) / 3));
    
    // 分析当前结局的主题分布
    const themeDistribution = {};
    currentEndings.forEach(ending => {
        const theme = analyzeEndingTheme(ending.description);
        themeDistribution[theme] = (themeDistribution[theme] || 0) + 1;
    });
    
    // 生成分层建议
    for (let layer = 1; layer <= layersNeeded; layer++) {
        const layerInfo = {
            layer: layer,
            scenes: [],
            target: layer === layersNeeded ? '主要结局' : `第${layer + 1}层`
        };
        
        // 根据主题分组建议
        const themes = Object.keys(themeDistribution);
        const scenesPerTheme = Math.ceil(3 / themes.length);
        
        themes.forEach(theme => {
            if (themeDistribution[theme] > 0) {
                layerInfo.scenes.push({
                    theme: theme,
                    count: Math.min(themeDistribution[theme], scenesPerTheme),
                    description: `将${theme}主题的结局引导到下一层`
                });
                themeDistribution[theme] -= scenesPerTheme;
            }
        });
        
        plan.layers.push(layerInfo);
    }
    
    // 生成具体建议
    plan.recommendations.push(`📊 主题分布分析：`);
    Object.entries(themeDistribution).forEach(([theme, count]) => {
        plan.recommendations.push(`  - ${theme}: ${count} 个结局`);
    });
    
    plan.recommendations.push(`\n🎯 分层跳转实施步骤：`);
    plan.layers.forEach(layer => {
        plan.recommendations.push(`第${layer.layer}层：`);
        layer.scenes.forEach(scene => {
            plan.recommendations.push(`  - ${scene.theme}: ${scene.count}个场景 → ${layer.target}`);
        });
    });
    
    return plan;
}
