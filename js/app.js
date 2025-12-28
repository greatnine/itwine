// 引入故事数据
// 注意：storiesCollection 在 storydata.js 中定义

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
    
    // 显示欢迎消息和推荐区域
    backToHome();
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
    const tagsHTML = story.tags.split(',').map(tag => `<span class="tag">${tag.trim()}</span>`).join('');
    
    elements.storyDetail.innerHTML = `
        <div class="story-header">
            <h2 class="story-title">${story.title}</h2>
            <div class="story-meta">
                <span><i class="fas fa-user"></i> ${story.author}</span>
                <span><i class="fas fa-tags"></i> ${tagsHTML}</span>
                <span><i class="fas fa-info-circle"></i> ${story.status}</span>
            </div>
        </div>
        
        <div class="story-cover-container">
            <img src="${story.externalLink.substring(0, story.externalLink.lastIndexOf('/')) + '/images/cover.jpg'}" alt="${story.title}" onerror="this.src='images/cover.jpg'">
        </div>
        
        <div class="story-description">
            <p>${story.description}</p>
        </div>
        
        <div class="story-actions">
            <a href="${story.externalLink}" class="btn btn-primary">
                <i class="fas fa-book-open"></i> 开始阅读
            </a>
            <button class="btn btn-secondary" id="add-to-favorites">
                <i class="fas fa-heart"></i> 收藏
            </button>
            <button class="btn btn-secondary" id="back-to-home">
                <i class="fas fa-home"></i> 返回主页
            </button>
        </div>
    `;
    
    // 添加收藏按钮事件
    const favoriteBtn = document.getElementById('add-to-favorites');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', () => addToFavorites(story));
        // 添加触摸事件支持，确保在移动设备上正常工作
        favoriteBtn.addEventListener('touchend', (e) => {
            e.preventDefault(); // 防止触摸事件触发两次点击
            addToFavorites(story);
        });
    }
    
    // 添加返回主页按钮事件
    const backToHomeBtn = document.getElementById('back-to-home');
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', backToHome);
        // 添加触摸事件支持，确保在移动设备上正常工作
        backToHomeBtn.addEventListener('touchend', (e) => {
            e.preventDefault(); // 防止触摸事件触发两次点击
            backToHome();
        });
    }
    
    // 更新收藏按钮状态
    updateFavoriteButton();
    
    // 添加淡入动画
    elements.storyDetail.classList.add('fade-in');
}

// 获取随机名人论断
function getRandomQuote() {
    if (!readingQuotes || readingQuotes.length === 0) {
        return null;
    }
    
    const randomIndex = Math.floor(Math.random() * readingQuotes.length);
    return readingQuotes[randomIndex];
}

// 渲染推荐区域
function renderRecommendations() {
    let recommendationsHTML = '<div class="recommendations-section">';
    recommendationsHTML += '<h2 class="recommendations-title">特别推荐</h2>';
    
    // 遍历每个分类
    Object.keys(storiesCollection).forEach(categoryKey => {
        const category = storiesCollection[categoryKey];
        const recommendedStories = category.stories.filter(story => story.isRecommended);
        
        // 如果该分类有推荐的故事，则显示该分类
        if (recommendedStories.length > 0) {
            // 添加推荐的故事，每个故事一行
            recommendedStories.forEach(story => {
                recommendationsHTML += `
                    <div class="recommendation-single-line" data-story-id="${story.id}">
                        <span class="category-name">${category.name}</span>
                        <span class="category-separator"><i class="fas ${category.icon}"></i></span>
                        <span class="story-title">${story.title}</span>
                        <span class="author-name">——${story.author}。</span>
                        <span class="recommend-reason">${story.recommendReason}</span>
                        <span class="detail-hint">（点击请看详情）</span>
                    </div>
                `;
            });
        }
    });
    
    recommendationsHTML += '</div>';
    
    return recommendationsHTML;
}

// 返回主页
function backToHome() {
    // 重置当前故事
    appState.currentStory = null;
    
    // 重置活动分类
    appState.activeCategory = null;
    document.querySelectorAll('.category').forEach(cat => {
        cat.classList.remove('active');
    });
    
    // 重置活动故事项
    document.querySelectorAll('.story-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // 显示欢迎消息和推荐区域
    elements.storyDetail.innerHTML = `
        <div class="welcome-message">
            <i class="fas fa-book-open"></i>
            <h2>欢迎来到互动小说集</h2>
            <p>请从左侧目录选择一个故事开始阅读<br>(点击左上角目录图标展开目录)</p>
        </div>
    `;
    
    // 添加名人论断
    const randomQuote = getRandomQuote();
    if (randomQuote) {
        const quoteHTML = `
            <div class="reading-quote">
                <div class="quote-content">
                    <p>${randomQuote.content}</p>
                    <div class="quote-author">—— ${randomQuote.author}（${randomQuote.title}）</div>
                </div>
            </div>
        `;
        elements.storyDetail.innerHTML += quoteHTML;
    }
    
    // 添加推荐区域
    elements.storyDetail.innerHTML += renderRecommendations();
    
    // 为推荐区域添加点击事件
    document.querySelectorAll('.recommendation-single-line').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const storyId = item.getAttribute('data-story-id');
            
            // 在所有分类中查找故事
            let foundStory = null;
            Object.keys(storiesCollection).forEach(categoryKey => {
                const category = storiesCollection[categoryKey];
                const story = category.stories.find(s => s.id === storyId);
                if (story) {
                    foundStory = story;
                }
            });
            
            if (foundStory) {
                selectStory(foundStory);
            }
        });
    });
    
    // 如果当前在收藏页面，则切换回故事详情页面
    if (appState.currentView === 'favorites') {
        showStoryDetail();
    }
    
    // 在移动设备上关闭侧边栏
    if (window.innerWidth <= 768) {
        if (appState.sidebarOpen) {
            toggleSidebar();
        }
    }
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
            
            // 如果当前在收藏页面，重新渲染收藏列表
            if (appState.currentView === 'favorites') {
                renderFavoritesList();
            }
            
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
    
    const tagsHTML = story.tags.split(',').map(tag => `<span class="tag">${tag.trim()}</span>`).join('');
    
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
            <span><i class="fas fa-tags"></i> ${tagsHTML}</span>
            <span><i class="fas fa-info-circle"></i> ${story.status}</span>
        </div>
        <div class="favorite-actions">
            <a href="${story.externalLink}" class="btn btn-primary">
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
    // 添加触摸事件支持，确保在移动设备上正常工作
    removeBtn.addEventListener('touchend', (e) => {
        e.preventDefault(); // 防止触摸事件触发两次点击
        removeFavorite(story.id);
    });
    
    const titleElement = favoriteItem.querySelector('.favorite-title');
    titleElement.addEventListener('click', () => {
        selectStory(story);
        showStoryDetail();
    });
    // 添加触摸事件支持，确保在移动设备上正常工作
    titleElement.addEventListener('touchend', (e) => {
        e.preventDefault(); // 防止触摸事件触发两次点击
        selectStory(story);
        showStoryDetail();
    });
    
    const viewStoryBtn = favoriteItem.querySelector('.view-story');
    viewStoryBtn.addEventListener('click', () => {
        selectStory(story);
        showStoryDetail();
    });
    // 添加触摸事件支持，确保在移动设备上正常工作
    viewStoryBtn.addEventListener('touchend', (e) => {
        e.preventDefault(); // 防止触摸事件触发两次点击
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