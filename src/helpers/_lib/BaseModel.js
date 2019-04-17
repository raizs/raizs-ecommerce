export default class BaseModel {
	baseAdd(newElement, original, Entity) {
		let copy = original;
		copy.unshift(newElement);
		return new Entity(copy);
	}

	baseRemove(elementId, original, Entity, typeOfId = 'id') {
		let copy = original;
		for(let i in copy) {
			if(copy[i][typeOfId] === elementId) copy.splice(i, 1);
		}
		return new Entity(copy);
	}

	baseUpdate(elementId, original, Entity, update, typeOfId = 'id') {
		let keys = Object.keys(update);
		let copy = original;
		for(let i in copy) {
			if(copy[i][typeOfId] === elementId) {
				for(let j in keys) {
					copy[i][keys[j]] = update[keys[j]];
				}
			}
		}
		return new Entity(copy);
	}

	baseGetById(id, all) {
		for(let i in all) {
			if(all[i].id === id) {
				return all[i];
			}
		}
		return null;
	}
}