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
        console.log(hashNum)
        return hashNum; // final index where the key will be stored
    }

    set(key, value) {
        const bucketIdx = this.hash(key); // Determine which bucket this key maps to
       
        // If the bucket is empty we create a new one and store key/value
        if(!this.buckets[bucketIdx]){
            this.buckets[bucketIdx] = [{key, value}];
            return}
        
        // If the bucket exists we iterate through its elements to check for the same key
        for(element of this.buckets[bucketIdx]){
            // If the key already exists we update his value and stop here
            if(element.key === key){
                element.value = value;
                return
            } 
        }
        
        // If we finish the loop with no match that means the key is new, so we push it into the bucket
        this.buckets[bucketIdx].push({key, value})
    }
}

let hm = new HashMap();
console.log(hm.buckets);
hm.set('here it is', 'first');
console.log(hm.buckets);
hm.set('here it is', 'second');
console.log(hm.buckets);
hm.set('o', 'another val');
console.log(hm.buckets);