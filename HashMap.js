import LinkedList from "@theseagulldev/linked-list"

class HashMap {
	constructor() {
		this.loadFactor = 0.75;
		this.capacity = 16;
		this.buckets = new Array(this.capacity);
	}

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode =
				(primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
		}

		return hashCode;
	}

	set(key, value) {
		const index = this.hash(key);
		if (index < 0 || index >= this.buckets.length) {
			throw new Error("Trying to access index out of bounds");
		} else {
			if (this.buckets[index] == undefined) {
				this.buckets[index] = new LinkedList();
				this.buckets[index].append([key, value]);
			} else {
				for (let i = 0; i < this.buckets[index].size(); i++) {
					if (this.buckets[index].at(i).value[0] == key) {
						this.buckets[index].at(i).value[1] = value;
						return;
					}
				}
				this.buckets[index].append([key, value]);
			}
		}
		if (this.length() > this.capacity * this.loadFactor) {
			const oldPairs = this.entries();
			this.clear();
			this.capacity *= 2;
			this.buckets = new Array(this.capacity);
			oldPairs.forEach((pair) => {
				this.set(pair[0], pair[1]);
			});
		}
	}

	get(key) {
		const index = this.hash(key);
		if (index < 0 || index >= this.buckets.length) {
			throw new Error("Trying to access index out of bounds");
		} else if (this.buckets[index] == null) {
			return null;
		} else {
			let i = 0;
			while (i < this.buckets[index].size()) {
				if (this.buckets[index].at(i).value[0] == key) {
					return this.buckets[index].at(i).value[1];
				}
				i++;
			}
			return null;
		}
	}

	has(key) {
		return this.get(key) != null;
	}

	remove(key) {
		if (!this.has(key)) {
			return false;
		} else {
			const index = this.hash(key);
			if (index < 0 || index >= this.buckets.length) {
				throw new Error("Trying to access index out of bounds");
			} else {
				const bucket = this.buckets[index];
				for (let i = 0; i < bucket.size(); i++) {
					if (bucket.at(i).value[0] == key) {
						this.buckets[index].removeAt(i);
						return true;
					}
				}
				throw new Error("oops");
			}
		}
	}

	length() {
		let count = 0;
		for (let index = 0; index < this.buckets.length; index++) {
			if (index < 0 || index >= this.buckets.length) {
				throw new Error("Trying to access index out of bounds");
			} else if (this.buckets[index] != null) {
				count += this.buckets[index].size();
			}
		}
		return count;
	}

	clear() {
		this.buckets = new Array(this.capacity);
	}

	keys() {
		let keysArr = [];
		for (let index = 0; index < this.buckets.length; index++) {
			if (index < 0 || index >= this.buckets.length) {
				throw new Error("Trying to access index out of bounds");
			} else if (this.buckets[index] != null) {
				for (let i = 0; i < this.buckets[index].size(); i++) {
					keysArr.push(this.buckets[index].at(i).value[0]);
				}
			}
		}
		return keysArr;
	}

	values() {
		let valuesArr = [];
		for (let index = 0; index < this.buckets.length; index++) {
			if (index < 0 || index >= this.buckets.length) {
				throw new Error("Trying to access index out of bounds");
			} else if (this.buckets[index] != null) {
				for (let i = 0; i < this.buckets[index].size(); i++) {
					valuesArr.push(this.buckets[index].at(i).value[1]);
				}
			}
		}
		return valuesArr;
	}

	entries() {
		let entriesArr = [];
		for (let index = 0; index < this.buckets.length; index++) {
			if (index < 0 || index >= this.buckets.length) {
				throw new Error("Trying to access index out of bounds");
			} else if (this.buckets[index] != null) {
				for (let i = 0; i < this.buckets[index].size(); i++) {
					entriesArr.push(this.buckets[index].at(i).value);
				}
			}
		}
		return entriesArr;
	}
}