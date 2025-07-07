class HashMap {
	constructor() {
		this.loadFactor = 0.75;
		this.capacity = 16;
		this.buckets = [];
	}

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = (((primeNumber  * hashCode) % this.capacity) + key.charCodeAt(i)) % this.capacity;
		}

		return hashCode;
	}
}

