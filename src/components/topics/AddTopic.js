import AxiosInstance from "../helper/AxiosIntance";
import React, { useState } from "react";
import swal from "sweetalert";
import { Button, Modal, Form } from 'react-bootstrap';

const AddTopic = (props) => {
    const { setReload } = props;
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null)
    const [showDialog, setShowDialog] = useState(false);

    const handleShowDialog = () => setShowDialog(true);
    const handleCloseDialog = () => setShowDialog(false);

    const handleAddTopic = async () => {
        try {
            if (!name || !description) {
                swal("Vui lòng nhập đầy đủ thông tin");
                return;
            }
            const body = {
                name: name,
                description: description
            }
            const result = await AxiosInstance().post('/add-topics.php', body);
            if (result) {
                handleCloseDialog();
                swal("Thêm mới thành công");
                setReload(true);

            }
        } catch (error) {
            console.log(error);
        }


    }
    return (
        <div>
            <Button variant="primary" onClick={handleShowDialog}>
                Add topic
            </Button>
            <Modal show={showDialog} onHide={handleCloseDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Topic</Modal.Title>
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
                        <Button style={{ marginTop: 13 }} variant="primary" onClick={handleAddTopic}>
                            Thêm
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AddTopic;