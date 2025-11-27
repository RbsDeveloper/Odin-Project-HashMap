# 📦 Custom HashMap Implementation (JavaScript)

A fully working **HashMap** built from scratch in JavaScript as part of *The Odin Project*.  

---

## 🚀 Features

This project includes:

- a hashing function 
- collision handling through bucket chaining  
- ability to insert and update keys using `set()`  
- value retrieval using `get()`  
- existence checking using `has()`  
- key removal with `remove()`  
- automatic resizing + rehashing when load factor is exceeded  
- ability to clear the entire map  
- methods to retrieve keys, values, and key/value pairs  
- internal size tracking  

---

## 🧠 How It Works

- Keys are converted into numeric hash values.
- The index is calculated using modulo based on capacity.
- If multiple keys hash to the same index, they are stored in the same bucket (array).
- Once size grows beyond the load factor, capacity doubles and all keys are rehashed.
