import React from 'react';
import ImageError from '../../../assets/ImageErrorHandling.svg';

const EditModal = ({ isEditing, setIsEditing, editForm, handleEditFormChange, handleSaveEdit, currentKegiatan, handleDeleteImage, setSelectedImage }) => {

    const handleImageError = (e) => {
        e.target.src = ImageError;
    };

    return (
        <div className={`modal fade show ${isEditing ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Kegiatan</h5>
                        <button type="button" className="close" onClick={() => setIsEditing(false)}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSaveEdit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={editForm.title}
                                    onChange={handleEditFormChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Content</label>
                                <textarea
                                    name="content"
                                    value={editForm.content}
                                    onChange={handleEditFormChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Date</label>
                                <input
                                    type="datetime-local"
                                    name="date"
                                    value={editForm.date}
                                    onChange={handleEditFormChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={editForm.location}
                                    onChange={handleEditFormChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Images</label>
                                <div>
                                    {currentKegiatan.img && currentKegiatan.img.map((image, imgIndex) => {
                                        const imageSrc = `http://localhost:3556/upload/${encodeURIComponent(image)}`;
                                        return (
                                            <div key={imgIndex} className="d-inline-block position-relative mx-1">
                                                <img
                                                    className='my-2'
                                                    src={imageSrc}
                                                    alt={`img-${imgIndex}`}
                                                    width="50"
                                                    onError={handleImageError}
                                                    onClick={() => setSelectedImage(imageSrc)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm position-absolute top-0 start-100 translate-middle"
                                                    onClick={() => handleDeleteImage(image)}
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success">Save</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditModal;
