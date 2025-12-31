// 智能脚本设计工具 - smartscript.js
// 专门用于生成场景永远不会缺失的storydata.js
// 版本：3.0 - 高级分析版
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
let showEndingCount = false;
let showStoryGraphFlag = false;
let optimizeEndingsFlag = false;
let analyzeBranches = false;

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
    } else if (args[i] === '-c' || args[i] === '--endings') {
        showEndingCount = true;
    } else if (args[i] === '-g' || args[i] === '--graph') {
        showStoryGraphFlag = true;
    } else if (args[i] === '-O' || args[i] === '--optimize') {
        optimizeEndingsFlag = true;
    } else if (args[i] === '-B' || args[i] === '--branches') {
        analyzeBranches = true;
    } else if (args[i] === '-A' || args[i] === '--all') {
        analyzeDepth = true;
        analyzeEmotion = true;
        analyzeBalance = true;
        generateReport = true;
        showEndingCount = true;
        showStoryGraphFlag = true;
        optimizeEndingsFlag = true;
        analyzeBranches = true;
    } else if (args[i] === '-h' || args[i] === '--help') {
        showHelp();
        process.exit(0);
    } else if (!inputFile) {
        inputFile = args[i];
    }
}

function showHelp() {
    console.log(`
智能脚本设计工具 v3.0 - 高级故事分析工具

用法: node smartscript.js [选项] <输入文件>

选项:
  -i, --input <文件>       输入故事数据文件
  -o, --output <文件>      输出文件 (默认: storydata-smart.js)
  -v, --validate          仅验证，不修复
  -a, --autofix           自动修复问题
  -r, --report            生成详细报告
  -f, --format <格式>      报告格式: html, markdown, txt (默认: html)
  -d, --depth             分析故事路径深度
  -e, --emotion           分析情感系统
  -b, --balance           分析故事平衡性
  -c, --endings           查看故事结局数目
  -g, --graph             显示故事情节场景导图
  -O, --optimize          优化故事结局（超过5个时智能推荐）
  -B, --branches          分析分支场景数膨胀
  -A, --all               执行所有分析
  -h, --help              显示帮助信息

示例:
  node smartscript.js -i storydata.js -v                    # 仅验证
  node smartscript.js storydata.js -a                        # 自动修复
  node smartscript.js -i input.js -o output.js -A            # 全面分析
  node smartscript.js -i storydata.js -r -f markdown         # 生成Markdown报告
  node smartscript.js -i storydata.js -c -g                  # 查看结局数和场景导图
  node smartscript.js -i storydata.js -O -B                  # 优化结局和分析分支
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

// 增强版场景完整性验证函数
function testStoryIntegrity(storyData) {
    const results = {
        totalScenes: 0,
        definedScenes: [],
        referencedScenes: new Set(),
        missingScenes: [],
        isolatedScenes: [],
        scenesWithoutChoices: [],
        cycles: [],
        branchAnalysis: {
            maxBranchDepth: 0,
            minBranchDepth: Infinity,
            branchCount: 0,
            unbalancedBranches: [],
            recommendations: []
        },
        gapAnalysis: {
            storyGaps: [],
            continuityIssues: [],
            recommendations: []
        },
        endingAnalysis: {
            endingCount: 0,
            endings: [],
            endingTypes: {},
            recommendations: []
        },
        isValid: false,
        overallScore: 0
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
    
    // 执行增强分析
    analyzeBranchStructure(storyData, results);
    analyzeStoryGaps(storyData, results);
    analyzeEndings(storyData, results);
    
    // 计算整体评分
    results.overallScore = calculateOverallScore(results);
    
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
            // 发现循环
            const cycleStart = path.indexOf(currentScene);
            const cycle = path.slice(cycleStart).concat(currentScene);
            
            // 检查是否是Ending场景转向Start场景的合法循环
            const isEndingToStartCycle = cycle.some((scene, index) => {
                const nextScene = cycle[index + 1];
                return scene.startsWith('Ending') && nextScene === 'Start';
            });
            
            // 如果是Ending场景转向Start场景的循环，不算死循环
            if (!isEndingToStartCycle) {
                cycles.push(cycle.join(' -> '));
            }
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
                    
                    // 排除Ending场景转向Start场景的合法循环
                    if (currentScene.startsWith('Ending') && choice.nextScene === 'Start') {
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
        depthInfo.endingRecommendations.push(`检测到 ${endingCount} 个结局，数量合理`);
    }
    
    return depthInfo;
}

// 分析结局系统
function analyzeEndings(storyData, results) {
    console.log('🎯 正在分析结局系统...');
    
    const endings = [];
    const endingTypes = {};
    
    // 识别所有结局场景
    for (const sceneName of Object.keys(storyData.scenes)) {
        const scene = storyData.scenes[sceneName];
        if (isEndingScene(scene, sceneName)) {
            const endingInfo = {
                name: sceneName,
                type: analyzeEndingType(scene, sceneName),
                description: scene.text ? scene.text.substring(0, 100) + '...' : '无描述',
                hasRestart: scene.choices && scene.choices.some(c => c.nextScene === 'start' || c.nextScene === 'Start'),
                namingConvention: sceneName.startsWith('Ending_') ? '标准命名' : '传统命名'
            };
            
            endings.push(endingInfo);
            endingTypes[endingInfo.type] = (endingTypes[endingInfo.type] || 0) + 1;
        }
    }
    
    results.endingAnalysis.endingCount = endings.length;
    results.endingAnalysis.endings = endings;
    results.endingAnalysis.endingTypes = endingTypes;
    
    // 结局数量验证和建议
    if (endings.length === 0) {
        results.endingAnalysis.recommendations.push('❌ 未检测到任何结局场景，故事可能无法正常结束');
        results.endingAnalysis.recommendations.push('建议添加至少1个结局场景');
    } else if (endings.length > 5) {
        results.endingAnalysis.recommendations.push(`⚠️  检测到${endings.length}个结局，超过建议的5个上限`);
        results.endingAnalysis.recommendations.push('过多的结局可能导致玩家体验分散，建议：');
        results.endingAnalysis.recommendations.push('1. 合并相似主题的结局');
        results.endingAnalysis.recommendations.push('2. 使用分层跳转系统');
        results.endingAnalysis.recommendations.push('3. 确保每个结局都有独特价值');
    } else {
        results.endingAnalysis.recommendations.push(`✅ 检测到${endings.length}个结局，数量合理`);
    }
    
    // 结局命名规则验证
    const standardNamedEndings = endings.filter(e => e.namingConvention === '标准命名');
    const traditionalNamedEndings = endings.filter(e => e.namingConvention === '传统命名');
    
    results.endingAnalysis.standardNamedCount = standardNamedEndings.length;
    results.endingAnalysis.traditionalNamedCount = traditionalNamedEndings.length;
    
    if (standardNamedEndings.length > 0) {
        results.endingAnalysis.recommendations.push(`\n✅ 检测到${standardNamedEndings.length}个标准命名的结局（以Ending_开头）`);
        standardNamedEndings.forEach(ending => {
            results.endingAnalysis.recommendations.push(`  - ${ending.name} (${ending.type})`);
        });
    }
    
    if (traditionalNamedEndings.length > 0) {
        results.endingAnalysis.recommendations.push(`\n⚠️  检测到${traditionalNamedEndings.length}个传统命名的结局`);
        results.endingAnalysis.recommendations.push('建议按照标准命名规则重命名：');
        traditionalNamedEndings.forEach(ending => {
            const suggestedName = suggestStandardEndingName(ending.name, ending.type);
            results.endingAnalysis.recommendations.push(`  - ${ending.name} → ${suggestedName}`);
        });
    }
    
    // 结局类型分布分析
    if (Object.keys(endingTypes).length > 0) {
        results.endingAnalysis.recommendations.push('\n结局类型分布：');
        Object.entries(endingTypes).forEach(([type, count]) => {
            results.endingAnalysis.recommendations.push(`  - ${type}: ${count}个`);
        });
    }
    
    // 结局数据逻辑验证
    validateEndingDataLogic(storyData, results, endings);
}

// 判断是否为结局场景
function isEndingScene(scene, sceneName = '') {
    if (!scene) return false;
    
    // 方式1：场景名称以"Ending_"开头（最高优先级）
    if (sceneName && sceneName.startsWith('Ending_')) {
        return true;
    }
    
    // 方式2：文本中包含"结局："字样
    if (scene.text && scene.text.includes('结局：')) {
        return true;
    }
    
    // 方式3：没有选择项的场景
    if (!scene.choices || scene.choices.length === 0) {
        return true;
    }
    
    // 方式4：只有"重新开始"选项的场景
    if (scene.choices && scene.choices.length > 0) {
        const hasOnlyRestart = scene.choices.every(choice => 
            choice.text && (choice.text.includes('重新开始') || choice.text.includes('重新开始故事'))
        );
        if (hasOnlyRestart) {
            return true;
        }
    }
    
    // 方式5：场景名称包含"ending"或"结局"
    if (sceneName && (sceneName.includes('ending') || sceneName.includes('结局'))) {
        return true;
    }
    
    return false;
}

// 分析结局类型
function analyzeEndingType(scene, sceneName = '') {
    if (!scene) return '未知类型';
    
    // 首先根据场景名称判断类型（如果以Ending_开头）
    if (sceneName && sceneName.startsWith('Ending_')) {
        const endingType = sceneName.substring(7); // 去掉"Ending_"前缀
        if (endingType.includes('Good') || endingType.includes('Happy')) {
            return '成功结局';
        } else if (endingType.includes('Bad') || endingType.includes('Sad')) {
            return '失败结局';
        } else if (endingType.includes('Love') || endingType.includes('Romance')) {
            return '爱情结局';
        } else if (endingType.includes('Friendship') || endingType.includes('Friend')) {
            return '友谊结局';
        } else if (endingType.includes('Growth') || endingType.includes('Learn')) {
            return '成长结局';
        } else if (endingType.includes('Surprise') || endingType.includes('Unexpected')) {
            return '意外结局';
        } else if (endingType.includes('Cooperation') || endingType.includes('Team')) {
            return '合作结局';
        }
        return endingType + '结局';
    }
    
    // 如果没有场景名称信息或不是标准命名，则根据文本内容判断
    if (!scene.text) return '普通结局';
    
    const text = scene.text.toLowerCase();
    
    if (text.includes('成功') || text.includes('胜利') || text.includes('圆满')) {
        return '成功结局';
    }
    if (text.includes('失败') || text.includes('遗憾') || text.includes('失去')) {
        return '失败结局';
    }
    if (text.includes('爱情') || text.includes('感情') || text.includes('恋爱')) {
        return '爱情结局';
    }
    if (text.includes('友谊') || text.includes('朋友') || text.includes('伙伴')) {
        return '友谊结局';
    }
    if (text.includes('成长') || text.includes('进步') || text.includes('学习')) {
        return '成长结局';
    }
    if (text.includes('意外') || text.includes('惊喜') || text.includes('发现')) {
        return '意外结局';
    }
    if (text.includes('合作') || text.includes('团队') || text.includes('一起')) {
        return '合作结局';
    }
    
    return '普通结局';
}

// 计算整体评分
function calculateOverallScore(results) {
    let score = 100;
    
    // 基础完整性扣分（设置上限，避免分数过低）
    score -= Math.min(30, results.missingScenes.length * 3);
    score -= Math.min(15, results.isolatedScenes.length * 2);
    score -= Math.min(10, results.scenesWithoutChoices.length * 2);
    score -= Math.min(20, results.cycles.length * 5);
    
    // 分支平衡性扣分
    if (results.branchAnalysis.unbalancedBranches.length > 0) {
        score -= Math.min(15, results.branchAnalysis.unbalancedBranches.length * 3);
    }
    
    // 断档检测扣分
    score -= Math.min(10, results.gapAnalysis.storyGaps.length * 2);
    score -= Math.min(20, results.gapAnalysis.continuityIssues.length * 2);
    
    // 结局数量扣分
    if (results.endingAnalysis.endingCount === 0) {
        score -= 15;
    } else if (results.endingAnalysis.endingCount > 5) {
        score -= Math.min(10, (results.endingAnalysis.endingCount - 5) * 2);
    }
    
    // 确保分数不会低于0
    return Math.max(0, Math.round(score));
}

// 建议标准结局名称
function suggestStandardEndingName(currentName, endingType) {
    // 如果已经是标准命名，直接返回
    if (currentName.startsWith('Ending_')) {
        return currentName;
    }
    
    // 根据结局类型生成标准名称
    const typeMapping = {
        '成功结局': 'Good',
        '失败结局': 'Bad', 
        '爱情结局': 'Love',
        '友谊结局': 'Friendship',
        '成长结局': 'Growth',
        '意外结局': 'Surprise',
        '合作结局': 'Cooperation',
        '普通结局': 'Normal'
    };
    
    const baseType = typeMapping[endingType] || 'Default';
    
    // 从当前名称提取有意义的标识符
    let identifier = currentName;
    if (currentName.includes('_')) {
        identifier = currentName.split('_').pop();
    } else if (currentName.length > 10) {
        identifier = currentName.substring(0, 8);
    }
    
    // 清理标识符，只保留字母数字
    identifier = identifier.replace(/[^a-zA-Z0-9]/g, '');
    
    if (!identifier || identifier.length < 3) {
        identifier = baseType;
    }
    
    return `Ending_${baseType}_${identifier}`;
}

// 验证结局数据逻辑
function validateEndingDataLogic(storyData, results, endings) {
    const logicIssues = [];
    
    // 检查每个结局场景的数据逻辑
    for (const ending of endings) {
        const scene = storyData.scenes[ending.name];
        
        // 1. 检查是否有重新开始选项
        const hasRestartOption = scene.choices && scene.choices.some(c => 
            c.nextScene === 'Start' || c.nextScene === 'start'
        );
        
        if (!hasRestartOption) {
            logicIssues.push(`❌ ${ending.name}: 缺少重新开始选项（应指向Start场景）`);
        }
        
        // 2. 检查重新开始选项的文本
        if (hasRestartOption) {
            const restartChoice = scene.choices.find(c => 
                c.nextScene === 'Start' || c.nextScene === 'start'
            );
            if (restartChoice && (!restartChoice.text || !restartChoice.text.includes('重新开始'))) {
                logicIssues.push(`⚠️  ${ending.name}: 重新开始选项文本建议包含"重新开始"字样`);
            }
        }
        
        // 3. 检查标准命名的结局是否有额外的选择项（除了重新开始）
        if (ending.namingConvention === '标准命名' && scene.choices) {
            const nonRestartChoices = scene.choices.filter(c => 
                c.nextScene !== 'Start' && c.nextScene !== 'start'
            );
            if (nonRestartChoices.length > 0) {
                logicIssues.push(`⚠️  ${ending.name}: 标准命名的结局建议只包含重新开始选项`);
            }
        }
        
        // 4. 检查结局场景是否有合理的描述
        if (!scene.text || scene.text.length < 20) {
            logicIssues.push(`⚠️  ${ending.name}: 结局描述可能过于简短`);
        }
        
        // 5. 检查结局场景是否包含"结局："标识
        if (!scene.text || !scene.text.includes('结局：')) {
            logicIssues.push(`💡 ${ending.name}: 建议在描述中添加"结局："标识`);
        }
    }
    
    // 6. 检查Start场景是否存在
    if (!storyData.scenes['Start']) {
        logicIssues.push('❌ 缺少Start场景（故事起始点）');
    }
    
    // 7. 检查是否有场景指向不存在的结局
    const allEndingNames = endings.map(e => e.name);
    for (const sceneName of Object.keys(storyData.scenes)) {
        const scene = storyData.scenes[sceneName];
        if (scene.choices) {
            for (const choice of scene.choices) {
                if (choice.nextScene && 
                    choice.nextScene.startsWith('Ending_') && 
                    !allEndingNames.includes(choice.nextScene)) {
                    logicIssues.push(`❌ ${sceneName} → ${choice.nextScene}: 指向不存在的标准结局`);
                }
            }
        }
    }
    
    if (logicIssues.length > 0) {
        results.endingAnalysis.recommendations.push('\n结局数据逻辑验证：');
        logicIssues.forEach(issue => {
            results.endingAnalysis.recommendations.push(issue);
        });
    } else {
        results.endingAnalysis.recommendations.push('\n✅ 结局数据逻辑验证通过');
    }
}

// 自动修复结局命名规则
function fixEndingNamingConvention(storyData) {
    let fixedCount = 0;
    const newScenes = { ...storyData.scenes };
    
    // 识别需要重命名的结局场景
    for (const sceneName of Object.keys(newScenes)) {
        const scene = newScenes[sceneName];
        
        // 如果是结局场景但不符合标准命名
        if (isEndingScene(scene, sceneName) && !sceneName.startsWith('Ending_')) {
            const endingType = analyzeEndingType(scene, sceneName);
            const newName = suggestStandardEndingName(sceneName, endingType);
            
            // 重命名场景
            if (newName !== sceneName) {
                newScenes[newName] = newScenes[sceneName];
                delete newScenes[sceneName];
                fixedCount++;
                
                // 更新所有指向该场景的引用
                for (const otherSceneName of Object.keys(newScenes)) {
                    const otherScene = newScenes[otherSceneName];
                    if (otherScene.choices) {
                        for (const choice of otherScene.choices) {
                            if (choice.nextScene === sceneName) {
                                choice.nextScene = newName;
                            }
                        }
                    }
                }
                
                // 更新初始状态
                if (storyData.initialState.currentScene === sceneName) {
                    storyData.initialState.currentScene = newName;
                }
            }
        }
    }
    
    if (fixedCount > 0) {
        storyData.scenes = newScenes;
        console.log(`✅ 自动修复了${fixedCount}个结局场景的命名规则`);
    }
    
    return storyData;
}

// 修复故事数据逻辑断档
function fixStoryDataLogic(storyData) {
    console.log('🔧 正在修复故事数据逻辑断档...');
    
    const fixedData = JSON.parse(JSON.stringify(storyData));
    let fixedCount = 0;
    
    // 1. 确保Start场景存在
    if (!fixedData.scenes['Start']) {
        console.log('⚠️  缺少Start场景，创建默认Start场景');
        fixedData.scenes['Start'] = {
            "background": "images/海边.jpg",
            "text": "<p>故事开始...</p>",
            "choices": [
                {
                    "text": "开始故事",
                    "nextScene": "meet"
                }
            ]
        };
        fixedCount++;
    }
    
    // 2. 修复指向不存在的场景的选择项
    for (const sceneName of Object.keys(fixedData.scenes)) {
        const scene = fixedData.scenes[sceneName];
        if (scene.choices) {
            for (const choice of scene.choices) {
                if (choice.nextScene && !fixedData.scenes[choice.nextScene]) {
                    // 如果指向的场景不存在，重定向到默认结局
                    console.log(`🔧 修复 ${sceneName} → ${choice.nextScene}: 指向不存在的场景`);
                    choice.nextScene = 'Ending_default';
                    fixedCount++;
                }
            }
        }
    }
    
    // 3. 确保所有结局场景都有重新开始选项
    for (const sceneName of Object.keys(fixedData.scenes)) {
        const scene = fixedData.scenes[sceneName];
        if (isEndingScene(scene, sceneName)) {
            const hasRestart = scene.choices && scene.choices.some(c => 
                c.nextScene === 'Start' || c.nextScene === 'start'
            );
            
            if (!hasRestart) {
                console.log(`🔧 为 ${sceneName} 添加重新开始选项`);
                if (!scene.choices) {
                    scene.choices = [];
                }
                scene.choices.push({
                    "text": "重新开始故事",
                    "nextScene": "Start"
                });
                fixedCount++;
            }
        }
    }
    
    if (fixedCount > 0) {
        console.log(`✅ 修复了${fixedCount}处逻辑断档问题`);
    } else {
        console.log('✅ 故事数据逻辑完整，无需修复');
    }
    
    return fixedData;
}