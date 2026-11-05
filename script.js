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
        keywords: ['terceirizar', 'terceirização', 'atendimento', 'sdr', 'whatsapp', 'sac'],
        reply: "Na ConnectUP, nós terceirizamos a sua operação inteira de atendimento e SDR. Você não precisa contratar nem gerenciar atendentes: nossa IA e equipe operam seus canais 24/7 com resposta instantânea e agendamento de reuniões qualificadas!"
    },
    {
        keywords: ['custo', 'economizar', 'economia', 'preço', 'valor', 'reduzir', 'redução'],
        reply: "Ao terceirizar com a ConnectUP, sua empresa reduz em média de 50% a 70% dos custos comparado a manter equipe CLT interna (salários, FGTS, 13º, férias, turnover, rescisões e softwares). Você paga uma mensalidade previsível com SLA de resultado garantido!"
    },
    {
        keywords: ['facil', 'facilities', 'ease', 'modelo', 'como funciona', 'core business'],
        reply: "Nosso modelo é exatamente como uma empresa de Facilities (como Ease Facilities), mas para a era da Inteligência Artificial. Você foca 100% no seu Core Business (aquilo que dá lucro e você faz melhor), e nós operamos o atendimento, SDR, cobrança e portaria com IA de ponta."
    },
    {
        keywords: ['jiu-jitsu', 'academia', 'artes marciais', 'portaria', 'catraca', 'tatame', 'reconhecimento facial'],
        reply: "Para academias e centros de treinamento, assumimos a recepção e a cobrança! O reconhecimento facial faz o check-in automático dos alunos no tatame sem catracas físicas e nossa IA cobra mensalidades em atraso no WhatsApp com máxima taxa de recuperação."
    },
    {
        keywords: ['cobrança', 'financeiro', 'inadimplência'],
        reply: "Nosso setor de cobrança terceirizado atua com réguas inteligentes e humanizadas no WhatsApp. Recuperamos até 40% a mais de clientes inadimplentes sem quebrar o relacionamento com eles."
    },
    {
        keywords: ['reunião', 'agendar', 'agendamento', 'contato', 'proposta'],
        reply: "Excelente! Posso agendar uma apresentação de 15 minutos com nosso Consultor de Operações para mapear os custos da sua empresa e mostrar o plano de desoneração. Qual o seu melhor horário?"
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
        let replyText = "A ConnectUP Intelligence terceiriza setores não-core da sua empresa para entregar resultados com até 70% de economia e tecnologia de ponta. Deseja agendar um estudo de viabilidade?";
        
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
    }, 600);
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
        algo.textContent = "Facial Neural Net v4.2";
        latency.textContent = "18ms";
        acc.textContent = "Até 65% a menos em portaria";
        box1Label.textContent = "ACESSO FACIAL: ALUNO CONFIRMADO";
        box2Label.textContent = "Check-in Automático Sem Filas";
    } else if (mode === 'ocr') {
        algo.textContent = "Neural OCR & Document Parser";
        latency.textContent = "30ms";
        acc.textContent = "Redução de 90% em digitação manual";
        box1Label.textContent = "OCR: NOTA/CONTRATO IDENTIFICADO";
        box2Label.textContent = "Alimentação Automática de ERP";
    } else if (mode === 'counting') {
        algo.textContent = "YOLOv8 Edge Operational Counter";
        latency.textContent = "12ms";
        acc.textContent = "Ocupação Monitorada 24/7";
        box1Label.textContent = "MONITORAMENTO DE OCUPAÇÃO: 14 PESSOAS";
        box2Label.textContent = "Controle Operacional de Tatame";
    }
}

/* ==========================================================================
   DIAGNOSTIC & ROI SIMULATOR FORM (TERCEIRIZAÇÃO & ECONOMIA)
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

    let deliverables = [];
    let roi = "-65%";
    let desc = "Economia direta na folha e encargos, substituindo contratações CLT por operação turnkey com IA.";

    if (goal.includes("Atendimento")) {
        deliverables = [
            "Terceirização integral do WhatsApp, site e redes sociais (24/7)",
            "Atendimento inicial imediato (em menos de 5 segundos)",
            "IA treinada nas regras e tom de voz da sua empresa",
            "Supervisão e triagem com escalonamento humanizado",
            "Eliminação de encargos, férias e turnover de equipe de SAC"
        ];
        roi = "-60% a -70%";
        desc = "Sua empresa economiza até 70% nos custos de atendimento com satisfação do cliente em 98%.";
    } else if (goal.includes("Comercial")) {
        deliverables = [
            "Setor de Pré-Vendas e Prospecção (SDR) terceirizado",
            "Qualificação automática de leads em até 60 segundos",
            "Quebra de objeções e nutrição de contatos frios",
            "Reuniões qualificadas agendadas na agenda dos seus vendedores",
            "Integração com seu CRM e relatórios semanais de conversão"
        ];
        roi = "+3x Reuniões";
        desc = "Multiplicação do volume de reuniões comerciais sem contratar novos pré-vendedores internos.";
    } else if (goal.includes("Cobrança")) {
        deliverables = [
            "Setor de Cobrança e Gestão de Recebíveis terceirizado",
            "Régua preventiva e ativa de notificações no WhatsApp",
            "Geração instantânea de Pix Copia e Cola e boletos atualizados",
            "Negociação cordial de débitos com acordos automáticos",
            "Redução imediata da inadimplência sem conflito com o cliente"
        ];
        roi = "+40% Recuperação";
        desc = "Recuperação expressiva de mensalidades e faturas atrasadas já no primeiro mês de operação.";
    } else {
        deliverables = [
            "Portaria Inteligente e Controle de Acesso por Reconhecimento Facial",
            "Substituição de recepcionistas ou porteiros físicos em pontos de entrada",
            "Check-in automático em tablets ou câmeras IP existentes",
            "Controle de presença e frequência em tempo real",
            "Economia imediata de postos presenciais com segurança reforçada"
        ];
        roi = "-65% em Portaria";
        desc = "Eliminação de custos fixos de portaria física, catracas que quebram e contratações presenciais.";
    }

    stackList.innerHTML = deliverables.map(item => `<li>${item}</li>`).join('');
    roiVal.textContent = roi;
    roiDesc.textContent = desc;

    // Build WhatsApp message link
    const waText = encodeURIComponent(
        `Olá! Realizei a Simulação de Terceirização no site da ConnectUP Intelligence.\n\n` +
        `*Segmento:* ${sector}\n` +
        `*Porte Atual:* ${size}\n` +
        `*Setor a Terceirizar:* ${goal}\n\n` +
        `Gostaria de agendar uma reunião rápida de 15 minutos para avaliar o plano de desoneração e custos da minha empresa.`
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
