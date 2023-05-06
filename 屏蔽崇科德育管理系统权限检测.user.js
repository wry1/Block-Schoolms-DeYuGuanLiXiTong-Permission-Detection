// ==UserScript==
// @name         屏蔽崇科德育管理系统权限检测
// @description  屏蔽崇科德育管理系统权限检测
// @author       Wry, ChatGPT
// @version      1
// @match        http://example.com/*
// @run-at       document-start
// ==/UserScript==

const codesToBlock = [
  `alert('你没有权限！');window.location='Login.aspx';`,
  `alert('你没有权限！');history.go(-1);`
];

const blockUnauthorizedAlert = () => {
  const scriptNodes = document.getElementsByTagName('script');
  for (let i = 0; i < scriptNodes.length; i++) {
    const scriptNode = scriptNodes[i];
    for (const code of codesToBlock) {
      if (scriptNode.textContent.includes(code)) {
        scriptNode.textContent = '';
      }
    }
  }
};

const observer = new MutationObserver(() => {
  blockUnauthorizedAlert();
});
observer.observe(document.documentElement, { childList: true, subtree: true });
