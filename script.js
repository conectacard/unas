// --- CONFIGURACIÓN DE PAGO DE LA PYME ---
const USA_STRIPE = false;
const STRIPE_PUBLIC_KEY = ""; 
const DATOS_BANCARIOS = {
    banco: "",
    clabe: "",
    titular: "Nombre del Titular"
};
// ----------------------------------------

const CONFIG = {
    whatsapp: "5214491472336",
    whatsappAdicional: "5214491472336",
    sitioWeb: "https://catmaniamx.com/",
    facebook: "https://www.facebook.com/?locale=es_LA",
    instagram: "https://www.instagram.com/my_sing_studio/",
    maps: "https://maps.app.goo.gl/L3Pq1dMVDgY9U5Qv9", 
    youtubeUrl: "https://www.youtube.com/watch?v=GlpJNq9pzrE",
    textos: {
        cat1: { t: "QUIÉNES SOMOS", c: "Nacimos con una sola misión: ¡cuidar de tus manos y resaltar la belleza de tus uñas! Nos encanta consentirte con las mejores técnicas en manicura, pedicura y diseños exclusivos creados para reflejar tu estilo único en todo momento." },
        cat2: { t: "ESTO NOS HACE DIFERENTES", c: "En nuestro estudio te ofrecemos un servicio de la más alta calidad con productos profesionales, herramientas esterilizadas, técnicas en tendencia como acrílico, gelish y polygel, y una atención personalizada que garantiza resultados impecables y duraderos." },
        cat3: { t: "CLIENTES FELICES", c: "Nuestras clientas nos eligen y recomiendan por nuestra gran precisión, creatividad en diseños, excelente higiene y trato cálido, reconociendo nuestra pasión y dedicación en cada set de uñas para el día a día y eventos especiales." }
    },
    sucursales: {
        suc1: { nombre: "Sucursal 1", wa: "5214491472336", maps: "https://maps.app.goo.gl/L3Pq1dMVDgY9U5Qv9" },
        suc2: { nombre: "Sucursal 2", wa: "5214491472336", maps: "https://maps.app.goo.gl/L3Pq1dMVDgY9U5Qv9" },
        suc3: { nombre: "Sucursal 3", wa: "5214491472336", maps: "https://maps.app.goo.gl/L3Pq1dMVDgY9U5Qv9" },
        suc4: { nombre: "Sucursal 4", wa: "5214491472336", maps: "https://maps.app.goo.gl/L3Pq1dMVDgY9U5Qv9" },
        suc5: { nombre: "Sucursal 5", wa: "5214491472336", maps: "https://maps.app.goo.gl/L3Pq1dMVDgY9U5Qv9" },
        suc6: { nombre: "Sucursal 6", wa: "5214491472336", maps: "https://maps.app.goo.gl/L3Pq1dMVDgY9U5Qv9" }
    }
};

let currentGallery = [];
let currentIndex = 0;
let isMuted = false;
let currentGatewayState = { citas: false, ventas: false, cotizar: false };
let globalCompiledTicketText = "";

function openYouTubeVideo() { 
    playClick(); 
    const overlay = document.getElementById('video-lightbox-overlay');
    const iframe = document.getElementById('video-lightbox-frame');
    let videoId = "4LLMlYBo54I"; 
    if(CONFIG.youtubeUrl.includes("shorts/")) { videoId = CONFIG.youtubeUrl.split("shorts/")[1].split("?")[0]; } 
    else if(CONFIG.youtubeUrl.includes("v=")) { videoId = CONFIG.youtubeUrl.split("v=")[1].split("&")[0]; }
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    overlay.style.display = 'flex';
}

function closeVideoLightbox() {
    playClick();
    const overlay = document.getElementById('video-lightbox-overlay');
    const iframe = document.getElementById('video-lightbox-frame');
    iframe.src = ""; 
    overlay.style.display = 'none';
}

function openProfileZoom() {
    playClick();
    const imgElement = document.getElementById('profile-pic-img');
    if(imgElement) { const src = imgElement.src; openLightbox(src, [src], true); }
}

function showAppContent(cat) {
    playClick();
    document.getElementById('dynamic-content-layer').style.display = 'flex';
    document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
    const pane = document.getElementById(`${cat}-pane`);
    if(pane) pane.style.display = 'flex';
    if(cat !== 'cat4') renderGallery(cat);
}

function renderGallery(cat) {
    const grid = document.getElementById(`grid-${cat}`);
    if(!grid) return; 
    grid.innerHTML = '';
    
    const titleHeader = document.createElement('h2');
    titleHeader.className = 'gallery-title-white';
    titleHeader.innerText = CONFIG.textos[cat].t;
    grid.appendChild(titleHeader);
    
    const imgCount = (cat === 'cat3') ? 4 : (cat === 'cat1' || cat === 'cat2') ? 6 : 4;
    const imgs = [];
    for(let i = 1; i <= imgCount; i++) { imgs.push(`assets/gallery/${cat}/${i}.jpg`); }
    
    const rowGrid = document.createElement('div');
    rowGrid.className = 'quad-row-grid';
    imgs.forEach((src, index) => {
        const posClass = (index % 2 === 0) ? 'pos-left' : 'pos-right';
        rowGrid.appendChild(createPol(src, posClass, imgs));
    });
    grid.appendChild(rowGrid);
    
    if (cat === 'cat3' || cat === 'cat2') {
        const videoContainer = document.createElement('div');
        videoContainer.style.cssText = "display: flex; gap: 10px; margin-top: 15px; justify-content: center; width: 100%; flex-wrap: wrap;";
        
        if (cat === 'cat3') {
            videoContainer.innerHTML = `
                <a href="https://www.youtube.com/shorts/pLPcbWtiy-Y" target="_blank" style="background: #000; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 800; font-size: 0.7rem; border: 1px solid var(--brand-accent);">Video 1</a>
                <a href="https://www.youtube.com/shorts/0WF5h9Dew5U" target="_blank" style="background: #000; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 800; font-size: 0.7rem; border: 1px solid var(--brand-accent);">Video 2</a>
            `;
        } else if (cat === 'cat2') {
            videoContainer.innerHTML = `
                <a href="https://www.youtube.com/shorts/BQ9_wqrHlxQ" target="_blank" style="background: #b00; color: #fff; padding: 12px 25px; border-radius: 12px; text-decoration: none; font-weight: 900; font-size: 0.9rem;">
                    VER VIDEO: ESTO NOS HACE DIFERENTES
                </a>
            `;
        }
        grid.appendChild(videoContainer);
    }
    
    const btn = document.createElement('button');
    btn.className = 'btn-details-gold'; 
    btn.innerHTML = `<i class="fas fa-plus-circle"></i> VER DETALLES`;
    btn.onclick = (e) => { e.stopPropagation(); openTextZoom(cat); };
    grid.appendChild(btn);
}

function createPol(src, pos, arr) {
    const div = document.createElement('div');
    div.className = `polaroid-item ${pos}`;
    div.innerHTML = `<img src="${src}">`;
    div.onclick = (e) => { e.stopPropagation(); openLightbox(src, arr, false); };
    return div;
}

function openLightbox(src, arr, hideControls) {
    playClick();
    currentGallery = arr;
    currentIndex = arr.indexOf(src);
    const lightboxEl = document.getElementById('lightbox');
    const imgEl = document.getElementById('lightbox-image');
    if(hideControls) { lightboxEl.classList.add('hide-nav-arrows'); } else { lightboxEl.classList.remove('hide-nav-arrows'); }
    imgEl.src = src;
    lightboxEl.style.display = 'flex';
}

function changeLightboxImage(dir) {
    if(currentGallery.length <= 1) return;
    playClick();
    currentIndex = (currentIndex + dir + currentGallery.length) % currentGallery.length;
    document.getElementById('lightbox-image').src = currentGallery[currentIndex];
}

function openTextZoom(cat) {
    playClick();
    document.getElementById('text-zoom-title').innerText = CONFIG.textos[cat].t;
    document.getElementById('text-zoom-content').innerText = CONFIG.textos[cat].c;
    document.getElementById('text-zoom-modal').style.display = 'flex';
}

function closeLightbox() { document.getElementById('lightbox').style.display = 'none'; }
function closeAppContent() { document.getElementById('dynamic-content-layer').style.display = 'none'; }
function closeTextZoom() { document.getElementById('text-zoom-modal').style.display = 'none'; }
function openBrandModal(modalId) { playClick(); const modal = document.getElementById(modalId); if (modal) modal.style.display = 'flex'; }
function closeBrandModal(modalId) { const modal = document.getElementById(modalId); if (modal) modal.style.display = 'none'; }
function playClickSound() { playClick(); }

function toggleAudioGlobal() {
    isMuted = !isMuted;
    const spot = document.getElementById('spot-intro');
    const icon = document.getElementById('audio-icon');
    spot.muted = isMuted;
    icon.className = isMuted ? "fas fa-volume-mute" : "fas fa-volume-up";
}

function playClick() { const snd = document.getElementById('sndFxClick'); if(snd && !isMuted) { snd.currentTime = 0; snd.play().catch(()=>{}); } }
function openNetworkCard(url) { playClick(); window.open(url, '_blank'); }

// LÓGICA DE ACORDEÓN PARA EL MENÚ DE CONTACTO DE SUCURSALES
function abrirMenu() {
    playClick();
    document.getElementById('miMenuContacto').style.display = 'flex';
}

function cerrarMenu() {
    document.getElementById('miMenuContacto').style.display = 'none';
    // Colapsar todos los acordeones al cerrar el menú
    document.querySelectorAll('.sucursal-panel-content').forEach(panel => panel.style.display = 'none');
}

function toggleSucursalAcordeon(sucKey) {
    playClick();
    const panel = document.getElementById(`${sucKey}-panel`);
    const estaVisible = panel.style.display === 'flex';
    
    // Ocultar todos los paneles primero
    document.querySelectorAll('.sucursal-panel-content').forEach(p => p.style.display = 'none');
    
    // Si no estaba visible, lo mostramos
    if (!estaVisible) {
        panel.style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('click', () => {
        const spot = document.getElementById('spot-intro');
        if(spot && !isMuted) spot.play().catch(()=>{});
    }, {once: true});
});

async function shareExperienceRobust() {
    try { await navigator.share({ title: 'Lonchería Magaña', url: window.location.href }); }
    catch { playClick(); navigator.clipboard.writeText(window.location.href).then(() => { alert("¡Enlace copiado al portapapeles!"); }); }
}