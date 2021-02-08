import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Button, Divider } from "@material-ui/core";
import Loader from "../../../components/public/loader/Loader";
import Message from "../../../components/public/alert/Message";
import {
    adminListGameModes,
    createGameMode,
} from "../../../actions/gameModeActions";
import Swal from "sweetalert2";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ClearIcon from '@material-ui/icons/Clear';
import { ADMIN_GAMEMODE_LIST_RESET, GAMEMODE_CREATE_RESET } from "../../../constants/gameModeConstants";

const AddGameMode = ({ setOpenAddDialog, setRequestData, history }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState();

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const gameModeCreate = useSelector((state) => state.gameModeCreate);
    const { loading, success, error } = gameModeCreate;

    useEffect(() => {
        if (successModal) {
            dispatch({ type: ADMIN_GAMEMODE_LIST_RESET })
            dispatch(adminListGameModes());
        }
    }, [dispatch, history, successModal, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        
        if (image) {
            formData.append("image", image);
        }
        
        dispatch(createGameMode(formData));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenAddDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Game Mode "${title}" created successfully`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Add Game Mode</DialogTitle>
            <Divider />
            <DialogContent>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="error">{error}</Message>
                ) : (
                    <form
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                    >
                        <div className="form">
                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="title"
                                    label="Title"
                                    fullWidth
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    name="description"
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
                                        Upload GameMode Image (max filezise: 5mb)
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
                            Add GameMode
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default AddGameMode;
