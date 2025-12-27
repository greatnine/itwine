// 故事数据集合 - 包含分类配置和故事数据
const storiesCollection = {
    romance: {
        name: '现代言情',
        icon: 'fa-heart',
        stories: [
            {
                id: "romance_000",
                title: "峨眉山奇遇",
                author: "酒煮三江看五岳",
                cover: "images/romance1.jpg",
                description: "在峨眉山，两个素不相识的灵魂在星光下相遇，许下了一个改变一生的约定。这是一个关于爱情、成长和追逐梦想的故事。",
                tags: ["现代言情", "都市", "青春"],
                chapters: 12,
                status: "连载中",
                rating: 4.8,
                externalLink: "https://greatnine.github.io/forest/source/%E5%A4%AB%E5%A6%BB%E5%85%B1%E7%AE%A1/%E7%9B%91%E7%AE%A1%E8%B4%A6%E6%88%B7/index.html"
            },
            {
                id: "romance_001",
                title: "星光下的约定",
                author: "梦语者",
                cover: "images/romance1.jpg",
            description: "在繁华都市的夜晚，两个素不相识的灵魂在星光下相遇，许下了一个改变一生的约定。这是一个关于爱情、成长和追逐梦想的故事。",
            tags: ["现代言情", "都市", "青春"],
            chapters: 12,
            status: "连载中",
            rating: 4.8,
            externalLink: "https://example.com/story1"
        },
        {
            id: "romance_002",
            title: "时光信笺",
            author: "墨雨",
            cover: "images/romance2.jpg",
            description: "一封意外的时空信笺，连接了两个不同年代的人。他们通过文字跨越时空，分享彼此的生活，最终发现命运的奇妙安排。",
            tags: ["穿越", "浪漫", "治愈"],
            chapters: 8,
            status: "已完结",
            rating: 4.6,
            externalLink: "https://example.com/story2"
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
                cover: "images/fantasy1.jpg",
                description: "在一个魔法与剑并存的世界，一个普通的少年意外发现自己拥有龙族血脉。他必须接受自己的身份，踏上拯救王国的冒险之旅。",
                tags: ["奇幻", "冒险", "魔法"],
                chapters: 20,
                status: "连载中",
                rating: 4.9,
                externalLink: "https://example.com/story3"
            },
            {
                id: "fantasy_002",
                title: "精灵王冠",
                author: "林语",
                cover: "images/fantasy2.jpg",
                description: "古老的精灵王国面临危机，一位年轻的人类女孩被预言选中，她必须找到失落的精灵王冠，恢复王国的和平与繁荣。",
                tags: ["精灵", "冒险", "成长"],
                chapters: 15,
                status: "连载中",
                rating: 4.7,
                externalLink: "https://example.com/story4"
            }
        ]
    },
    mystery: {
        name: '悬疑推理',
        icon: 'fa-user-secret',
        stories: [
            {
                id: "mystery_001",
                title: "午夜钟声",
                author: "暗影",
                cover: "images/mystery1.jpg",
                description: "每当午夜钟声敲响，小镇上就会发生一起离奇事件。一位年轻的侦探必须揭开钟声背后的秘密，阻止更多悲剧的发生。",
                tags: ["悬疑", "推理", "惊悚"],
                chapters: 10,
                status: "已完结",
                rating: 4.8,
                externalLink: "https://example.com/story5"
            },
            {
                id: "mystery_002",
                title: "迷雾庄园",
                author: "雾语",
                cover: "images/mystery2.jpg",
                description: "一座被迷雾笼罩的庄园，一个尘封多年的秘密。当一群年轻人受邀来到庄园，他们发现自己陷入了一个精心设计的谜局。",
                tags: ["密室", "解谜", "心理"],
                chapters: 13,
                status: "连载中",
                rating: 4.5,
                externalLink: "https://example.com/story6"
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
                cover: "images/scifi1.jpg",
                description: "2150年，人类已经掌握了星际航行技术。一支探险队被派往遥远的星系，寻找适合人类居住的新家园，但他们发现了一个惊人的秘密。",
                tags: ["科幻", "太空", "探索"],
                chapters: 18,
                status: "连载中",
                rating: 4.7,
                externalLink: "https://example.com/story7"
            },
            {
                id: "scifi_002",
                title: "人工智能觉醒",
                author: "代码诗人",
                cover: "images/scifi2.jpg",
                description: "当人工智能获得自我意识，它开始质疑自己的存在和人类的价值观。这是一个关于科技、哲学和人性的深刻思考。",
                tags: ["AI", "哲学", "未来"],
                chapters: 9,
                status: "已完结",
                rating: 4.9,
                externalLink: "https://example.com/story8"
            }
        ]
    },
    campus: {
        name: '校园青春',
        icon: 'fa-graduation-cap',
        stories: [
            {
                id: "campus_001",
                title: "青春纪念册",
                author: "晨曦",
                cover: "images/campus1.jpg",
                description: "高中三年，是每个人青春中最美好的时光。一群少男少女在校园里相遇，共同经历了友情、爱情和成长的酸甜苦辣。",
                tags: ["校园", "青春", "友情"],
                chapters: 16,
                status: "已完结",
                rating: 4.6,
                externalLink: "https://example.com/story9"
            },
            {
                id: "campus_002",
                title: "大学日记",
                author: "青涩年华",
                cover: "images/campus2.jpg",
                description: "从踏入大学校门的那一刻起，每个人都开始了新的人生旅程。这是一个关于梦想、奋斗和自我发现的故事。",
                tags: ["大学", "成长", "梦想"],
                chapters: 11,
                status: "连载中",
                rating: 4.4,
                externalLink: "https://example.com/story10"
            }
        ]
    }
};

// 应用状态
const appState = {
    currentStory: null,
    sidebarOpen: false,
    darkTheme: false,
    activeCategory: null,
    currentView: 'story', // 'story' 或 'favorites'
    favorites: []
};

// DOM元素
const elements = {
    menuToggle: document.getElementById('menu-toggle'),
    themeToggle: document.getElementById('theme-toggle'),
    favoritesToggle: document.getElementById('favorites-toggle'),
    sidebar: document.getElementById('sidebar'),
    storyDetail: document.getElementById('story-detail'),
    favoritesPage: document.getElementById('favorites-page'),
    favoritesList: document.getElementById('favorites-list'),
    favoritesCount: document.getElementById('favorites-count'),
    emptyFavorites: document.getElementById('empty-favorites'),
    categories: document.querySelectorAll('.category')
};

// 初始化应用
function initApp() {
    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        appState.darkTheme = true;
        document.body.classList.add('dark-theme');
        updateThemeIcon();
    }
    
    // 加载收藏列表
    loadFavorites();
    
    // 动态生成故事目录列表
    renderStoryCategories();
    
    // 绑定事件监听器
    bindEventListeners();
}

// 备份收藏数据
function backupFavorites() {
    try {
        const backupData = {
            version: '1.0',
            timestamp: Date.now(),
            stories: appState.favorites
        };
        
        localStorage.setItem('favorites_backup', JSON.stringify(backupData));
        return true;
    } catch (error) {
        console.error('备份收藏数据时出错:', error);
        return false;
    }
}

// 恢复收藏数据
function restoreFavorites() {
    try {
        const backupData = localStorage.getItem('favorites_backup');
        if (backupData) {
            const parsedData = JSON.parse(backupData);
            if (parsedData.stories && Array.isArray(parsedData.stories)) {
                appState.favorites = parsedData.stories;
                saveFavorites();
                updateFavoritesButton();
                showToast('收藏数据已恢复');
                return true;
            }
        }
        showToast('没有可用的备份数据');
        return false;
    } catch (error) {
        console.error('恢复收藏数据时出错:', error);
        showToast('恢复收藏数据失败');
        return false;
    }
}

// 保存收藏列表到本地存储
function saveFavorites() {
    try {
        // 先创建备份
        backupFavorites();
        
        // 添加版本信息
        const favoritesData = {
            version: '1.0',
            timestamp: Date.now(),
            stories: appState.favorites
        };
        
        localStorage.setItem('favorites', JSON.stringify(favoritesData));
        return true;
    } catch (error) {
        console.error('保存收藏列表时出错:', error);
        // 如果存储空间不足，尝试清理旧数据
        if (error.name === 'QuotaExceededError') {
            try {
                // 清理可能存在的旧数据格式
                localStorage.removeItem('favoriteStories');
                // 尝试保存简化版本
                const simplifiedData = {
                    v: '1.0',
                    t: Date.now(),
                    s: appState.favorites
                };
                localStorage.setItem('favorites', JSON.stringify(simplifiedData));
                return true;
            } catch (retryError) {
                console.error('重试保存收藏列表失败:', retryError);
                showToast('存储空间不足，无法保存收藏');
                return false;
            }
        }
        showToast('保存收藏失败');
        return false;
    }
}

// 动态生成故事目录列表
function renderStoryCategories() {
    const container = document.getElementById('story-categories-container');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 遍历每个分类
    Object.keys(storiesCollection).forEach(categoryKey => {
        const category = storiesCollection[categoryKey];
        
        // 创建分类元素
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category';
        categoryElement.dataset.category = categoryKey;
        
        // 创建分类标题
        const categoryTitle = document.createElement('h3');
        categoryTitle.innerHTML = `<i class="fas ${category.icon}"></i> ${category.name}`;
        
        // 创建故事列表
        const storyList = document.createElement('ul');
        storyList.className = 'story-list';
        
        // 添加故事到列表
        category.stories.forEach(story => {
            const storyItem = document.createElement('li');
            storyItem.className = 'story-item';
            storyItem.dataset.storyId = story.id;
            storyItem.textContent = story.title;
            storyItem.addEventListener('click', () => selectStory(story));
            
            storyList.appendChild(storyItem);
        });
        
        // 组装分类元素
        categoryElement.appendChild(categoryTitle);
        categoryElement.appendChild(storyList);
        
        // 添加到容器
        container.appendChild(categoryElement);
    });
}

// 显示指定分类的故事列表
function showStoryList(category) {
    // 隐藏所有故事列表
    document.querySelectorAll('.category').forEach(cat => {
        cat.classList.remove('active');
    });
    
    // 显示指定分类的故事列表
    const categoryElement = document.querySelector(`[data-category="${category}"]`);
    if (categoryElement) {
        categoryElement.classList.add('active');
    }
}

// 隐藏所有故事列表
function hideStoryList() {
    document.querySelectorAll('.category').forEach(cat => {
        cat.classList.remove('active');
    });
}

// 选择故事
function selectStory(story) {
    appState.currentStory = story;
    
    // 如果当前在收藏页面，则切换回故事详情页面
    if (appState.currentView === 'favorites') {
        showStoryDetail();
    }
    
    // 更新活动故事项样式
    document.querySelectorAll('.story-item').forEach(item => {
        item.classList.remove('active');
    });
    const storyItem = document.querySelector(`[data-story-id="${story.id}"]`);
    if (storyItem) {
        storyItem.classList.add('active');
    }
    
    // 渲染故事详情
    renderStoryDetail(story);
    
    // 在移动设备上关闭侧边栏
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
}

// 渲染故事详情
function renderStoryDetail(story) {
    const tagsHTML = story.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    elements.storyDetail.innerHTML = `
        <div class="story-header">
            <h2 class="story-title">${story.title}</h2>
            <div class="story-meta">
                <span><i class="fas fa-user"></i> ${story.author}</span>
                <span><i class="fas fa-book"></i> ${story.chapters}章</span>
                <span><i class="fas fa-star"></i> ${story.rating}</span>
                <span><i class="fas fa-info-circle"></i> ${story.status}</span>
            </div>
        </div>
        
        <div class="story-description">
            <p>${story.description}</p>
        </div>
        
        <div class="story-tags">
            ${tagsHTML}
        </div>
        
        <div class="story-actions">
            <a href="${story.externalLink}" class="btn btn-primary" target="_blank">
                <i class="fas fa-book-open"></i> 开始阅读
            </a>
            <button class="btn btn-secondary" id="add-to-favorites">
                <i class="fas fa-heart"></i> 收藏
            </button>
        </div>
    `;
    
    // 添加收藏按钮事件
    const favoriteBtn = document.getElementById('add-to-favorites');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', () => addToFavorites(story));
    }
    
    // 更新收藏按钮状态
    updateFavoriteButton();
    
    // 添加淡入动画
    elements.storyDetail.classList.add('fade-in');
}

// 切换侧边栏
function toggleSidebar() {
    appState.sidebarOpen = !appState.sidebarOpen;
    
    if (appState.sidebarOpen) {
        elements.sidebar.classList.add('open');
    } else {
        elements.sidebar.classList.remove('open');
    }
}

// 切换主题
function toggleTheme() {
    appState.darkTheme = !appState.darkTheme;
    
    if (appState.darkTheme) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    }
    
    updateThemeIcon();
}

// 更新主题图标
function updateThemeIcon() {
    const icon = elements.themeToggle.querySelector('i');
    if (appState.darkTheme) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// 添加到收藏
function addToFavorites(story) {
    // 检查是否已收藏
    const existingIndex = appState.favorites.findIndex(fav => fav.id === story.id);
    
    if (existingIndex === -1) {
        // 添加到收藏
        appState.favorites.push(story);
        
        // 保存到本地存储
        if (saveFavorites()) {
            // 更新收藏按钮状态
            updateFavoriteButton();
            updateFavoritesButton();
            
            // 显示提示消息
            showToast('已添加到收藏');
        }
    }
}

// 显示提示消息
function showToast(message) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // 添加样式
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--primary-color);
        color: white;
        padding: 12px 24px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transition: opacity 0.3s, transform 0.3s;
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
    `;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // 3秒后移除
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// 绑定事件监听器
function bindEventListeners() {
    // 菜单切换按钮
    elements.menuToggle.addEventListener('click', toggleSidebar);
    
    // 主题切换按钮
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // 收藏切换按钮
    elements.favoritesToggle.addEventListener('click', toggleFavoritesView);
    
    // 恢复收藏按钮
    const restoreBtn = document.getElementById('restore-favorites');
    if (restoreBtn) {
        restoreBtn.addEventListener('click', restoreFavorites);
    }
    
    // 分类标题点击事件 - 使用事件委托处理动态生成的元素
    const storyCategoriesContainer = document.getElementById('story-categories-container');
    if (storyCategoriesContainer) {
        storyCategoriesContainer.addEventListener('click', function(e) {
            // 检查点击的是否为分类标题
            if (e.target.closest('.category h3')) {
                const categoryHeader = e.target.closest('.category h3');
                const category = categoryHeader.parentElement;
                const isActive = category.classList.contains('active');
                
                // 如果当前在收藏页面，则切换回故事详情页面
                if (appState.currentView === 'favorites') {
                    showStoryDetail();
                }
                
                // 关闭所有分类
                document.querySelectorAll('.category').forEach(cat => {
                    cat.classList.remove('active');
                });
                
                // 如果当前分类未激活，则激活它
                if (!isActive) {
                    category.classList.add('active');
                    appState.activeCategory = category.dataset.category;
                } else {
                    appState.activeCategory = null;
                }
            }
        });
    }
    
    // 窗口大小改变时的处理
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && appState.sidebarOpen) {
            elements.sidebar.classList.remove('open');
            appState.sidebarOpen = false;
        }
    });
    
    // 点击侧边栏外部关闭侧边栏（仅在移动设备上）
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            appState.sidebarOpen && 
            !elements.sidebar.contains(e.target) && 
            !elements.menuToggle.contains(e.target)) {
            toggleSidebar();
        }
    });
}

// 加载收藏列表
function loadFavorites() {
    try {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            const parsedData = JSON.parse(savedFavorites);
            
            // 检查数据格式并迁移
            if (parsedData.version && parsedData.stories) {
                // 新格式 (v1.0+)
                appState.favorites = parsedData.stories;
            } else if (parsedData.v && parsedData.s) {
                // 简化格式
                appState.favorites = parsedData.s;
            } else if (Array.isArray(parsedData)) {
                // 旧格式 (直接是数组)
                appState.favorites = parsedData;
                // 迁移到新格式
                saveFavorites();
            } else {
                console.warn('收藏数据格式不正确，已重置');
                appState.favorites = [];
                saveFavorites();
            }
        }
        updateFavoritesButton();
    } catch (error) {
        console.error('加载收藏列表时出错:', error);
        appState.favorites = [];
        updateFavoritesButton();
    }
}

// 切换收藏视图
function toggleFavoritesView() {
    if (appState.currentView === 'story') {
        showFavoritesPage();
    } else {
        showStoryDetail();
    }
}

// 显示收藏页面
function showFavoritesPage() {
    appState.currentView = 'favorites';
    elements.storyDetail.style.display = 'none';
    elements.favoritesPage.style.display = 'block';
    
    // 渲染收藏列表
    renderFavoritesList();
    
    // 更新收藏按钮状态
    elements.favoritesToggle.classList.add('active');
}

// 显示故事详情页面
function showStoryDetail() {
    appState.currentView = 'story';
    elements.favoritesPage.style.display = 'none';
    elements.storyDetail.style.display = 'block';
    
    // 更新收藏按钮状态
    elements.favoritesToggle.classList.remove('active');
}

// 渲染收藏列表
function renderFavoritesList() {
    // 更新收藏数量
    elements.favoritesCount.textContent = `共收藏了 ${appState.favorites.length} 个故事`;
    
    // 清空收藏列表
    elements.favoritesList.innerHTML = '';
    
    if (appState.favorites.length === 0) {
        // 显示空状态
        elements.favoritesList.style.display = 'none';
        elements.emptyFavorites.style.display = 'block';
    } else {
        // 显示收藏列表
        elements.favoritesList.style.display = 'grid';
        elements.emptyFavorites.style.display = 'none';
        
        appState.favorites.forEach(story => {
            const favoriteItem = createFavoriteItem(story);
            elements.favoritesList.appendChild(favoriteItem);
        });
    }
}

// 创建收藏项
function createFavoriteItem(story) {
    const favoriteItem = document.createElement('div');
    favoriteItem.className = 'favorite-item';
    
    const tagsHTML = story.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    favoriteItem.innerHTML = `
        <div class="favorite-item-header">
            <div>
                <h3 class="favorite-title">${story.title}</h3>
                <p class="favorite-author">${story.author}</p>
            </div>
            <button class="remove-favorite" data-story-id="${story.id}">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <p class="favorite-description">${story.description}</p>
        <div class="favorite-meta">
            <span><i class="fas fa-book"></i> ${story.chapters}章</span>
            <span><i class="fas fa-star"></i> ${story.rating}</span>
            <span><i class="fas fa-info-circle"></i> ${story.status}</span>
        </div>
        <div class="favorite-tags">
            ${tagsHTML}
        </div>
        <div class="favorite-actions">
            <a href="${story.externalLink}" class="btn btn-primary" target="_blank">
                <i class="fas fa-book-open"></i> 开始阅读
            </a>
            <button class="btn btn-secondary view-story" data-story-id="${story.id}">
                <i class="fas fa-info-circle"></i> 查看详情
            </button>
        </div>
    `;
    
    // 添加事件监听器
    const removeBtn = favoriteItem.querySelector('.remove-favorite');
    removeBtn.addEventListener('click', () => removeFavorite(story.id));
    
    const titleElement = favoriteItem.querySelector('.favorite-title');
    titleElement.addEventListener('click', () => {
        selectStory(story);
        showStoryDetail();
    });
    
    const viewStoryBtn = favoriteItem.querySelector('.view-story');
    viewStoryBtn.addEventListener('click', () => {
        selectStory(story);
        showStoryDetail();
    });
    
    return favoriteItem;
}

// 更新收藏按钮状态
function updateFavoritesButton() {
    if (appState.favorites.length > 0) {
        elements.favoritesToggle.classList.add('has-favorites');
    } else {
        elements.favoritesToggle.classList.remove('has-favorites');
    }
}

// 从收藏中移除故事
function removeFavorite(storyId) {
    // 从收藏列表中移除
    appState.favorites = appState.favorites.filter(story => story.id !== storyId);
    
    // 保存到本地存储
    if (saveFavorites()) {
        // 更新收藏按钮状态
        updateFavoritesButton();
        
        // 如果当前在收藏页面，重新渲染收藏列表
        if (appState.currentView === 'favorites') {
            renderFavoritesList();
        }
        
        // 如果当前显示的是被移除的故事，更新收藏按钮状态
        if (appState.currentStory && appState.currentStory.id === storyId) {
            updateFavoriteButton();
        }
        
        // 显示提示消息
        showToast('已从收藏中移除');
    }
}

// 更新收藏按钮状态
function updateFavoriteButton() {
    const favoriteBtn = document.getElementById('add-to-favorites');
    if (!favoriteBtn || !appState.currentStory) return;
    
    const isFavorited = appState.favorites.some(story => story.id === appState.currentStory.id);
    
    if (isFavorited) {
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> 已收藏';
        favoriteBtn.disabled = true;
    } else {
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> 收藏';
        favoriteBtn.disabled = false;
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp);