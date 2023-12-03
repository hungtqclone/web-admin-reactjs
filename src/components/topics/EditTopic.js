import AxiosInstance from "../helper/AxiosIntance";
import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import swal from 'sweetalert';

const Edit = (props) => {
    const { id, setReload } = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [showDialog, setShowDialog] = useState(false);

    const handleShowDialog = () => setShowDialog(true);
    const handleCloseDialog = () => setShowDialog(false);

    const handleUpdateData = async () => {
        try {
            if (!name || !description) {
                alert("Vui lòng nhập đầy đủ thông tin");
                return;
            }
            const body = {
                name: name,
                description: description
            }
            const result = await AxiosInstance().post('/update-topics.php?id=' + id, body);
            handleCloseDialog();
            swal(result.message);
            setReload(true);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const topicById = await AxiosInstance().get(`/get-topic-detail.php?id=${id}`);
            setName(topicById.name);
            setDescription(topicById.description);
        }
        fetchData();
    }, [id]);

    return (
        <div >
            <Button variant="primary" onClick={handleShowDialog}>
                Sửa
            </Button>
            <Modal show={showDialog} onHide={handleCloseDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Topic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Button style={{ marginTop: 13 }} variant="primary" onClick={handleUpdateData}>
                            Update
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Edit;
