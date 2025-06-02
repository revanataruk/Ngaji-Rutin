// Fitur upload foto
document.getElementById('uploadButton').addEventListener('click', function() {
    document.getElementById('uploadModal').classList.add('show');
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('uploadModal').classList.remove('show');
});

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const passwordInput = document.getElementById('passwordInput');
    const renameInputEl = document.getElementById('renameInput');
    const renameInput = renameInputEl.value.trim();

    if (!validateDate(renameInput)) {
        alert("Format tanggal tidak valid! Gunakan format dd/mm/yyyy.");
        return;
    }
    
    // Format nama file dengan tanda dash untuk penyimpanan
    const formattedName = renameInput.split('/').join('-');

    if (passwordInput.value !== "1234") {
        alert("Password salah!");
        return;
    }

    const file = fileInput.files[0];
    if (!file) {
        alert("Tidak ada file yang dipilih!");
        return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
        alert("Hanya file gambar (jpg/png) yang diperbolehkan!");
        return;
    }    

    const reader = new FileReader();
    reader.onload = function(e) {
        let base64String = e.target.result.split(',')[1]; // Hapus 'data:image/jpeg;base64,'

        // Show loading indicator
        const loadingMsg = document.createElement('div');
        loadingMsg.id = 'loadingMessage';
        loadingMsg.innerHTML = '<p>Sedang mengunggah foto...</p>';
        loadingMsg.style.position = 'fixed';
        loadingMsg.style.top = '50%';
        loadingMsg.style.left = '50%';
        loadingMsg.style.transform = 'translate(-50%, -50%)';
        loadingMsg.style.background = 'white';
        loadingMsg.style.padding = '20px';
        loadingMsg.style.borderRadius = '5px';
        loadingMsg.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
        loadingMsg.style.zIndex = '9999';
        document.body.appendChild(loadingMsg);

        // Kirim ke Google Apps Script Web App
        fetch("https://script.google.com/macros/s/AKfycbzXPyM-oSLraTI-bHr8_Jg7vTwaqXWAdXyAVyua3BFEH1aWzkXYzRs1AL8-K1s2NN3vUA/exec", {
            method: "POST",
            body: new URLSearchParams({
                file: base64String,
                fileName: formattedName + ".jpg",
                mimeType: file.type
            })
        })
        .then(res => res.text())
        .then(result => {
            console.log("Hasil Upload:", result);
            
            // Remove loading indicator
            const loadingElement = document.getElementById('loadingMessage');
            if (loadingElement) {
                loadingElement.remove();
            }
            
            alert("Upload sukses!");
            
            // Fetch all photos after upload to refresh the gallery
            fetchPhotosFromDrive();
        })
        .catch(err => {
            console.error("Gagal upload:", err);
            
            // Remove loading indicator
            const loadingElement = document.getElementById('loadingMessage');
            if (loadingElement) {
                loadingElement.remove();
            }
            
            alert("Terjadi kesalahan saat upload.");
        });
    };

    reader.readAsDataURL(file);

    fileInput.value = "";
    passwordInput.value = "";
    document.getElementById('renameInput').value = "";
    document.getElementById('uploadModal').classList.remove('show');
});


// Validasi format tanggal
function validateDate(dateString) {
    // Accept both formats: dd/mm/yyyy or dd-mm-yyyy
    const regex = /^\d{2}[\/\-]\d{2}[\/\-]\d{4}$/;
    return regex.test(dateString);
}

// Mengonversi tanggal ke format 'yyyy-mm-dd' untuk sorting
function convertDate(dateString) {
    // Handle both slash and dash separators
    const separator = dateString.includes('/') ? '/' : '-';
    const [dd, mm, yyyy] = dateString.split(separator);
    return `${yyyy}-${mm}-${dd}`;
}

// Menambahkan foto ke galeri dengan urutan berdasarkan tanggal
function addPhotoToGallery(date, src) {
    const photoContainer = document.getElementById('photoContainer');
    const convertedDate = convertDate(date);

    // Membuat elemen foto baru
    const photoGroup = document.createElement('div');
    photoGroup.classList.add('photo-group');
    photoGroup.setAttribute('data-date', convertedDate);

    const dateHeading = document.createElement('h3');
    dateHeading.textContent = date;
    photoGroup.appendChild(dateHeading);

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Foto pada ${date}`;
    img.loading = "lazy";
    photoGroup.appendChild(img);

    // Menyisipkan elemen foto ke dalam galeri berdasarkan urutan tanggal
    const existingGroups = Array.from(photoContainer.getElementsByClassName('photo-group'));
    let inserted = false;
    
    for (let i = 0; i < existingGroups.length; i++) {
        const groupDate = existingGroups[i].getAttribute('data-date');
        if (convertedDate > groupDate) {
            photoContainer.insertBefore(photoGroup, existingGroups[i]);
            inserted = true;
            break;
        }
    }

    // Jika tidak ada grup yang lebih baru, tambahkan di akhir
    if (!inserted) {
        photoContainer.appendChild(photoGroup);
    }
}

// Fitur format otomatis untuk input tanggal
document.getElementById('renameInput').addEventListener('input', function(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Hapus semua karakter non-digit

    // Format value menjadi dd/mm/yyyy
    if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length > 5) {
        value = value.slice(0, 5) + '/' + value.slice(5);
    }
    input.value = value;
});

// Fitur inspect foto saat diklik
const inspectModal = document.getElementById("inspectModal");
const inspectImage = document.getElementById("inspectImage");
const inspectDate = document.getElementById("inspectDate");
const closeInspect = document.querySelector(".close-inspect");

document.getElementById('photoContainer').addEventListener('click', function(event) {
    if (event.target.tagName === 'IMG') {
        const clickedImage = event.target;
        const photoGroup = clickedImage.closest('.photo-group');
        const dateText = photoGroup.querySelector('h3') ? 
                         photoGroup.querySelector('h3').textContent : 
                         photoGroup.querySelector('h2').textContent;

        inspectImage.src = clickedImage.src;
        inspectDate.textContent = `Tanggal: ${dateText}`;
        inspectModal.classList.add('show');
    }
});

closeInspect.onclick = function() {
    inspectModal.classList.remove('show');
};

// Tutup modal jika diklik di luar konten
window.onclick = function(event) {
    if (event.target === inspectModal) {
        inspectModal.classList.remove('show');
    } else if (event.target === document.getElementById('uploadModal')) {
        document.getElementById('uploadModal').classList.remove('show');
    }
};

// Tombol scroll-top
const scrollTopButton = document.getElementById("scrollTopButton");

window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollTopButton.style.display = "block";
    } else {
        scrollTopButton.style.display = "none";
    }
};

scrollTopButton.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Load photos when the page loads
window.addEventListener('DOMContentLoaded', fetchPhotosFromDrive);

function fetchPhotosFromDrive() {
    // Show loading indicator
    const photoContainer = document.getElementById('photoContainer');
    photoContainer.innerHTML = '<div style="text-align: center; padding: 20px;">Loading photos...</div>';
    
    // Use your Google Apps Script web app URL
    fetch('https://script.google.com/macros/s/AKfycbzXPyM-oSLraTI-bHr8_Jg7vTwaqXWAdXyAVyua3BFEH1aWzkXYzRs1AL8-K1s2NN3vUA/exec')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok: ' + res.status);
            }
            return res.json();
        })
        .then(data => {
            console.log("Data received:", data); // Debug log
            if (Array.isArray(data) && data.length > 0) {
                displayPhotosByDate(data);
            } else {
                photoContainer.innerHTML = '<div style="text-align: center; padding: 20px;">No photos found. Upload some!</div>';
            }
        })
        .catch(error => {
            console.error('Error fetching photos:', error);
            photoContainer.innerHTML = `<div style="text-align: center; padding: 20px;">
                Error loading photos: ${error.message}<br>
                Please try refreshing the page.
            </div>`;
        });
}

function displayPhotosByDate(photos) {
    const photoContainer = document.getElementById('photoContainer');
    photoContainer.innerHTML = '';

    // Check if photos array is valid
    if (!Array.isArray(photos) || photos.length === 0) {
        photoContainer.innerHTML = '<div style="text-align: center; padding: 20px;">No photos found.</div>';
        return;
    }

    console.log("Photos data received:", photos); // Debugging

    // Group photos by date
    const grouped = {};

    photos.forEach(photo => {
        // Extract the date from the filename (format: dd-mm-yyyy.jpg)
        const dateFromName = photo.date || photo.name.split('.')[0]; // Remove extension
        
        if (!grouped[dateFromName]) {
            grouped[dateFromName] = [];
        }
        grouped[dateFromName].push(photo);
    });

    // Sort dates in descending order (newest first)
    const sortedDates = Object.keys(grouped).sort((a, b) => {
        // Convert date strings to comparable format (dd-mm-yyyy to yyyy-mm-dd)
        const [dayA, monthA, yearA] = a.split('-');
        const [dayB, monthB, yearB] = b.split('-');
        return new Date(`${yearB}-${monthB}-${dayB}`) - new Date(`${yearA}-${monthA}-${dayA}`);
    });

    // Create photo groups for each date
    sortedDates.forEach(date => {
        const photoGroup = document.createElement('div');
        photoGroup.className = 'photo-group';
        photoGroup.setAttribute('data-date', date); // Add date attribute for potential future sorting
        
        const dateHeading = document.createElement('h3');
        dateHeading.textContent = date;
        photoGroup.appendChild(dateHeading);

        // Add each photo for this date
        grouped[date].forEach(photo => {
            const img = document.createElement('img');
            img.src = photo.url;
            img.alt = photo.name;
            img.loading = 'lazy';
            img.title = `Photo: ${photo.name}`;
            
            // Add error handling for images
            img.onerror = function() {
                console.error("Failed to load image:", photo.url);
                this.src = 'https://placehold.co/200x200/e63946/ffffff?text=Image+Error';
                this.alt = 'Failed to load image';
            };
            
            photoGroup.appendChild(img);
        });

        photoContainer.appendChild(photoGroup);
    });
}

function fetchPhotosFromDrive() {
    // Show loading indicator with styled animation
    const photoContainer = document.getElementById('photoContainer');
    photoContainer.innerHTML = `
        <div class="loading-container">
            <div class="loading-text">LOADING PHOTOS</div>
            <div class="loading-dots">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        </div>
    `;
    
    // Use your Google Apps Script web app URL
    fetch('https://script.google.com/macros/s/AKfycbzXPyM-oSLraTI-bHr8_Jg7vTwaqXWAdXyAVyua3BFEH1aWzkXYzRs1AL8-K1s2NN3vUA/exec')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok: ' + res.status);
            }
            return res.json();
        })
        .then(data => {
            console.log("Data received:", data); // Debug log
            if (Array.isArray(data) && data.length > 0) {
                displayPhotosByDate(data);
            } else {
                photoContainer.innerHTML = '<div class="no-photos-message">No photos found. Upload some!</div>';
            }
        })
        .catch(error => {
            console.error('Error fetching photos:', error);
            photoContainer.innerHTML = `<div class="error-message">
                Error loading photos: ${error.message}<br>
                Please try refreshing the page.
            </div>`;
        });
}
