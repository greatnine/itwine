// 故事数据可视化工具 - Mermaid有向图生成器
// 专门用于直观展示story-data.js的分支走向
// 版本：1.0

const fs = require('fs');

// Mermaid有向图生成器类
class MermaidStoryVisualizer {
    constructor(storyData) {
        this.storyData = storyData;
        this.sceneGraph = {};
        this.endingScenes = [];
        this.startScene = '';
        this.maxDepth = 0;
        this.branchAnalysis = {};
    }

    // 分析故事结构
    analyzeStoryStructure() {
        console.log('🔍 正在分析故事结构...');
        
        this.startScene = this.storyData.initialState.currentScene;
        
        // 构建场景图
        this.buildSceneGraph();
        
        // 识别结局场景
        this.identifyEndingScenes();
        
        // 分析分支结构
        this.analyzeBranchStructure();
        
        console.log(`📊 分析完成:`);
        console.log(`   - 总场景数: ${Object.keys(this.storyData.scenes).length}`);
        console.log(`   - 结局场景: ${this.endingScenes.length} 个`);
        console.log(`   - 最大分支深度: ${this.maxDepth}`);
    }

    // 构建场景图
    buildSceneGraph() {
        for (const sceneName of Object.keys(this.storyData.scenes)) {
            const scene = this.storyData.scenes[sceneName];
            
            this.sceneGraph[sceneName] = {
                name: sceneName,
                text: scene.text || '',
                background: scene.background || '',
                choices: scene.choices || [],
                connections: new Set(),
                isStart: sceneName === this.startScene,
                isEnding: false,
                depth: 0,
                branchId: 0
            };
            
            // 收集连接关系
            if (scene.choices) {
                for (const choice of scene.choices) {
                    if (choice.nextScene) {
                        this.sceneGraph[sceneName].connections.add(choice.nextScene);
                    }
                }
            }
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
        
        // 标记结局场景
        for (const ending of this.endingScenes) {
            if (this.sceneGraph[ending]) {
                this.sceneGraph[ending].isEnding = true;
            }
        }
    }

    // 分析分支结构
    analyzeBranchStructure() {
        console.log('🌳 正在分析分支结构...');
        
        const visited = new Set();
        const queue = [{ scene: this.startScene, depth: 0, branchId: 0 }];
        let branchCounter = 0;
        
        while (queue.length > 0) {
            const current = queue.shift();
            
            if (visited.has(current.scene)) continue;
            visited.add(current.scene);
            
            // 更新场景深度和分支ID
            if (this.sceneGraph[current.scene]) {
                this.sceneGraph[current.scene].depth = current.depth;
                this.sceneGraph[current.scene].branchId = current.branchId;
                this.maxDepth = Math.max(this.maxDepth, current.depth);
            }
            
            const scene = this.storyData.scenes[current.scene];
            if (scene && scene.choices) {
                // 如果是分支点（多个选择）
                if (scene.choices.length > 1) {
                    this.branchAnalysis[current.scene] = {
                        choices: scene.choices.length,
                        subBranches: []
                    };
                    
                    // 为每个选择创建新的分支
                    for (let i = 0; i < scene.choices.length; i++) {
                        const choice = scene.choices[i];
                        if (choice.nextScene && !visited.has(choice.nextScene)) {
                            const newBranchId = branchCounter++;
                            this.branchAnalysis[current.scene].subBranches.push({
                                choiceText: choice.text,
                                nextScene: choice.nextScene,
                                branchId: newBranchId
                            });
                            
                            queue.push({
                                scene: choice.nextScene,
                                depth: current.depth + 1,
                                branchId: newBranchId
                            });
                        }
                    }
                } else {
                    // 线性发展
                    for (const choice of scene.choices) {
                        if (choice.nextScene && !visited.has(choice.nextScene)) {
                            queue.push({
                                scene: choice.nextScene,
                                depth: current.depth + 1,
                                branchId: current.branchId
                            });
                        }
                    }
                }
            }
        }
    }

    // 生成Mermaid有向图语法
    generateMermaidDiagram() {
        console.log('📊 正在生成Mermaid有向图...');
        
        let mermaidCode = '```mermaid\ngraph TD\n';
        
        // 定义样式
        mermaidCode += '    %% 样式定义\n';
        mermaidCode += '    classDef startNode fill:#90EE90,stroke:#333,stroke-width:2px;\n';
        mermaidCode += '    classDef endingNode fill:#FFB6C1,stroke:#333,stroke-width:2px;\n';
        mermaidCode += '    classDef branchNode fill:#87CEEB,stroke:#333,stroke-width:2px;\n';
        mermaidCode += '    classDef normalNode fill:#F0F0F0,stroke:#333,stroke-width:1px;\n\n';
        
        // 添加节点
        for (const sceneName of Object.keys(this.sceneGraph)) {
            const scene = this.sceneGraph[sceneName];
            const nodeId = this.sanitizeNodeId(sceneName);
            
            let nodeLabel = sceneName;
            if (scene.text) {
                // 简化文本作为标签
                const simplifiedText = scene.text.replace(/<[^>]*>/g, '').substring(0, 30);
                nodeLabel = `${sceneName}\n"${simplifiedText}..."`;
            }
            
            mermaidCode += `    ${nodeId}("${nodeLabel}")\n`;
            
            // 应用样式
            if (scene.isStart) {
                mermaidCode += `    class ${nodeId} startNode;\n`;
            } else if (scene.isEnding) {
                mermaidCode += `    class ${nodeId} endingNode;\n`;
            } else if (scene.choices && scene.choices.length > 1) {
                mermaidCode += `    class ${nodeId} branchNode;\n`;
            } else {
                mermaidCode += `    class ${nodeId} normalNode;\n`;
            }
        }
        
        mermaidCode += '\n    %% 连接关系\n';
        
        // 添加连接
        for (const sceneName of Object.keys(this.sceneGraph)) {
            const scene = this.sceneGraph[sceneName];
            const fromNode = this.sanitizeNodeId(sceneName);
            
            if (scene.choices) {
                for (const choice of scene.choices) {
                    if (choice.nextScene && this.sceneGraph[choice.nextScene]) {
                        const toNode = this.sanitizeNodeId(choice.nextScene);
                        const choiceText = choice.text ? this.escapeMermaidText(choice.text) : '继续';
                        
                        mermaidCode += `    ${fromNode} --> |"${choiceText}"| ${toNode}\n`;
                    }
                }
            }
        }
        
        mermaidCode += '```\n';
        
        return mermaidCode;
    }

    // 生成详细的分支分析报告
    generateBranchAnalysisReport() {
        console.log('📈 正在生成分支分析报告...');
        
        let report = '# 故事分支分析报告\n\n';
        
        report += '## 📊 总体统计\n';
        report += `- **总场景数**: ${Object.keys(this.storyData.scenes).length}\n`;
        report += `- **结局场景**: ${this.endingScenes.length} 个\n`;
        report += `- **最大分支深度**: ${this.maxDepth}\n`;
        report += `- **分支点数量**: ${Object.keys(this.branchAnalysis).length}\n\n`;
        
        report += '## 🌳 分支结构分析\n';
        
        if (Object.keys(this.branchAnalysis).length > 0) {
            for (const [branchPoint, analysis] of Object.entries(this.branchAnalysis)) {
                report += `### ${branchPoint} (${analysis.choices}个选择)\n`;
                
                for (const subBranch of analysis.subBranches) {
                    report += `- **选择**: "${subBranch.choiceText}" → ${subBranch.nextScene}\n`;
                }
                report += '\n';
            }
        } else {
            report += '故事结构相对线性，分支点较少。\n\n';
        }
        
        report += '## 🎯 结局可达性分析\n';
        for (const ending of this.endingScenes) {
            const scene = this.sceneGraph[ending];
            report += `- **${ending}**: 深度 ${scene.depth}, 分支ID ${scene.branchId}\n`;
        }
        report += '\n';
        
        report += '## 💡 优化建议\n';
        
        // 基于分析结果提供建议
        if (this.endingScenes.length < 3) {
            report += '- ⚠️ 结局数量较少，建议增加更多结局以丰富游戏体验\n';
        }
        
        if (this.maxDepth < 4) {
            report += '- ⚠️ 故事深度较浅，建议增加更多层次的选择\n';
        }
        
        if (Object.keys(this.branchAnalysis).length === 0) {
            report += '- ⚠️ 分支点较少，故事可能过于线性\n';
        }
        
        return report;
    }

    // 生成完整的可视化报告
    generateVisualizationReport() {
        console.log('🎨 正在生成完整可视化报告...');
        
        let fullReport = '# 故事数据结构可视化报告\n\n';
        
        fullReport += '## 📋 报告概述\n';
        fullReport += `- **生成时间**: ${new Date().toLocaleString()}\n`;
        fullReport += `- **故事标题**: ${this.storyData.title || '未命名'}\n`;
        fullReport += `- **作者**: ${this.storyData.author || '未知'}\n\n`;
        
        fullReport += '## 🗺️ Mermaid有向图\n';
        fullReport += '以下图表直观展示了故事的分支走向和场景关系：\n\n';
        fullReport += this.generateMermaidDiagram();
        fullReport += '\n';
        
        fullReport += '## 📊 图例说明\n';
        fullReport += '- 🟢 **绿色节点**: 起始场景\n';
        fullReport += '- 🔵 **蓝色节点**: 分支点（多个选择）\n';
        fullReport += '- 🎀 **粉色节点**: 结局场景\n';
        fullReport += '- ⚪ **白色节点**: 普通场景\n';
        fullReport += '- **箭头标签**: 选择文本\n\n';
        
        fullReport += this.generateBranchAnalysisReport();
        
        fullReport += '## 🔍 技术细节\n';
        fullReport += '- **可视化工具**: Mermaid.js\n';
        fullReport += '- **图表类型**: 有向图 (Directed Graph)\n';
        fullReport += '- **节点数量**: ' + Object.keys(this.sceneGraph).length + '\n';
        fullReport += '- **连接数量**: ' + this.calculateTotalConnections() + '\n';
        
        return fullReport;
    }

    // 辅助函数：清理节点ID
    sanitizeNodeId(name) {
        return name.replace(/[^a-zA-Z0-9_]/g, '_');
    }

    // 辅助函数：转义Mermaid文本
    escapeMermaidText(text) {
        return text.replace(/"/g, '\"').replace(/\n/g, ' ').substring(0, 20);
    }

    // 计算总连接数
    calculateTotalConnections() {
        let total = 0;
        for (const sceneName of Object.keys(this.sceneGraph)) {
            const scene = this.sceneGraph[sceneName];
            total += scene.connections.size;
        }
        return total;
    }

    // 主生成函数
    generate() {
        console.log('🚀 开始生成故事可视化...\n');
        
        this.analyzeStoryStructure();
        console.log('');
        
        const report = this.generateVisualizationReport();
        
        console.log('✅ 可视化报告生成完成！');
        return report;
    }
}

// 主函数
function visualizeStoryData(inputFile, outputFile) {
    try {
        console.log('📖 正在读取故事数据...');
        const storyContent = fs.readFileSync(inputFile, 'utf8');
        
        // 提取storyData对象
        const match = storyContent.match(/const storyData = ({[\s\S]*?});/);
        if (!match) {
            throw new Error('无法解析故事数据');
        }
        
        const storyData = eval('(' + match[1] + ')');
        
        // 创建可视化器并生成报告
        const visualizer = new MermaidStoryVisualizer(storyData);
        const report = visualizer.generate();
        
        // 保存报告
        fs.writeFileSync(outputFile, report, 'utf8');
        console.log(`\n💾 可视化报告已保存到: ${outputFile}`);
        
        // 在控制台显示部分结果
        console.log('\n📋 报告预览:');
        console.log('='.repeat(50));
        console.log(report.substring(0, 500) + '...');
        console.log('='.repeat(50));
        
    } catch (error) {
        console.error(`❌ 可视化失败: ${error.message}`);
        process.exit(1);
    }
}

// 命令行接口
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
        console.log(`
故事数据可视化工具 - Mermaid有向图生成器

用法: node story-visualizer.js <输入文件> <输出文件>

示例:
  node story-visualizer.js storydata-optimized.js story-visualization.md
  node story-visualizer.js story-data.js story-report.md

功能:
  - 生成Mermaid有向图语法
  - 分析分支结构
  - 提供优化建议
  - 生成完整的可视化报告
`);
        process.exit(1);
    }
    
    const inputFile = args[0];
    const outputFile = args[1];
    
    visualizeStoryData(inputFile, outputFile);
}

module.exports = { MermaidStoryVisualizer, visualizeStoryData };