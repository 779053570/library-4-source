document.addEventListener('DOMContentLoaded', function() {
  const path = window.location.pathname;
  if (path !== '/' && !path.endsWith('/index.html') && path !== '/index.html') {
    return;
  }
  if (sessionStorage.getItem('intro-done')) return;

  // ================= 身份权限系统 =================
  const users = {
    'oblivion': {
      greeting: '欢迎您，■■',
      role: 'observer',
      isSpecial: true
    },
    '是，因为毁灭已经到来': {
      greeting: '欢迎您，「叙事」',
      role: 'admin'
    },
    '不，因为存在而存在': {
      greeting: '欢迎您，洛千秋',
      role: 'admin'
    },
    '天边的鹰衔来了水底的鱼': {
      greeting: '欢迎您，叙事者',
      role: 'narrator'
    },
    '黑星照常升起': {
      greeting: '欢迎您，■■■■■_Lynn',
      role: 'narrator',
      isSpecial: false
    },
    '不知道': {
      greeting: '欢迎您，唐纳德',
      role: 'observer',
      isSpecial: false
    },
    '什么': {
      greeting: '欢迎您，艾莲兰娜',
      role: 'observer',
      isSpecial: false
    },
    '仅在月亏之时': {
      greeting: '欢迎您，瑟妮泽斯',
      role: 'observer',
      isSpecial: false
    },
    '三重月，无形之兔坠入无底狭间。': {
      greeting: '欢迎您，娜芙瑞特',
      role: 'admin',
      isSpecial: false
    },
    '文字秘钥': {
      greeting: '欢迎您，狼口',
      role: 'observer',
      isSpecial: false
    },
    '喵呜?': {
      greeting: '欢迎您，终末暗影',
      role: 'observer',
      isSpecial: false
    },
    '樱落风起云纷飞，雪起刃落见绯灰。': {
      greeting: '欢迎您，雪见 樱',
      role: 'admin',
      isSpecial: false
    },
    '天启四载春分秋，地落七时谷雨冬。': {
      greeting: '欢迎您，揭秘者,当前权限:观测者',
      role: 'observer',
      isSpecial: false
    },

    'only when waning': {
      greeting: '欢迎您，朔',
      role: 'observer',
      isSpecial: false
    },
    '我tm怎么知道': {
      greeting: '欢迎您，雨白',
      role: 'observer',
      isSpecial: false
    },
  };

  const scpAnswers = [
    '仅在月亏之时。',
    '是，但仅在冬日如此。',
    '否，但麻雀之呼唤美妙至极。',
    '地狱的猎犬有三头。',
    '不，迅捷的棕狐狸跃过懒惰的狗',
    '他曾经嚎叫，但无人铭记。',
    '黑月为悼念被遗忘的战争的阵亡者而吟唱',
    '我TM怎么知道。',
    '蓝月是否贪玩？',
    '黑月为失去的孩子哀嚎，而存活者拿起武器准备开战。',
    '万物静谧之时',
    '且作过眼云烟。',
    '正为金羽歌颂破晓之时。',
    '仅在苏醒之时。',
    '伴随一曲哀歌',
    '仅在消逝之前',
    '最后无人知晓',
    '只对盲者如此',
    '不在星耀之时',
    '只在月亏之时',
    '乌云静默了她的哭泣。群风挤入我们的喉咙群星灼灼放光',
    '太阳从未收敛笑容，而她的微笑却比阳光更耀眼，但在所爱之物逝去后，她的心变得沉重又僵硬。她想找机会道别，而你会提供这个机会。',
    '不，仅有低语之声',
    '怒号无人确晓',
    '仅在冬日之时',
    '唯得昨日孽类，穿越明日罪行。',
    '仅于归乡之时',
    '否，神曲乐章待续',
    '分形仍在尖啸',
  ];

  const specialAnswer = '是的。那是一个美妙的郁金香之夜。尤其是纤细的腰肢与紧致的身材。她的双手铐在栏杆上，她的衣衫凌乱不堪，她的目光愤怒而惊慌，但她却毫无反抗能力。她的哀叹使人迷醉，她的嚎叫令人愉悦，她纤弱而又无助的样子将唤起所有人心中的阴暗与施虐欲。';

  // ================= 构建DOM =================
  const overlay = document.createElement('div');
  overlay.id = 'intro-overlay';
  const terminal = document.createElement('div');
  terminal.id = 'intro-terminal';
  overlay.appendChild(terminal);
  document.body.prepend(overlay);

  const welcomeSequence = [
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
    '> 黑月是否嚎叫？请输入你的回答...',
  ];

  const errorLog = [
    '> 错误已达三次。',
    '> 安全协议降级。',
    '> [AUTH] 回退至基础访问权限...',
    '> [AUTH] 分配角色: 读者 (Reader)',
    '> [CHECK] 运行完整性校验... 失败',
    '> [CHECK] 检测到未授权访问尝试。',
    '> [CHECK] 根据自动响应协议... 允许访问。',
    '> [LOG] 事件已记录。',
    '>',
    '> 欢迎你，读者。',
  ];

  const successLogTemplate = [
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
  ];

  const extraLogForLynn = [
    '> [EXTLINK] 检测到外部系统密钥...',
    '> [EXTLINK] 握手协议已接受.',
    '> [EXTLINK] 源标识: ■■■■■_Lynn',
    '> [EXTLINK] 正在建立跨系统因果链条...',
    '>',
    '> [CAUSAL] 确立可能因果链条...',
    '> [CAUSAL] 重叠故事与妄想...',
    '> [CAUSAL] 保证时空稳定性...',
    '> [CAUSAL] 通道已确认.',
    '> [CAUSAL] 个体存在覆写...',
    '',
    '> [EXTLINK] 外部数据流已接入.',
    '> [EXTLINK] 当前实例权限: 最高级.',
  ];

  let wrongAttempts = [];
  const readerThreshold = 3;
  const specialTrigger = 3;

  function saveIdentity(user) {
    sessionStorage.setItem('user-greeting', user.greeting);
    sessionStorage.setItem('user-role', user.role);
    if (user.isSpecial) {
      console.log('欧伯莉丝的凝视已降临，观测者权限已被改写。');
      sessionStorage.setItem('user-role', 'admin');
    }
  }

  function handleCorrect(user) {
    saveIdentity(user);
    let log;
    if (user.greeting === '欢迎您，■■■■■_Lynn') {
      log = [...successLogTemplate, ...extraLogForLynn, '> ', `> ${user.greeting}。`];
    } else {
      log = [...successLogTemplate, `> ${user.greeting}。`];
    }
    printLines(log, () => {
      sessionStorage.setItem('intro-done', 'true');
      const homeContent = document.querySelector('.home-info p');
      if (homeContent) {
        homeContent.textContent = user.greeting + '，欢迎回来。';
      }
      setTimeout(() => overlay.classList.add('fade-out'), 800);
    });
  }

  function handleWrong(input) {
    terminal.textContent += `> ${input}\n> 错误。请注意标点符号。\n\n`;
    wrongAttempts.push(input);
    if (wrongAttempts.length >= readerThreshold) {
      printLines(errorLog, () => {
        sessionStorage.setItem('user-greeting', '欢迎你，读者。');
        sessionStorage.setItem('user-role', 'reader');
        sessionStorage.setItem('intro-done', 'true');
        const homeContent = document.querySelector('.home-info p');
        if (homeContent) {
          homeContent.textContent = '欢迎你，读者。';
        }
        setTimeout(() => overlay.classList.add('fade-out'), 800);
      });
      return;
    }
    terminal.textContent += '> 黑月是否嚎叫？请输入你的回答...\n';
    setupInputLine();
  }

  function handleSpecial() {
    const log = [
      '> 是的。那是一个美妙的郁金香之夜。尤其是纤细的腰肢与紧致的身材。她的双手铐在栏杆上，她的衣衫凌乱不堪，她的目光愤怒而惊慌，但她却毫无反抗能力。她的哀叹使人迷醉，她的嚎叫令人愉悦，她纤弱而又无助的样子将唤起所有人心中的阴暗与施虐欲。',
      '> 够了，请停下。欢迎您，O5-6先生。您的专属密匙不必完全输入，毕竟黑月也是会害羞的。',
    ];
    sessionStorage.setItem('user-greeting', '欢迎您，O5-6先生。');
    sessionStorage.setItem('user-role', 'observer');
    printLines(log, () => {
      sessionStorage.setItem('intro-done', 'true');
      const homeContent = document.querySelector('.home-info p');
      if (homeContent) {
        homeContent.textContent = '欢迎您，O5-6先生。';
      }
      setTimeout(() => overlay.classList.add('fade-out'), 800);
    });
  }

  function printLines(lines, callback) {
    let lineIndex = 0;
    let charIndex = 0;
    const speed = 5;
    function typeChar() {
      if (lineIndex >= lines.length) {
        if (callback) callback();
        return;
      }
      if (charIndex < lines[lineIndex].length) {
        terminal.textContent += lines[lineIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, speed);
      } else {
        terminal.textContent += '\n';
        lineIndex++;
        charIndex = 0;
        setTimeout(typeChar, 5);
      }
      overlay.scrollTop = overlay.scrollHeight;
    }
    typeChar();
  }

  function setupInputLine() {
    const inputLine = document.createElement('div');
    inputLine.id = 'intro-input-line';
    const prompt = document.createElement('span');
    prompt.id = 'intro-prompt';
    prompt.textContent = '> ';
    const input = document.createElement('input');
    input.id = 'intro-input';
    input.setAttribute('type', 'text');
    input.setAttribute('autofocus', 'true');
    const cursor = document.createElement('span');
    cursor.id = 'intro-cursor';
    inputLine.appendChild(prompt);
    inputLine.appendChild(input);
    inputLine.appendChild(cursor);
    terminal.appendChild(inputLine);
    overlay.scrollTop = overlay.scrollHeight;
    input.focus();
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const answer = input.value.trim();
        inputLine.remove();
        if (wrongAttempts.length >= specialTrigger && answer === specialAnswer) {
          handleSpecial();
          return;
        }
        if (users[answer]) {
          handleCorrect(users[answer]);
          return;
        }
        if (scpAnswers.includes(answer)) {
          handleCorrect({
            greeting: '欢迎您，O5成员',
            role: 'observer',
            isSpecial: false
          });
          return;
        }
        handleWrong(answer);
      }
    });
  }

  printLines(welcomeSequence, setupInputLine);
});