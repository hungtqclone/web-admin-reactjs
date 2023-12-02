import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function DialogForm({ show, handleClose, handleUpdateNews, title, setTitle, content, setContent, imageInput, handleImageChange, imagePreview, topic_Id, setTopic_Id, topics, imgloading }) {
    const [showDialog, setShowDialog] = useState(false);

    const handleShowDialog = () => setShowDialog(true);
    const handleCloseDialog = () => setShowDialog(false);
    return (
        <div>
            <Button variant="primary" onClick={handleShowDialog}>
                Open Dialog
            </Button>
            <Modal show={showDialog} onHide={handleCloseDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit News</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicContent">
                            <Form.Label>Content</Form.Label>
                            <Form.Control type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" value={imageInput} onChange={handleImageChange} />
                        </Form.Group>
                        <img src={imagePreview ? imagePreview : imgloading} width={200} height={200} />
                        <Form.Group controlId="formBasicTopic">
                            <Form.Label>Topic</Form.Label>
                            <Form.Control as="select" value={topic_Id} onChange={(e) => setTopic_Id(e.target.value)}>
                                {topics && topics.map((item, index) => (
                                    <option value={item.id} key={index}>{item.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" onClick={handleUpdateNews}>
                            Update
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default DialogForm;
