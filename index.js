#!/usr/bin/env node

const { Koyun, Kurt, Inek, Tavuk, Horoz, Aslan, Avci } = require('./animals');

console.log('🦁 Hayvanat Bahçesi Simülasyonu Başlatılıyor...');
console.log('📏 Alan: 500x500 birim');
console.log('🔄 Simülasyon: 1000 adım');
console.log('='.repeat(50));

// Simülasyon sınıfı
class ZooSimulation {
    constructor() {
        this.fieldSize = 500;
        this.maxSteps = 1000;
        this.currentStep = 0;
        this.animals = [];
        this.newBorns = []; // Bu adımda doğan hayvanlar
        
        console.log(`✅ Simülasyon hazırlandı: ${this.fieldSize}x${this.fieldSize} alan`);
    }
    
    // Rastgele pozisyon üret
    randomPosition() {
        return {
            x: Math.random() * this.fieldSize,
            y: Math.random() * this.fieldSize
        };
    }
    
    // Hayvanları başlat
    initializeAnimals() {
        console.log('🐑 Hayvanlar oluşturuluyor...');
        
        // 30 Koyun (15 erkek, 15 dişi)
        for (let i = 0; i < 15; i++) {
            const pos1 = this.randomPosition();
            const pos2 = this.randomPosition();
            this.animals.push(new Koyun('erkek', pos1.x, pos1.y));
            this.animals.push(new Koyun('dişi', pos2.x, pos2.y));
        }
        
        // 10 İnek (5 erkek, 5 dişi)
        for (let i = 0; i < 5; i++) {
            const pos1 = this.randomPosition();
            const pos2 = this.randomPosition();
            this.animals.push(new Inek('erkek', pos1.x, pos1.y));
            this.animals.push(new Inek('dişi', pos2.x, pos2.y));
        }
        
        // 10 Tavuk
        for (let i = 0; i < 10; i++) {
            const pos = this.randomPosition();
            this.animals.push(new Tavuk(pos.x, pos.y));
        }
        
        // 10 Horoz
        for (let i = 0; i < 10; i++) {
            const pos = this.randomPosition();
            this.animals.push(new Horoz(pos.x, pos.y));
        }
        
        // 10 Kurt (5 erkek, 5 dişi)
        for (let i = 0; i < 5; i++) {
            const pos1 = this.randomPosition();
            const pos2 = this.randomPosition();
            this.animals.push(new Kurt('erkek', pos1.x, pos1.y));
            this.animals.push(new Kurt('dişi', pos2.x, pos2.y));
        }
        
        // 8 Aslan (4 erkek, 4 dişi)
        for (let i = 0; i < 4; i++) {
            const pos1 = this.randomPosition();
            const pos2 = this.randomPosition();
            this.animals.push(new Aslan('erkek', pos1.x, pos1.y));
            this.animals.push(new Aslan('dişi', pos2.x, pos2.y));
        }
        
        // 1 Avcı
        const pos = this.randomPosition();
        this.animals.push(new Avci(pos.x, pos.y));
        
        console.log(`✅ ${this.animals.length} hayvan oluşturuldu`);
    }
    
    // Bir simülasyon adımı
    step() {
        this.currentStep++;
        this.newBorns = [];
        
        // 1. Tüm hayvanlar hareket eder
        this.animals.forEach(animal => {
            if (animal.alive) {
                animal.move(this.fieldSize);
            }
        });
        
        // 2. Avcılık işlemleri
        this.processHunting();
        
        // 3. Üreme işlemleri
        this.processBreeding();
        
        // 4. Yeni doğanları ekle
        this.animals.push(...this.newBorns);
        
        // 5. Ölü hayvanları temizle
        this.animals = this.animals.filter(animal => animal.alive);
    }
    
    // Avcılık işlemlerini gerçekleştir
    processHunting() {
        const hunters = this.animals.filter(animal => 
            animal.alive && animal.prey && animal.prey.length > 0
        );
        
        hunters.forEach(hunter => {
            const targets = this.animals.filter(target => 
                hunter.canHunt(target)
            );
            
            // Her avcı bir adımda sadece bir avını öldürebilir
            if (targets.length > 0) {
                const randomTarget = targets[Math.floor(Math.random() * targets.length)];
                randomTarget.kill();
            }
        });
    }
    
    // Üreme işlemlerini gerçekleştir
    processBreeding() {
        const aliveAnimals = this.animals.filter(animal => animal.alive);
        
        for (let i = 0; i < aliveAnimals.length; i++) {
            for (let j = i + 1; j < aliveAnimals.length; j++) {
                const animal1 = aliveAnimals[i];
                const animal2 = aliveAnimals[j];
                
                if (animal1.canBreed(animal2)) {
                    // Yeni hayvan oluştur
                    const newAnimal = this.createOffspring(animal1, animal2);
                    if (newAnimal) {
                        this.newBorns.push(newAnimal);
                    }
                }
            }
        }
    }
    
    // Yavru oluştur
    createOffspring(parent1, parent2) {
        const pos = this.randomPosition();
        const randomGender = Math.random() < 0.5 ? 'erkek' : 'dişi';
        
        switch (parent1.type) {
            case 'koyun':
                return new Koyun(randomGender, pos.x, pos.y);
            case 'inek':
                return new Inek(randomGender, pos.x, pos.y);
            case 'kurt':
                return new Kurt(randomGender, pos.x, pos.y);
            case 'aslan':
                return new Aslan(randomGender, pos.x, pos.y);
            case 'tavuk':
                return Math.random() < 0.5 ? new Tavuk(pos.x, pos.y) : new Horoz(pos.x, pos.y);
            case 'horoz':
                return Math.random() < 0.5 ? new Tavuk(pos.x, pos.y) : new Horoz(pos.x, pos.y);
            default:
                return null;
        }
    }
    
    // Durum göster
    showStatus() {
        const counts = this.getAnimalCounts();
        console.log(`\n📊 Adım: ${this.currentStep}/${this.maxSteps}`);
        console.log(`🐾 Toplam hayvan sayısı: ${this.animals.filter(a => a.alive).length}`);
        console.log('Detay:');
        Object.entries(counts).forEach(([type, count]) => {
            console.log(`  ${this.getEmoji(type)} ${type}: ${count}`);
        });
    }
    
    // Hayvan sayılarını hesapla
    getAnimalCounts() {
        const counts = {};
        this.animals.filter(a => a.alive).forEach(animal => {
            counts[animal.type] = (counts[animal.type] || 0) + 1;
        });
        return counts;
    }
    
    // Emoji döndür
    getEmoji(type) {
        const emojis = {
            'koyun': '🐑',
            'inek': '🐄',
            'tavuk': '🐔',
            'horoz': '🐓',
            'kurt': '🐺',
            'aslan': '🦁',
            'avcı': '🏹'
        };
        return emojis[type] || '🐾';
    }
    
    // Simülasyonu çalıştır
    run() {
        console.log('\n⏳ Simülasyon çalışıyor...');
        
        // İlk 10 adımı detaylı göster
        for (let i = 0; i < Math.min(10, this.maxSteps); i++) {
            this.step();
            if (i < 10) {
                console.log(`Adım ${this.currentStep}: ${this.animals.filter(a => a.alive).length} hayvan`);
            }
        }
        
        // Kalan adımları hızlı çalıştır
        while (this.currentStep < this.maxSteps) {
            this.step();
            
            // Her 100 adımda bir durum göster
            if (this.currentStep % 100 === 0) {
                console.log(`Adım ${this.currentStep}: ${this.animals.filter(a => a.alive).length} hayvan`);
            }
        }
        
        // Final sonuçları göster
        this.showFinalResults();
    }
    
    // Final sonuçları göster
    showFinalResults() {
        console.log('\n' + '='.repeat(50));
        console.log('🏁 SİMÜLASYON TAMAMLANDI!');
        console.log('='.repeat(50));
        
        const finalCounts = this.getAnimalCounts();
        const totalAnimals = Object.values(finalCounts).reduce((a, b) => a + b, 0);
        
        console.log(`\n📈 SONUÇ RAPORU (${this.maxSteps} adım sonrası):`);
        console.log(`🐾 Toplam hayvan sayısı: ${totalAnimals}`);
        console.log('\n📊 Tür bazında dağılım:');
        
        Object.entries(finalCounts).forEach(([type, count]) => {
            console.log(`  ${this.getEmoji(type)} ${type.toUpperCase()}: ${count} adet`);
        });
        
        console.log('\n✅ Simülasyon başarıyla tamamlandı!');
    }
    
    // Simülasyonu başlat
    start() {
        console.log('\n🚀 Simülasyon başlatılıyor...\n');
        
        // Hayvanları oluştur
        this.initializeAnimals();
        
        // Başlangıç durumunu göster
        this.showStatus();
        
        // Simülasyonu çalıştır
        this.run();
    }
}

// Simülasyonu başlat
const simulation = new ZooSimulation();
simulation.start(); 