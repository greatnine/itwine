// 游戏状态管理
let gameState = null;

// 模板配置系统
const templateConfig = {
    // 结局检测配置
    endingDetection: {
        // 方法1: 通过场景名称前缀检测
        byPrefix: storyData.endingPrefixes || ['main_ending_', 'value_'],
        // 方法2: 通过场景属性检测
        byProperty: storyData.endingProperty || 'isEnding',
        // 方法3: 通过自定义函数检测
        byCustom: storyData.customEndingDetector
    },
    
    // 结局类型映射配置
    endingTypes: storyData.endingTypes || {
        'positive': { icon: '❤️', color: '#e74c3c' },
        'neutral': { icon: '⭐', color: '#f39c12' },
        'negative': { icon: '⚠️', color: '#95a5a6' }
    }
};

// 初始化特征值显示
function initStatsDisplay() {
    const statsContainer = document.getElementById('stats-container');
    statsContainer.innerHTML = '';
    
    storyData.statsConfig.forEach(stat => {
        const statItem = document.createElement('span');
        statItem.className = 'stats-item';
        statItem.innerHTML = `${stat.label}：<span class="stats-value" id="stat-${stat.key}">加载中...</span>`;
        statsContainer.appendChild(statItem);
    });
}

// 检查场景是否是结局场景（通用检测方法）
function isEndingScene(scene, sceneName) {
    const config = templateConfig.endingDetection;
    
    // 方法1: 通过自定义函数检测
    if (config.byCustom && typeof config.byCustom === 'function') {
        return config.byCustom(scene, sceneName);
    }
    
    // 方法2: 通过场景属性检测
    if (config.byProperty && scene[config.byProperty]) {
        return true;
    }
    
    // 方法3: 通过场景名称前缀检测
    if (config.byPrefix && config.byPrefix.length > 0) {
        return config.byPrefix.some(prefix => sceneName.startsWith(prefix));
    }
    
    // 默认检测：场景没有选择项且包含"结局"关键词
    return (!scene.choices || scene.choices.length === 0) && 
           scene.text && scene.text.includes('结局');
}

// 获取所有结局场景
function getAllEndings() {
    return Object.entries(storyData.scenes)
        .filter(([sceneName, scene]) => isEndingScene(scene, sceneName))
        .map(([sceneName, scene]) => ({ name: sceneName, ...scene }));
}

// 折叠/展开结局列表
function toggleEndings() {
    const endingsButton = document.getElementById('ending-toggle');
    
    // 如果按钮被禁用，不执行任何操作
    if (endingsButton.disabled) {
        return;
    }
    
    const endingContent = document.getElementById('ending-content');
    const toggleIcon = endingsButton.querySelector('.toggle-icon');
    
    if (endingContent.classList.contains('expanded')) {
        // 折叠
        endingContent.classList.remove('expanded');
        toggleIcon.style.transform = 'rotate(0deg)';
    } else {
        // 展开
        endingContent.classList.add('expanded');
        toggleIcon.style.transform = 'rotate(180deg)';
    }
}

// 点击页面其他区域折叠结局列表
document.addEventListener('click', function(event) {
    const endingDescription = document.getElementById('ending-description');
    const endingToggle = document.getElementById('ending-toggle');
    const endingContent = document.getElementById('ending-content');
    
    // 如果点击的不是结局区域，且结局列表是展开状态，则折叠
    if (!endingDescription.contains(event.target) && !endingToggle.contains(event.target) && endingContent.classList.contains('expanded')) {
        endingContent.classList.remove('expanded');
        const toggleIcon = document.getElementById('ending-toggle').querySelector('.toggle-icon');
        toggleIcon.style.transform = 'rotate(0deg)';
    }
});

// 加载故事结局描述
function loadEndingDescriptions() {
    const endingList = document.getElementById('ending-list');
    endingList.innerHTML = '';
    
    const endings = getAllEndings();
    
    // 调试信息：显示检测到的结局数量
    console.log('检测到的结局数量:', endings.length);
    console.log('检测到的结局名称:', endings.map(e => e.name));
    console.log('所有场景数量:', Object.keys(storyData.scenes).length);
    
    if (endings.length === 0) {
        endingList.innerHTML = '<p>暂无结局信息</p>';
        return;
    }
    
    // 调试：检查实际显示的内容
    console.log('即将显示的结局数量:', endings.length);
    
    const endingListHTML = endings.map(ending => {
        // 提取纯文本内容（去除HTML标签）
        const cleanText = ending.text ? ending.text.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : '暂无描述';
        console.log('显示结局:', ending.name);
        
        // 为每个结局定义类型和图标
        const endingTypes = {
            'main_ending_artistic': { type: 'positive', icon: '❤️' },
            'main_ending_emotional': { type: 'positive', icon: '❤️' },
            'main_ending_personal': { type: 'neutral', icon: '⭐' },
            'main_ending_balanced': { type: 'positive', icon: '❤️' },
            'main_ending_friendship': { type: 'neutral', icon: '⭐' },
            'value_perfectionism': { type: 'positive', icon: '❤️' }  // 精益求精结局
        };
        
        const typeInfo = endingTypes[ending.name] || { type: 'unknown', icon: '❓' };
        
        return `<div class="ending-item">
            <div class="ending-icon ${typeInfo.type}">${typeInfo.icon}</div>
            <div class="ending-text">${cleanText}</div>
        </div>`;
    }).join('');
    
    endingList.innerHTML = endingListHTML;
    console.log('实际设置的HTML内容长度:', endingList.innerHTML.length);
    
    // 初始化折叠状态
    const endingContent = document.getElementById('ending-content');
    const toggleIcon = document.getElementById('ending-toggle').querySelector('.toggle-icon');
    endingContent.classList.remove('expanded');
    toggleIcon.style.transform = 'rotate(0deg)';
}

// 检查并显示玩家结局
function checkAndShowPlayerEnding(sceneName, scene) {
    const statsContainer = document.getElementById('stats-container');
    
    // 清除之前的玩家结局显示
    const existingPlayerEnding = statsContainer.querySelector('.player-ending');
    if (existingPlayerEnding) {
        existingPlayerEnding.remove();
    }
    
    // 如果是结局场景，显示玩家结局并启用结局按钮
    if (isEndingScene(scene, sceneName)) {
        const playerEndingDiv = document.createElement('div');
        playerEndingDiv.className = 'player-ending';
        playerEndingDiv.innerHTML = `
            <strong>你的结局是：${sceneName}</strong><br>
            ${scene.text ? scene.text.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : '暂无描述'}
        `;
        statsContainer.appendChild(playerEndingDiv);
        
        // 启用结局按钮
        const endingsButton = document.getElementById('ending-toggle');
        endingsButton.classList.add('enabled');
        endingsButton.disabled = false;
    }
}

// 初始化游戏
function initGame() {
    // 初始化特征值显示
    initStatsDisplay();
    
    // 动态初始化游戏状态
    gameState = {
        playerName: storyData.initialState.playerName,
        currentScene: storyData.initialState.currentScene,
        unlockedEndings: [...storyData.initialState.unlockedEndings],
        visitedScenes: new Set()
    };
    
    // 根据 statsConfig 动态初始化特征值
    storyData.statsConfig.forEach(stat => {
        if (stat.type === 'number') {
            gameState[stat.key] = storyData.initialState[stat.key] || 0;
        } else if (stat.type === 'traits') {
            gameState[stat.key] = { ...storyData.initialState[stat.key] };
        }
    });
    
    // 动态加载页脚标题和作者
    document.getElementById('footer-title').textContent = storyData.title;
    document.getElementById('footer-author').textContent = '作者：' + storyData.author;
    
    // 初始化结局按钮状态 - 禁用
    const endingsButton = document.getElementById('ending-toggle');
    endingsButton.classList.remove('enabled');
    endingsButton.disabled = true;
    
    // 加载故事结局描述
    loadEndingDescriptions();
    
    console.log('游戏初始化:', gameState);
    loadScene(gameState.currentScene);
    updateStats();
}

// 加载场景
function loadScene(sceneName) {
    const scene = storyData.scenes[sceneName];
    if (!scene) {
        console.error('场景不存在:', sceneName);
        return;
    }

    // 更新当前场景
    gameState.currentScene = sceneName;
    gameState.visitedScenes.add(sceneName);

    // 加载场景图片
    const imageContainer = document.getElementById('scene-image-container');
    const imgElement = imageContainer.querySelector('img');
    
    if (scene.background && scene.background.trim() !== '') {
        if (imgElement) {
            imgElement.src = scene.background;
        } else {
            imageContainer.innerHTML = `<img src="${scene.background}" alt="场景图片">`;
        }
        imageContainer.style.display = 'flex';
    } else {
        if (imgElement) {
            imgElement.remove();
        }
        imageContainer.style.display = 'none';
    }
    
    // 检查是否是结局场景，如果是则在页脚显示玩家结局
    checkAndShowPlayerEnding(sceneName, scene);

    // 显示场景内容
    document.getElementById('story-content').innerHTML = scene.text || '<p>场景内容加载中...</p>';

    // 显示选择项
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';

    if (scene.choices && scene.choices.length > 0) {
        scene.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.innerHTML = choice.text;
            button.onclick = () => makeChoice(choice);
            choicesContainer.appendChild(button);
        });
    } else {
        // 如果没有选择项，显示返回按钮
        const backButton = document.createElement('button');
        backButton.className = 'choice-button back-button';
        backButton.innerHTML = '<i class="fas fa-arrow-left"></i> 返回故事集';
        backButton.onclick = () => window.history.back();
        choicesContainer.appendChild(backButton);
    }

    updateStats();
}

// 处理选择
function makeChoice(choice) {
    console.log('选择:', choice);
    console.log('选择效果:', choice.effects);
    
    // 应用效果
    if (choice.effects) {
        storyData.statsConfig.forEach(stat => {
            console.log(`检查特征值: ${stat.key}, 类型: ${stat.type}`);
            if (choice.effects[stat.key]) {
                console.log(`发现效果: ${stat.key} =`, choice.effects[stat.key]);
                if (stat.type === 'number') {
                    gameState[stat.key] += choice.effects[stat.key];
                    console.log(`${stat.label}变化:`, gameState[stat.key]);
                } else if (stat.type === 'traits') {
                    console.log('应用特质前:', gameState[stat.key]);
                    Object.assign(gameState[stat.key], choice.effects[stat.key]);
                    console.log('应用特质后:', gameState[stat.key]);
                    console.log(`${stat.label}更新:`, gameState[stat.key]);
                }
            } else {
                console.log(`没有 ${stat.key} 效果`);
            }
        });
    }

    // 跳转到下一个场景
    if (choice.nextScene) {
        loadScene(choice.nextScene);
    }
}

// 更新状态显示
function updateStats() {
    storyData.statsConfig.forEach(stat => {
        const statElement = document.getElementById(`stat-${stat.key}`);
        if (!statElement) return;
        
        if (stat.type === 'number') {
            statElement.textContent = gameState[stat.key] || 0;
        } else if (stat.type === 'traits') {
            const activeTraits = Object.entries(gameState[stat.key])
                .filter(([trait, active]) => active)
                .map(([trait]) => trait);
            statElement.textContent = activeTraits.length > 0 ? activeTraits.join(', ') : '无';
        }
    });
    
    console.log('当前游戏状态:', gameState);
}

// 重新开始游戏
function restartGame() {
    if (confirm('确定要重新开始游戏吗？所有进度将丢失。')) {
        initGame();
    }
}

// 返回主页
function goToHome() {
    window.location.href = '../../../index.html';
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);
