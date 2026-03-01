// copied from assets/js/scripts.js
document.addEventListener('DOMContentLoaded', function () {
    /* ---------- NAV TOGGLE (mobile) ---------- */
    const header = document.querySelector('.site-header');
    const navToggle = document.getElementById('navToggle');
    if (navToggle && header) {
        navToggle.addEventListener('click', () => {
            const open = header.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    /* ---------- LIGHTBOX (gallery) ---------- */
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightboxContent');
    const lightboxClose = document.getElementById('lightboxClose');
    function openLightbox(src, alt) {
        lightboxContent.innerHTML = `<img src="${src}" alt="${alt||''}" />`;
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxContent.innerHTML = '';
        document.body.style.overflow = '';
    }
    document.querySelectorAll('.photo').forEach(fig => {
        fig.addEventListener('click', () => {
            const src = fig.getAttribute('data-full') || fig.querySelector('img').src;
            const alt = fig.querySelector('img').alt || '';
            openLightbox(src, alt);
        });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.getAttribute('aria-hidden') === 'false') closeLightbox();
    });
  
    /* ---------- MAP (Leaflet) ---------- */
    const mapEl = document.getElementById('map');
    if (mapEl && window.L) {
        // Meeting point focused map
        const meetingPoint = { title: 'Ponto de Encontro - Avivamento', coords: [-23.5489, -46.6388], info: 'Rua da Fé, 123 — Segundas 09:00–12:00' };
        const otherPoints = [
            { title: 'Salão Paroquial', coords: [-23.556, -46.645], info: 'Av. Esperança, 45 — Doações de roupas' }
        ];
        const map = L.map('map', { zoomControl: false }).setView(meetingPoint.coords, 13);
        L.control.zoom({ position: 'topright' }).addTo(map);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        const meetingMarker = L.marker(meetingPoint.coords, { riseOnHover: true }).addTo(map);
        meetingMarker.bindPopup(`<strong>${meetingPoint.title}</strong><br>${meetingPoint.info}<br><em>Encontro para entregas</em>`);
        otherPoints.forEach(p => {
            L.marker(p.coords).addTo(map).bindPopup(`<strong>${p.title}</strong><br>${p.info}`);
        });
    }

    /* ---------- HERO entrance animation ---------- */
    setTimeout(() => {
        const hero = document.querySelector('.hero');
        if (hero) hero.classList.add('hero-animate');
    }, 220);
    /* ---------- SIMPLE CAROUSEL for testimonials ---------- */
    (function initCarousel(){
        const carousel = document.getElementById('testimonials');
        if (!carousel) return;
        const slides = carousel.querySelectorAll('.slide');
        let idx = 0;
        function show(i){
            slides.forEach((s,si)=> s.style.transform = `translateX(${(si-i)*100}%)`);
        }
        show(0);
        setInterval(()=>{ idx = (idx+1) % slides.length; show(idx); }, 4500);
    })();

    /* ---------- DONATION MODAL HANDLERS ---------- */
    const openDonateBtn = document.getElementById('openDonateModal');
    const donateModal = document.getElementById('donateModal');
    const donateModalClose = document.getElementById('donateModalClose');
    const cancelDonate = document.getElementById('cancelDonate');
    const confirmDonate = document.getElementById('confirmDonate');
    if (openDonateBtn && donateModal) {
        openDonateBtn.addEventListener('click', () => {
            donateModal.setAttribute('aria-hidden','false');
        });
    }
    if (donateModalClose) donateModalClose.addEventListener('click', ()=> donateModal.setAttribute('aria-hidden','true'));
    if (cancelDonate) cancelDonate.addEventListener('click', ()=> donateModal.setAttribute('aria-hidden','true'));
    
    const agendamentoBlock = document.getElementById('agendamentoBlock');
    if (agendamentoBlock) {
        agendamentoBlock.style.display = 'block';
    }

    if (confirmDonate) {
        confirmDonate.addEventListener('click', () => {
            const form = document.getElementById('donation-form');
            if (!form) return;
    
            // remove campos ocultos anteriores
            ['donation_method','scheduleDate','scheduleTime'].forEach(k => {
                const el = form.querySelector(`input[name="${k}"]`);
                if (el) el.remove();
            });
    
            // método fixo
            const inMethod = document.createElement('input');
            inMethod.type='hidden';
            inMethod.name='donation_method';
            inMethod.value='agendamento';
            form.appendChild(inMethod);
    
            // data e hora
            const date = document.getElementById('scheduleDate')?.value || '';
            const time = document.getElementById('scheduleTime')?.value || '';
    
            const inDate = document.createElement('input');
            inDate.type='hidden';
            inDate.name='scheduleDate';
            inDate.value=date;
            form.appendChild(inDate);
    
            const inTime = document.createElement('input');
            inTime.type='hidden';
            inTime.name='scheduleTime';
            inTime.value=time;
            form.appendChild(inTime);
    
            donateModal.setAttribute('aria-hidden','true');
            form.submit();
        });
    }
});


