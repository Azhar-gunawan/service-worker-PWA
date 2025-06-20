    window.addEventListener('online', () => {
      Swal.fire({
        title: '🔌 Anda Sudah Kembali Online',
        text: 'Aplikasi akan kembali ke halaman utama',
        icon: 'success',
        confirmButtonText: 'OK',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/index.html';
        }
      });
    });
