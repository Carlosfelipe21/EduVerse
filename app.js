/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║              EDUVERSE — LÓGICA PRINCIPAL (app.js)             ║
 * ║                                                               ║
 * ║  Índice de seções:                                            ║
 * ║   1. Banco de Usuários (USERS_DB)                             ║
 * ║   2. Dados Globais Mockados (MockData)                        ║
 * ║   3. Utilitários (Utils)                                      ║
 * ║   4. Sistema de Toast (notificações flutuantes)               ║
 * ║   5. Partículas (Particles — canvas animado)                  ║
 * ║   6. Roteador de Páginas (Router)                             ║
 * ║   7. Gráficos (Charts — via Chart.js)                         ║
 * ║   8. Pomodoro (temporizador de foco)                          ║
 * ║   9. UI — helpers de interface                                ║
 * ║  10. Componentes renderizados (Sidebar, Topbar, Pomodoro)     ║
 * ║  11. Ações do usuário (completeMission, buyItem, sendAIChat)  ║
 * ║  12. Inicialização de componentes por página (initPageComp.)  ║
 * ║  13. Autenticação (doLogin, doLogout, togglePassword)         ║
 * ║  14. Boot do sistema (startLoading, initLoginParticles)       ║
 * ║  15. Registro das Páginas (Router.register por rota)          ║
 * ╚═══════════════════════════════════════════════════════════════╝
 */


/* ═══════════════════════════════════════════════════════════════
   1. BANCO DE USUÁRIOS
   ─────────────────────────────────────────────────────────────
   Adicione, remova ou edite usuários livremente aqui.
   Campos obrigatórios: username, password, role, name
   role: 'aluno' | 'professor' | 'admin'
═══════════════════════════════════════════════════════════════ */
const USERS_DB = [
  {
    username: 'felipe',
    password: '1234',
    role:     'aluno',
    name:     'Lucas Mendes',
    level:    12,
    xp:       3240,
    xpNext:   4000,
    coins:    820,
    house:    'Aquila',
    title:    'Mestre da Matemática',
    streak:   18,
    badges:   ['🏆','⚡','🔬','📚','🎯'],
  },
  {
    username: 'ana',
    password: '1234',
    role:     'aluno',
    name:     'Ana Clara',
    level:    14,
    xp:       4200,
    xpNext:   5000,
    coins:    1200,
    house:    'Ignis',
    title:    'Campeã do Quiz',
    streak:   22,
    badges:   ['🏆','🌟','⭐','🎯','🔥'],
  },
  {
    username: 'professor',
    password: 'prof123',
    role:     'professor',
    name:     'Prof. Santos',
    level:    1, xp: 0, xpNext: 1000, coins: 0,
    house:    '', title: 'Docente', streak: 0, badges: [],
  },
  {
    username: 'admin',
    password: 'admin123',
    role:     'admin',
    name:     'Diretora Lima',
    level:    1, xp: 0, xpNext: 1000, coins: 0,
    house:    '', title: 'Administrador', streak: 0, badges: [],
  },
];


/* ═══════════════════════════════════════════════════════════════
   2. DADOS GLOBAIS MOCKADOS
   ─────────────────────────────────────────────────────────────
   Simula um backend. Em produção, substitua pelas chamadas
   reais à API da sua aplicação.
═══════════════════════════════════════════════════════════════ */
const MockData = {

  // Dados do usuário logado (preenchidos após login)
  user: {
    name:'', level:1, xp:0, xpNext:1000, coins:0,
    house:'', title:'', streak:0, badges:[], mood:null, role:'aluno',
  },

  // Estatísticas do dashboard
  stats: {
    average: 8.7, attendance: 94, rank: 3, missions: 12, streak: 18, totalXP: 3240,
  },

  // Notas por matéria com tendência de evolução
  grades: {
    Matemática: { avg: 9.2, trend: 'up'     },
    Português:  { avg: 8.1, trend: 'up'     },
    Ciências:   { avg: 7.9, trend: 'down'   },
    História:   { avg: 8.8, trend: 'up'     },
    Geografia:  { avg: 8.4, trend: 'stable' },
    'Inglês':   { avg: 9.5, trend: 'up'     },
    Física:     { avg: 7.2, trend: 'down'   },
    Química:    { avg: 8.0, trend: 'up'     },
  },

  // Ranking geral de alunos
  ranking: [
    { name: 'Ana Clara',     xp: 4200, avatar: 'AC', badge: '🥇', house: 'Ignis' },
    { name: 'Pedro Souza',   xp: 4050, avatar: 'PS', badge: '🥈', house: 'Terra' },
    { name: 'Lucas Mendes',  xp: 3240, avatar: 'LM', badge: '🥉', house: 'Aquila', isMe: true },
    { name: 'Julia Ramos',   xp: 3100, avatar: 'JR', badge: '',   house: 'Aquila' },
    { name: 'Carlos Lima',   xp: 2980, avatar: 'CL', badge: '',   house: 'Ignis'  },
    { name: 'Mariana Costa', xp: 2750, avatar: 'MC', badge: '',   house: 'Terra'  },
    { name: 'Rafael Torres', xp: 2600, avatar: 'RT', badge: '',   house: 'Hydra'  },
    { name: 'Sofia Alves',   xp: 2420, avatar: 'SA', badge: '',   house: 'Aquila' },
  ],

  // Missões disponíveis (diárias, semanais, especiais)
  missions: [
    { id:1, title:'Estudar 2h hoje',        icon:'⏱️', xp:50,  coins:20,  type:'daily',   done:true  },
    { id:2, title:'Entregar tarefa de Mat',  icon:'📐', xp:80,  coins:30,  type:'daily',   done:true  },
    { id:3, title:'Participar do quiz',      icon:'🎮', xp:100, coins:50,  type:'weekly',  done:false },
    { id:4, title:'Ler capítulo na bibl.',   icon:'📖', xp:60,  coins:25,  type:'weekly',  done:false },
    { id:5, title:'Sequência de 7 dias',     icon:'🔥', xp:200, coins:100, type:'special', done:false },
    { id:6, title:'Primeira nota 10',        icon:'⭐', xp:300, coins:150, type:'special', done:false },
  ],

  // Conquistas / achievements
  achievements: [
    { id:1, emoji:'🏆', title:'Campeão',     desc:'Top 5 no ranking',  unlocked:true  },
    { id:2, emoji:'🔥', title:'Em Chamas',   desc:'Streak de 7 dias',  unlocked:true  },
    { id:3, emoji:'🧠', title:'Gênio',       desc:'Nota 10 em algo',   unlocked:true  },
    { id:4, emoji:'📚', title:'Leitor Voraz',desc:'10 livros lidos',   unlocked:false },
    { id:5, emoji:'⚡', title:'Relâmpago',   desc:'Missão em 1h',      unlocked:false },
    { id:6, emoji:'🌟', title:'Estrela',     desc:'Top 1 semanal',     unlocked:false },
    { id:7, emoji:'🎯', title:'Precision',   desc:'100% em quiz',      unlocked:true  },
    { id:8, emoji:'🦅', title:'Águia',       desc:'Casa Aquila',       unlocked:true  },
  ],

  // Posts do feed social
  feed: [
    { id:1, author:'Prof. Santos', role:'professor', avatar:'PS', time:'há 12min',
      content:'Parabéns à Turma 9A pelo desempenho incrível na prova de Matemática! Vocês estão de parabéns! 🎉',
      likes:24, liked:false, comments:5 },
    { id:2, author:'Ana Clara', role:'student', avatar:'AC', time:'há 1h',
      content:'Acabei de concluir o Desafio Semanal de Ciências! 🔬 Missão cumprida e +100 XP na conta!',
      likes:18, liked:true, comments:3 },
    { id:3, author:'EduVerse', role:'system', avatar:'EV', time:'há 3h',
      content:'🏆 RANKING SEMANAL ATUALIZADO! Ana Clara sobe para o 1º lugar com 4200 XP!',
      likes:42, liked:false, comments:8 },
    { id:4, author:'Diretora Lima', role:'admin', avatar:'DL', time:'há 5h',
      content:'📅 Lembrete: Feira de Ciências acontece na próxima sexta-feira! Inscrições abertas até amanhã.',
      likes:31, liked:false, comments:6 },
  ],

  // Livros da biblioteca virtual
  books: [
    { id:1, emoji:'📐', title:'Álgebra Linear',  author:'Gilbert Strang', subject:'Mat',  progress:65  },
    { id:2, emoji:'🧬', title:'Biologia Celular', author:'Alberts et al.', subject:'Bio',  progress:30  },
    { id:3, emoji:'🌍', title:'Geopolítica Atual',author:'Saul Cohen',     subject:'Geo',  progress:80  },
    { id:4, emoji:'📜', title:'Dom Casmurro',     author:'Machado de Assis',subject:'Port', progress:100 },
    { id:5, emoji:'⚗️', title:'Química Orgânica', author:'Clayden',        subject:'Quím', progress:15  },
    { id:6, emoji:'🔭', title:'Cosmos',           author:'Carl Sagan',     subject:'Fís',  progress:50  },
  ],

  // Itens da loja (EduCoins)
  store: [
    { id:1, emoji:'📌', title:'Pular 1 Tarefa',  desc:'Use 1x por semana',    price:200  },
    { id:2, emoji:'🎫', title:'Ingresso Evento', desc:'Qualquer evento',       price:350  },
    { id:3, emoji:'⭐', title:'+0.5 na Média',   desc:'Bônus trimestral',      price:500  },
    { id:4, emoji:'🖼️', title:'Avatar Exclusivo',desc:'Frame dourado',         price:150  },
    { id:5, emoji:'🏷️', title:'Título Especial', desc:'"Lenda da Escola"',     price:1000 },
    { id:6, emoji:'🎮', title:'Modo Quiz Pro',   desc:'Perguntas extras',      price:100  },
  ],

  // Eventos do calendário escolar
  events: [
    { date:'30 Mai', title:'Feira de Ciências',   type:'event',   xp:150, color:'var(--neon-green)'  },
    { date:'02 Jun', title:'Prova de Matemática', type:'test',    xp:0,   color:'var(--neon-red)'    },
    { date:'05 Jun', title:'Quiz de História',    type:'quiz',    xp:100, color:'var(--neon-purple)' },
    { date:'10 Jun', title:'Semana Cultural',     type:'event',   xp:200, color:'var(--neon-orange)' },
    { date:'15 Jun', title:'Olimpíada de Física', type:'contest', xp:500, color:'var(--neon-blue)'   },
  ],

  // Notificações do sininho
  notifications: [
    { id:1, icon:'📢', text:'Nova missão disponível!',        time:'agora',    unread:true  },
    { id:2, icon:'🏆', text:'Você subiu para o 3° lugar!',    time:'há 30min', unread:true  },
    { id:3, icon:'📝', text:'Tarefa de Química para amanhã.', time:'há 2h',    unread:true  },
    { id:4, icon:'💬', text:'Prof. Santos comentou sua nota.',time:'há 3h',    unread:false },
    { id:5, icon:'🎉', text:'Conquista desbloqueada: Gênio!', time:'ontem',    unread:false },
  ],

  // Casas (estilo Hogwarts)
  houses: [
    { name:'Aquila', emoji:'🦅', color:'#00d4ff', members:28, xp:12400, rank:1, desc:'Coragem e lealdade' },
    { name:'Ignis',  emoji:'🔥', color:'#ef4444', members:25, xp:11800, rank:2, desc:'Paixão e força'     },
    { name:'Terra',  emoji:'🌍', color:'#10b981', members:27, xp:10950, rank:3, desc:'Sabedoria e calma'  },
    { name:'Hydra',  emoji:'🌊', color:'#8b5cf6', members:24, xp:10100, rank:4, desc:'Fluidez e poder'    },
  ],

  // Mensagens da IA educacional
  aiMessages: [
    { type:'warning', icon:'⚠️', text:'Seu desempenho em Física caiu 12% este mês. Recomendamos revisar os capítulos 4 e 5.' },
    { type:'success', icon:'✅', text:'Excelente! Você evoluiu 18% em Inglês nas últimas 4 semanas. Continue assim!'         },
    { type:'info',    icon:'🎯', text:'Com base nas suas notas, foco em Física e Química pode elevar sua média para 9.0+.'   },
    { type:'alert',   icon:'📅', text:'Sua frequência está em 94%. Para manter o bônus de XP, não falte esta semana.'       },
  ],
};


/* ═══════════════════════════════════════════════════════════════
   3. UTILITÁRIOS
═══════════════════════════════════════════════════════════════ */
const Utils = {

  /**
   * Formata número com separador de milhar PT-BR.
   * Ex: 3240 → "3.240"
   */
  num(n) {
    return Number(n).toLocaleString('pt-BR');
  },

  /**
   * Retorna uma cor neon consistente baseada nas iniciais do nome.
   * Garante que o mesmo nome sempre receba a mesma cor.
   */
  avatarColor(s) {
    const colors = ['#00d4ff','#8b5cf6','#10b981','#f59e0b','#ec4899','#06b6d4','#ef4444'];
    let sum = 0;
    for (const ch of s) sum += ch.charCodeAt(0);
    return colors[sum % colors.length];
  },

  /** Retorna uma Promise que resolve após `ms` milissegundos. */
  sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  },
};


/* ═══════════════════════════════════════════════════════════════
   4. SISTEMA DE TOAST (notificações flutuantes)
   ─────────────────────────────────────────────────────────────
   Uso:
     Toast.success('Mensagem!')
     Toast.error('Erro!')
     Toast.info('Info')
═══════════════════════════════════════════════════════════════ */
const Toast = {

  /**
   * Exibe uma notificação flutuante.
   * @param {string} msg   - Texto da mensagem
   * @param {string} type  - 'success' | 'error' | 'info' | 'warning'
   * @param {number} dur   - Duração em milissegundos (padrão: 3500)
   */
  show(msg, type = 'info', dur = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };

    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
    container.appendChild(el);

    // Remove automaticamente após a duração
    setTimeout(() => {
      el.classList.add('hiding');
      setTimeout(() => el.remove(), 300);
    }, dur);
  },

  success(m) { this.show(m, 'success'); },
  error(m)   { this.show(m, 'error');   },
  info(m)    { this.show(m, 'info');    },
};


/* ═══════════════════════════════════════════════════════════════
   5. PARTÍCULAS (canvas animado de fundo)
   ─────────────────────────────────────────────────────────────
   Partículas neon flutuantes no plano de fundo do app.
   Inicia com Particles.init() após o carregamento.
═══════════════════════════════════════════════════════════════ */
const Particles = {
  canvas: null,
  ctx: null,
  particles: [],

  /** Inicializa o canvas e começa a animação. */
  init() {
    this.canvas = document.getElementById('particles-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Cria 60 partículas com posição e velocidade aleatórias
    for (let i = 0; i < 60; i++) {
      this.particles.push({
        x:       Math.random() * window.innerWidth,
        y:       Math.random() * window.innerHeight,
        r:       Math.random() * 1.5 + 0.5,                                 // raio
        vx:      (Math.random() - 0.5) * 0.3,                               // velocidade horizontal
        vy:      -Math.random() * 0.4 - 0.1,                                // velocidade vertical (sobe)
        opacity: Math.random() * 0.6 + 0.2,
        color:   ['#00d4ff','#8b5cf6','#06b6d4'][Math.floor(Math.random() * 3)],
      });
    }

    this.animate();

    // Redimensiona o canvas quando a janela muda de tamanho
    window.addEventListener('resize', () => {
      this.canvas.width  = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
  },

  /** Loop de animação das partículas (requestAnimationFrame). */
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const p of this.particles) {
      // Move a partícula
      p.x += p.vx;
      p.y += p.vy;

      // Rebobina ao sair pelo topo
      if (p.y < -5) {
        p.y = this.canvas.height + 5;
        p.x = Math.random() * this.canvas.width;
      }

      // Desenha o círculo
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fillStyle  = p.color;
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fill();
    }

    this.ctx.globalAlpha = 1;
    requestAnimationFrame(() => this.animate());
  },
};


/* ═══════════════════════════════════════════════════════════════
   6. ROTEADOR DE PÁGINAS (Router)
   ─────────────────────────────────────────────────────────────
   Gerencia a troca de páginas sem recarregar o navegador.
   Uso:
     Router.register('nomeDaPagina', () => '<html do conteúdo>')
     Router.goto('nomeDaPagina')
═══════════════════════════════════════════════════════════════ */
const Router = {
  pages: {},

  /**
   * Registra uma nova página no roteador.
   * @param {string}   name - Identificador da rota (ex: 'dashboard')
   * @param {Function} fn   - Função que retorna o HTML da página
   */
  register(name, fn) {
    this.pages[name] = fn;
  },

  /**
   * Navega para uma página registrada com animação de transição.
   * Atualiza o nav-item ativo e inicializa componentes da página.
   * @param {string} name - Nome da rota
   */
  goto(name) {
    if (!this.pages[name]) {
      console.warn('Página não encontrada:', name);
      return;
    }

    const container = document.getElementById('page-root');
    if (!container) return;

    // Fade out
    container.style.opacity   = '0';
    container.style.transform = 'translateY(8px)';

    setTimeout(() => {
      // Injeta o HTML da nova página
      container.innerHTML = this.pages[name]();
      container.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      container.style.opacity    = '1';
      container.style.transform  = 'translateY(0)';

      // Marca o item ativo na sidebar
      document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.toggle('active', el.dataset.page === name);
      });

      // Inicializa componentes específicos da página (gráficos, tabs, etc.)
      initPageComponents(name);

      // Rola o conteúdo para o topo
      const pc = document.getElementById('page-content');
      if (pc) pc.scrollTop = 0;
    }, 150);
  },
};


/* ═══════════════════════════════════════════════════════════════
   7. GRÁFICOS (Charts via Chart.js)
   ─────────────────────────────────────────────────────────────
   Centraliza a criação e destruição dos gráficos Chart.js.
   Evita memory leaks destruindo instâncias anteriores.
═══════════════════════════════════════════════════════════════ */
const Charts = {
  instances: {},

  /** Destrói um gráfico existente pelo ID do canvas. */
  destroy(id) {
    if (this.instances[id]) {
      this.instances[id].destroy();
      delete this.instances[id];
    }
  },

  /**
   * Cria um novo gráfico Chart.js.
   * @param {string} id     - ID do elemento <canvas>
   * @param {object} config - Configuração do Chart.js
   */
  create(id, config) {
    this.destroy(id);
    const el = document.getElementById(id);
    if (!el || typeof Chart === 'undefined') return;
    this.instances[id] = new Chart(el.getContext('2d'), config);
  },

  // Opções visuais padrão (dark theme)
  commonOpts: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#8b949e', font: { family: 'Plus Jakarta Sans', size: 12 } }
      }
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8b949e' } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8b949e' } },
    },
  },

  /** Gráficos da página Dashboard. */
  dashboard() {
    // Linha: evolução de notas ao longo dos meses
    this.create('chart-grades', {
      type: 'line',
      data: {
        labels: ['Mar','Abr','Mai','Jun','Jul','Ago'],
        datasets: [
          {
            label: 'Sua Média',
            data: [7.8, 8.1, 7.9, 8.4, 8.6, 8.7],
            borderColor: '#00d4ff',
            backgroundColor: 'rgba(0,212,255,0.08)',
            fill: true, tension: 0.4,
            pointBackgroundColor: '#00d4ff', pointRadius: 4,
          },
          {
            label: 'Média da Turma',
            data: [7.2, 7.5, 7.3, 7.8, 7.9, 8.0],
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139,92,246,0.05)',
            fill: true, tension: 0.4,
            borderDash: [4,4],
            pointBackgroundColor: '#8b5cf6', pointRadius: 3,
          },
        ],
      },
      options: { ...this.commonOpts },
    });

    // Radar: desempenho por matéria
    const g = MockData.grades;
    this.create('chart-radar', {
      type: 'radar',
      data: {
        labels: Object.keys(g).slice(0, 6),
        datasets: [{
          label: 'Desempenho',
          data: Object.values(g).slice(0, 6).map(x => x.avg),
          borderColor: '#00d4ff',
          backgroundColor: 'rgba(0,212,255,0.15)',
          pointBackgroundColor: '#00d4ff',
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#8b949e' } } },
        scales: {
          r: {
            grid: { color: 'rgba(255,255,255,0.07)' },
            ticks: { color: '#8b949e', backdropColor: 'transparent' },
            pointLabels: { color: '#8b949e', font: { size: 11 } },
            min: 0, max: 10,
          }
        },
      },
    });

    // Barras: frequência mensal
    this.create('chart-attendance', {
      type: 'bar',
      data: {
        labels: ['Mar','Abr','Mai'],
        datasets: [{
          label: 'Presenças (%)',
          data: [96, 92, 94],
          backgroundColor: ['rgba(16,185,129,0.6)','rgba(245,158,11,0.6)','rgba(16,185,129,0.6)'],
          borderColor:     ['#10b981','#f59e0b','#10b981'],
          borderWidth: 1, borderRadius: 6,
        }],
      },
      options: {
        ...this.commonOpts,
        plugins: { legend: { display: false } },
        scales: { ...this.commonOpts.scales, y: { ...this.commonOpts.scales.y, max: 100 } },
      },
    });
  },

  /** Gráfico da página Ranking. */
  ranking() {
    const d = MockData.ranking.slice(0, 6);
    this.create('chart-ranking-bar', {
      type: 'bar',
      data: {
        labels: d.map(x => x.name.split(' ')[0]),
        datasets: [{
          label: 'XP Total',
          data: d.map(x => x.xp),
          backgroundColor: d.map((_,i) => i===0?'rgba(251,191,36,0.7)': i===1?'rgba(148,163,184,0.7)': i===2?'rgba(180,83,9,0.7)':'rgba(0,212,255,0.4)'),
          borderColor:     d.map((_,i) => i===0?'#fbbf24': i===1?'#94a3b8': i===2?'#b45309':'#00d4ff'),
          borderWidth: 1, borderRadius: 6,
        }],
      },
      options: {
        indexAxis: 'y',
        ...this.commonOpts,
        plugins: { legend: { display: false } },
        scales: { x: { ...this.commonOpts.scales.x, min: 0 }, y: { ...this.commonOpts.scales.y } },
      },
    });
  },

  /** Gráfico da página IA Educacional. */
  ai() {
    this.create('chart-ai-performance', {
      type: 'line',
      data: {
        labels: ['Sem 1','Sem 2','Sem 3','Sem 4','Sem 5','Sem 6','Sem 7','Sem 8'],
        datasets: [
          { label:'Mat', data:[8.5,8.8,9.0,9.0,9.2,9.1,9.3,9.2], borderColor:'#00d4ff', tension:0.4, pointRadius:3 },
          { label:'Fís', data:[7.5,7.2,6.9,7.1,7.0,6.8,7.2,7.2], borderColor:'#ef4444', tension:0.4, pointRadius:3 },
          { label:'Port',data:[7.8,8.0,8.1,8.2,8.0,8.3,8.1,8.1], borderColor:'#8b5cf6', tension:0.4, pointRadius:3 },
        ],
      },
      options: { ...this.commonOpts },
    });
  },

  /** Gráfico da página Financeiro. */
  financial() {
    this.create('chart-financial', {
      type: 'doughnut',
      data: {
        labels: ['Mensalidade','Material','Eventos','Uniforme'],
        datasets: [{
          data: [1200, 180, 80, 120],
          backgroundColor: [
            'rgba(0,212,255,0.8)','rgba(139,92,246,0.8)',
            'rgba(16,185,129,0.8)','rgba(245,158,11,0.8)',
          ],
          borderColor: 'transparent',
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#8b949e' } } },
      },
    });
  },

  /** Gráfico da página Wrapped. */
  wrapped() {
    this.create('chart-wrapped-xp', {
      type: 'bar',
      data: {
        labels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
        datasets: [{
          label: 'XP Ganho',
          data: [120,200,280,320,410,390,480,520,460,600,580,640],
          backgroundColor: 'rgba(139,92,246,0.6)',
          borderColor: '#8b5cf6',
          borderWidth: 1, borderRadius: 4,
        }],
      },
      options: {
        ...this.commonOpts,
        plugins: { legend: { display: false } },
      },
    });
  },
};


/* ═══════════════════════════════════════════════════════════════
   8. POMODORO (temporizador de foco)
   ─────────────────────────────────────────────────────────────
   Técnica Pomodoro: 25 min de foco → 5 min de pausa.
   Ganha +25 XP ao concluir cada sessão.
═══════════════════════════════════════════════════════════════ */
const Pomodoro = {
  minutes:   25,
  total:     25 * 60,
  remaining: 25 * 60,
  running:   false,
  timer:     null,
  sessions:  0,
  label:     'Foco',

  /**
   * Altera o modo (Foco / Pausa / Descanso).
   * @param {number}      min   - Duração em minutos
   * @param {string}      label - Rótulo do modo
   * @param {HTMLElement} btn   - Botão da aba clicado
   */
  setMode(min, label, btn) {
    this.reset();
    this.minutes   = min;
    this.total     = min * 60;
    this.remaining = min * 60;
    this.label     = label;
    this.updateDisplay();

    // Atualiza a aba ativa
    document.querySelectorAll('#pomodoro-modal .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  },

  /** Alterna entre iniciar e pausar. */
  toggle() {
    this.running ? this.pause() : this.start();
  },

  /** Inicia a contagem regressiva. */
  start() {
    this.running = true;
    document.getElementById('pomo-btn').textContent = '⏸ Pausar';
    this.timer = setInterval(() => {
      this.remaining--;
      if (this.remaining <= 0) { this.complete(); return; }
      this.updateDisplay();
      this.updateRing();
    }, 1000);
  },

  /** Pausa sem resetar o tempo. */
  pause() {
    this.running = false;
    clearInterval(this.timer);
    document.getElementById('pomo-btn').textContent = '▶ Continuar';
  },

  /** Reseta para o tempo inicial. */
  reset() {
    this.running = false;
    clearInterval(this.timer);
    this.remaining = this.total;
    const b = document.getElementById('pomo-btn');
    if (b) b.textContent = '▶ Iniciar';
    this.updateDisplay();
    this.updateRing();
  },

  /** Chamado ao finalizar uma sessão — concede XP. */
  complete() {
    clearInterval(this.timer);
    this.running = false;
    this.sessions++;
    document.getElementById('pomo-sessions').textContent = this.sessions;
    document.getElementById('pomo-btn').textContent = '▶ Iniciar';
    this.remaining = this.total;
    this.updateDisplay();
    this.updateRing();
    Toast.success('Sessão concluída! +25 XP 🎉');
  },

  /** Atualiza o display do tempo (MM:SS). */
  updateDisplay() {
    const m  = Math.floor(this.remaining / 60);
    const s  = this.remaining % 60;
    const el = document.getElementById('pomo-time');
    if (el) el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    const lb = document.getElementById('pomo-label');
    if (lb) lb.textContent = this.label;
  },

  /** Atualiza o anel visual (conic-gradient) com o progresso. */
  updateRing() {
    const ring = document.getElementById('pomo-ring');
    if (!ring) return;
    const pct = (1 - this.remaining / this.total) * 360;
    ring.style.background = `conic-gradient(var(--neon-blue) ${pct}deg, rgba(255,255,255,0.05) ${pct}deg)`;
  },
};


/* ═══════════════════════════════════════════════════════════════
   9. UI — HELPERS DE INTERFACE
═══════════════════════════════════════════════════════════════ */
const UI = {
  /** Abre/fecha a sidebar no mobile. */
  toggleSidebar() {
    document.getElementById('sidebar')?.classList.toggle('open');
  },

  /** Abre o modal do Pomodoro. */
  openPomodoro() {
    document.getElementById('pomodoro-modal')?.classList.add('open');
  },
};


/* ═══════════════════════════════════════════════════════════════
   10. COMPONENTES RENDERIZADOS
   ─────────────────────────────────────────────────────────────
   Funções que geram e injetam HTML dinâmico nos slots do layout.
═══════════════════════════════════════════════════════════════ */

/**
 * Renderiza a sidebar com dados do usuário logado.
 * Chamada uma vez após o boot do sistema.
 */
function renderSidebar() {
  const u = MockData.user;
  const color    = Utils.avatarColor(u.name.slice(0, 2));
  const initials = u.name.split(' ').map(w => w[0]).join('').slice(0, 2);
  const pct      = Math.round(u.xp / u.xpNext * 100);

  // Helper para criar um item de navegação
  const navItem = (page, icon, label, badge = '') =>
    `<div class="nav-item" data-page="${page}" onclick="Router.goto('${page}')">
       <span class="nav-icon">${icon}</span>
       <span>${label}</span>
       ${badge ? `<span class="nav-badge">${badge}</span>` : ''}
     </div>`;

  document.getElementById('sidebar-root').innerHTML = `
  <aside class="sidebar" id="sidebar">

    <!-- Logo -->
    <div class="sidebar-logo">
      <div class="logo-icon">🎓</div>
      <div>
        <div class="logo-text text-gradient">EduVerse</div>
        <div class="text-sm text-muted">v2.0 Premium</div>
      </div>
    </div>

    <!-- Perfil rápido + XP bar -->
    <div style="padding:16px;border-bottom:1px solid var(--border)">
      <div class="flex items-center gap-12">
        <div class="avatar avatar-ring avatar-online"
          style="width:40px;height:40px;background:${color};font-size:14px">
          ${initials}
        </div>
        <div style="min-width:0">
          <div style="font-size:13px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${u.name}</div>
          <div class="text-sm text-muted">Nível ${u.level} · 🦅 ${u.house}</div>
        </div>
      </div>
      <div style="margin-top:10px">
        <div class="flex justify-between text-sm text-muted mb-4">
          <span>${Utils.num(u.xp)} XP</span>
          <span>${Utils.num(u.xpNext)}</span>
        </div>
        <div class="xp-bar-track">
          <div class="xp-bar-fill" style="width:${pct}%"></div>
        </div>
      </div>
    </div>

    <!-- Navegação agrupada -->
    <nav class="sidebar-nav">
      <div class="nav-group">
        <div class="nav-group-label">Principal</div>
        ${navItem('dashboard',    '🏠', 'Dashboard')}
        ${navItem('profile',      '👤', 'Meu Perfil')}
        ${navItem('ranking',      '🏆', 'Ranking')}
        ${navItem('feed',         '📣', 'Feed Social')}
      </div>
      <div class="nav-group">
        <div class="nav-group-label">Aprendizado</div>
        ${navItem('missions',     '🎯', 'Missões', '3')}
        ${navItem('gamification', '🎮', 'Gamificação')}
        ${navItem('library',      '📚', 'Biblioteca')}
        ${navItem('ai',           '🤖', 'IA Educacional')}
      </div>
      <div class="nav-group">
        <div class="nav-group-label">Escola</div>
        ${navItem('events',    '📅', 'Eventos')}
        ${navItem('financial', '💳', 'Financeiro')}
        ${navItem('store',     '🛍️', 'Loja')}
        ${navItem('wrapped',   '✨', 'Wrapped Anual')}
      </div>
    </nav>

    <!-- Rodapé da sidebar: saldo + logout -->
    <div style="padding:12px 16px;border-top:1px solid var(--border)">
      <div class="flex items-center gap-8 text-sm text-muted" style="padding:8px">
        <span>🪙</span>
        <span style="font-family:var(--font-mono);color:var(--neon-orange);font-weight:700"
          id="sidebar-coins">${Utils.num(u.coins)} EduCoins</span>
      </div>
      <button onclick="doLogout()" class="btn btn-glass w-full"
        style="margin-top:4px;font-size:12px;justify-content:center;color:var(--text-muted);border-color:rgba(255,255,255,0.06)">
        🚪 Sair da conta
      </button>
    </div>
  </aside>`;
}

/**
 * Renderiza a topbar (barra superior).
 * Chamada uma vez após o boot.
 */
function renderTopbar() {
  const u        = MockData.user;
  const initials = u.name.split(' ').map(w => w[0]).join('').slice(0, 2);

  document.getElementById('topbar-root').innerHTML = `
  <header class="topbar">
    <!-- Hamburguer (só visível no mobile) -->
    <button id="sidebar-toggle-btn" onclick="UI.toggleSidebar()"
      style="display:none;width:38px;height:38px;border-radius:50%;background:var(--bg-glass);
             border:1px solid var(--border);align-items:center;justify-content:center;
             color:var(--text-secondary);cursor:pointer;font-size:18px">☰
    </button>

    <!-- Campo de busca -->
    <div class="topbar-search">
      <span class="topbar-search-icon">🔍</span>
      <input type="text" id="top-search" placeholder="Buscar matérias, páginas…">
    </div>

    <!-- Ações do lado direito -->
    <div class="topbar-right">
      <div class="topbar-btn" onclick="showNotifications()" style="position:relative" title="Notificações">
        🔔<span class="notif-dot"></span>
      </div>
      <div class="topbar-btn" onclick="UI.openPomodoro()" title="Pomodoro">⏱️</div>
      <div style="display:flex;align-items:center;gap:8px;padding:0 4px;cursor:pointer"
        onclick="Router.goto('profile')" title="Perfil">
        <div class="topbar-btn" style="cursor:pointer">
          <div class="avatar"
            style="width:28px;height:28px;background:var(--neon-blue);font-size:11px;
                   font-family:var(--font-display);font-weight:800;color:#000">${initials}</div>
        </div>
        <span class="badge ${u.role==='admin'?'badge-pink': u.role==='professor'?'badge-purple':'badge-blue'}"
          style="font-size:10px">
          ${u.role==='admin'?'Admin': u.role==='professor'?'Professor':'Aluno'}
        </span>
      </div>
    </div>
  </header>`;

  // Busca por tecla Enter
  document.getElementById('top-search').addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const q = e.target.value.toLowerCase();

    if      (q.includes('rank'))              Router.goto('ranking');
    else if (q.includes('miss'))              Router.goto('missions');
    else if (q.includes('livro') || q.includes('bibl')) Router.goto('library');
    else if (q.includes('feed') || q.includes('social')) Router.goto('feed');
    else if (q.includes('ia') || q.includes('intelig'))  Router.goto('ai');
    else if (q.includes('loja') || q.includes('store'))  Router.goto('store');
    else if (q.includes('evento'))            Router.goto('events');
    else if (q.includes('financ'))            Router.goto('financial');
    else if (q.includes('dash'))              Router.goto('dashboard');
    else Toast.info(`Buscando por "${e.target.value}"…`);

    e.target.value = '';
  });
}

/**
 * Renderiza o modal do Pomodoro.
 * Chamada uma vez após o boot.
 */
function renderPomodoro() {
  document.getElementById('pomodoro-root').innerHTML = `
  <div id="pomodoro-modal" class="modal-overlay"
    onclick="if(event.target===this) this.classList.remove('open')">
    <div class="modal-box" style="max-width:340px">
      <div class="modal-header">
        <h3>⏱️ Modo Foco</h3>
        <button class="modal-close"
          onclick="document.getElementById('pomodoro-modal').classList.remove('open')">✕</button>
      </div>
      <div class="modal-body text-center">

        <!-- Abas de modo -->
        <div class="tabs" style="max-width:280px;margin:0 auto 16px">
          <button class="tab-btn active" onclick="Pomodoro.setMode(25,'Foco',this)">Foco</button>
          <button class="tab-btn" onclick="Pomodoro.setMode(5,'Pausa',this)">Pausa</button>
          <button class="tab-btn" onclick="Pomodoro.setMode(15,'Descanso',this)">Descanso</button>
        </div>

        <!-- Anel animado do timer -->
        <div style="display:flex;justify-content:center;margin-bottom:24px">
          <div class="pomodoro-ring" id="pomo-ring">
            <div class="pomodoro-inner">
              <div class="pomodoro-time" id="pomo-time">25:00</div>
              <div class="text-sm text-muted" id="pomo-label">Foco</div>
            </div>
          </div>
        </div>

        <!-- Botões de controle -->
        <div style="display:flex;gap:8px;justify-content:center">
          <button class="btn btn-primary" id="pomo-btn" onclick="Pomodoro.toggle()">▶ Iniciar</button>
          <button class="btn btn-glass" onclick="Pomodoro.reset()">↺ Reset</button>
        </div>

        <div style="margin-top:16px;font-size:13px;color:var(--text-secondary)">
          Sessões hoje: <strong id="pomo-sessions">0</strong>
          · XP ao concluir: <span style="color:var(--neon-green)">+25</span>
        </div>
      </div>
    </div>
  </div>`;
}

/**
 * Exibe o modal de notificações ao clicar no sininho.
 */
function showNotifications() {
  const items = MockData.notifications;
  const html  = items.map(n => `
    <div class="rank-item" style="margin-bottom:4px">
      <span style="font-size:20px">${n.icon}</span>
      <div style="flex:1">
        <div style="font-size:13px">${n.text}</div>
        <div class="text-sm text-muted">${n.time}</div>
      </div>
      ${n.unread
        ? '<div style="width:8px;height:8px;background:var(--neon-blue);border-radius:50%;flex-shrink:0"></div>'
        : ''}
    </div>`).join('');

  const modal = document.createElement('div');
  modal.className = 'modal-overlay open';
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  modal.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <h3>🔔 Notificações</h3>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
      </div>
      <div class="modal-body">${html}</div>
    </div>`;
  document.body.appendChild(modal);
}


/* ═══════════════════════════════════════════════════════════════
   11. AÇÕES DO USUÁRIO
═══════════════════════════════════════════════════════════════ */

/**
 * Conclui uma missão, concedendo XP e coins ao usuário.
 * @param {number} id - ID da missão
 */
function completeMission(id) {
  const m = MockData.missions.find(x => x.id === id);
  if (!m || m.done) return;

  m.done = true;
  MockData.user.xp    += m.xp;
  MockData.user.coins += m.coins;

  Toast.success(`🎉 Missão concluída! +${m.xp} XP e 🪙${m.coins} EduCoins`);
  setTimeout(() => Router.goto('missions'), 800);
}

/**
 * Compra um item da loja com EduCoins.
 * @param {number} id    - ID do item
 * @param {string} title - Nome do item
 * @param {number} price - Preço em EduCoins
 */
function buyItem(id, title, price) {
  const u = MockData.user;
  if (u.coins < price) {
    Toast.error('EduCoins insuficientes!');
    return;
  }

  u.coins -= price;

  // Atualiza saldo exibido na sidebar sem re-renderizá-la toda
  const el = document.getElementById('sidebar-coins');
  if (el) el.textContent = Utils.num(u.coins) + ' EduCoins';

  Toast.success(`✅ "${title}" adquirido! -🪙${price}`);
  setTimeout(() => Router.goto('store'), 600);
}

/**
 * Envia uma mensagem para o chat da IA Educacional (EduBot).
 * Resposta simulada com base em palavras-chave da pergunta.
 */
function sendAIChat() {
  const input    = document.getElementById('ai-chat-input');
  const messages = document.getElementById('ai-chat-messages');
  if (!input || !messages || !input.value.trim()) return;

  const q = input.value.trim();
  input.value = '';

  // Exibe a mensagem do usuário
  const userDiv = document.createElement('div');
  userDiv.style.cssText = 'text-align:right;margin-bottom:8px;color:var(--text-primary)';
  userDiv.innerHTML = `<strong>Você:</strong> ${q}`;
  messages.appendChild(userDiv);

  // Respostas simuladas da IA
  const responses = [
    'Com base no seu histórico, recomendo revisar os conteúdos com maior frequência.',
    'Sua evolução em Matemática está excelente! Continue assim.',
    'Para melhorar em Física, tente resolver ao menos 5 exercícios por dia.',
    'Sua frequência está ótima! Isso contribui para sua média final.',
  ];

  let resp = responses[Math.floor(Math.random() * responses.length)];
  const lq = q.toLowerCase();

  // Respostas contextuais por palavra-chave
  if (lq.includes('mat') || lq.includes('álgebra'))  resp = 'Seu desempenho em Matemática está em 9.2 — excelente! Pratique álgebra diariamente.';
  if (lq.includes('fís') || lq.includes('fisica'))   resp = 'Identifiquei queda de 12% em Física. Recomendo o capítulo 5 do Halliday.';
  if (lq.includes('nota') || lq.includes('média'))   resp = 'Sua média geral é 8.7, acima da turma (8.0). Foco em Física pode elevar para 9.0+.';

  // Exibe a resposta do EduBot
  const botDiv = document.createElement('div');
  botDiv.style.cssText = 'margin-bottom:8px;color:var(--neon-blue)';
  botDiv.innerHTML = `<strong>EduBot:</strong> ${resp}`;
  messages.appendChild(botDiv);

  // Rola para o final do chat
  messages.scrollTop = messages.scrollHeight;
}


/* ═══════════════════════════════════════════════════════════════
   12. INICIALIZAÇÃO DE COMPONENTES POR PÁGINA
   ─────────────────────────────────────────────────────────────
   Chamada pelo Router após injetar cada página.
   Inicializa: tabs, mood buttons, like buttons, gráficos.
═══════════════════════════════════════════════════════════════ */
function initPageComponents(page) {

  // ── Tabs internas das páginas ──
  document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
    btn.addEventListener('click', function () {
      const group = this.closest('[data-tab-group]');
      if (!group) return;

      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      this.classList.add('active');
      const target = document.getElementById(this.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // ── Seleção de humor (mood buttons) ──
  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      Toast.success('Humor registrado! +5 XP');
    });
  });

  // ── Botões de like no feed ──
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      this.classList.toggle('liked');
      const counter = this.querySelector('.like-count');
      if (counter) {
        const n = parseInt(counter.textContent);
        counter.textContent = this.classList.contains('liked') ? n + 1 : n - 1;
      }
      this.style.color = this.classList.contains('liked') ? 'var(--neon-pink)' : '';
    });
  });

  // ── Gráficos (apenas se Chart.js estiver carregado) ──
  if (typeof Chart !== 'undefined') {
    if (page === 'dashboard') Charts.dashboard();
    if (page === 'ranking')   Charts.ranking();
    if (page === 'ai')        Charts.ai();
    if (page === 'financial') Charts.financial();
    if (page === 'wrapped')   Charts.wrapped();
  }

  // ── Exibe botão hamburguer no mobile ──
  if (window.innerWidth <= 900) {
    const btn = document.getElementById('sidebar-toggle-btn');
    if (btn) btn.style.display = 'flex';
  }
}


/* ═══════════════════════════════════════════════════════════════
   13. AUTENTICAÇÃO
═══════════════════════════════════════════════════════════════ */

/** Usuário atualmente logado (null se deslogado). */
let currentUser = null;

/** Alterna visibilidade da senha no campo de login. */
function togglePassword() {
  const inp = document.getElementById('login-pass');
  const btn = document.getElementById('toggle-pwd-btn');
  if (inp.type === 'password') { inp.type = 'text';     btn.textContent = '🙈'; }
  else                         { inp.type = 'password'; btn.textContent = '👁️'; }
}

/**
 * Valida credenciais e inicia o sistema se corretas.
 * Chamada ao clicar em "Entrar" ou pressionar Enter.
 */
function doLogin() {
  const user  = document.getElementById('login-user').value.trim().toLowerCase();
  const pass  = document.getElementById('login-pass').value;
  const errEl = document.getElementById('login-error');

  errEl.classList.remove('show');

  // Validação de campos vazios
  if (!user || !pass) {
    errEl.querySelector('#login-error-text').textContent = 'Preencha usuário e senha.';
    errEl.classList.add('show');
    return;
  }

  // Busca usuário no banco local
  const found = USERS_DB.find(u =>
    u.username.toLowerCase() === user && u.password === pass
  );

  if (!found) {
    errEl.querySelector('#login-error-text').textContent = 'Usuário ou senha incorretos.';
    errEl.classList.add('show');
    document.getElementById('login-user').focus();

    // Animação de shake no card
    const card = document.querySelector('.login-card');
    card.style.animation = 'none';
    card.offsetHeight; // força reflow para reiniciar animação
    card.style.animation = 'loginShake 0.4s ease';
    return;
  }

  // ── Login bem-sucedido ──
  currentUser = found;

  // Preenche os dados globais com o perfil do usuário logado
  MockData.user = {
    name:    found.name,
    level:   found.level,
    xp:      found.xp,
    xpNext:  found.xpNext,
    coins:   found.coins,
    house:   found.house,
    title:   found.title,
    streak:  found.streak,
    badges:  found.badges,
    mood:    null,
    role:    found.role,
  };

  // Desabilita o botão durante a transição
  const btn = document.getElementById('login-btn');
  btn.disabled    = true;
  btn.textContent = '⏳ Entrando…';

  // Fade out da tela de login → exibe loading
  const loginScreen = document.getElementById('login-screen');
  loginScreen.style.transition = 'opacity 0.5s ease';
  loginScreen.style.opacity    = '0';
  setTimeout(() => {
    loginScreen.style.display = 'none';
    startLoading();
  }, 500);
}

/**
 * Encerra a sessão e retorna à tela de login.
 */
function doLogout() {
  currentUser = null;

  // Oculta o app
  document.getElementById('app').style.display = 'none';

  // Reseta e exibe o login
  const ls = document.getElementById('login-screen');
  ls.style.display = 'flex';
  ls.style.opacity = '0';

  document.getElementById('login-user').value = '';
  document.getElementById('login-pass').value = '';
  document.getElementById('login-error').classList.remove('show');
  document.getElementById('login-btn').disabled    = false;
  document.getElementById('login-btn').textContent = 'Entrar na Plataforma';

  setTimeout(() => {
    ls.style.transition = 'opacity 0.4s ease';
    ls.style.opacity    = '1';
  }, 50);
}


/* ═══════════════════════════════════════════════════════════════
   14. BOOT DO SISTEMA
═══════════════════════════════════════════════════════════════ */

/**
 * Inicializa as partículas animadas da tela de login.
 * Canvas separado do canvas principal do app.
 */
function initLoginParticles() {
  const canvas = document.getElementById('login-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const pts = [];
  for (let i = 0; i < 40; i++) {
    pts.push({
      x:   Math.random() * canvas.width,
      y:   Math.random() * canvas.height,
      r:   Math.random() * 1.5 + 0.5,
      vx:  (Math.random() - 0.5) * 0.2,
      vy:  -Math.random() * 0.3 - 0.05,
      op:  Math.random() * 0.5 + 0.2,
      col: ['#00d4ff','#8b5cf6','#06b6d4'][Math.floor(Math.random() * 3)],
    });
  }

  function animLP() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of pts) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle   = p.col;
      ctx.globalAlpha = p.op;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(animLP);
  }

  animLP();
  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

/**
 * Exibe a tela de carregamento com barra de progresso animada.
 * Após concluir, monta o layout principal e navega para o dashboard.
 */
function startLoading() {
  const ls = document.getElementById('loading-screen');
  ls.style.display = 'flex';

  const bar  = document.getElementById('loading-bar');
  const text = document.getElementById('loading-text');
  const msgs = [
    'Carregando módulos…',
    'Sincronizando dados…',
    'Inicializando IA…',
    'Preparando dashboard…',
    `Bem-vindo, ${MockData.user.name.split(' ')[0]}!`,
  ];

  let progress = 0;
  let msgIdx   = 0;

  const iv = setInterval(() => {
    progress += Math.random() * 22 + 8;
    if (progress > 100) progress = 100;

    bar.style.width    = progress + '%';
    text.textContent   = msgs[Math.min(msgIdx++, msgs.length - 1)];

    if (progress >= 100) {
      clearInterval(iv);

      setTimeout(async () => {
        // Fade out do loading
        ls.style.transition = 'opacity 0.5s ease';
        ls.style.opacity    = '0';
        await new Promise(r => setTimeout(r, 500));
        ls.style.display = 'none';

        // Exibe o app e monta os componentes
        document.getElementById('app').style.display = 'block';
        renderSidebar();
        renderTopbar();
        renderPomodoro();
        Particles.init();

        // Ajuste responsivo do hamburguer
        window.addEventListener('resize', () => {
          const b = document.getElementById('sidebar-toggle-btn');
          if (window.innerWidth <= 900) {
            if (b) b.style.display = 'flex';
          } else {
            if (b) b.style.display = 'none';
            document.getElementById('sidebar')?.classList.remove('open');
          }
        });

        // Navega para o dashboard
        Router.goto('dashboard');
        setTimeout(() => Toast.info(`👋 Bem-vindo de volta, ${MockData.user.name.split(' ')[0]}!`), 600);
      }, 400);
    }
  }, 220);
}

// Inicializa eventos do login ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
  // Permite login via tecla Enter nos campos
  ['login-user', 'login-pass'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => {
      if (e.key === 'Enter') doLogin();
    });
  });

  // Inicia partículas da tela de login
  initLoginParticles();
});


/* ═══════════════════════════════════════════════════════════════
   15. REGISTRO DAS PÁGINAS (Router)
   ─────────────────────────────────────────────────────────────
   Cada Router.register define o HTML de uma página.
   O conteúdo é gerado dinamicamente a partir do MockData.
═══════════════════════════════════════════════════════════════ */

// ────────────────────────────────────────────
// DASHBOARD
// ────────────────────────────────────────────
Router.register('dashboard', () => {
  const u = MockData.user;
  const s = MockData.stats;
  const initials = u.name.split(' ').map(w => w[0]).join('').slice(0, 2);
  const pct      = Math.round(u.xp / u.xpNext * 100);

  return `<div class="page-inner">

    <!-- Cabeçalho com saudação e mood selector -->
    <div class="page-header flex justify-between items-start flex-wrap gap-16">
      <div>
        <h1>Olá, <span class="text-gradient">${u.name.split(' ')[0]}</span> 👋</h1>
        <p>${new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'})} · Nível ${u.level} · ${u.title}</p>
      </div>
      <div class="glass-card-static p-16" style="text-align:right">
        <div class="text-sm text-muted mb-4">Como você está hoje?</div>
        <div class="flex gap-8">
          ${['😊','😐','😔','🔥','🤔'].map(m => `<button class="mood-btn" data-mood="${m}">${m}</button>`).join('')}
        </div>
      </div>
    </div>

    <!-- Cards de estatísticas principais -->
    <div class="grid-4 mb-24">
      <div class="stat-card animate-fade-up">
        <div class="stat-icon" style="background:rgba(0,212,255,0.1)">📊</div>
        <div class="stat-value text-gradient">${s.average}</div>
        <div class="stat-label">Média Geral</div>
        <div class="stat-delta up">↑ +0.3 vs mês anterior</div>
      </div>
      <div class="stat-card animate-fade-up anim-delay-1">
        <div class="stat-icon" style="background:rgba(16,185,129,0.1)">✅</div>
        <div class="stat-value text-neon-green">${s.attendance}%</div>
        <div class="stat-label">Frequência</div>
        <div class="stat-delta up">↑ +2% vs mês anterior</div>
      </div>
      <div class="stat-card animate-fade-up anim-delay-2">
        <div class="stat-icon" style="background:rgba(245,158,11,0.1)">🏆</div>
        <div class="stat-value text-gold">#${s.rank}</div>
        <div class="stat-label">Ranking Geral</div>
        <div class="stat-delta up">↑ Subiu 2 posições</div>
      </div>
      <div class="stat-card animate-fade-up anim-delay-3">
        <div class="stat-icon" style="background:rgba(139,92,246,0.1)">🔥</div>
        <div class="stat-value text-neon-orange">${u.streak}</div>
        <div class="stat-label">Dias de Streak</div>
        <div class="stat-delta up">↑ Recorde pessoal!</div>
      </div>
    </div>

    <!-- Barra de XP do usuário -->
    <div class="glass-card-static p-20 mb-24">
      <div class="flex items-center gap-20">
        <div class="avatar avatar-ring"
          style="width:64px;height:64px;background:linear-gradient(135deg,#00d4ff,#8b5cf6);font-size:24px;flex-shrink:0">${initials}</div>
        <div style="flex:1">
          <div class="flex justify-between items-center mb-8 flex-wrap gap-8">
            <div>
              <span class="badge badge-gold">Nível ${u.level}</span>
              <span style="margin-left:8px;font-size:13px;color:var(--text-secondary)">${u.title}</span>
            </div>
            <span class="font-mono text-sm text-muted">${Utils.num(u.xp)} / ${Utils.num(u.xpNext)} XP</span>
          </div>
          <div class="xp-bar-track"><div class="xp-bar-fill" style="width:${pct}%"></div></div>
          <div class="flex gap-8 mt-12">${u.badges.map(b => `<span style="font-size:18px">${b}</span>`).join('')}</div>
        </div>
        <div class="text-center" style="flex-shrink:0">
          <div style="font-size:28px">🦅</div>
          <div class="text-sm text-neon-blue font-mono">${u.house}</div>
        </div>
      </div>
    </div>

    <!-- Layout: Gráficos + Sidebar de missões -->
    <div class="layout-sidebar-content mb-24">
      <div class="flex-col gap-20">
        <div class="glass-card-static p-20">
          <div class="section-header">
            <div class="section-title">Evolução das Notas</div>
            <span class="badge badge-blue">Últimos 6 meses</span>
          </div>
          <div class="chart-container" style="height:220px"><canvas id="chart-grades"></canvas></div>
        </div>
        <div class="glass-card-static p-20">
          <div class="section-header"><div class="section-title">Frequência Mensal</div></div>
          <div class="chart-container" style="height:160px"><canvas id="chart-attendance"></canvas></div>
        </div>
      </div>

      <div class="flex-col gap-20">
        <div class="glass-card-static p-20">
          <div class="section-header"><div class="section-title">Mapa de Matérias</div></div>
          <div class="chart-container" style="height:220px"><canvas id="chart-radar"></canvas></div>
        </div>
        <div class="glass-card-static p-20">
          <div class="section-header">
            <div class="section-title">Missões Hoje</div>
            <span class="text-sm text-neon-blue" style="cursor:pointer" onclick="Router.goto('missions')">Ver todas →</span>
          </div>
          <div class="flex-col gap-8">
            ${MockData.missions.slice(0, 3).map(m => `
              <div class="mission-card" onclick="Router.goto('missions')">
                <div class="flex items-center gap-12">
                  <div class="mission-icon" style="background:rgba(0,212,255,0.1)">${m.icon}</div>
                  <div style="flex:1">
                    <div style="font-size:13px;font-weight:600">${m.title}</div>
                    <div class="text-sm text-muted">+${m.xp} XP · 🪙${m.coins}</div>
                  </div>
                  ${m.done ? '<span class="text-neon-green">✓</span>' : '<span class="text-muted">○</span>'}
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Grid de notas por matéria -->
    <div class="glass-card-static p-20 mb-24">
      <div class="section-header">
        <div class="section-title">Notas por Matéria</div>
        <span class="badge badge-purple">2025.1</span>
      </div>
      <div class="grid-4">
        ${Object.entries(MockData.grades).map(([sub, data]) => `
          <div class="stat-card" style="padding:14px">
            <div class="flex justify-between items-start mb-8">
              <div style="font-size:13px;font-weight:600">${sub}</div>
              <span class="text-sm ${data.trend==='up'?'text-neon-green': data.trend==='down'?'text-neon-orange':''}">
                ${data.trend==='up'?'↑': data.trend==='down'?'↓':'→'}
              </span>
            </div>
            <div style="font-size:24px;font-family:var(--font-display);font-weight:800;
              color:${data.avg>=9?'var(--neon-green)': data.avg>=7?'var(--neon-blue)':'var(--neon-orange)'}">
              ${data.avg}
            </div>
            <div class="xp-bar-track mt-8" style="height:4px">
              <div class="xp-bar-fill" style="width:${data.avg*10}%;background:${
                data.avg>=9?'var(--neon-green)': data.avg>=7?'var(--grad-primary)':'var(--neon-orange)'}"></div>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <!-- Próximos eventos -->
    <div class="glass-card-static p-20">
      <div class="section-header">
        <div class="section-title">Próximos Eventos</div>
        <span class="text-sm text-neon-blue" style="cursor:pointer" onclick="Router.goto('events')">Ver calendário →</span>
      </div>
      <div class="flex-col gap-8">
        ${MockData.events.map(e => `
          <div class="flex items-center gap-16 p-16" style="border-radius:var(--radius-md);background:var(--bg-glass)">
            <div style="font-family:var(--font-mono);font-size:12px;color:${e.color};width:50px;flex-shrink:0;text-align:center;font-weight:700">${e.date}</div>
            <div style="flex:1"><div style="font-size:13px;font-weight:600">${e.title}</div></div>
            ${e.xp>0 ? `<span class="badge badge-green">+${e.xp} XP</span>` : '<span class="badge badge-orange">Prova</span>'}
          </div>`).join('')}
      </div>
    </div>
  </div>`;
});


// ────────────────────────────────────────────
// RANKING
// ────────────────────────────────────────────
Router.register('ranking', () => {
  const r = MockData.ranking;
  return `<div class="page-inner">
    <div class="page-header"><h1>🏆 <span class="text-gradient">Ranking EduVerse</span></h1><p>Competição saudável impulsiona a excelência</p></div>
    <div class="tabs mb-24" data-tab-group="ranking">
      <button class="tab-btn active" data-tab="tab-geral">Geral</button>
      <button class="tab-btn" data-tab="tab-semanal">Semanal</button>
      <button class="tab-btn" data-tab="tab-casas">Casas</button>
    </div>

    <!-- Aba: Ranking Geral -->
    <div id="tab-geral" class="tab-content active">
      <div class="layout-sidebar-content">
        <div class="flex-col gap-16">
          <!-- Pódio Top 3 -->
          <div class="flex gap-12 mb-8">
            ${[r[1],r[0],r[2]].map((p,idx) => {
              const pos   = idx===0?2: idx===1?1: 3;
              const color = pos===1?'#fbbf24': pos===2?'#94a3b8': '#b45309';
              return `<div class="glass-card-static p-20 text-center flex-1" ${pos===1?'style="border-color:rgba(251,191,36,0.3)"':''}>
                <div style="font-size:28px">${p.badge||`#${pos}`}</div>
                <div class="avatar" style="width:${pos===1?'80px':'64px'};height:${pos===1?'80px':'64px'};background:${Utils.avatarColor(p.avatar)};font-size:${pos===1?'24px':'18px'};margin:8px auto">${p.avatar}</div>
                <div style="font-weight:700;margin-top:8px">${p.name.split(' ')[0]}</div>
                <div class="text-sm text-muted">${p.house}</div>
                <div style="margin-top:8px;font-family:var(--font-mono);font-size:13px;color:${color};font-weight:700">${Utils.num(p.xp)} XP</div>
              </div>`;
            }).join('')}
          </div>

          <!-- Lista completa -->
          <div class="glass-card-static p-20">
            <div class="section-title mb-16">Classificação Completa</div>
            <div class="flex-col gap-4">
              ${r.map((p,i) => `
                <div class="rank-item ${i<3?`rank-${i+1}`:''}">
                  <div class="rank-number ${i===0?'gold': i===1?'silver': i===2?'bronze':''}">${i===0?'🥇': i===1?'🥈': i===2?'🥉':`#${i+1}`}</div>
                  <div class="avatar" style="width:36px;height:36px;background:${Utils.avatarColor(p.avatar)};font-size:13px">${p.avatar}</div>
                  <div style="flex:1">
                    <div style="font-size:13px;font-weight:600">${p.name} ${p.isMe?'<span class="badge badge-blue" style="padding:1px 6px;font-size:10px">Você</span>':''}</div>
                    <div class="text-sm text-muted">Casa ${p.house}</div>
                  </div>
                  <div style="font-family:var(--font-mono);font-size:13px;font-weight:700;color:var(--neon-blue)">${Utils.num(p.xp)} XP</div>
                </div>`).join('')}
            </div>
          </div>
        </div>

        <!-- Sidebar do ranking -->
        <div class="flex-col gap-16">
          <div class="glass-card-static p-20">
            <div class="section-title mb-16">Comparativo XP</div>
            <div class="chart-container" style="height:280px"><canvas id="chart-ranking-bar"></canvas></div>
          </div>
          <div class="glass-card-static p-20">
            <div class="section-title mb-16">Estatísticas</div>
            <div class="flex-col gap-12">
              <div class="flex justify-between"><span class="text-secondary">Sua posição</span><span class="font-mono text-neon-blue font-700">#3</span></div>
              <div class="flex justify-between"><span class="text-secondary">Distância para #2</span><span class="font-mono text-neon-orange">810 XP</span></div>
              <div class="flex justify-between"><span class="text-secondary">Sua evolução</span><span class="text-neon-green">↑ +2 posições</span></div>
              <div class="flex justify-between"><span class="text-secondary">Total de alunos</span><span class="font-mono">${r.length}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Aba: Ranking Semanal -->
    <div id="tab-semanal" class="tab-content">
      <div class="glass-card-static p-24 text-center mt-8">
        <div style="font-size:48px;margin-bottom:16px">📊</div>
        <div style="font-size:18px;font-weight:700;margin-bottom:8px">Ranking Semanal Ativo</div>
        <p class="text-secondary">Reinicia toda segunda-feira às 00:00</p>
        <div class="mt-20">
          ${r.slice(0,5).map((p,i) => `
            <div class="rank-item ${i<3?`rank-${i+1}`:''}">
              <div class="rank-number ${i===0?'gold': i===1?'silver': i===2?'bronze':''}">#${i+1}</div>
              <div class="avatar" style="width:32px;height:32px;background:${Utils.avatarColor(p.avatar)};font-size:12px">${p.avatar}</div>
              <div style="flex:1;text-align:left;font-size:13px">${p.name}</div>
              <div class="font-mono text-sm text-neon-green">+${Math.floor(p.xp*0.12)} XP</div>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Aba: Casas -->
    <div id="tab-casas" class="tab-content">
      <div class="grid-2 mt-8 gap-16">
        ${MockData.houses.map(h => `
          <div class="house-card" style="border-color:${h.color}20;background:${h.color}08">
            <span class="house-icon">${h.emoji}</span>
            <div style="font-family:var(--font-display);font-size:22px;font-weight:800;color:${h.color}">${h.name}</div>
            <div class="text-secondary text-sm mt-4 mb-16">${h.desc}</div>
            <div class="flex justify-between text-sm mb-8">
              <span class="text-secondary">${h.members} membros</span>
              <span class="font-mono" style="color:${h.color}">${Utils.num(h.xp)} XP</span>
            </div>
            <div class="xp-bar-track">
              <div style="height:100%;background:${h.color};border-radius:999px;width:${Math.round(h.xp/MockData.houses[0].xp*100)}%"></div>
            </div>
            <div class="mt-12">
              <span class="badge" style="background:${h.color}20;color:${h.color};border:1px solid ${h.color}40">#${h.rank} lugar</span>
            </div>
          </div>`).join('')}
      </div>
    </div>
  </div>`;
});


// ────────────────────────────────────────────
// MISSÕES
// ────────────────────────────────────────────
Router.register('missions', () => {
  const done    = MockData.missions.filter(m => m.done);
  const pending = MockData.missions.filter(m => !m.done);

  return `<div class="page-inner">
    <div class="page-header"><h1>🎯 <span class="text-gradient">Sistema de Missões</span></h1><p>Complete desafios e ganhe recompensas épicas</p></div>

    <!-- Resumo de progresso -->
    <div class="glass-card-static p-16 mb-24" style="background:linear-gradient(135deg,rgba(0,212,255,0.05),rgba(139,92,246,0.05))">
      <div class="flex gap-24 flex-wrap">
        <div class="text-center"><div class="font-mono text-neon-green" style="font-size:28px;font-weight:800">${done.length}</div><div class="text-sm text-muted">Concluídas</div></div>
        <div class="text-center"><div class="font-mono text-neon-blue" style="font-size:28px;font-weight:800">${pending.length}</div><div class="text-sm text-muted">Em andamento</div></div>
        <div class="text-center"><div class="font-mono text-neon-orange" style="font-size:28px;font-weight:800">${done.reduce((a,m)=>a+m.xp,0)}</div><div class="text-sm text-muted">XP Ganho</div></div>
        <div class="text-center"><div class="font-mono text-gold" style="font-size:28px;font-weight:800">🪙${done.reduce((a,m)=>a+m.coins,0)}</div><div class="text-sm text-muted">Coins Ganhos</div></div>
      </div>
    </div>

    <!-- Abas: Diárias / Semanais / Especiais -->
    <div class="tabs mb-20" data-tab-group="missions">
      <button class="tab-btn active" data-tab="tab-daily">Diárias</button>
      <button class="tab-btn" data-tab="tab-weekly">Semanais</button>
      <button class="tab-btn" data-tab="tab-special">Especiais</button>
    </div>

    ${['daily','weekly','special'].map((type, ti) => `
      <div id="tab-${type}" class="tab-content ${ti===0?'active':''}">
        <div class="flex-col gap-12">
          ${MockData.missions.filter(m => m.type===type).map(m => `
            <div class="mission-card ${m.done?'completed':''}"
              onclick="${m.done ? `Toast.info('Missão já concluída!')` : `completeMission(${m.id})`}">
              <div class="flex items-center gap-16">
                <div class="mission-icon" style="background:${m.done?'rgba(16,185,129,0.15)':'rgba(0,212,255,0.1)'};font-size:24px">${m.icon}</div>
                <div style="flex:1">
                  <div style="font-size:15px;font-weight:600;${m.done?'text-decoration:line-through;opacity:0.7':''}">${m.title}</div>
                  <div class="flex gap-12 mt-4">
                    <span class="badge badge-blue">+${m.xp} XP</span>
                    <span class="badge badge-orange">🪙 ${m.coins}</span>
                  </div>
                </div>
                <div style="flex-shrink:0">
                  ${m.done
                    ? '<div style="width:32px;height:32px;background:var(--neon-green);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#000;font-weight:800">✓</div>'
                    : '<div style="width:32px;height:32px;border:2px solid var(--border);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--text-muted)">○</div>'}
                </div>
              </div>
            </div>`).join('')}
        </div>
      </div>`).join('')}
  </div>`;
});


// ────────────────────────────────────────────
// FEED SOCIAL
// ────────────────────────────────────────────
Router.register('feed', () => {
  return `<div class="page-inner">
    <div class="page-header"><h1>📣 <span class="text-gradient">Feed Social</span></h1><p>Comunidade EduVerse · ${MockData.feed.length} publicações hoje</p></div>
    <div class="layout-sidebar-content">
      <div class="flex-col gap-16">
        <!-- Caixa de nova publicação -->
        <div class="glass-card-static p-20">
          <div class="flex gap-12 items-start">
            <div class="avatar" style="width:40px;height:40px;background:var(--neon-blue);font-size:14px;flex-shrink:0">LM</div>
            <div style="flex:1">
              <textarea class="input-field" placeholder="Compartilhe uma conquista…" style="resize:none;height:80px;margin-bottom:12px"></textarea>
              <div class="flex justify-between items-center">
                <div class="flex gap-8">
                  <button class="btn btn-glass btn-sm">📷 Foto</button>
                  <button class="btn btn-glass btn-sm">🏆 Conquista</button>
                </div>
                <button class="btn btn-primary btn-sm" onclick="Toast.success('Publicado! +10 XP')">Publicar</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Posts do feed -->
        ${MockData.feed.map(p => `
          <div class="post-card">
            <div class="flex items-start gap-12 mb-16">
              <div class="avatar avatar-online" style="width:44px;height:44px;background:${Utils.avatarColor(p.avatar)};font-size:15px;flex-shrink:0">${p.avatar}</div>
              <div style="flex:1">
                <div class="flex items-center gap-8 flex-wrap">
                  <strong style="font-size:14px">${p.author}</strong>
                  <span class="badge ${p.role==='professor'?'badge-blue': p.role==='system'?'badge-gold': p.role==='admin'?'badge-purple':'badge-green'}">
                    ${p.role==='professor'?'Professor': p.role==='system'?'EduVerse': p.role==='admin'?'Direção':'Aluno'}
                  </span>
                </div>
                <div class="text-sm text-muted">${p.time}</div>
              </div>
            </div>
            <p style="font-size:14px;margin-bottom:16px;line-height:1.7">${p.content}</p>
            <div class="divider"></div>
            <div class="post-actions">
              <button class="like-btn post-action-btn ${p.liked?'liked':''}" style="color:${p.liked?'var(--neon-pink)':''}">
                ❤️ <span class="like-count">${p.likes}</span>
              </button>
              <button class="post-action-btn" onclick="Toast.info('Comentários em breve!')">💬 ${p.comments}</button>
              <button class="post-action-btn" onclick="Toast.success('Compartilhado!')">↗️ Compartilhar</button>
            </div>
          </div>`).join('')}
      </div>

      <!-- Sidebar do feed -->
      <div class="flex-col gap-16">
        <div class="glass-card-static p-20">
          <div class="section-title mb-16">🔥 Em Alta</div>
          <div class="flex-col gap-8">
            ${['#FeiraDeCiências','#QuizMatemática','#OlimpíadaFísica','#SucessoTurma9A','#EduVerseChampion']
              .map((tag,i) => `
                <div class="flex justify-between items-center text-sm">
                  <span style="color:var(--neon-blue);cursor:pointer">${tag}</span>
                  <span class="text-muted">${[42,38,31,28,19][i]} posts</span>
                </div>`).join('')}
          </div>
        </div>
        <div class="glass-card-static p-20">
          <div class="section-title mb-16">👥 Destaques</div>
          <div class="flex-col gap-12">
            ${MockData.ranking.slice(0,4).map(p => `
              <div class="flex items-center gap-12">
                <div class="avatar" style="width:36px;height:36px;background:${Utils.avatarColor(p.avatar)};font-size:12px">${p.avatar}</div>
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:600">${p.name.split(' ')[0]}</div>
                  <div class="text-sm text-muted">${Utils.num(p.xp)} XP</div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
});


// ────────────────────────────────────────────
// IA EDUCACIONAL
// ────────────────────────────────────────────
Router.register('ai', () => {
  return `<div class="page-inner">
    <div class="page-header"><h1>🤖 <span class="text-gradient">IA Educacional</span></h1><p>Inteligência artificial analisando seu desempenho em tempo real</p></div>

    <!-- Alertas e recomendações da IA -->
    <div class="flex-col gap-12 mb-24">
      ${MockData.aiMessages.map(m => `
        <div class="glass-card-static p-20" style="border-left:3px solid ${
          m.type==='warning'?'var(--neon-orange)': m.type==='success'?'var(--neon-green)': m.type==='alert'?'var(--neon-red)':'var(--neon-blue)'}">
          <div class="flex items-center gap-12">
            <span style="font-size:22px">${m.icon}</span>
            <p style="font-size:14px">${m.text}</p>
          </div>
        </div>`).join('')}
    </div>

    <div class="layout-sidebar-content mb-24">
      <!-- Gráfico de evolução -->
      <div class="glass-card-static p-20">
        <div class="section-title mb-16">Evolução Semanal por Matéria</div>
        <div class="chart-container" style="height:280px"><canvas id="chart-ai-performance"></canvas></div>
      </div>

      <!-- Score e recomendações -->
      <div class="flex-col gap-16">
        <div class="glass-card-static p-20 text-center" style="background:linear-gradient(135deg,rgba(16,185,129,0.05),rgba(0,212,255,0.05))">
          <div class="section-title mb-16" style="justify-content:center">Score Geral</div>
          <div style="font-size:56px;font-family:var(--font-display);font-weight:800;color:var(--neon-green)">A+</div>
          <div class="text-secondary text-sm mb-16">Acima da média escolar</div>
          <div class="flex-col gap-8">
            ${[{label:'Dedicação',val:88},{label:'Consistência',val:76},{label:'Evolução',val:92},{label:'Participação',val:71}].map(i => `
              <div>
                <div class="flex justify-between text-sm mb-4">
                  <span>${i.label}</span>
                  <span class="font-mono text-neon-blue">${i.val}%</span>
                </div>
                <div class="xp-bar-track" style="height:5px">
                  <div style="height:100%;background:linear-gradient(135deg,#00d4ff,#8b5cf6);border-radius:999px;width:${i.val}%"></div>
                </div>
              </div>`).join('')}
          </div>
        </div>
        <div class="glass-card-static p-20">
          <div class="section-title mb-12">Recomendações</div>
          <div class="flex-col gap-8 text-sm">
            <div class="flex gap-8 items-start"><span>📖</span><span>Revise os capítulos 4-5 de Física antes da prova</span></div>
            <div class="flex gap-8 items-start"><span>🎯</span><span>Faça ao menos 2 quizzes de Química esta semana</span></div>
            <div class="flex gap-8 items-start"><span>⏱️</span><span>Tente sessões de foco de 45min em Matemática</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat com EduBot -->
    <div class="glass-card-static p-20">
      <div class="section-title mb-16">💬 Pergunte à IA</div>
      <div style="background:rgba(0,0,0,0.2);border-radius:var(--radius-md);padding:16px;height:200px;overflow-y:auto;margin-bottom:12px;font-size:13px" id="ai-chat-messages">
        <div style="color:var(--neon-blue);margin-bottom:8px"><strong>EduBot:</strong> Olá, ${MockData.user.name.split(' ')[0]}! Como posso ajudar com seus estudos hoje?</div>
      </div>
      <div class="flex gap-12">
        <input type="text" class="input-field" placeholder="Ex: Como melhorar em Física?"
          id="ai-chat-input" onkeydown="if(event.key==='Enter') sendAIChat()">
        <button class="btn btn-primary" onclick="sendAIChat()">Enviar</button>
      </div>
    </div>
  </div>`;
});


// ────────────────────────────────────────────
// BIBLIOTECA
// ────────────────────────────────────────────
Router.register('library', () => {
  return `<div class="page-inner">
    <div class="page-header flex justify-between items-center flex-wrap gap-16">
      <div><h1>📚 <span class="text-gradient">Biblioteca Virtual</span></h1><p>Seu acervo digital exclusivo EduVerse</p></div>
    </div>
    <div class="tabs mb-20" data-tab-group="library">
      <button class="tab-btn active" data-tab="tab-all">Todos</button>
      <button class="tab-btn" data-tab="tab-reading">Lendo</button>
      <button class="tab-btn" data-tab="tab-videos">Vídeoaulas</button>
    </div>

    <!-- Todos os livros -->
    <div id="tab-all" class="tab-content active">
      <div class="grid-auto">
        ${MockData.books.map(b => `
          <div class="book-card" onclick="Toast.info('Abrindo: ${b.title}')">
            <div class="book-cover" style="background:${b.progress===100?'rgba(16,185,129,0.1)': b.progress>50?'rgba(0,212,255,0.1)':'rgba(139,92,246,0.1)'}">
              ${b.emoji}
            </div>
            <div style="font-size:14px;font-weight:700;margin-bottom:4px">${b.title}</div>
            <div class="text-sm text-muted mb-8">${b.author}</div>
            <span class="badge badge-blue mb-12">${b.subject}</span>
            <div>
              <div class="flex justify-between text-sm mb-4">
                <span class="text-muted">Progresso</span>
                <span class="font-mono" style="color:${b.progress===100?'var(--neon-green)':'var(--neon-blue)'}">${b.progress}%</span>
              </div>
              <div class="xp-bar-track" style="height:5px">
                <div style="height:100%;background:${b.progress===100?'var(--neon-green)':'linear-gradient(135deg,#00d4ff,#8b5cf6)'};border-radius:999px;width:${b.progress}%"></div>
              </div>
            </div>
            ${b.progress===100 ? '<div class="badge badge-green w-full mt-12" style="justify-content:center">✓ Concluído</div>' : ''}
          </div>`).join('')}
      </div>
    </div>

    <!-- Em leitura -->
    <div id="tab-reading" class="tab-content">
      <div class="grid-auto">
        ${MockData.books.filter(b => b.progress>0 && b.progress<100).map(b => `
          <div class="book-card">
            <div class="book-cover" style="background:rgba(0,212,255,0.1)">${b.emoji}</div>
            <div style="font-size:14px;font-weight:700">${b.title}</div>
            <div class="text-sm text-muted">${b.progress}% concluído</div>
          </div>`).join('')}
      </div>
    </div>

    <!-- Vídeoaulas -->
    <div id="tab-videos" class="tab-content">
      <div class="grid-3">
        ${['Álgebra Avançada','Química Orgânica','Física Quântica','Redação ENEM','História do Brasil','Biologia Celular'].map((v,i) => `
          <div class="glass-card-static p-20 text-center" style="cursor:pointer" onclick="Toast.info('Abrindo vídeo: ${v}')">
            <div style="background:rgba(0,0,0,0.3);border-radius:var(--radius-md);height:100px;display:flex;align-items:center;justify-content:center;font-size:36px;margin-bottom:12px">▶️</div>
            <div style="font-size:14px;font-weight:600">${v}</div>
            <div class="text-sm text-muted mt-4">${[45,32,58,28,41,37][i]} min</div>
          </div>`).join('')}
      </div>
    </div>
  </div>`;
});


// ────────────────────────────────────────────
// LOJA
// ────────────────────────────────────────────
Router.register('store', () => {
  const u = MockData.user;
  return `<div class="page-inner">
    <div class="page-header flex justify-between items-center flex-wrap gap-16">
      <div><h1>🛍️ <span class="text-gradient">Loja EduVerse</span></h1><p>Troque seus EduCoins por benefícios reais</p></div>
      <div class="glass-card-static p-16 flex items-center gap-12">
        <span style="font-size:22px">🪙</span>
        <div>
          <div class="font-mono text-neon-orange" style="font-size:22px;font-weight:700" id="store-coins">${Utils.num(u.coins)}</div>
          <div class="text-sm text-muted">EduCoins disponíveis</div>
        </div>
      </div>
    </div>
    <div class="grid-3 gap-16">
      ${MockData.store.map(item => `
        <div class="store-item">
          <span class="store-icon">${item.emoji}</span>
          <div style="font-size:16px;font-weight:700;margin-bottom:6px">${item.title}</div>
          <div class="text-sm text-muted mb-16">${item.desc}</div>
          <div class="flex items-center justify-between">
            <div class="font-mono text-neon-orange" style="font-size:16px;font-weight:700">🪙 ${item.price}</div>
            <button class="btn btn-primary btn-sm" onclick="buyItem(${item.id},'${item.title}',${item.price})">
              ${u.coins>=item.price ? 'Comprar' : '🔒 Bloqueado'}
            </button>
          </div>
        </div>`).join('')}
    </div>
  </div>`;
});


// ────────────────────────────────────────────
// EVENTOS
// ────────────────────────────────────────────
Router.register('events', () => {
  return `<div class="page-inner">
    <div class="page-header"><h1>📅 <span class="text-gradient">Painel de Eventos</span></h1><p>Calendário escolar e atividades especiais</p></div>
    <div class="layout-sidebar-content">
      <!-- Lista de eventos -->
      <div class="flex-col gap-16">
        ${MockData.events.map(e => `
          <div class="glass-card-static p-20" style="border-left:3px solid ${e.color}">
            <div class="flex items-center gap-16">
              <div style="font-family:var(--font-mono);font-size:12px;color:${e.color};font-weight:700;flex-shrink:0;width:60px;text-align:center;padding:8px;background:${e.color}15;border-radius:var(--radius-sm)">${e.date}</div>
              <div style="flex:1">
                <div style="font-size:15px;font-weight:700">${e.title}</div>
                <div class="text-sm text-muted mt-4">
                  ${e.type==='test'?'Avaliação': e.type==='quiz'?'Quiz Interativo': e.type==='contest'?'Competição':'Evento Escolar'}
                </div>
              </div>
              <div class="flex-col items-center gap-8">
                ${e.xp>0 ? `<span class="badge badge-green">+${e.xp} XP</span>` : '<span class="badge badge-orange">Prova</span>'}
                <button class="btn btn-glass btn-sm" onclick="Toast.success('Inscrição confirmada!')">Inscrever</button>
              </div>
            </div>
          </div>`).join('')}
      </div>

      <!-- Resumo do mês -->
      <div class="glass-card-static p-20">
        <div class="section-title mb-16">Resumo do Mês</div>
        <div class="flex-col gap-12">
          <div class="flex justify-between"><span class="text-secondary">Total de eventos</span><span class="font-mono">${MockData.events.length}</span></div>
          <div class="flex justify-between"><span class="text-secondary">XP disponível</span><span class="font-mono text-neon-green">+950</span></div>
          <div class="flex justify-between"><span class="text-secondary">Inscrições abertas</span><span class="font-mono text-neon-blue">3</span></div>
          <div class="divider"></div>
          <button class="btn btn-primary w-full justify-center" onclick="Toast.success('Exportando calendário!')">📥 Exportar Calendário</button>
        </div>
      </div>
    </div>
  </div>`;
});


// ────────────────────────────────────────────
// FINANCEIRO
// ────────────────────────────────────────────
Router.register('financial', () => {
  return `<div class="page-inner">
    <div class="page-header"><h1>💳 <span class="text-gradient">Painel Financeiro</span></h1><p>Acompanhe mensalidades e histórico de pagamentos</p></div>
    <div class="grid-3 mb-24">
      <div class="stat-card"><div class="stat-icon" style="background:rgba(16,185,129,0.1)">✅</div><div class="stat-value text-neon-green">Em dia</div><div class="stat-label">Situação Atual</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(0,212,255,0.1)">💰</div><div class="stat-value text-gradient">R$ 1.580</div><div class="stat-label">Próximo Vencimento</div><div class="stat-delta">10/06/2025</div></div>
      <div class="stat-card"><div class="stat-icon" style="background:rgba(245,158,11,0.1)">📊</div><div class="stat-value">R$ 9.480</div><div class="stat-label">Total 2025</div><div class="stat-delta up">5 parcelas pagas</div></div>
    </div>
    <div class="layout-sidebar-content">
      <div class="glass-card-static p-20">
        <div class="section-title mb-16">Histórico de Pagamentos</div>
        <div class="flex-col gap-8">
          ${['Jan','Fev','Mar','Abr','Mai'].map((m,i) => `
            <div class="flex items-center gap-16 p-16" style="background:var(--bg-glass);border-radius:var(--radius-md)">
              <div class="text-neon-green" style="font-size:20px">✅</div>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:600">Mensalidade ${m}/2025</div>
                <div class="text-sm text-muted">Pago em ${['10 Jan','08 Fev','12 Mar','09 Abr','10 Mai'][i]}</div>
              </div>
              <div class="font-mono" style="font-size:14px;font-weight:700">R$ 1.580</div>
            </div>`).join('')}
          <!-- Mensalidade pendente -->
          <div class="flex items-center gap-16 p-16" style="background:rgba(245,158,11,0.05);border:1px solid rgba(245,158,11,0.2);border-radius:var(--radius-md)">
            <div class="text-neon-orange" style="font-size:20px">⏳</div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:600">Mensalidade Jun/2025</div>
              <div class="text-sm text-neon-orange">Vence em 10/06/2025</div>
            </div>
            <div class="flex gap-8 items-center">
              <div class="font-mono" style="font-size:14px;font-weight:700">R$ 1.580</div>
              <button class="btn btn-primary btn-sm" onclick="Toast.success('Redirecionando para pagamento!')">Pagar</button>
            </div>
          </div>
        </div>
      </div>
      <div class="glass-card-static p-20">
        <div class="section-title mb-16">Distribuição</div>
        <div class="chart-container" style="height:220px"><canvas id="chart-financial"></canvas></div>
      </div>
    </div>
  </div>`;
});


// ────────────────────────────────────────────
// GAMIFICAÇÃO
// ────────────────────────────────────────────
Router.register('gamification', () => {
  const u = MockData.user;
  return `<div class="page-inner">
    <div class="page-header"><h1>🎮 <span class="text-gradient">Sistema de Gamificação</span></h1><p>Transforme seu aprendizado em uma aventura épica</p></div>

    <!-- Card de perfil do jogador -->
    <div class="glass-card-static p-24 mb-24" style="background:linear-gradient(135deg,rgba(0,212,255,0.05),rgba(139,92,246,0.05))">
      <div class="flex items-center gap-20">
        <div style="position:relative">
          <div class="avatar avatar-ring animate-float" style="width:80px;height:80px;background:linear-gradient(135deg,#00d4ff,#8b5cf6);font-size:28px">
            ${u.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
          </div>
          <div style="position:absolute;bottom:-4px;right:-4px;background:var(--neon-orange);border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;font-family:var(--font-display);border:2px solid var(--bg-surface)">${u.level}</div>
        </div>
        <div style="flex:1">
          <h2>${u.name}</h2>
          <div class="flex gap-8 mt-4 flex-wrap">
            <span class="badge badge-gold">Nível ${u.level}</span>
            <span class="badge badge-blue">🦅 ${u.house}</span>
            <span class="badge badge-purple">${u.title}</span>
          </div>
          <div class="mt-12">
            <div class="flex justify-between text-sm text-muted mb-4">
              <span>XP para o próximo nível</span>
              <span>${Utils.num(u.xpNext-u.xp)} restantes</span>
            </div>
            <div class="xp-bar-track" style="height:12px">
              <div class="xp-bar-fill" style="width:${Math.round(u.xp/u.xpNext*100)}%"></div>
            </div>
          </div>
        </div>
        <div class="flex-col gap-16 text-center" style="flex-shrink:0">
          <div>
            <div class="font-mono text-neon-orange" style="font-size:24px;font-weight:700">${Utils.num(u.coins)}</div>
            <div class="text-sm text-muted">EduCoins</div>
          </div>
          <div>
            <div class="font-mono text-neon-green" style="font-size:24px;font-weight:700">${u.streak}🔥</div>
            <div class="text-sm text-muted">Dias streak</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Conquistas -->
    <div class="section-header">
      <div class="section-title">Conquistas</div>
      <span class="text-secondary text-sm">${MockData.achievements.filter(a=>a.unlocked).length}/${MockData.achievements.length} desbloqueadas</span>
    </div>
    <div class="grid-4 mb-24">
      ${MockData.achievements.map(a => `
        <div class="achievement-card ${a.unlocked?'unlocked':'locked'}" onclick="Toast.info('${a.title}: ${a.desc}')">
          <span class="achievement-emoji">${a.emoji}</span>
          <div style="font-size:13px;font-weight:700">${a.title}</div>
          <div class="text-sm text-muted mt-4">${a.desc}</div>
          ${a.unlocked
            ? '<div class="badge badge-green mt-8" style="margin:8px auto 0;display:inline-flex">✓ Desbloqueada</div>'
            : '<div class="badge mt-8" style="margin:8px auto 0;display:inline-flex;background:rgba(255,255,255,0.05);color:var(--text-muted);border-color:var(--border)">🔒 Bloqueada</div>'}
        </div>`).join('')}
    </div>

    <!-- Títulos disponíveis -->
    <div class="glass-card-static p-20 mb-24">
      <div class="section-title mb-16">Títulos Disponíveis</div>
      <div class="flex flex-wrap gap-8">
        ${['Mestre da Matemática','Lenda da Frequência','Gênio da Redação','Ninja da Ciência','Campeão do Quiz','Explorador da Biblioteca','Herói da Turma'].map((t,i) => `
          <span class="badge ${i===0?'badge-gold':'badge-purple'}" style="padding:6px 12px;font-size:12px;cursor:pointer" onclick="Toast.info('Título: ${t}')">${i===0?'★ ':''} ${t}</span>`).join('')}
      </div>
    </div>

    <!-- Árvore de habilidades -->
    <div class="glass-card-static p-20">
      <div class="section-title mb-16">Árvore de Habilidades</div>
      <div class="grid-3 gap-16">
        ${[
          {name:'Exato',   icon:'📐', skills:['Cálculo Básico','Álgebra','Geometria','Cálculo Avançado'], prog:[100,100,80,30]},
          {name:'Humanas', icon:'📜', skills:['Leitura','Redação','Interpretação','Filosofia'],           prog:[100,90,75,20]},
          {name:'Natural', icon:'🔬', skills:['Biologia','Química','Física','Lab Avançado'],              prog:[85,70,60,10]},
        ].map(branch => `
          <div>
            <div class="flex items-center gap-8 mb-16">
              <span style="font-size:24px">${branch.icon}</span>
              <div style="font-weight:700">${branch.name}</div>
            </div>
            <div class="flex-col gap-10">
              ${branch.skills.map((skill,i) => `
                <div>
                  <div class="flex justify-between text-sm mb-4">
                    <span ${branch.prog[i]<20?'class="text-muted"':''}>${skill}</span>
                    <span class="font-mono" style="color:${branch.prog[i]===100?'var(--neon-green)': branch.prog[i]>50?'var(--neon-blue)':'var(--text-muted)'}">${branch.prog[i]}%</span>
                  </div>
                  <div class="xp-bar-track" style="height:5px">
                    <div style="height:100%;background:${branch.prog[i]===100?'var(--neon-green)': branch.prog[i]>50?'linear-gradient(135deg,#00d4ff,#8b5cf6)':'rgba(255,255,255,0.2)'};border-radius:999px;width:${branch.prog[i]}%"></div>
                  </div>
                </div>`).join('')}
            </div>
          </div>`).join('')}
      </div>
    </div>
  </div>`;
});


// ────────────────────────────────────────────
// WRAPPED ANUAL
// ────────────────────────────────────────────
Router.register('wrapped', () => {
  const u = MockData.user;
  return `<div class="page-inner">
    <div class="page-header"><h1>✨ <span class="text-gradient">EduVerse Wrapped 2025</span></h1><p>Seu ano escolar em números épicos</p></div>

    <div class="wrapped-hero mb-24">
      <div style="position:relative;z-index:1;text-align:center">
        <div style="font-size:48px;margin-bottom:16px">🎓</div>
        <div style="font-family:var(--font-display);font-size:36px;font-weight:800;margin-bottom:8px" class="text-gradient">2025 foi incrível!</div>
        <p class="text-secondary">Aqui está um resumo do seu ano escolar, ${u.name.split(' ')[0]}</p>
      </div>
    </div>

    <div class="grid-4 mb-24">
      <div class="stat-card text-center"><div style="font-size:36px;margin-bottom:8px">🔥</div><div class="stat-value text-gradient">18</div><div class="stat-label">Maior Streak</div></div>
      <div class="stat-card text-center"><div style="font-size:36px;margin-bottom:8px">⭐</div><div class="stat-value text-gradient">5.200</div><div class="stat-label">XP Total 2025</div></div>
      <div class="stat-card text-center"><div style="font-size:36px;margin-bottom:8px">🏆</div><div class="stat-value text-gradient">#3</div><div class="stat-label">Melhor Ranking</div></div>
      <div class="stat-card text-center"><div style="font-size:36px;margin-bottom:8px">📚</div><div class="stat-value text-gradient">4</div><div class="stat-label">Livros Lidos</div></div>
    </div>

    <div class="layout-sidebar-content mb-24">
      <div class="glass-card-static p-20">
        <div class="section-title mb-16">XP Ganho por Mês</div>
        <div class="chart-container" style="height:220px"><canvas id="chart-wrapped-xp"></canvas></div>
      </div>
      <div class="flex-col gap-16">
        <div class="glass-card-static p-20 text-center" style="background:linear-gradient(135deg,rgba(0,212,255,0.08),rgba(139,92,246,0.08))">
          <div style="font-size:40px;margin-bottom:12px">🧠</div>
          <div style="font-family:var(--font-display);font-size:20px;font-weight:800" class="text-gradient">Matéria Favorita</div>
          <div style="font-size:28px;font-weight:700;margin:8px 0">Matemática</div>
          <div class="text-sm text-secondary">Média: 9.2 · 15 aulas assistidas</div>
        </div>
        <div class="glass-card-static p-20 text-center" style="background:linear-gradient(135deg,rgba(245,158,11,0.08),rgba(239,68,68,0.08))">
          <div style="font-size:40px;margin-bottom:12px">🏅</div>
          <div style="font-family:var(--font-display);font-size:20px;font-weight:800">Conquista do Ano</div>
          <div style="font-size:22px;font-weight:700;margin:8px 0" class="text-gold">Campeão do Quiz</div>
          <div class="text-sm text-secondary">1° lugar na Olimpíada de Mat.</div>
        </div>
      </div>
    </div>

    <div class="glass-card-static p-24 text-center">
      <div style="font-size:48px;margin-bottom:16px">🚀</div>
      <h2 style="font-size:24px;margin-bottom:12px">2026 vai ser ainda maior!</h2>
      <p class="text-secondary mb-24">Continue sua jornada de excelência com a EduVerse</p>
      <button class="btn btn-primary btn-lg" onclick="Toast.success('Compartilhado nas redes sociais!')">📤 Compartilhar meu Wrapped</button>
    </div>
  </div>`;
});


// ────────────────────────────────────────────
// PERFIL
// ────────────────────────────────────────────
Router.register('profile', () => {
  const u = MockData.user;
  return `<div class="page-inner">
    <div class="page-header"><h1>👤 <span class="text-gradient">Meu Perfil</span></h1></div>
    <div class="layout-sidebar-content">
      <div class="flex-col gap-20">
        <!-- Dados do perfil -->
        <div class="glass-card-static p-24">
          <div class="flex items-center gap-20 mb-20">
            <div class="avatar avatar-ring animate-float" style="width:80px;height:80px;background:linear-gradient(135deg,#00d4ff,#8b5cf6);font-size:28px">
              ${u.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
            </div>
            <div>
              <h2>${u.name}</h2>
              <div class="flex gap-8 mt-8 flex-wrap">
                <span class="badge badge-gold">Nível ${u.level}</span>
                <span class="badge badge-blue">🦅 ${u.house}</span>
                <span class="badge badge-purple">${u.title}</span>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="grid-2 gap-16 mt-16">
            <div><label class="text-sm text-muted">Nome Completo</label><div class="mt-4 font-600">${u.name}</div></div>
            <div><label class="text-sm text-muted">Turma</label><div class="mt-4 font-600">9° Ano A</div></div>
            <div><label class="text-sm text-muted">Matrícula</label><div class="mt-4 font-mono">2025-09-047</div></div>
            <div><label class="text-sm text-muted">Turno</label><div class="mt-4">Manhã</div></div>
          </div>
        </div>

        <!-- Estatísticas gerais -->
        <div class="glass-card-static p-20">
          <div class="section-title mb-16">Estatísticas Gerais</div>
          <div class="grid-2 gap-12">
            <div class="stat-card" style="padding:14px"><div class="stat-value text-gradient">${Utils.num(u.xp)}</div><div class="stat-label">XP Total</div></div>
            <div class="stat-card" style="padding:14px"><div class="stat-value text-neon-orange">${Utils.num(u.coins)}</div><div class="stat-label">EduCoins</div></div>
            <div class="stat-card" style="padding:14px"><div class="stat-value text-neon-green">${u.streak}</div><div class="stat-label">Streak Atual</div></div>
            <div class="stat-card" style="padding:14px"><div class="stat-value text-gold">#3</div><div class="stat-label">Ranking</div></div>
          </div>
        </div>
      </div>

      <!-- Sidebar do perfil -->
      <div class="flex-col gap-16">
        <div class="glass-card-static p-20 text-center">
          <div style="font-size:48px;margin-bottom:12px">🦅</div>
          <div style="font-family:var(--font-display);font-size:20px;font-weight:800;color:var(--neon-blue)">Casa ${u.house}</div>
          <div class="text-sm text-muted mt-8">"Coragem e lealdade"</div>
          <div class="mt-16"><span class="badge badge-blue">#1 do Ranking de Casas</span></div>
        </div>
        <div class="glass-card-static p-20">
          <div class="section-title mb-16">Badges Conquistados</div>
          <div class="flex flex-wrap gap-8">
            ${MockData.achievements.filter(a=>a.unlocked).map(a => `
              <div class="achievement-card" style="padding:12px;flex:0 0 calc(33% - 8px)" onclick="Toast.info('${a.title}: ${a.desc}')">
                <span class="achievement-emoji" style="font-size:24px">${a.emoji}</span>
                <div class="text-sm" style="font-size:11px;margin-top:4px">${a.title}</div>
              </div>`).join('')}
          </div>
        </div>
        <button class="btn btn-glass w-full justify-center" onclick="Toast.info('Edição de perfil em breve!')">✏️ Editar Perfil</button>
      </div>
    </div>
  </div>`;
});