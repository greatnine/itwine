// 游戏状态管理
let gameState = null;

// 多媒体管理
const mediaManager = {
    // 音频元素
    bgmAudio: null,
    sfxAudio: null,
    currentBGM: null,
    
    // 音量控制
    masterVolume: 0.7,
    bgmVolume: 0.5,
    sfxVolume: 0.7,
    isMuted: false,
    
    // 图片缓存
    imageCache: new Map(),
    
    // 初始化音频系统
    initAudio() {
        this.bgmAudio = document.getElementById('bgm-audio');
        this.sfxAudio = document.getElementById('sfx-audio');
        
        // 设置初始音量
        this.updateVolume();
        
        // 添加音频加载错误处理
        this.bgmAudio.addEventListener('error', (e) => {
            console.warn('BGM加载失败:', e);
        });
        
        this.sfxAudio.addEventListener('error', (e) => {
            console.warn('音效加载失败:', e);
        });
    },
    
    // 更新音量设置
    updateVolume() {
        if (this.bgmAudio) {
            this.bgmAudio.volume = this.isMuted ? 0 : this.masterVolume * this.bgmVolume;
        }
        if (this.sfxAudio) {
            this.sfxAudio.volume = this.isMuted ? 0 : this.masterVolume * this.sfxVolume;
        }
    },
    
    // 播放背景音乐
    playBGM(audioPath, loop = true) {
        if (!this.bgmAudio || !audioPath) return;
        
        // 如果是同一首BGM，不做处理
        if (this.currentBGM === audioPath && !this.bgmAudio.paused) {
            return;
        }
        
        this.currentBGM = audioPath;
        this.bgmAudio.src = audioPath;
        this.bgmAudio.loop = loop;
        this.bgmAudio.play().catch(e => {
            console.warn('BGM播放失败:', e);
        });
    },
    
    // 停止背景音乐
    stopBGM() {
        if (this.bgmAudio) {
            this.bgmAudio.pause();
            this.currentBGM = null;
        }
    },
    
    // 播放音效
    playSFX(audioPath) {
        if (!this.sfxAudio || !audioPath) return;
        
        // 停止当前播放的音效
        this.sfxAudio.pause();
        this.sfxAudio.currentTime = 0;
        
        // 播放新音效
        this.sfxAudio.src = audioPath;
        this.sfxAudio.play().catch(e => {
            console.warn('音效播放失败:', e);
        });
    },
    
    // 预加载图片
    preloadImage(src) {
        return new Promise((resolve, reject) => {
            // 如果已经缓存，直接返回
            if (this.imageCache.has(src)) {
                resolve(this.imageCache.get(src));
                return;
            }
            
            const img = new Image();
            img.onload = () => {
                this.imageCache.set(src, img);
                resolve(img);
            };
            img.onerror = () => {
                console.warn('图片预加载失败:', src);
                reject(new Error(`图片加载失败: ${src}`));
            };
            
            // 检测网络状况，如果是慢速网络则降低图片质量
            if (navigator.connection) {
                const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.effectiveType === '3g')) {
                    // 慢速网络时，优先加载小图
                    const lowQualitySrc = this.getLowQualityImageSrc(src);
                    img.src = lowQualitySrc;
                } else {
                    img.src = src;
                }
            } else {
                img.src = src;
            }
        });
    },
    
    // 获取低质量图片路径
    getLowQualityImageSrc(src) {
        // 如果图片路径包含参数，添加低质量参数
        if (src.includes('?')) {
            return src + '&quality=low';
        } else {
            return src + '?quality=low';
        }
    },
    
    // 批量预加载图片（优化移动设备）
    async preloadImages(srcList) {
        // 检测设备类型和网络状况
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isSlowNetwork = navigator.connection && (
            navigator.connection.effectiveType === 'slow-2g' || 
            navigator.connection.effectiveType === '2g' || 
            navigator.connection.effectiveType === '3g'
        );
        
        // 如果是移动设备或慢速网络，只预加载当前场景和下一场景的图片
        if (isMobile || isSlowNetwork) {
            const prioritySrcList = srcList.slice(0, 3); // 只预加载前3张图片
            const promises = prioritySrcList.map(src => this.preloadImage(src).catch(() => null));
            return Promise.all(promises);
        } else {
            // 桌面设备或快速网络，预加载所有图片
            const promises = srcList.map(src => this.preloadImage(src).catch(() => null));
            return Promise.all(promises);
        }
    }
};

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
    const endingDescription = document.getElementById('ending-description');
    endingList.innerHTML = '';
    
    const endings = getAllEndings();
    
    // 调试信息：显示检测到的结局数量
    console.log('检测到的结局数量:', endings.length);
    console.log('检测到的结局名称:', endings.map(e => e.name));
    console.log('所有场景数量:', Object.keys(storyData.scenes).length);
    
    if (endings.length === 0) {
        endingList.innerHTML = '<p>暂无结局信息</p>';
        endingDescription.style.display = 'none'; // 没有结局时隐藏
        return;
    }
    
    // 有结局时显示结局描述区域
    endingDescription.style.display = 'block';
    
    // 调试：检查实际显示的内容
    console.log('即将显示的结局数量:', endings.length);
    
    const endingListHTML = endings.map(ending => {
        // 提取纯文本内容（去除HTML标签）
        const cleanText = ending.text ? ending.text.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : '暂无描述';
        console.log('显示结局:', ending.name);
        
        // 为每个结局定义类型和图标
        const endingTypes = {
            'main_ending_1': { type: 'romantic', icon: '❤️' },
            'main_ending_2': { type: 'friendship', icon: '🤝' },
            'main_ending_3': { type: 'growth', icon: '🌱' },
            'main_ending_4': { type: 'regret', icon: '💔' }
        };
        
        // 获取类型信息，如果没有匹配则根据故事数据中的endingTypes配置或默认值
        const typeInfo = endingTypes[ending.name] || {
            type: 'unknown',
            icon: storyData.endingTypes?.unknown?.icon || '✨'
        };
        
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
    
    // 如果是结局场景，只启用结局按钮，不显示结局信息（故事文本里已有交待）
    if (isEndingScene(scene, sceneName)) {
        // 启用结局按钮
        const endingsButton = document.getElementById('ending-toggle');
        endingsButton.classList.add('enabled');
        endingsButton.disabled = false;
    }
}

// 初始化游戏
function initGame() {
    // 初始化多媒体系统
    mediaManager.initAudio();
    
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
        // 默认将状态值视为数字类型，或根据是否有initial值判断
        if (typeof storyData.initialState[stat.key] === 'number' || stat.initial !== undefined) {
            gameState[stat.key] = storyData.initialState[stat.key] || stat.initial || 0;
        } else if (typeof storyData.initialState[stat.key] === 'object') {
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
    
    // 预加载多媒体资源
    preloadStoryMedia();
    
    // 播放默认背景音乐
    mediaManager.playBGM('sound/music.mp3');
    
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

    // 加载场景多媒体资源
    loadSceneMedia(scene);
    
    // 检查是否是结局场景，如果是则在页脚显示玩家结局
    checkAndShowPlayerEnding(sceneName, scene);
    
    // 如果加载的是初始场景（start），禁用结局按钮以保持神秘感
    if (sceneName === 'start') {
        const endingsButton = document.getElementById('ending-toggle');
        endingsButton.classList.remove('enabled');
        endingsButton.disabled = true;
    }

    // 显示场景内容
    document.getElementById('story-content').innerHTML = scene.text || '<p>场景内容加载中...</p>';
    
    // 滚动到顶部，确保显示页头而不是选择项
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    // 显示选择项
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';

    if (scene.choices && scene.choices.length > 0) {
        scene.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            
            // 添加选择项图标（如果有）
            if (choice.icon) {
                button.innerHTML = `<span class="choice-icon">${choice.icon}</span>${choice.text}`;
            } else {
                button.innerHTML = choice.text;
            }
            
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
    
    // 播放选择音效（如果有）
    if (choice.sfx) {
        mediaManager.playSFX(choice.sfx);
    } else {
        // 默认选择音效
        mediaManager.playSFX('audio/click.mp3');
    }
    
    // 应用效果
    if (choice.effects) {
        storyData.statsConfig.forEach(stat => {
            console.log(`检查特征值: ${stat.key}`);
            if (choice.effects[stat.key]) {
                console.log(`发现效果: ${stat.key} =`, choice.effects[stat.key]);
                // 根据实际数据类型应用效果
                if (typeof gameState[stat.key] === 'number') {
                    gameState[stat.key] += choice.effects[stat.key];
                    console.log(`${stat.label}变化:`, gameState[stat.key]);
                } else if (typeof gameState[stat.key] === 'object') {
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
        
        // 根据实际数据类型更新状态值
        if (typeof gameState[stat.key] === 'number') {
            statElement.textContent = gameState[stat.key] || 0;
        } else if (typeof gameState[stat.key] === 'object') {
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

// 音频控制函数
function toggleBGM() {
    const bgmToggle = document.getElementById('bgm-toggle');
    const bgmAudio = mediaManager.bgmAudio;
    
    // 检查当前音频状态
    if (bgmAudio.paused) {
        // 如果暂停或停止，则播放
        mediaManager.isMuted = false;
        bgmAudio.play().catch(e => {
            console.warn('BGM播放失败:', e);
        });
        bgmToggle.classList.remove('muted');
        bgmToggle.querySelector('.audio-icon').textContent = '🎵';
    } else {
        // 如果正在播放，则暂停
        bgmAudio.pause();
        bgmToggle.classList.add('muted');
        bgmToggle.querySelector('.audio-icon').textContent = '🔇';
    }
    
    // 更新音量设置
    mediaManager.updateVolume();
}

function changeVolume(value) {
    mediaManager.masterVolume = value / 100;
    mediaManager.updateVolume();
}

// 多媒体加载函数
function loadSceneMedia(scene) {
    // 加载背景图片
    const backgroundImage = document.getElementById('background-image');
    const sceneBackground = document.getElementById('scene-background');
    const characterContainer = document.getElementById('character-container');
    const sceneImageContainer = document.getElementById('scene-image-container');
    
    // 重置容器内容
    characterContainer.innerHTML = '';
    
    // 处理背景图片
    if (scene.background && scene.background.trim() !== '') {
        // 有背景图片时显示图片容器
        sceneImageContainer.style.display = 'flex';
        
        mediaManager.preloadImage(scene.background).then(img => {
            backgroundImage.src = scene.background;
            backgroundImage.style.display = 'block';
            backgroundImage.style.opacity = '0';
            
            // 设置容器高度，确保不超出范围
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            const containerWidth = sceneImageContainer.offsetWidth;
            const calculatedHeight = containerWidth / aspectRatio;
            
            // 限制高度在合理范围内
            const maxHeight = Math.min(calculatedHeight, 400);
            sceneImageContainer.style.height = maxHeight + 'px';
            sceneBackground.style.height = maxHeight + 'px';
            
            // 淡入效果
            setTimeout(() => {
                backgroundImage.style.opacity = '1';
            }, 100);
        }).catch(() => {
            backgroundImage.style.display = 'none';
            // 如果图片加载失败，隐藏图片容器
            sceneImageContainer.style.display = 'none';
        });
    } else {
        // 没有背景图片时完全隐藏图片容器
        backgroundImage.style.display = 'none';
        sceneImageContainer.style.display = 'none';
    }
    
    // 处理角色立绘
    if (scene.characters && Array.isArray(scene.characters)) {
        scene.characters.forEach(character => {
            mediaManager.preloadImage(character.image).then(img => {
                const characterDiv = document.createElement('div');
                characterDiv.className = 'character-image';
                characterDiv.style.animationDelay = character.animationDelay || '0s';
                
                const characterImg = document.createElement('img');
                characterImg.src = character.image;
                characterImg.alt = character.name || '角色';
                characterImg.style.maxHeight = character.maxHeight || '180px';
                
                characterDiv.appendChild(characterImg);
                characterContainer.appendChild(characterDiv);
            }).catch(() => {
                console.warn('角色立绘加载失败:', character.image);
            });
        });
    }
    
    // 处理音频
    if (scene.bgm) {
        mediaManager.playBGM(scene.bgm);
    }
    
    // 播放场景音效
    if (scene.sceneSFX) {
        mediaManager.playSFX(scene.sceneSFX);
    }
}

// 预加载故事中的所有多媒体资源
function preloadStoryMedia() {
    const imageList = [];
    const audioList = [];
    
    // 收集所有图片资源
    Object.values(storyData.scenes).forEach(scene => {
        if (scene.background) {
            imageList.push(scene.background);
        }
        
        if (scene.characters && Array.isArray(scene.characters)) {
            scene.characters.forEach(character => {
                if (character.image) {
                    imageList.push(character.image);
                }
            });
        }
    });
    
    // 预加载所有图片
    mediaManager.preloadImages(imageList).then(() => {
        console.log('所有图片预加载完成');
    }).catch(error => {
        console.warn('图片预加载过程中出现错误:', error);
    });
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);
