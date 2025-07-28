// Temel Hayvan sınıfı
class Animal {
    constructor(type, gender, x, y, moveSpeed, huntRange = 0, prey = []) {
        this.type = type;           // 'koyun', 'kurt', 'inek', vb.
        this.gender = gender;       // 'erkek', 'dişi', null (tavuk/horoz için)
        this.x = x;                 // X koordinatı
        this.y = y;                 // Y koordinatı
        this.moveSpeed = moveSpeed; // Hareket hızı (birim)
        this.huntRange = huntRange; // Avlama menzili
        this.prey = prey;           // Avlayabileceği hayvanlar
        this.alive = true;          // Hayatta mı?
        this.id = Math.random().toString(36).substr(2, 9); // Benzersiz ID
    }
    
    // Rastgele hareket et
    move(fieldSize) {
        if (!this.alive) return;
        
        // Rastgele yön seç (-1, 0, 1)
        const deltaX = (Math.random() - 0.5) * 2 * this.moveSpeed;
        const deltaY = (Math.random() - 0.5) * 2 * this.moveSpeed;
        
        // Yeni pozisyonu hesapla
        this.x += deltaX;
        this.y += deltaY;
        
        // Alan sınırlarını kontrol et
        this.x = Math.max(0, Math.min(fieldSize, this.x));
        this.y = Math.max(0, Math.min(fieldSize, this.y));
    }
    
    // İki hayvan arasındaki mesafeyi hesapla
    distanceTo(other) {
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    }
    
    // Avlayabilir mi kontrol et
    canHunt(target) {
        if (!this.alive || !target.alive) return false;
        if (!this.prey.includes(target.type)) return false;
        return this.distanceTo(target) <= this.huntRange;
    }
    
    // Üreme kontrolü
    canBreed(partner) {
        if (!this.alive || !partner.alive) return false;
        if (this.gender === partner.gender) return false;
        if (this.distanceTo(partner) > 3) return false;
        
        // Tavuk-Horoz çifti kontrol et
        if ((this.type === 'tavuk' && partner.type === 'horoz') || 
            (this.type === 'horoz' && partner.type === 'tavuk')) {
            return true;
        }
        
        // Diğer hayvanlar için aynı tür olmalı
        if (this.type !== partner.type) return false;
        if (!this.gender || !partner.gender) return false;
        
        return true;
    }
    
    // Hayvanı öldür
    kill() {
        this.alive = false;
    }
}

// Spesifik hayvan türleri
class Koyun extends Animal {
    constructor(gender, x, y) {
        super('koyun', gender, x, y, 2);
    }
}

class Kurt extends Animal {
    constructor(gender, x, y) {
        super('kurt', gender, x, y, 3, 4, ['koyun', 'tavuk', 'horoz']);
    }
}

class Inek extends Animal {
    constructor(gender, x, y) {
        super('inek', gender, x, y, 2);
    }
}

class Tavuk extends Animal {
    constructor(x, y) {
        super('tavuk', 'dişi', x, y, 1);
    }
}

class Horoz extends Animal {
    constructor(x, y) {
        super('horoz', 'erkek', x, y, 1);
    }
}

class Aslan extends Animal {
    constructor(gender, x, y) {
        super('aslan', gender, x, y, 4, 5, ['inek', 'koyun']);
    }
}

class Avci extends Animal {
    constructor(x, y) {
        super('avcı', null, x, y, 1, 8, ['koyun', 'kurt', 'inek', 'tavuk', 'horoz', 'aslan']);
    }
}

module.exports = {
    Animal,
    Koyun,
    Kurt,
    Inek,
    Tavuk,
    Horoz,
    Aslan,
    Avci
}; 