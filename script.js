// --- Typewriter Effect ---
const words = ["Analista de Suporte", "Especialista em IA", "Desenvolvedor de Automação", "Web Designer"];
let i = 0;
let timer;

function typingEffect() {
	let word = words[i].split("");
	var loopTyping = function() {
		if (word.length > 0) {
			document.getElementById('typewriter').innerHTML += word.shift();
		} else {
			deletingEffect();
			return false;
		};
		timer = setTimeout(loopTyping, 100);
	};
	loopTyping();
};

function deletingEffect() {
	let word = words[i].split("");
	var loopDeleting = function() {
		if (word.length > 0) {
			word.pop();
			document.getElementById('typewriter').innerHTML = word.join("");
		} else {
			if (words.length > (i + 1)) {
				i++;
			} else {
				i = 0;
			};
			typingEffect();
			return false;
		};
		timer = setTimeout(loopDeleting, 50);
	};
	setTimeout(loopDeleting, 2000); // Wait before deleting
};

// Start Typewriter
window.onload = function() {
    setTimeout(typingEffect, 1000);
};

// --- Mobile Menu ---
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const closeMenuBtn = document.querySelector('.close-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuOverlay.classList.add('active');
});

closeMenuBtn.addEventListener('click', () => {
    mobileMenuOverlay.classList.remove('active');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
    });
});

// --- Scroll Reveal Animation ---
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

// --- Navbar background on scroll ---
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(15, 23, 42, 0.9)';
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        nav.style.background = 'var(--glass-bg)';
        nav.style.boxShadow = 'var(--glass-shadow)';
    }
});

// --- Project Modal ---
const projectData = {
    project1: {
        title: "Automação SaaS com N8N e Lovable",
        tags: ["N8N", "Lovable", "SaaS", "Integração API"],
        desc: "Desenvolvimento de fluxos sistêmicos avançados conectando diversas ferramentas. O foco deste projeto foi eliminar gargalos operacionais e automatizar processos repetitivos usando N8N, demonstrando forte habilidade em orquestração de dados e lógica sistêmica, aplicáveis diretamente para impulsionar SaaS modernos.",
        icon: '<i class="ph-duotone ph-robot" style="font-size: 5rem; color: #3b82f6;"></i>',
        bg: 'linear-gradient(45deg, #1e3a8a, #3b82f6)'
    },
    project2: {
        title: "Inteligência Artificial Focada em Vendas",
        tags: ["IA", "Prompt Engineering", "Vendas", "Atendimento"],
        desc: "Projeto derivado do curso da DIO, focado em criar prompts estruturados e aplicar modelos de linguagem para otimizar o atendimento ao cliente e a conversão em vendas. A abordagem combina a experiência sênior em suporte bilíngue com a adoção de novas tecnologias de IA para escalar respostas empáticas e assertivas.",
        icon: '<i class="ph-duotone ph-trend-up" style="font-size: 5rem; color: #8b5cf6;"></i>',
        bg: 'linear-gradient(45deg, #4c1d95, #8b5cf6)'
    },
    project3: {
        title: "Portfólio Pessoal Dinâmico",
        tags: ["HTML5", "CSS3", "UI/UX", "JavaScript"],
        desc: "Criação de um portfólio digital responsivo com design moderno. Aplicação de técnicas como glassmorphism, temas escuros premium, e animações interativas em CSS e JS puro (Vanilla), focado em performance sem a dependência de frameworks pesados, demonstrando proficiência prática em Web Design.",
        icon: '<i class="ph-duotone ph-layout" style="font-size: 5rem; color: #14b8a6;"></i>',
        bg: 'linear-gradient(45deg, #0f766e, #14b8a6)'
    }
};

const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalTags = document.getElementById('modalTags');
const modalDesc = document.getElementById('modalDesc');
const modalImg = document.getElementById('modalImg');

function openProjectModal(projectId) {
    const data = projectData[projectId];
    if(data) {
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modalImg.innerHTML = data.icon;
        modalImg.style.background = data.bg;
        
        modalTags.innerHTML = '';
        data.tags.forEach(tag => {
            const span = document.createElement('span');
            span.textContent = tag;
            modalTags.appendChild(span);
        });
        
        modal.classList.add('active');
    }
}

function closeProjectModal() {
    modal.classList.remove('active');
}

// Close modal if click outside content
modal.addEventListener('click', (e) => {
    if(e.target === modal) {
        closeProjectModal();
    }
});

// --- Contact Form (Web3Forms) ---
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    const status = document.getElementById('formStatus');

    btn.disabled = true;
    btn.innerHTML = '<i class="ph ph-spinner"></i> Enviando...';

    const formData = new FormData(this);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: json
        });
        const result = await response.json();

        if (result.success) {
            status.style.display = 'block';
            status.style.background = 'rgba(20, 184, 166, 0.15)';
            status.style.border = '1px solid rgba(20, 184, 166, 0.4)';
            status.style.color = '#14b8a6';
            status.innerHTML = '<i class="ph ph-check-circle"></i> Mensagem enviada com sucesso! Responderei em breve.';
            this.reset();
        } else {
            throw new Error(result.message || 'Erro ao enviar');
        }
    } catch (error) {
        status.style.display = 'block';
        status.style.background = 'rgba(239, 68, 68, 0.15)';
        status.style.border = '1px solid rgba(239, 68, 68, 0.4)';
        status.style.color = '#ef4444';
        status.innerHTML = '<i class="ph ph-x-circle"></i> Erro ao enviar. Tente novamente ou me contate pelo WhatsApp.';
    } finally {
        btn.disabled = false;
        btn.innerHTML = 'Enviar Mensagem <i class="ph ph-paper-plane-right"></i>';
        setTimeout(() => { status.style.display = 'none'; }, 6000);
    }
});
