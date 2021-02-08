import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../../../components/public/loader/Loader";
import Message from "../../../components/public/alert/Message";
import {
    adminListGameModes,
    editGameMode,
    getEditGameModeDetails,
} from "../../../actions/gameModeActions";
import { GAMEMODE_EDIT_RESET, GAMEMODE_GET_DETAILS_RESET } from "../../../constants/gameModeConstants";

const EditGameMode = ({ setOpenEditDialog, setRequestData, gameModeId }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const gameModeGetEditDetails = useSelector(
        (state) => state.gameModeGetEditDetails
    );
    const { loading, error, gameMode } = gameModeGetEditDetails;

    const gameModeEdit = useSelector((state) => state.gameModeEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = gameModeEdit;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: GAMEMODE_EDIT_RESET });
            dispatch({ type: GAMEMODE_GET_DETAILS_RESET });
        } else {
            if (!gameMode.title || gameMode.id != gameModeId) {
                dispatch(getEditGameModeDetails(gameModeId));
            } else {
                setTitle(gameMode.title);
                setDescription(gameMode.description);
            }
        }

        if (successModal) {
            dispatch(adminListGameModes());
        }
    }, [dispatch, gameModeId, gameMode, successEdit, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(editGameMode(gameModeId, title, description));
        
        setRequestData(new Date());
        setSuccessModal(true);
        setOpenEditDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Game Mode with name "${title}" has been updated`,
            showConfirmButton: false,
            timer: 2500,
            width: '65rem'
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Edit Game Mode</DialogTitle>
            <Divider />
            <DialogContent>
                {loadingEdit && <Loader />}
                {errorEdit && <Message variant="error">{errorEdit}</Message>}
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
                                    name="title"
                                    label="Title"
                                    fullWidth
                                    value={title}
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
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    name="description"
                                    required
                                />
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            value="submit"
                            type="submit"
                            fullWidth
                        >
                            Edit Game Mode
                        </Button>
                    </form>
                )}
            </DialogContent>
            <Divider />
        </div>
    );
};

export default EditGameMode;
