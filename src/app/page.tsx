import Image from 'next/image';
import { useEffect } from 'react';

// 引入 Font Awesome（Next.js 中需先安装依赖：npm install @fortawesome/fontawesome-free）
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Home() {
  // 页面加载后的交互逻辑（原 HTML 中的 script 部分）
  useEffect(() => {
    // 强制下载图片函数
    const downloadImage = async (url: string, name: string) => {
      try {
        const res = await fetch(url, { mode: 'cors' });
        const blob = new Blob([await res.blob()], { type: res.headers.get('content-type') });
        const urlObj = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = urlObj;
        a.download = name;
        a.click();
        URL.revokeObjectURL(urlObj);
      } catch (err) {
        console.error('下载失败:', err);
      }
    };

    // 为自我介绍卡片添加交错动画延迟
    const selfNextElements = document.querySelectorAll('.self-next');
    selfNextElements.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${1 + index * 0.1}s`;
    });

    // 微信二维码弹窗逻辑
    const weixinCard = document.getElementById('weixin-card');
    const modal = document.getElementById('qrcode-modal');
    const closeModal = document.getElementById('close-modal');
    const qrcodeImage = document.getElementById('qrcode-image');
    const downloadBtn = document.getElementById('download');

    // 关闭弹窗函数
    const closeModalFunc = () => {
      if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
          modal.style.display = 'none';
          if (qrcodeImage) qrcodeImage.classList.remove('zoomed');
        }, 300);
      }
    };

    // 打开弹窗
    weixinCard?.addEventListener('click', () => {
      if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 50);
      }
    });

    // 关闭弹窗（按钮）
    closeModal?.addEventListener('click', closeModalFunc);

    // 点击弹窗外部关闭
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModalFunc();
    });

    // 二维码图片放大/缩小
    qrcodeImage?.addEventListener('click', function () {
      this.classList.toggle('zoomed');
    });

    // 下载二维码
    downloadBtn?.addEventListener('click', () => {
      // 注意：原 HTML 中二维码路径为占位符，需替换为实际路径
      downloadImage('https://xuexi.page.gd/qr-code/WeChat.png', 'WeChat.png');
    });

    // ESC 键关闭弹窗
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.classList.contains('active')) {
        closeModalFunc();
      }
    });

    // 按钮涟漪效果
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        // 创建涟漪元素
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        // 计算点击位置
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 设置涟漪位置
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        // 移除涟漪
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // 组件卸载时清理事件监听（可选，避免内存泄漏）
    return () => {
      document.removeEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModalFunc();
      });
    };
  }, []);

  return (
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="奶猫雪溪的主页(?)" />
        <meta property="og:description" content="仅仅只是个主页....?" />
        <meta property="og:image" content="https://xuexi.page.gd/images/home/pp.jpg" />
        <meta property="og:url" content="https://xuexi.page.gd/" />
        <meta name="description" content="仅仅只是个主页....?" />
        <title>雪溪的简介</title>
        {/* Next.js 中 favicon 建议在 app/layout.tsx 中配置，此处保留原路径 */}
        <link rel="icon" type="image/jpg" href="https://xuexi.page.gd/images/home/pp.jpg" />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          body {
            background: linear-gradient(135deg, #f9f7ff 0%, #e0e7ff 100%);
            color: #333;
            line-height: 1.6;
            padding: 0;
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            opacity: 0;
            animation: fadeIn 1s ease forwards;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          /* 全局背景 */
          .global-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('https://xuexi.page.gd/images/home/%E5%BA%95%E5%B1%82%E8%83%8C%E6%99%AF.png');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            opacity: 0.1;
            z-index: -1;
          }
          
          .container {
            width: auto;
            margin: 0 auto;
            padding: 0;
            position: relative;
            z-index: 1;
          }
          
          header {
            text-align: center;
            margin-bottom: 30px;
          }
          
          h1 {
            font-size: 2.8rem;
            color: #6d5dfc;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
          }
          
          .subtitle {
            font-size: 1.2rem;
            color: #7c7c7c;
            max-width: 600px;
            margin: 0 auto;
          }
          
          .top-image-container {
            width: 100%;
            text-align: center;
            margin-bottom: 0;
            border-radius: 0 0 16px 16px;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 2;
            opacity: 0;
            transform: translateY(20px);
            animation: slideUpFadeIn 1s ease 0.3s forwards;
          }
          
          @keyframes slideUpFadeIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .top-image {
            width: 100%;
            height: auto;
            object-fit: cover;
            display: block;
          }
          
          .profile-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: -75px;
            position: relative;
            z-index: 3;
            opacity: 0;
            animation: fadeInUp 0.8s ease 0.6s forwards;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .avatar-container {
            width: 150px;
            height: 150px;
            border-radius: 18px;
            padding: 8px;
            background: white;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            margin-bottom: 20px;
            animation: float 6s ease-in-out infinite;
          }
          
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          
          .avatar {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 12px;
            display: block;
          }
          
          .nickname {
            font-size: 2rem;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 30px;
            text-align: center;
          }
          
          .self {
            width: 95%;
            text-align: center;
            margin-bottom: 0;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 2;
            padding: 5px;
            margin: 0 auto;
            opacity: 0;
            animation: fadeIn 0.8s ease 0.9s forwards;
          }
          
          .self-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 5px;
          }
          
          .self-next {
            flex: 0 0 auto;
            opacity: 0;
            transform: translateY(20px);
            animation: popIn 0.5s ease forwards;
          }
          
          @keyframes popIn {
            0% {
              opacity: 0;
              transform: translateY(20px) scale(0.9);
            }
            50% {
              transform: translateY(-5px) scale(1.05);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          .self-next-add {
            background: #F0FFF0;
            border-radius: 16px;
            padding: 5px 10px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            width: auto;
            text-align: center;
            cursor: pointer;
          }
          
          .self-next-add:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
            background: #e0ffe0;
          }
          
          .self-text {
            color: #7c7c7c;
            margin: 0;
          }
          
          .social-section {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
            margin-top: 30px;
            position: relative;
            margin: 50px auto;
            z-index: 2;
          }
          
          .social-card {
            background: white;
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            width: 100%;
            max-width: 280px;
            text-align: center;
            cursor: pointer;
            opacity: 0;
            transform: translateY(30px);
            animation: cardAppear 0.6s ease forwards;
          }
          
          .social-card:nth-child(1) {
            animation-delay: 1.2s;
          }
          
          .social-card:nth-child(2) {
            animation-delay: 1.4s;
          }
          
          .social-card:nth-child(3) {
            animation-delay: 1.6s;
          }
          
          @keyframes cardAppear {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .social-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          }
          
          .social-icon {
            font-size: 2.5rem;
            margin-bottom: 15px;
            transition: transform 0.3s ease;
          }
          
          .social-card:hover .social-icon {
            transform: scale(1.2);
          }
          
          .qq-icon {
            color: #12b7f5;
          }
          
          .weixin-icon {
            color: #07c160;
          }
          
          .bilibili-icon {
            color: #fb7299;
          }
          
          .social-title {
            font-size: 1.4rem;
            color: #2c3e50;
            margin-bottom: 10px;
          }
          
          .social-desc {
            color: #7c7c7c;
            margin-bottom: 15px;
          }
          
          .social-link {
            display: inline-block;
            padding: 10px 20px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .social-link::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 5px;
            height: 5px;
            background: rgba(255, 255, 255, 0.5);
            opacity: 0;
            border-radius: 100%;
            transform: scale(1, 1) translate(-50%);
            transform-origin: 50% 50%;
          }
          
          .social-link:active::after {
            animation: ripple 1s ease-out;
          }
          
          @keyframes ripple {
            0% {
              transform: scale(0, 0);
              opacity: 0.5;
            }
            100% {
              transform: scale(20, 20);
              opacity: 0;
            }
          }
          
          .qq-link {
            background: #12b7f5;
            color: white;
            cursor: pointer;
          }
          
          .weixin-link {
            background: #07c160;
            color: white;
            cursor: pointer;
          }
          
          .bilibili-link {
            background: #fb7299;
            color: white;
            cursor: pointer;
          }
          
          .download {
            background: black;
            color: white;
            cursor: pointer;
          }
          
          .social-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          }
          
          /* 弹窗样式 */
          .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 100;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .modal.active {
            display: flex;
            animation: modalFadeIn 0.3s ease forwards;
          }
          
          @keyframes modalFadeIn {
            to {
              opacity: 1;
            }
          }
          
          .modal-content {
            background: white;
            border-radius: 16px;
            padding: 30px;
            max-width: 90%;
            max-height: 90%;
            position: relative;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            transform: scale(0.9);
            transition: transform 0.3s ease;
          }
          
          .modal.active .modal-content {
            transform: scale(1);
          }
          
          .close-modal {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 28px;
            cursor: pointer;
            color: #aaa;
            transition: all 0.3s;
          }
          
          .close-modal:hover {
            color: #333;
            transform: rotate(90deg);
          }
          
          .qrcode-image {
            max-width: 100%;
            max-height: 300px;
            border-radius: 8px;
            margin-bottom: 20px;
            cursor: pointer;
            transition: transform 0.3s ease;
          }
          
          .qrcode-image.zoomed {
            transform: scale(1.8);
            cursor: zoom-out;
          }
          
          .download-btn {
            display: inline-block;
            padding: 10px 20px;
            background: #6d5dfc;
            color: white;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            margin-top: 10px;
          }
          
          .download-btn:hover {
            background: #5b4ee9;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          }
          
          footer {
            text-align: center;
            padding: 30px 0;
            margin-top: 50px;
            color: #7c7c7c;
            border-top: 1px solid #eaeaea;
            position: relative;
            z-index: 2;
            opacity: 0;
            animation: fadeIn 1s ease 2s forwards;
          }
          
          /* 响应式设计 */
          @media (max-width: 768px) {
            h1 {
              font-size: 2.2rem;
            }
            
            .avatar-container {
              width: 120px;
              height: 120px;
            }
            
            .nickname {
              font-size: 1.6rem;
            }
            
            .modal-content {
              padding: 20px;
            }
            
            .self-container {
              gap: 10px;
            }
            
            .self-next-add {
              padding: 5px 10px;
            }
            
            .self-text {
              font-size: 0.9rem;
            }
            
            .qrcode-image.zoomed {
              transform: scale(1.3);
            }
          }
          
          @media (max-width: 480px) {
            .self-container {
              flex-direction: row;
              align-items: center;
            }
            
            .self-next {
              width: auto;
            }
            
            .self-next-add {
              width: auto;
              max-width: 300px;
            }
          }
          
          /* 涟漪效果样式（原 JS 中动态创建的元素） */
          .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: rippleEffect 0.6s linear;
          }
          
          @keyframes rippleEffect {
            to {
              transform: scale(20);
              opacity: 0;
            }
          }
        `}</style>
      </head>
      <body>
        {/* 全局背景 */}
        <div className="global-bg"></div>
        
        <div className="container">
          {/* 顶部背景图（Next.js Image 需指定 width/height，或用 fill 模式） */}
          <div className="top-image-container">
            <Image
              className="top-image"
              src="https://xuexi.page.gd/images/home/bg.png" // 图片需放在 public/images/home/ 目录下
              alt="背景"
              width={1920} // 按实际图片宽度填写
              height={400} // 按实际图片高度填写
              priority // 首屏图片优先加载
            />
          </div>
          
          <div className="profile-section">
            <div className="avatar-container">
              <Image
                className="avatar"
                src="https://xuexi.page.gd/images/home/pp.jpg" // 图片需放在 public/images/home/ 目录下
                alt="头像"
                width={150}
                height={150}
                priority
              />
            </div>
            <h2 className="nickname">雪溪</h2>
          </div>
          
          <div className="self">
            <div className="self-container">
              <div className="self-next">
                <div className="self-next-add">
                  <p className="self-text">你好哦~</p>
                </div>
              </div>
              <div className="self-next">
                <div className="self-next-add">
                  <p className="self-text">咱是<br/>雪溪</p>
                </div>
              </div>
              <div className="self-next">
                <div className="self-next-add">
                  <p className="self-text">uwu</p>
                </div>
              </div>
              <div className="self-next">
                <div className="self-next-add">
                  <p className="self-text">不会画画</p>
                </div>
              </div>
              <div className="self-next">
                <div className="self-next-add">
                  <p className="self-text">欢迎扩列</p>
                </div>
              </div>
              <div className="self-next">
                <div className="self-next-add">
                  <p className="self-text">ฅ^•ﻌ•^ฅ</p>
                </div>
              </div>
              <div className="self-next">
                <div className="self-next-add">
                  <p className="self-text">emo</p>
                </div>
              </div>
              <div className="self-next">
                <div className="self-next-add">
                  <p className="self-text">是猫猫！</p>
                </div>
              </div>
              <div className="self-next">
                <div className="self-next-add">
                  <p className="self-text">How long?<br/>How low...</p>
                </div>
              </div>
              <div className="self-next">
                <div className="self-next-add">
                  <p className="self-text">网站还会<br/>更新(?)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="social-section">
            <div className="social-card">
              <<i className="fab fa-qq social-icon qq-icon"></</i>
              <h3 className="social-title">QQ</h3>
              <p className="social-desc">添加我为好友，一起聊天吧</p>
              <a 
                href="https://qm.qq.com/q/SgsnOvSCOc" 
                className="social-link qq-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                加为好友
              </a>
            </div>
            
            <div className="social-card">
              <<i className="fab fa-weixin social-icon weixin-icon"></</i>
              <h3 className="social-title">微信</h3>
              <p className="social-desc">扫描二维码添加我的微信</p>
              <div className="social-link weixin-link" id="weixin-card">显示二维码</div>
            </div>
            
            <div className="social-card">
              <<i className="fab fa-bilibili social-icon bilibili-icon"></</i>
              <h3 className="social-title">Bilibili</h3>
              <p className="social-desc">关注我的B站账号</p>
              <a 
                href="https://b23.tv/N4lGPjg" 
                className="social-link bilibili-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                关注我
              </a>
            </div>
          </div>
        </div>
        
        {/* 微信二维码弹窗 */}
        <div className="modal" id="qrcode-modal">
          <div className="modal-content">
            <span className="close-modal" id="close-modal">&times;</span>
            <h2>微信二维码</h2>
            <Image
              className="qrcode-image"
              id="qrcode-image"
              src="https://xuexi.page.gd/qr-code/WeChat.png" // 图片需放在 public/qr-code/ 目录下
              alt="微信二维码"
              width={300}
              height={300}
            />
            <p>扫描上方二维码添加我的微信</p>
            <div className="social-link download" id="download">
              <<i className="fas fa-download"></</i> 下载二维码
            </div>
          </div>
        </div>
        
        <footer>
          <p>请不要使用本网站含有咱设定的图片</p>
        </footer>
      </body>
    </html>
  );
}
