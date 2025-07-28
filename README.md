# 🦁 Hayvanat Bahçesi Simülasyonu

500x500 birimlik alanda yaşayan hayvanların 1000 adımlık simülasyonu.

## 🚀 Hızlı Başlangıç

```bash
# Simülasyonu çalıştır
node index.js

# veya
npm start
```

## 📊 Proje Detayları

### Hayvanlar ve Özellikleri:
- **30 Koyun** (15♂, 15♀) - 2 birim hareket
- **10 İnek** (5♂, 5♀) - 2 birim hareket  
- **10 Tavuk** - 1 birim hareket
- **10 Horoz** - 1 birim hareket
- **10 Kurt** (5♂, 5♀) - 3 birim hareket, 4 birim av menzili
- **8 Aslan** (4♂, 4♀) - 4 birim hareket, 5 birim av menzili
- **1 Avcı** - 1 birim hareket, 8 birim av menzili

### Kurallar:
- **Avcılık:** Kurt→(koyun,tavuk,horoz), Aslan→(inek,koyun), Avcı→(tümü)
- **Üreme:** Aynı tür farklı cinsiyet 3 birim yakınlaşınca
- **Hareket:** Rastgele, alan sınırları içinde

## 🎮 Kullanım

### Ana Simülasyon:
```bash
node index.js        # Tam simülasyon (1000 adım)
npm start            # Aynı şey
```

### Test ve Geliştirme (Opsiyonel):
```bash
node test.js         # Detaylı testler
npm test             # Aynı şey
```

## 📁 Dosya Yapısı

- `index.js` - Ana simülasyon motoru
- `animals.js` - Hayvan sınıfları
- `test.js` - Test dosyası (opsiyonel, geliştirme için)
- `package.json` - Proje ayarları

## 💻 Bu Projede Yapabildiğim Teknik Beceriler

### **🏗️ Proje Mimarisi ve Organizasyon**
- **Modüler Kod Yapısı:** Hayvan sınıflarını ayrı dosyada (`animals.js`) organize ettim
- **Separation of Concerns:** Ana simülasyon, hayvan davranışları ve testleri farklı dosyalarda ayırdım
- **Clean Code:** Anlaşılır fonksiyon isimleri, yorum satırları ve düzenli kod yapısı

### **🎯 Object-Oriented Programming (OOP)**
- **Inheritance (Kalıtım):** Temel `Animal` sınıfından türetilen spesifik hayvan sınıfları
- **Encapsulation:** Her hayvanın kendi özelliklerini ve davranışlarını kapsülledim
- **Polymorphism:** Farklı hayvan türleri aynı interface'i kullanarak farklı davranışlar sergiliyor

### **🧮 Algoritma ve Matematik**
- **Euclidean Distance:** İki nokta arası mesafe hesaplama (Pitagoras teoremi)
- **Random Movement:** Rastgele hareket algoritması ile sınır kontrolü
- **Collision Detection:** Hayvanlar arası mesafe bazlı etkileşim kontrolü
- **State Management:** Hayvan durumları (alive/dead) ve simülasyon adımlarının yönetimi

### **🎲 Simülasyon ve Oyun Mekaniği**
- **Game Loop:** 1000 adımlık simülasyon döngüsü
- **AI Behavior:** Hayvanların otomatik hareket, avcılık ve üreme davranışları
- **Dynamic Population:** Ölüm ve doğum ile değişen hayvan populasyonu
- **Real-time Processing:** Her adımda tüm hayvanların eş zamanlı işlenmesi

### **🧪 Test-Driven Development**
- **Unit Testing:** Her fonksiyonun ayrı ayrı test edilmesi
- **Integration Testing:** Sistemin bütün olarak çalışmasının test edilmesi
- **Edge Case Testing:** Sınır değerleri ve özel durumların test edilmesi
- **Automated Testing:** NPM scripts ile otomatik test çalıştırma

### **📊 Veri İşleme ve Raporlama**
- **Data Aggregation:** Hayvan sayılarının türlere göre gruplandırılması
- **Statistical Analysis:** Simülasyon sonuçlarının analizi
- **Progress Tracking:** Adım adım ilerleme takibi
- **Formatted Output:** Emoji ve renkli console çıktılarıyla kullanıcı deneyimi

### **⚡ Performance Optimization**
- **Efficient Algorithms:** O(n²) karmaşıklığında etkileşim kontrolü
- **Memory Management:** Ölü hayvanların temizlenmesi
- **Batch Processing:** Toplu işlemlerle performans artırımı

### **🔧 Node.js Ecosystem**
- **Module System:** CommonJS ile modül import/export
- **NPM Package Management:** package.json ile proje yönetimi
- **Console Applications:** Terminal tabanlı uygulama geliştirme
- **Cross-platform Code:** Windows/Linux/Mac uyumlu kod

### **📝 Dokümantasyon ve Kullanılabilirlik**
- **README Documentation:** Kapsamlı kullanım kılavuzu
- **Code Comments:** Açıklayıcı yorum satırları
- **User-friendly Interface:** Emoji ve açık mesajlarla kullanıcı deneyimi
- **Error Handling:** Hata durumlarının graceful yönetimi

## 🔧 Geliştirme

Test dosyası sadece geliştirme ve hata ayıklama amaçlıdır. 
Normal kullanım için `node index.js` yeterlidir.

---
**Not:** Her çalıştırmada farklı sonuçlar alacaksınız (rastgelelik nedeniyle). 