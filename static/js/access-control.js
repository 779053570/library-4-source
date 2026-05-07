(function() {
  // 角色等级映射
  const ROLE_LEVEL = {
    'reader': 0,
    'observer': 1,
    'admin': 2,
    'narrator': 3
  };

  function getUserLevel() {
    const userRole = sessionStorage.getItem('user-role') || 'reader';
    return ROLE_LEVEL[userRole] || 0;
  }

  document.addEventListener('DOMContentLoaded', function() {
    const userLevel = getUserLevel();
    window.__USER_LEVEL__ = userLevel;

    // 1. 文章内容页：检查 meta 标签，权限不足时替换正文
    const meta = document.querySelector('meta[name="access-level"]');
    if (meta) {
      const requiredLevel = parseInt(meta.content) || 0;
      if (userLevel < requiredLevel) {
        const content = document.querySelector('.post-content');
        if (content) {
          content.innerHTML = '<p style="color:#FF0000;text-align:center;margin-top:4rem;">[ 文档已锁定：权限不足 ]</p>';
        }
      }
    }

    // 2. 列表页：隐藏无权限的文章条目
    const postEntries = document.querySelectorAll('[data-access-level]');
    postEntries.forEach(entry => {
      const required = parseInt(entry.getAttribute('data-access-level')) || 0;
      if (userLevel < required) {
        entry.style.display = 'none';
      }
    });
  });
})();