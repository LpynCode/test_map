


class MarkersRepository {
    markers = new Array();

    getAll() {
        return this.markers;
    }

    create(dto) {
        const createdIndex = this.markers.push({ ...dto, id: Date.now() }) - 1;
        return this.markers[createdIndex];
    }

    update({ name, coordinates, description, id }) {
        const index = this.markers.findIndex((marker) => marker.id === id);
        if (index === -1) return null;
        this.markers[index].name = name;
        this.markers[index].description = description;
        this.markers[index].coordinates = coordinates;
        return this.markers[index];
    }

    delete(id) {
        const index = this.markers.findIndex((marker) => marker.id === id);
        if (index === -1) return null;
        this.markers.splice(index, 1);
        return { id };
    }
}

module.exports = MarkersRepository