import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Button, Divider } from "@material-ui/core";
import Loader from "../../../components/public/loader/Loader";
import Message from "../../../components/public/alert/Message";
import {
    adminListShowCases,
    createShowCase,
} from "../../../actions/showCaseActions";
import Swal from "sweetalert2";
import { ADMIN_SHOWCASE_LIST_RESET } from "../../../constants/showCaseConstants";

const AddShowCase = ({ setOpenAddDialog, setRequestData, history }) => {
    const [name, setName] = useState("");
    const [videoUrl, setVideoUrl] = useState("");

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const showCaseCreate = useSelector((state) => state.showCaseCreate);
    const { loading, success, error } = showCaseCreate;

    useEffect(() => {
        if (successModal) {
            dispatch({ type: ADMIN_SHOWCASE_LIST_RESET })
            dispatch(adminListShowCases());
        }
    }, [dispatch, history, successModal, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createShowCase(name, videoUrl));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenAddDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Show Case "${name}" created successfully`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Add ShowCase</DialogTitle>
            <Divider />
            <DialogContent>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="error">{error}</Message>
                ) : (
                    <form
                        onSubmit={submitHandler}
                    >
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
                                    label="Video Url"
                                    multiline
                                    rows={4}
                                    fullWidth
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
                            Add ShowCase
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default AddShowCase;
