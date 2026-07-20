/* ==========================================================================
   CONNECTUP INTELLIGENCE - INTERACTIVE ENGINE & SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#0B1021';
                navLinks.style.padding = '24px';
                navLinks.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            }
        });
    }

    // 4. Hero Stats Counter Animation
    const statsNumbers = document.querySelectorAll('.stat-number');
    let animatedStats = false;

    function animateStats() {
        if (animatedStats) return;
        statsNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let count = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.ceil(count);
                }
            }, 30);
        });
        animatedStats = true;
    }

    // Trigger stats animation when hero is visible
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateStats();
            }
        }, { threshold: 0.3 });
        observer.observe(heroSection);
    }

    // 5. Interactive Demo Tab Switcher
    const demoTabBtns = document.querySelectorAll('.demo-tab-btn');
    const demoTabContents = document.querySelectorAll('.demo-tab-content');

    demoTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            demoTabBtns.forEach(b => b.classList.remove('active'));
            demoTabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetTab = document.getElementById(btn.getAttribute('data-tab'));
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });

    // 6. FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const faqItem = q.parentElement;
            faqItem.classList.toggle('active');
        });
    });

    // 7. Background Neural Network Canvas Animation
    initNeuralCanvas();
});

/* ==========================================================================
   NEURAL CANVAS ANIMATION
   ========================================================================== */
function initNeuralCanvas() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 20), 60);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            radius: Math.random() * 2.5 + 1,
            color: Math.random() > 0.5 ? '#00F2FE' : '#00F5A0'
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 242, 254, ${1 - dist / 150 * 0.8})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    draw();
}

/* ==========================================================================
   LIVE AGENT DEMO (SIMULATED AI CHAT)
   ========================================================================== */
const botKnowledge = [
    {
        keywords: ['reunião', 'agendar', 'agendamento', 'comercial', 'contato'],
        reply: "Perfeito! Posso agendar uma reunião diretamente na agenda do nosso Engenheiro de IA. Qual o melhor dia e horário para você?"
    },
    {
        keywords: ['jiu-jitsu', 'academia', 'artes marciais', 'tatame', 'faixa', 'reconhecimento facial'],
        reply: "Nosso sistema para academias de Jiu-Jitsu utiliza Visão Computacional para identificar o aluno por reconhecimento facial ao entrar no tatame. Ele contabiliza a presença para graduação de faixas, automatiza cobranças e elimina mensalidades em atraso via WhatsApp!"
    },
    {
        keywords: ['erp', 'crm', 'integração', 'sistemas', 'banco de dados', 'api'],
        reply: "Sim! Desenvolvemos conectores sob medida para integrar nossos Agentes de IA e Visão Computacional a ERPs (TOTVS, SAP, Omie) e CRMs (HubSpot, RD Station, Salesforce) via APIs REST seguras."
    },
    {
        keywords: ['preço', 'valor', 'custo', 'orçamento'],
        reply: "Cada projeto ConnectUP é desenvolvido sob medida conforme as necessidades do cliente. Você pode simular um diagnóstico na seção 'Diagnóstico IA' abaixo ou nos enviar uma mensagem direta para receber uma proposta personalizada."
    }
];

function sendChatPreset(text) {
    document.getElementById('chat-input').value = text;
    sendChatMessage();
}

function handleChatKeyPress(e) {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;

    const chatBox = document.getElementById('chat-box');

    // Add User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-msg user-msg';
    userDiv.innerHTML = `<p>${escapeHtml(message)}</p><span class="msg-time">Agora</span>`;
    chatBox.appendChild(userDiv);

    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simulate AI Thinking
    setTimeout(() => {
        let replyText = "A ConnectUP Intelligence desenvolve soluções em IA sob medida para otimizar processos e criar produtos digitais inovadores. Gostaria de agendar um diagnóstico técnico?";
        
        const lowerMsg = message.toLowerCase();
        for (const item of botKnowledge) {
            if (item.keywords.some(kw => lowerMsg.includes(kw))) {
                replyText = item.reply;
                break;
            }
        }

        const botDiv = document.createElement('div');
        botDiv.className = 'chat-msg bot-msg';
        botDiv.innerHTML = `<p>${replyText}</p><span class="msg-time">Agora</span>`;
        chatBox.appendChild(botDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 700);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/* ==========================================================================
   COMPUTER VISION DEMO SWITCHER
   ========================================================================== */
function switchVisionMode(mode) {
    const btns = document.querySelectorAll('.v-mode-btn');
    btns.forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const algo = document.getElementById('telemetry-algo');
    const latency = document.getElementById('telemetry-latency');
    const acc = document.getElementById('telemetry-acc');
    const box1Label = document.querySelector('.box-1 .box-label');
    const box2Label = document.querySelector('.box-2 .box-label');

    if (mode === 'facial') {
        algo.textContent = "Deep Face Net v4.2 (ResNet-101)";
        latency.textContent = "18ms";
        acc.textContent = "99.8%";
        box1Label.textContent = "FACIAL: ID #8492 (Confirmado)";
        box2Label.textContent = "RECONHECIMENTO EM TEMPO REAL";
    } else if (mode === 'ocr') {
        algo.textContent = "Neural OCR & Document Parser v2.0";
        latency.textContent = "35ms";
        acc.textContent = "99.4%";
        box1Label.textContent = "OCR: CNPJ / Documento Extraído";
        box2Label.textContent = "APROVAÇÃO AUTOMÁTICA";
    } else if (mode === 'counting') {
        algo.textContent = "YOLOv8 Edge Object Counter";
        latency.textContent = "12ms";
        acc.textContent = "98.9%";
        box1Label.textContent = "CONTAGEM: 14 Pessoas / Tatame";
        box2Label.textContent = "MONITORAMENTO OPERACIONAL";
    }
}

/* ==========================================================================
   DIAGNOSTIC & ROI SIMULATOR FORM
   ========================================================================== */
function generateDiagnostic(e) {
    e.preventDefault();

    const sector = document.getElementById('diag-sector').value;
    const size = document.getElementById('diag-size').value;
    const goal = document.querySelector('input[name="diag-goal"]:checked').value;

    const resultBox = document.getElementById('diagnostic-result');
    const stackList = document.getElementById('res-tech-stack');
    const roiVal = document.getElementById('res-roi-val');
    const roiDesc = document.getElementById('res-roi-desc');
    const btnWa = document.getElementById('btn-whatsapp-diag');

    let techStack = [];
    let roi = "+60%";
    let desc = "Redução imediata em tarefas repetitivas e ganho em tempo de resposta.";

    if (goal.includes("WhatsApp")) {
        techStack = [
            "Agente de IA LLM (WhatsApp Business API)",
            "Integração nativa com CRM e Banco de Dados",
            "Qualificação automática de Leads (SDR Autônomo)",
            "Disparo inteligente de follow-ups e lembretes"
        ];
        roi = "+75%";
        desc = "Aumento na conversão de vendas e atendimento 24/7 sem fila de espera.";
    } else if (goal.includes("Automação")) {
        techStack = [
            "Motor de Automação de Processos por IA",
            "OCR Inteligente para leitura de contratos e notas",
            "Workflows de aprovação financeira autônoma",
            "Dashboards de controle operacional em tempo real"
        ];
        roi = "+65%";
        desc = "Economia de horas de trabalho manual e eliminação de falhas operacionais.";
    } else if (goal.includes("Visão Computacional")) {
        techStack = [
            "Sistema de Reconhecimento Facial em tempo real",
            "Integração com câmeras de monitoramento (RTSP/IP)",
            "Controle de acesso instantâneo sem catracas",
            "Alerta de segurança e relatórios de frequência"
        ];
        roi = "+85%";
        desc = "Automatização total do acesso de pessoas e aumento da segurança corporativa.";
    } else {
        techStack = [
            "Desenvolvimento Full-Stack de Aplicativo / SaaS Sob Medida",
            "IA Embarcada para experiência do usuário e recomendação",
            "Arquitetura em nuvem escalável com banco de dados seguro",
            "Módulo de BI e análise preditiva de dados"
        ];
        roi = "Diferencial Competitivo";
        desc = "Criação de um novo ativo digital valioso para sua empresa.";
    }

    stackList.innerHTML = techStack.map(item => `<li>${item}</li>`).join('');
    roiVal.textContent = roi;
    roiDesc.textContent = desc;

    // Build WhatsApp message link
    const waText = encodeURIComponent(
        `Olá! Realizei o Diagnóstico de IA no site da ConnectUP Intelligence.\n\n` +
        `*Setor:* ${sector}\n` +
        `*Porte:* ${size}\n` +
        `*Objetivo:* ${goal}\n\n` +
        `Gostaria de agendar uma conversa com um Engenheiro de IA para discutir esse projeto.`
    );
    btnWa.href = `https://wa.me/5511999999999?text=${waText}`;

    resultBox.classList.remove('hidden');
    resultBox.scrollIntoView({ behavior: 'smooth' });
}

/* ==========================================================================
   CONTACT FORM SUBMIT
   ========================================================================== */
function handleContactSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('c-name').value;
    const company = document.getElementById('c-company').value;
    const email = document.getElementById('c-email').value;
    const phone = document.getElementById('c-phone').value;
    const interest = document.getElementById('c-interest').value;
    const msg = document.getElementById('c-msg').value;

    const waMessage = encodeURIComponent(
        `*Nova Solicitação de Projeto - ConnectUP Intelligence*\n\n` +
        `*Nome:* ${name}\n` +
        `*Empresa:* ${company}\n` +
        `*E-mail:* ${email}\n` +
        `*Telefone:* ${phone}\n` +
        `*Interesse:* ${interest}\n` +
        `*Mensagem:* ${msg}`
    );

    // Open WhatsApp with prefilled parameters
    window.open(`https://wa.me/5511999999999?text=${waMessage}`, '_blank');
    alert("Obrigado pelo contato! Redirecionando para o WhatsApp do nosso especialista...");
}
