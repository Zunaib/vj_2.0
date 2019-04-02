const Albums = require('../models/albums');

exports.createAlbum = (req, res) => {
    const { albumName, year } = req.body;
    Albums.create({ albumName: albumName, year: year })
        .then(album => res.json({ album: album }))
        .catch(err => res.json({ err: err }));
}

exports.deleteAlbum = (req, res) => {
    const { albumId } = req.body;
    Albums.updateOne({ _id: albumId }, { deletedAt: Date.now() })
        .then(album => res.json({ album: album, message: "Album Deleted" }))
        .catch(err => res.json({ err: err }));
}

exports.fetchAlbums = (req, res) => {
    Albums.find({ deletedAt: null })
        .then(album => res.json({ albums: album }))
        .catch(err => res.json({ error: err }));
}

//Update Album API to be Added