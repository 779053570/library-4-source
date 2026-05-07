document.addEventListener('DOMContentLoaded', function() {
  const path = window.location.pathname;
  if (path !== '/' && !path.endsWith('/index.html') && path !== '/index.html') {
    return;
  }
  if (sessionStorage.getItem('intro-done')) return;

  const overlay = document.createElement('div');
  overlay.id = 'intro-overlay';
  const terminal = document.createElement('div');
  terminal.id = 'intro-terminal';
  overlay.appendChild(terminal);
  document.body.prepend(overlay);

  // ========== 第一段代码：系统启动，等待认证 ==========
  const phase1 = [
    '> 启动 Library-A4 数据库系统...',
    '>',
    '> [BOOT] 加载内核模块... OK',
    '> [BOOT] 初始化文件系统... OK',
    '> [BOOT] 挂载 /etc/library/config.toml... OK',
    '> [BOOT] 读取节点配置: anchor-point=779053570.github.io',
    '> [BOOT] 系统自检完成.',
    '>',
    '> [NET] 建立对等网络连接...',
    '> [NET] 发现邻居节点: 0',
    '> [NET] 当前为独立数据库实例.',
    '>',
    '> [AUTH] 加载认证模块...',
    '> [AUTH] 密钥策略: 单密钥认证',
    '> [AUTH] 等待用户输入...',
    '>',
    '> 数据库就绪，请输入访问密钥...',
  ];

  const correctKey = 'oblivion';
  let phase1Done = false;

  // 打印第一段
  let lineIdx = 0;
  let charIdx = 0;
  const speed = 1;
  const linePause = 18;

  function typePhase1() {
    if (lineIdx >= phase1.length) {
      phase1Done = true;
      showInputLine();
      return;
    }
    if (charIdx < phase1[lineIdx].length) {
      terminal.textContent += phase1[lineIdx].charAt(charIdx);
      charIdx++;
      setTimeout(typePhase1, speed);
    } else {
      terminal.textContent += '\n';
      lineIdx++;
      charIdx = 0;
      setTimeout(typePhase1, linePause);
    }
    overlay.scrollTop = overlay.scrollHeight;
  }

  // 显示输入行
  function showInputLine() {
    const inputLine = document.createElement('div');
    inputLine.id = 'intro-input-line';
    const prompt = document.createElement('span');
    prompt.id = 'intro-prompt';
    prompt.textContent = '> ';
    const input = document.createElement('input');
    input.id = 'intro-input';
    input.setAttribute('type', 'text');
    input.setAttribute('autofocus', 'true');
    input.setAttribute('autocomplete', 'off');
    const cursor = document.createElement('span');
    cursor.id = 'intro-cursor';
    inputLine.appendChild(prompt);
    inputLine.appendChild(input);
    inputLine.appendChild(cursor);
    terminal.appendChild(inputLine);
    input.focus();
    overlay.scrollTop = overlay.scrollHeight;

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const entered = input.value.trim().toLowerCase();
        if (entered === correctKey) {
          inputLine.remove();
          terminal.textContent += `> ${correctKey}\n`;
          terminal.textContent += '> 密钥验证通过.\n';
          terminal.textContent += '> 开始搭建完整的图书馆实例...\n\n';
          runPhase2();
        } else {
          terminal.textContent += `> ${input.value}\n> 密钥无效，请重试。\n\n`;
          terminal.textContent += '> ';
          input.value = '';
          // 重新创建输入行
          const newInputLine = document.createElement('div');
          newInputLine.id = 'intro-input-line';
          const newPrompt = document.createElement('span');
          newPrompt.textContent = '> ';
          const newInput = document.createElement('input');
          newInput.setAttribute('type', 'text');
          newInput.setAttribute('autofocus', 'true');
          newInput.setAttribute('autocomplete', 'off');
          const newCursor = document.createElement('span');
          newCursor.id = 'intro-cursor';
          newInputLine.appendChild(newPrompt);
          newInputLine.appendChild(newInput);
          newInputLine.appendChild(newCursor);
          terminal.appendChild(newInputLine);
          newInput.focus();
          overlay.scrollTop = overlay.scrollHeight;
          // 重新绑定事件
          newInput.addEventListener('keydown', arguments.callee);
        }
      }
    });
  }

  // ========== 第二段：数据库搭建 ==========
  function runPhase2() {
    const phase2 = [
      '> [HAL] 重新初始化硬件抽象层...',
      '> [HAL] 分配内存池...',
      '> [HAL] 配置并行计算单元...',
      '> [HAL] 硬件抽象层就绪.',
      '',
      '> [STORAGE] 启动分布式存储引擎...',
      '> [STORAGE] 挂载数据卷: /volumes/narratives',
      '> [STORAGE] 挂载数据卷: /volumes/characters',
      '> [STORAGE] 挂载数据卷: /volumes/timelines',
      '> [STORAGE] 校验磁盘完整性... OK',
      '> [STORAGE] 存储引擎就绪.',
      '',
      '> [DB] 启动数据库服务...',
      '> [DB] 创建数据库 \'library-a4\'... OK',
      '> [DB] 创建表 \'characters\' (id, name, race, age, gender, height, weight, attributes)... OK',
      '> [DB] 创建表 \'timelines\' (id, label, anchor_date, events)... OK',
      '> [DB] 创建表 \'tags\' (id, name, slug, related_entities)... OK',
      '> [DB] 创建表 \'narratives\' (id, title, content, author, timestamp, arc_id)... OK',
      '> [DB] 创建全文索引 \'idx_characters_name\'... OK',
      '> [DB] 创建全文索引 \'idx_tags_slug\'... OK',
      '> [DB] 创建关系索引 \'idx_narratives_arc\'... OK',
      '> [DB] 数据库初始化完成.',
      '',
      '> [IMPORT] 扫描待导入数据...',
      '> [IMPORT] 发现实体: ■■■■■■■■■■条记录',
      '> [IMPORT] 导入进程数据...OK',
      '> [IMPORT] 导入故事数据...OK',
      '> [IMPORT] 导入时间数据...OK',
      '> [IMPORT] 导入角色数据...OK',
      '> [IMPORT] 导入时间线数据... OK',
      '> [IMPORT] 导入标签索引... OK',
      '> [IMPORT] 导入叙事文本... OK',
      '> [IMPORT] 数据导入完成.',
      '',
      '> [CHECK] 运行一致性校验...',
      '> [CHECK] 检查外键约束... 0 冲突',
      '> [CHECK] 检查标签引用完整性... OK',
      '> [CHECK] 检查时间线锚点...确认',
      '> [CHECK] 校验叙事链路... 无断裂',
      '> [CHECK] 一致性校验通过.',
      '',
      '> [SERVICE] 启动 API 网关...',
      '> [SERVICE] 启动静态资源服务... ',
      '> [SERVICE] 注册健康检查端点... /health',
      '> [SERVICE] 所有服务已上线.',
      '',
      '> 所有模块加载完成.',
      '> ',
      '> 欢迎您，■■.',
    ];

    let lineIdx2 = 0;
    let charIdx2 = 0;

    function typePhase2() {
      if (lineIdx2 >= phase2.length) {
        sessionStorage.setItem('intro-done', 'true');
        setTimeout(() => {
          overlay.classList.add('fade-out');
        }, 500);
        return;
      }
      if (charIdx2 < phase2[lineIdx2].length) {
        terminal.textContent += phase2[lineIdx2].charAt(charIdx2);
        charIdx2++;
        setTimeout(typePhase2, speed);
      } else {
        terminal.textContent += '\n';
        lineIdx2++;
        charIdx2 = 0;
        setTimeout(typePhase2, linePause);
      }
      overlay.scrollTop = overlay.scrollHeight;
    }

    typePhase2();
  }

  // 启动一切
  typePhase1();
});