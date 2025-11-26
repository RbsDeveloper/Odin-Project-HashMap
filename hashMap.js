class HashMap {
    constructor(loadFactor= 0.75, capacity = 16){
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.size = 0
        this.buckets = new Array(capacity).fill(null);
    }

    hash(key){
        let hashNum = 0;
        let primeNum = 31; // the prime number helps out the spread and with that we achieve a good avalanche effect

        // Loop through each character in the key:
        // Convert it to a character code and incorporate it into the hash.
        // Multiplying by a prime number helps spread values across buckets,
        // and modulo ensures the hash remains within bucket array boundaries.
        for(let character of key){
            hashNum = (hashNum * primeNum + character.charCodeAt(0)) % this.capacity;
        }

        return hashNum; // final index where the key will be stored
    }
}