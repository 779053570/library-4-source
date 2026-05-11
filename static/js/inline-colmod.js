document.addEventListener('DOMContentLoaded', function() {
  document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('collapsible-link')) {
      const link = e.target;
      const content = link.nextElementSibling;
      if (content && content.classList.contains('collapsible-content')) {
        content.classList.toggle('active');

        const customHideText = link.getAttribute('data-hide-text');
        if (customHideText) {
          // 如果设置了自定义文字，就在原文字和自定义文字之间切换
          const originalText = link.getAttribute('data-original-text') || link.textContent;
          if (!link.getAttribute('data-original-text')) {
            link.setAttribute('data-original-text', originalText);
          }
          if (content.classList.contains('active')) {
            link.textContent = customHideText;
          } else {
            link.textContent = originalText;
          }
        } else {
          // 默认行为：替换 +/- 号
          if (content.classList.contains('active')) {
            link.textContent = link.textContent.replace('+', '-');
          } else {
            link.textContent = link.textContent.replace('-', '+');
          }
        }
      }
    }
  });
});