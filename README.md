AuraTask, modern web teknolojileri kullanılarak geliştirilmiş, son derece şık, göz yormayan cam efekti (glassmorphism) tasarımlı ve tam fonksiyonel bir React Task Manager (Görev Yöneticisi) uygulamasıdır. 
Bu proje, katılımcı eğitim programı çerçevesinde elde edilen teorik bilgilerin pratik ve modern frontend yaklaşımlarıyla harmanlanmasıyla geliştirilmiştir.
---
## 🎨 Özellikler (Features)
AuraTask, bir görev yöneticisinde olması gereken tüm temel CRUD (Ekle, Listele, Güncelle, Sil) işlemlerini ve fazlasını sunar:
* ✨ Ekleme (Create): Görev başlığı, açıklaması, kategorisi, öncelik derecesi ve teslim tarihini içeren görevler ekleyebilirsiniz.
* 📋 Listeleme (Read): Görevlerinizi "Yapılacaklar", "Süreçte" ve "Tamamlananlar" olmak üzere 3 farklı sütunda durumlarına göre listeleyebilirsiniz.
* ⚡ Güncelleme (Update): Görevlerinizin durumunu tek tıkla ileri/geri taşıyabilir, görev detaylarını şık form modalı üzerinden anında düzenleyebilirsiniz.
* 🗑️ Silme (Delete): İstediğiniz görevi, akıcı kaybolma animasyonları eşliğinde listeden tamamen silebilirsiniz.
* 📊 İstatistik Paneli: Toplam, yapılacak, süreçteki ve tamamlanan görevlerinizin sayılarını ve dinamik ilerleme barı ile genel tamamlanma yüzdenizi anlık takip edebilirsiniz.
* 🔍 Filtreleme ve Sıralama: Görevlerinizi kategorilerine (İş, Kişisel, Sağlık, Eğitim vb.) göre filtreleyebilir; teslim tarihine, önceliğe veya eklenme tarihine göre sıralayabilirsiniz.
* 🌓 Aydınlık / Karanlık Tema: Göz yormayan gece modu (Dark Mode) ve şık aydınlık mod (Light Mode) arasında pürüzsüz geçiş yapabilirsiniz.
* 💾 Kalıcı Veri (Local Storage): Tarayıcınızı yenileseniz dahi tüm görevleriniz ve tema tercihiniz otomatik olarak saklanır.
---
## 🛠️ Kullanılan Teknolojiler
* Çekirdek: React 18 & TypeScript
* Derleyici/Paketleyici: Vite (Işık hızında yerel geliştirme)
* Tasarım: Pure CSS3 (Özel HSL Değişkenleri, Cam Efektleri, Fluid Animasyonlar)
* İkonlar: Lucide React
---
## 📂 Proje Klasör Yapısı
Eğitim yönergesine uygun olarak dosya ağaç yapımız şu şekilde kurgulanmıştır:
auratask/
├── src/
│   ├── Components/      # Yeniden kullanılabilir alt bileşenler
│   │   ├── TaskCard.tsx     # Görev kartı bileşeni
│   │   ├── TaskForm.tsx     # Ekleme/Güncelleme Modal Formu
│   │   ├── TaskStats.tsx    # İstatistik paneli & İlerleme barı
│   │   └── ThemeToggle.tsx  # Karanlık/Aydınlık tema butonu
│   ├── Pages/           # Sayfa düzeyindeki bileşenler
│   │   └── Dashboard.tsx    # Ana Sayfa ve CRUD Durum Yönetimi
│   ├── Interfaces/      # TypeScript Veri Tipi Tanımları
│   │   └── Task.ts          # Görev ve İstatistik veri yapıları
│   ├── index.css        # Tasarım Sistemi & CSS Değişkenleri
│   ├── App.tsx          # Ana uygulama sarmalayıcısı
│   └── main.tsx         # React giriş noktası
├── index.html           # HTML5 şablonu (Semantik etiketler & SEO)
├── package.json         # Bağımlılıklar ve script tanımları
├── tsconfig.json        # TypeScript yapılandırması
└── vite.config.ts       # Vite sunucu ayarları
---
## 💻 Kurulum ve Yerel Çalıştırma
Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:
1. Projeyi indirin veya klonlayın:
   git clone https://github.com/KULLANICI_ADINIZ/auratask.git
   cd auratask
2. Gerekli bağımlılıkları (paketleri) yükleyin:
   npm install
3. Geliştirme sunucusunu başlatın:
   npm run dev
4. Tarayıcınızda açılan http://localhost:5173 adresine giderek uygulamayı test edin.
---
## 🌍 Canlı Yayın (Deployment)
Bu proje, Vite Build çıktıları alınarak Netlify platformunda yayına alınacak şekilde konfigüre edilmiştir. Üretim (production) sürümünü derlemek için:
npm run build
Oluşan "dist" klasörü Netlify'a sürüklenip bırakılarak veya GitHub entegrasyonu ile saniyeler içinde canlıya alınabilir.
