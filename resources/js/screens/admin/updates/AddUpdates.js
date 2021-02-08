import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Button, Divider } from "@material-ui/core";
import Loader from "../../../components/public/loader/Loader";
import Message from "../../../components/public/alert/Message";
import { adminListUpdates, createUpdate } from "../../../actions/updateActions";
import Swal from "sweetalert2";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ClearIcon from '@material-ui/icons/Clear';

const AddUpdates = ({ setOpenAddDialog, setRequestData, history }) => {
    const [name, setName] = useState("");
    const [version, setVersion] = useState("");
    const [briefDescription, setBriefDescription] = useState("");
    const [fullDescription, setFullDescription] = useState("");
    const [image, setImage] = useState();

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const updateCreate = useSelector((state) => state.updateCreate);
    const { loading, success, error } = updateCreate;

    useEffect(() => {
        if (successModal) {
            dispatch(adminListUpdates());
            
        }
    }, [dispatch, history, successModal, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("version", version);
        formData.append("brief_description", briefDescription);
        formData.append("full_description", fullDescription);

        if (image) {
            formData.append("image", image);
        }

        dispatch(createUpdate(formData));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenAddDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Update with name "${name}" has been created`,
            showConfirmButton: false,
            timer: 2500,
            width: '65rem'
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Add Update</DialogTitle>
            <Divider />
            <DialogContent>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="error">{error}</Message>
                ) : (
                    <form onSubmit={submitHandler}>
                        <div className="form">
                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="name"
                                    label="Name"
                                    fullWidth
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="version"
                                    label="Version"
                                    fullWidth
                                    onChange={(e) => setVersion(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    label="Brief Description"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    onChange={(e) =>
                                        setBriefDescription(e.target.value)
                                    }
                                    name="brief_description"
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    label="Full Description"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    onChange={(e) =>
                                        setFullDescription(e.target.value)
                                    }
                                    name="full_description"
                                    required
                                />
                            </div>
                            
                            <div className="form__field">
                                <input
                                    id="contained-button-file"
                                    type="file"
                                    className="form__field--upl"
                                    onChange={(e) =>
                                        setImage(e.target.files[0])
                                    }
                                />

                                <label htmlFor="contained-button-file">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component="span"
                                        startIcon={<PhotoCamera />}
                                    >
                                        Upload Update Image (max filezise: 5mb)
                                    </Button>
                                </label>

                                <p>{image ? image.name : <ClearIcon />}</p>
                            </div>

                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            value="submit"
                            type="submit"
                            fullWidth
                        >
                            Add Update
                        </Button>
                    </form>
                )}
            </DialogContent>
            <Divider />
        </div>
    );
};

export default AddUpdates;
