// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
  // ================ 原有背景处理逻辑 ================
  const banner = document.querySelector('#banner') || document.querySelector('.fluid-banner');
  let webBg = document.querySelector('#web_bg');
  const bannerMask = banner ? (banner.querySelector('.mask') || banner.querySelector('.banner-mask')) : null;

  // 动态创建web_bg（如果不存在）
  if (!webBg) {
    const newWebBg = document.createElement('div');
    newWebBg.id = 'web_bg';
    document.body.prepend(newWebBg);
    webBg = newWebBg;
    console.log('已自动创建#web_bg背景容器');
  }

  if (!banner) {
    console.error('未找到banner元素，请检查选择器');
    return;
  }

  // 应用banner背景到web_bg
  const computedBannerStyle = getComputedStyle(banner);
  const bannerBg = computedBannerStyle.backgroundImage;
  if (bannerBg && bannerBg !== 'none') {
    webBg.style.backgroundImage = bannerBg;
    webBg.style.position = 'fixed';
    webBg.style.width = '100%';
    webBg.style.height = '100%';
    webBg.style.zIndex = '-1';
    webBg.style.backgroundSize = 'cover';
    webBg.style.backgroundPosition = 'center';
    webBg.style.backgroundRepeat = 'no-repeat';
  } else {
    console.warn('banner未设置背景图');
  }

  // 清除banner自身背景和mask
  banner.style.backgroundImage = 'none';
  if (bannerMask) {
    bannerMask.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  }

  // ================ 鼠标点击特效 ================
  function createClickEffect(x, y) {
    // 创建点击特效元素
    const effect = document.createElement('div');
    effect.style.position = 'fixed';
    effect.style.left = `${x}px`;
    effect.style.top = `${y}px`;
    effect.style.transform = 'translate(-50%, -50%)';
    effect.style.width = '40px';
    effect.style.height = '40px';
    effect.style.borderRadius = '50%';
    effect.style.background = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 0.6)`;
    effect.style.pointerEvents = 'none'; // 不影响鼠标交互
    effect.style.zIndex = '9999'; // 确保显示在最上层
    effect.style.animation = 'clickEffect 0.6s ease-out forwards';
    
    // 添加到页面
    document.body.appendChild(effect);
    
    // 动画结束后移除元素
    setTimeout(() => {
      effect.remove();
    }, 600);
  }

  // 监听页面点击事件
  document.addEventListener('click', (e) => {
    createClickEffect(e.clientX, e.clientY);
  });

  // ================ 樱花飘落特效 ================
  function createCherryBlossom() {
    const blossom = document.createElement('div');
    
    // 随机样式
    const size = Math.random() * 10 + 5; // 5-15px
    const left = Math.random() * 100; // 0-100%
    const duration = Math.random() * 10 + 10; // 10-20秒
    const delay = Math.random() * 10; // 0-10秒延迟
    const opacity = Math.random() * 0.5 + 0.3; // 0.3-0.8透明度
    
    // 设置样式
    blossom.style.position = 'fixed';
    blossom.style.left = `${left}%`;
    blossom.style.top = `-${size}px`; // 从顶部外开始
    blossom.style.width = `${size}px`;
    blossom.style.height = `${size}px`;
    blossom.style.backgroundColor = '#ffccd5'; // 樱花粉色
    blossom.style.borderRadius = '80% 0 80% 0'; // 花瓣形状
    blossom.style.transform = `rotate(${Math.random() * 360}deg)`;
    blossom.style.opacity = opacity;
    blossom.style.pointerEvents = 'none';
    blossom.style.zIndex = '9998'; // 在点击特效下方
    blossom.style.animation = `fall ${duration}s linear ${delay}s forwards`;
    
    // 添加到页面
    document.body.appendChild(blossom);
    
    // 动画结束后移除
    setTimeout(() => {
      blossom.remove();
    }, (duration + delay) * 1000);
  }

  // 批量创建樱花（每300ms创建一个，共50个）
  let count = 0;
  const maxBlossoms = 50;
  const createInterval = setInterval(() => {
    if (count < maxBlossoms) {
      createCherryBlossom();
      count++;
    } else {
      clearInterval(createInterval);
    }
  }, 300);

  // ================ 特效动画样式 ================
  // 创建style标签添加动画
  const style = document.createElement('style');
  style.textContent = `
    @keyframes clickEffect {
      0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -50%) scale(1.5);
        opacity: 0;
      }
    }
    @keyframes fall {
      0% {
        transform: translateY(0) rotate(0deg);
      }
      100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});