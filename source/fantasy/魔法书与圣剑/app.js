class FantasyStory {
    constructor() {
        this.storyNodes = new Map();
        this.currentNode = null;
        this.history = [];
        this.loaded = false;
        this.storyMetadata = null;
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadDatabase();
    }

    initializeElements() {
        this.startBtn = document.getElementById('start-btn');
        this.storyContent = document.getElementById('story-content');
        this.choicesContainer = document.getElementById('choices-container');
        this.navigationControls = document.getElementById('navigation-controls');
        this.restartBtn = document.getElementById('restart-btn');
        this.backBtn = document.getElementById('back-btn');
        this.storyTitle = document.getElementById('story-title');
        this.storyIntro = document.getElementById('story-intro');
    }

    attachEventListeners() {
        this.startBtn.addEventListener('click', () => this.startStory());
        this.restartBtn.addEventListener('click', () => this.restartStory());
        this.backBtn.addEventListener('click', () => this.goBack());
    }

    async loadDatabase() {
        try {
            const response = await fetch('story.json');
            const data = await response.json();
            
            this.storyMetadata = {
                name: data.name,
                storytitle: data.storytitle,
                version: data.version,
                description: data.description,
                genre: data.genre,
                author: data.author,
                intro: data.intro
            };
            
            data.nodes.forEach(node => {
                this.storyNodes.set(node.id, node);
            });
            
            this.loaded = true;
            console.log(`✅ 数据库加载完成: ${data.nodes.length}个节点`);
            console.log(`📖 故事标题: ${this.storyMetadata.storytitle}`);
            console.log(`✍️ 作者: ${this.storyMetadata.author}`);
            this.displayStoryTitle();
            this.typeWriterIntro();
            this.validateDatabase();
            
        } catch (error) {
            console.error('❌ 数据库加载失败:', error);
            this.storyContent.innerHTML = '<p>❌ 故事数据库加载失败，请检查story.json文件是否存在。</p>';
        }
    }

    displayStoryTitle() {
        if (this.storyMetadata && this.storyMetadata.storytitle) {
            let html = '';
            
            if (this.storyMetadata.name) {
                html += `<p class="story-name">${this.storyMetadata.name}</p>`;
            }
            
            html += `<h1>${this.storyMetadata.storytitle}</h1>`;
            
            if (this.storyMetadata.author) {
                html += `<p class="story-author">作者：${this.storyMetadata.author}</p>`;
            }
            
            this.storyTitle.innerHTML = html;
            document.title = this.storyMetadata.storytitle;
        }
        
        this.storyContent.innerHTML = '<p>请点击"打开书页"开始你的冒险之旅。</p>';
    }

    typeWriterIntro() {
        if (!this.storyMetadata || !this.storyMetadata.intro) {
            return;
        }

        const text = this.storyMetadata.intro;
        const typingSpeed = 30;
        let index = 0;

        this.storyIntro.innerHTML = '';

        const typeChar = () => {
            if (index < text.length) {
                this.storyIntro.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeChar, typingSpeed);
            } else {
                this.storyIntro.style.animation = 'none';
            }
        };

        setTimeout(typeChar, 500);
    }

    validateDatabase() {
        const issues = [];
        
        for (let [id, node] of this.storyNodes) {
            if (node.choices) {
                node.choices.forEach((choice, index) => {
                    if (!this.storyNodes.has(choice.next)) {
                        issues.push(`节点 ${id} 的选择 ${index} 指向不存在的节点 ${choice.next}`);
                    }
                });
            }
        }

        if (issues.length === 0) {
            console.log('✅ 数据库验证通过');
        } else {
            console.warn('⚠️ 数据库问题:', issues);
        }
    }

    getStartNode() {
        return this.storyNodes.get('fantasy_start');
    }

    getNode(nodeId) {
        return this.storyNodes.get(nodeId);
    }

    startStory() {
        if (!this.loaded) {
            alert('故事数据库正在加载中，请稍候...');
            return;
        }

        const startNode = this.getStartNode();
        if (!startNode) {
            alert('故事起始节点未找到');
            return;
        }

        this.history = [];
        this.storyTitle.style.display = 'none';
        this.storyIntro.style.display = 'none';
        this.showStoryNode(startNode);
        this.showNavigationControls();
        
        console.log('🚀 开始冒险');
    }

    showNavigationControls() {
        this.navigationControls.style.display = 'flex';
    }

    showStoryNode(node) {
        this.currentNode = node;
        this.history.push(node.id);
        
        this.storyContent.innerHTML = this.formatStoryContent(node.content);
        this.renderChoices(node.choices || []);
        this.updateNavigationButtons();
        
        // 滚动到页面顶部，确保内容可见
        window.scrollTo(0, 0);
        
        console.log(`📖 显示节点: ${node.id}`);
    }

    formatStoryContent(content) {
        return content.split('\n').map(paragraph => 
            `<p>${paragraph}</p>`
        ).join('');
    }

    renderChoices(choices) {
        this.choicesContainer.innerHTML = '';
        
        if (choices.length === 0) {
            const endMessage = document.createElement('div');
            endMessage.className = 'story-end';
            endMessage.innerHTML = '<p>🎉 故事结束！感谢你的阅读。</p>';
            this.choicesContainer.appendChild(endMessage);
            
            const restartButton = document.createElement('button');
            restartButton.className = 'choice-btn';
            restartButton.textContent = '重新开始';
            restartButton.addEventListener('click', () => this.restartStory());
            this.choicesContainer.appendChild(restartButton);
            return;
        }
        
        choices.forEach((choice, index) => {
            const choiceButton = document.createElement('button');
            choiceButton.className = 'choice-btn';
            choiceButton.textContent = choice.text;
            choiceButton.addEventListener('click', () => this.makeChoice(index));
            this.choicesContainer.appendChild(choiceButton);
        });
    }

    makeChoice(choiceIndex) {
        if (!this.currentNode || !this.currentNode.choices || choiceIndex >= this.currentNode.choices.length) {
            return;
        }

        const nextNodeId = this.currentNode.choices[choiceIndex].next;
        const nextNode = this.getNode(nextNodeId);
        
        if (nextNode) {
            this.showStoryNode(nextNode);
        } else {
            console.error('❌ 无法找到下一个节点:', nextNodeId);
        }
    }

    goBack() {
        if (this.history.length <= 1) return;
        
        this.history.pop();
        const previousNodeId = this.history[this.history.length - 1];
        const previousNode = this.getNode(previousNodeId);
        
        if (previousNode) {
            this.showStoryNode(previousNode);
        }
    }

    restartStory() {
        const startNode = this.getStartNode();
        if (startNode) {
            this.history = [];
            this.storyTitle.style.display = 'none';
            this.storyIntro.style.display = 'none';
            this.showStoryNode(startNode);
        }
    }

    updateNavigationButtons() {
        this.backBtn.disabled = this.history.length <= 1;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FantasyStory();
});