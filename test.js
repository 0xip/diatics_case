#!/usr/bin/env node

const { Koyun, Kurt, Inek, Tavuk, Horoz, Aslan, Avci } = require('./animals');

console.log('🧪 HAYVANAT BAHÇESİ TEST SÜİTİ');
console.log('='.repeat(40));

// Test 1: Hayvan Oluşturma Testi
function testAnimalCreation() {
    console.log('\n📝 Test 1: Hayvan Oluşturma');
    
    const koyun = new Koyun('erkek', 100, 100);
    const kurt = new Kurt('dişi', 200, 200);
    const inek = new Inek('erkek', 300, 300);
    const tavuk = new Tavuk(50, 50);
    const horoz = new Horoz(60, 60);
    const aslan = new Aslan('dişi', 400, 400);
    const avci = new Avci(250, 250);
    
    console.log(`✅ Koyun: ${koyun.type}, ${koyun.gender}, hareket: ${koyun.moveSpeed}`);
    console.log(`✅ Kurt: ${kurt.type}, ${kurt.gender}, hareket: ${kurt.moveSpeed}, av menzili: ${kurt.huntRange}`);
    console.log(`✅ İnek: ${inek.type}, ${inek.gender}, hareket: ${inek.moveSpeed}`);
    console.log(`✅ Tavuk: ${tavuk.type}, ${tavuk.gender}, hareket: ${tavuk.moveSpeed}`);
    console.log(`✅ Horoz: ${horoz.type}, ${horoz.gender}, hareket: ${horoz.moveSpeed}`);
    console.log(`✅ Aslan: ${aslan.type}, ${aslan.gender}, hareket: ${aslan.moveSpeed}, av menzili: ${aslan.huntRange}`);
    console.log(`✅ Avcı: ${avci.type}, hareket: ${avci.moveSpeed}, av menzili: ${avci.huntRange}`);
}

// Test 2: Mesafe Hesaplama Testi
function testDistanceCalculation() {
    console.log('\n📏 Test 2: Mesafe Hesaplama');
    
    const animal1 = new Koyun('erkek', 0, 0);
    const animal2 = new Koyun('dişi', 3, 4); // 5 birim uzakta
    const animal3 = new Koyun('erkek', 1, 1); // ~1.41 birim uzakta
    
    console.log(`Mesafe (0,0) -> (3,4): ${animal1.distanceTo(animal2).toFixed(2)} birim (beklenen: 5.00)`);
    console.log(`Mesafe (0,0) -> (1,1): ${animal1.distanceTo(animal3).toFixed(2)} birim (beklenen: 1.41)`);
}

// Test 3: Avcılık Testi
function testHunting() {
    console.log('\n🎯 Test 3: Avcılık Sistemi');
    
    const kurt = new Kurt('erkek', 100, 100);
    const koyun1 = new Koyun('dişi', 102, 102); // ~2.83 birim uzakta (avlanabilir)
    const koyun2 = new Koyun('erkek', 110, 110); // ~14.14 birim uzakta (avlanamaz)
    const inek = new Inek('dişi', 101, 101); // Yakın ama av değil
    
    console.log(`Kurt koyun1'i avlayabilir mi? ${kurt.canHunt(koyun1)} (beklenen: true)`);
    console.log(`Kurt koyun2'yi avlayabilir mi? ${kurt.canHunt(koyun2)} (beklenen: false)`);
    console.log(`Kurt ineği avlayabilir mi? ${kurt.canHunt(inek)} (beklenen: false)`);
    
    const aslan = new Aslan('erkek', 200, 200);
    const koyun3 = new Koyun('dişi', 203, 203); // ~4.24 birim uzakta
    const tavuk = new Tavuk(201, 201); // Yakın ama av değil
    
    console.log(`Aslan koyun3'ü avlayabilir mi? ${aslan.canHunt(koyun3)} (beklenen: true)`);
    console.log(`Aslan tavuğu avlayabilir mi? ${aslan.canHunt(tavuk)} (beklenen: false)`);
}

// Test 4: Üreme Testi
function testBreeding() {
    console.log('\n💕 Test 4: Üreme Sistemi');
    
    const koyunErkek = new Koyun('erkek', 300, 300);
    const koyunDişi = new Koyun('dişi', 302, 302); // ~2.83 birim uzakta
    const koyunErkek2 = new Koyun('erkek', 301, 301); // Aynı cinsiyet
    const kurt = new Kurt('dişi', 301, 301); // Farklı tür
    
    console.log(`Erkek-Dişi koyun üreme: ${koyunErkek.canBreed(koyunDişi)} (beklenen: true)`);
    console.log(`Erkek-Erkek koyun üreme: ${koyunErkek.canBreed(koyunErkek2)} (beklenen: false)`);
    console.log(`Koyun-Kurt üreme: ${koyunErkek.canBreed(kurt)} (beklenen: false)`);
    
    const tavuk = new Tavuk(400, 400);
    const horoz = new Horoz(401, 401);
    
    console.log(`Tavuk-Horoz üreme: ${tavuk.canBreed(horoz)} (beklenen: true)`);
}

// Test 5: Hareket Testi
function testMovement() {
    console.log('\n🏃 Test 5: Hareket Sistemi');
    
    const koyun = new Koyun('erkek', 250, 250);
    const initialX = koyun.x;
    const initialY = koyun.y;
    
    console.log(`Başlangıç pozisyonu: (${initialX}, ${initialY})`);
    
    // 5 hareket yap
    for (let i = 0; i < 5; i++) {
        koyun.move(500);
        console.log(`Hareket ${i+1}: (${koyun.x.toFixed(2)}, ${koyun.y.toFixed(2)})`);
    }
    
    // Sınırları test et
    const sinirKoyun = new Koyun('erkek', 498, 498);
    console.log(`Sınır testi - Başlangıç: (${sinirKoyun.x}, ${sinirKoyun.y})`);
    sinirKoyun.move(500);
    console.log(`Sınır testi - Sonuç: (${sinirKoyun.x.toFixed(2)}, ${sinirKoyun.y.toFixed(2)})`);
}

// Test 6: Çoklu Simülasyon Testi
function testMultipleRuns() {
    console.log('\n🔄 Test 6: Çoklu Simülasyon Karşılaştırması');
    
    const results = [];
    
    for (let run = 1; run <= 3; run++) {
        console.log(`\n--- Çalıştırma ${run} ---`);
        
        // Mini simülasyon (100 adım)
        const { ZooSimulation } = require('./index');
        // Bu test için ayrı bir mini simülasyon yapacağız
        
        // Basit test: Rastgele sayılar
        const animals = [];
        for (let i = 0; i < 10; i++) {
            animals.push(new Koyun('erkek', Math.random() * 500, Math.random() * 500));
        }
        
        let alive = animals.filter(a => a.alive).length;
        console.log(`Başlangıç: ${alive} hayvan`);
        
        // 10 hareket
        for (let step = 0; step < 10; step++) {
            animals.forEach(animal => animal.move(500));
        }
        
        alive = animals.filter(a => a.alive).length;
        console.log(`10 adım sonrası: ${alive} hayvan`);
        
        results.push(alive);
    }
    
    console.log(`\n📊 Sonuçlar: ${results.join(', ')}`);
}

// Tüm testleri çalıştır
function runAllTests() {
    testAnimalCreation();
    testDistanceCalculation();
    testHunting();
    testBreeding();
    testMovement();
    testMultipleRuns();
    
    console.log('\n🎉 TÜM TESTLER TAMAMLANDI!');
    console.log('Ana simülasyonu çalıştırmak için: node index.js');
}

// Testleri başlat
runAllTests(); 