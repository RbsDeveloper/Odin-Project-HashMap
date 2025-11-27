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

    set(key, value) {
        const bucketIdx = this.hash(key); // Determine which bucket this key maps to
       
        // If the bucket is empty we create a new one and store key/value
        if(!this.buckets[bucketIdx]){
            this.buckets[bucketIdx] = [{key, value}];
            this.size++

            if(this.size / this.capacity > this.loadFactor) this.resize()
            
            return
        }
        
        // If the bucket exists we iterate through its elements to check for the same key
        for(const element of this.buckets[bucketIdx]){
            // If the key already exists we update his value and stop here
            if(element.key === key){
                element.value = value;
                return
            } 
        }
        
        // If we finish the loop with no match that means the key is new, so we push it into the bucket
        this.buckets[bucketIdx].push({key, value})
        this.size++
        if(this.size / this.capacity > this.loadFactor) this.resize()
            
    }

    get(key){
        const bucketIdx = this.hash(key); // Find the bucket index

        // If no bucket exists here, the key does not exist
        if(!this.buckets[bucketIdx]) return null; 

        // Search bucket chain for the matching key
        for(const element of this.buckets[bucketIdx]){
            if(element.key === key) return element.value
        }

        // Key was not found in this bucket
        return null;
    }

    has(key){
        return this.get(key) !== null;       
    }

    remove(key){
        const bucketIdx = this.hash(key);
        let targetIdx = 0

        // No bucket = nothing to remove
        if(!this.buckets[bucketIdx]) return false;
        // Search bucket for matching key
        for(const element of this.buckets[bucketIdx]){
            // Key found → remove it
            if(element.key === key){
                this.buckets[bucketIdx].splice(targetIdx, 1)
                // If bucket becomes empty, reset to null
                if(this.buckets[bucketIdx].length === 0){
                    this.buckets[bucketIdx] = null;
                }
                this.size--;
                return true
            }
                targetIdx++ // move to next index
        }

        return false; // key not found
    }

    length(){
        return this.size;
    }

    clear(){
        this.buckets = new Array(this.capacity).fill(null); // reset all buckets
        this.size = 0;
    }

    keys() {
        let keysCollection = [];
        // Go through each bucket in the hashmap
        for(const bucket of this.buckets){
            // Only iterate if bucket is not null
            if(bucket){
                // Push the key of each element inside the keysColletion
                for(const element of bucket){
                    keysCollection.push(element.key);
                }
            }
        }
        return keysCollection; 
    }

    values() {
        let valuesCollection = [];
        // Go through each bucket in the hashmap
        for(const bucket of this.buckets){
            // Only iterate if bucket is not null
            if(bucket){
                // Push the value of each element inside the valuesColletion
                for(const element of bucket){
                    valuesCollection.push(element.value);
                }
            }
        }
        return valuesCollection; 
    }

    entries() {
        let entries = [];
    
        for(const bucket of this.buckets){

            if(bucket){
                for(const element of bucket){
                    entries.push([element.key, element.value]);
                }
            }
        }
        return entries;
    }

    resize(){
        this.capacity *= 2; // 1. Double the bucket count
        const oldBuckets = this.buckets; // 2. Keep reference to old storage
        this.buckets = new Array(this.capacity).fill(null); // 3. Allocate new, larger table
        this.size = 0; // 4. Reset size

        // 5. Reinsert everything using set() to recalc indexes
        for(const bucket of oldBuckets){
            if(bucket){
                for(const element of bucket){
                    this.set(element.key, element.value)
                }
            }
        }
    }
}

const test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

// console.log(test.buckets);

test.set('frog', 'fire orange');
console.log(test.buckets);
test.set('moon', 'silver')
// console.log(test.buckets)

console.log(test.has('hat'))
console.log(test.remove('frog'));
console.log(test.length())
console.log(test.keys());
console.log(test.values());
console.log(test.entries())