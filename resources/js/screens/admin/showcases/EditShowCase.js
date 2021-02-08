import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../../../components/public/loader/Loader";
import Message from "../../../components/public/alert/Message";
import {
    adminListShowCases,
    editShowCase,
    getEditShowCaseDetails,
} from "../../../actions/showCaseActions";
import { SHOWCASE_EDIT_RESET, SHOWCASE_GET_DETAILS_RESET } from "../../../constants/showCaseConstants";

const EditShowCase = ({ setOpenEditDialog, setRequestData, showCaseId }) => {
    const [name, setName] = useState("");
    const [videoUrl, setVideoUrl] = useState("");

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const showCaseGetEditDetails = useSelector(
        (state) => state.showCaseGetEditDetails
    );
    const { loading, error, showCase } = showCaseGetEditDetails;

    const showCaseEdit = useSelector((state) => state.showCaseEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = showCaseEdit;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: SHOWCASE_EDIT_RESET });
            dispatch({ type: SHOWCASE_GET_DETAILS_RESET });
        } else {
            if (!showCase.name || showCase.id != showCaseId) {
                dispatch(getEditShowCaseDetails(showCaseId));
            } else {
                setName(showCase.name);
                setVideoUrl(showCase.video_url);
            }
        }

        if (successModal) {
            dispatch(adminListShowCases());
        }
    }, [dispatch, showCaseId, showCase, successEdit, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(editShowCase(showCaseId, name, videoUrl));
        
        setRequestData(new Date());
        setSuccessModal(true);
        setOpenEditDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Show Case with name "${name}" has been updated`,
            showConfirmButton: false,
            timer: 2500,
            width: '65rem'
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Edit Show Case</DialogTitle>
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
                                    label="Video Url"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    value={videoUrl}
                                    onChange={(e) =>
                                        setVideoUrl(e.target.value)
                                    }
                                    name="videoUrl"
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
                            Edit ShowCase
                        </Button>
                    </form>
                )}
            </DialogContent>
            <Divider />
        </div>
    );
};

export default EditShowCase;
