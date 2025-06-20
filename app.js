if('serviceworker' in navigator){
    navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('service worker is registerd:', reg))
    .then(reg => console.error('service worker is failed:',err));
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    console.log('✅ SW registered');

    // Update UI jika ada versi baru
    reg.onupdatefound = () => {
      const newWorker = reg.installing;
      newWorker.onstatechange = () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          const updateDiv = document.createElement('div');
          updateDiv.innerHTML = `
            <div style="position:fixed;bottom:10px;right:10px;background:#333;color:#fff;padding:10px;border-radius:5px;z-index:9999;">
              Versi baru tersedia.
              <button onclick="location.reload()">Perbarui</button>
            </div>`;
          document.body.appendChild(updateDiv);
        }
      };
    };
  });
}

let deferredPrompt;
let installClicked = false;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // cegah prompt default
  deferredPrompt = e;

  const installBtn = document.getElementById("installBtn");
  installBtn.style.display = "block";

  // Cegah multiple binding
  if (!installClicked) {
    installClicked = true;

    installBtn.addEventListener('click', () => {
      Swal.fire({
        title: 'Install Aplikasi?',
        text: 'Kamu bisa menggunakan aplikasi ini secara offline.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Install',
        cancelButtonText: 'Batal',
        backdrop: true,
      }).then((result) => {
        if (result.isConfirmed && deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
              Swal.fire('Berhasil!', 'Aplikasi berhasil di-install.', 'success');
            } else {
              Swal.fire('Batal', 'Instalasi dibatalkan.', 'info');
            }
            deferredPrompt = null;
          });
        } else {
          Swal.fire('Batal', 'Instalasi dibatalkan.', 'info');
        }
      });
    });
  }
});


window.addEventListener('offline', () => {
  Swal.fire({
    title: 'Koneksi Terputus',
    text: 'Kamu sedang offline. Beberapa fitur mungkin tidak tersedia.',
    icon: 'warning',
    confirmButtonText: 'OK'
  });
});


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    console.log('✅ Service Worker terdaftar');

    reg.onupdatefound = () => {
      const newWorker = reg.installing;
      newWorker.onstatechange = () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // Service worker baru siap
          const refreshDiv = document.createElement('div');
          refreshDiv.innerHTML = `
            <div style="position:fixed;top:10px;right:10px;background:#222;color:#fff;padding:10px;border-radius:8px;z-index:9999;">
              Versi baru tersedia.
              <button onclick="location.reload()">Muat Ulang</button>
            </div>`;
          document.body.appendChild(refreshDiv);
        }
      };
    };
  });
}

