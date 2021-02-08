import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../../../components/public/loader/Loader";
import Message from "../../../components/public/alert/Message";
import {
    adminListUpdates,
    editUpdate,
    getEditUpdateDetails,
} from "../../../actions/updateActions";
import { UPDATE_EDIT_RESET } from "../../../constants/updateConstants";

const EditUpdates = ({ setOpenEditDialog, setRequestData, updateId }) => {
    const [name, setName] = useState("");
    const [version, setVersion] = useState("");
    const [briefDescription, setBriefDescription] = useState("");
    const [fullDescription, setFullDescription] = useState("");

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const updateGetEditDetails = useSelector(
        (state) => state.updateGetEditDetails
    );
    const { loading, error, update } = updateGetEditDetails;

    const updateEdit = useSelector((state) => state.updateEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = updateEdit;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: UPDATE_EDIT_RESET });
            if (successModal) {
                dispatch(adminListUpdates());
            }
        } else {
            if (!update.name || update.id != updateId) {
                dispatch(getEditUpdateDetails(updateId));
            } else {
                setName(update.name);
                setVersion(update.version);
                setBriefDescription(update.brief_description);
                setFullDescription(update.full_description);
            }
        }
    }, [dispatch, updateId, update, successEdit, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(editUpdate(updateId, name, version, briefDescription, fullDescription));
        
        setRequestData(new Date());
        setSuccessModal(true);
        setOpenEditDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Update with name "${name}" has been updated`,
            showConfirmButton: false,
            timer: 2500,
            width: '65rem'
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Edit Update</DialogTitle>
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
                                    name="name"
                                    label="Name"
                                    fullWidth
                                    value={name}
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
                                    value={version}
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
                                    value={briefDescription}
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
                                    value={fullDescription}
                                    onChange={(e) =>
                                        setFullDescription(e.target.value)
                                    }
                                    name="full_description"
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
                            Edit Update
                        </Button>
                    </form>
                )}
            </DialogContent>
            <Divider />
        </div>
    );
};

export default EditUpdates;
