// Prilagodba veličine
window.addEventListener('DOMContentLoaded', () => {
  imageMapResize();
});

// Tooltip
const tooltip = document.getElementById('tooltip');
const areas = document.querySelectorAll('area');

areas.forEach(area => {
  area.addEventListener('mousemove', (e) => {
    const name = area.getAttribute('data-name');
    tooltip.textContent = name;
    const container = area.closest('.map-container');
    const rect = container.getBoundingClientRect();
    tooltip.style.left = (e.clientX - rect.left + 10) + 'px';
    tooltip.style.top = (e.clientY - rect.top - 20) + 'px';
    tooltip.style.display = 'block';
  });

  area.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });
});

async function ucitajSveca() {
  try {
    // 1. Dohvati današnji datum u formatu MM-DD
    const danas = new Date();
    const mjesec = String(danas.getMonth() + 1).padStart(2, '0');
    const dan = String(danas.getDate()).padStart(2, '0');
    const formatDatuma = `${mjesec}-${dan}`;

    // 2. Povuci JSON datoteku
    const odgovor = await fetch('../JAVASCRIPT/kalendar.json');
    if (!odgovor.ok) {
      throw new Error(`HTTP greška! status: ${odgovor.status}`);
    }
    const podaci = await odgovor.json();

    // 3. Pronađi sveca za taj datum
    const svetac = podaci[formatDatuma] || "Nema podataka za danas";

    // 4. Ispiši ga u HTML
    document.getElementById('svetac-dana').innerHTML = svetac;
  } catch (greska) {
    console.error("Greška pri učitavanju kalendara:", greska);
    const element = document.getElementById('svetac-dana');
    if (element) {
      element.innerHTML = "Kalendar nedostupan (otvorite preko lokalnog servera, npr. Live Server)";
    }
  }
}

document.addEventListener('DOMContentLoaded', ucitajSveca);