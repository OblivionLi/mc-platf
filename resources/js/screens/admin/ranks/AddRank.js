import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    DialogContent,
    FormControl,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Checkbox,
} from "@material-ui/core";
import { TextField, Button, Divider } from "@material-ui/core";
import Loader from "../../../components/public/loader/Loader";
import Message from "../../../components/public/alert/Message";
import { adminListRanks, createRank } from "../../../actions/rankActions";
import Swal from "sweetalert2";
import {
    ADMIN_RANK_LIST_RESET,
    RANK_CREATE_RESET,
} from "../../../constants/rankConstants";
import NumberFormat from "react-number-format";

const AddRank = ({ setOpenAddDialog, setRequestData, history }) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [kit, setKit] = useState("");
    const [money, setMoney] = useState("");
    const [protectionBlocks, setProtectionBlocks] = useState("");
    const [fullAccess, setFullAccess] = useState(true);
    const [editServer, setEditServer] = useState(false);
    const [bypassUri, setBypassUri] = useState(false);
    const [essentials, setEssentials] = useState(false);
    const [mute, setMute] = useState(false);
    const [kick, setKick] = useState(false);
    const [tempBan, setTempBan] = useState(false);
    const [fly, setFly] = useState(false);
    const [clearchat, setClearchat] = useState(false);
    const [keepInv, setKeepInv] = useState(false);
    const [keepExp, setKeepExp] = useState(false);
    const [jail, setJail] = useState(false);
    const [nickname, setNickname] = useState(false);
    const [worldEdit, setWorldEdit] = useState(false);
    const [enderchest, setEnderchest] = useState(false);
    const [gamemode, setGamemode] = useState(false);
    const [colorNickname, setColorNickname] = useState(false);
    const [tp, setTp] = useState(false);

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const rankCreate = useSelector((state) => state.rankCreate);
    const { loading, success, error } = rankCreate;

    useEffect(() => {
        if (successModal) {
            dispatch({ type: ADMIN_RANK_LIST_RESET });
            dispatch(adminListRanks());
        }
    }, [dispatch, history, successModal, success]);

    const handleFullAccess = (e) => {
        setFullAccess((prevState) => {
            return {
                ...prevState,
                full_access: !prevState.fullAccess,
            };
        });
    };

    const handleBypassUri = (e) => {
        setBypassUri((prevState) => {
            return {
                ...prevState,
                bypass_uri: !prevState.bypassUri,
            };
        });
    };

    const handleEditServer = (e) => {
        setEditServer((prevState) => {
            return {
                ...prevState,
                edit_server: !prevState.editServer,
            };
        });
    };

    const handleEssentials = (e) => {
        setEssentials((prevState) => {
            return {
                ...prevState,
                essentials: !prevState.essentials,
            };
        });
    };

    const handleMute = (e) => {
        setMute((prevState) => {
            return {
                ...prevState,
                mute: !prevState.mute,
            };
        });
    };

    const handleKick = (e) => {
        setKick((prevState) => {
            return {
                ...prevState,
                kick: !prevState.kick,
            };
        });
    };

    const handleTempBan = (e) => {
        setTempBan((prevState) => {
            return {
                ...prevState,
                temp_ban: !prevState.tempBan,
            };
        });
    };

    const handleFly = (e) => {
        setFly((prevState) => {
            return {
                ...prevState,
                fly: !prevState.fly,
            };
        });
    };

    const handleClearChat = (e) => {
        setClearchat((prevState) => {
            return {
                ...prevState,
                clear_chat: !prevState.clearchat,
            };
        });
    };

    const handleKeepInv = (e) => {
        setKeepInv((prevState) => {
            return {
                ...prevState,
                keep_inv: !prevState.keepInv,
            };
        });
    };

    const handleKeepExp = (e) => {
        setKeepExp((prevState) => {
            return {
                ...prevState,
                keep_exp: !prevState.keepExp,
            };
        });
    };

    const handleJail = (e) => {
        setJail((prevState) => {
            return {
                ...prevState,
                jail: !prevState.jail,
            };
        });
    };

    const handleNickname = (e) => {
        setNickname((prevState) => {
            return {
                ...prevState,
                nickname: !prevState.nickname,
            };
        });
    };

    const handleWorldEdit = (e) => {
        setWorldEdit((prevState) => {
            return {
                ...prevState,
                world_edit: !prevState.worldEdit,
            };
        });
    };

    const handleEnderchest = (e) => {
        setEnderchest((prevState) => {
            return {
                ...prevState,
                enderchest: !prevState.enderchest,
            };
        });
    };

    const handleGamemode = (e) => {
        setGamemode((prevState) => {
            return {
                ...prevState,
                gamemode: !prevState.gamemode,
            };
        });
    };

    const handleColorNickname = (e) => {
        setColorNickname((prevState) => {
            return {
                ...prevState,
                color_nickname: !prevState.colorNickname,
            };
        });
    };

    const handleTp = (e) => {
        setTp((prevState) => {
            return {
                ...prevState,
                tp: !prevState.tp,
            };
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            createRank(
                name,
                type,
                price,
                discount,
                kit,
                fullAccess,
                editServer,
                bypassUri,
                essentials,
                mute,
                kick,
                tempBan,
                fly,
                clearchat,
                keepInv,
                keepExp,
                jail,
                nickname,
                worldEdit,
                enderchest,
                gamemode,
                colorNickname,
                money,
                protectionBlocks,
                tp
            )
        );

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenAddDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Rank "${name}" created successfully`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Add Rank</DialogTitle>
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
                                    name="type"
                                    label="Type"
                                    fullWidth
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="name"
                                    label="Title"
                                    fullWidth
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="kit"
                                    label="Kit"
                                    fullWidth
                                    onChange={(e) => setKit(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="money"
                                    label="Money"
                                    fullWidth
                                    onChange={(e) => setMoney(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="protection_block"
                                    label="Protection Blocks"
                                    fullWidth
                                    onChange={(e) =>
                                        setProtectionBlocks(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="form__wrapper">
                                <div className="form__field">
                                    <FormControl component="fieldset">
                                        <FormGroup
                                            aria-label="position"
                                            row
                                            onChange={handleFullAccess}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={
                                                    <Checkbox color="primary" />
                                                }
                                                label="Full Access"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </div>

                                <div className="form__field">
                                    <FormControl component="fieldset">
                                        <FormGroup
                                            aria-label="position"
                                            row
                                            onChange={handleEditServer}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={
                                                    <Checkbox color="primary" />
                                                }
                                                label="Server Config"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </div>

                                <div className="form__field">
                                    <FormControl component="fieldset">
                                        <FormGroup
                                            aria-label="position"
                                            row
                                            onChange={handleBypassUri}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={
                                                    <Checkbox color="primary" />
                                                }
                                                label="Bypass Uri"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </div>

                                <div className="form__field">
                                    <FormControl component="fieldset">
                                        <FormGroup
                                            aria-label="position"
                                            row
                                            onChange={handleEssentials}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={
                                                    <Checkbox color="primary" />
                                                }
                                                label="Essentials"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </div>

                                <div className="form__field">
                                    <FormControl component="fieldset">
                                        <FormGroup
                                            aria-label="position"
                                            row
                                            onChange={handleMute}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={
                                                    <Checkbox color="primary" />
                                                }
                                                label="Mute"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </div>

                                <div className="form__field">
                                    <FormControl component="fieldset">
                                        <FormGroup
                                            aria-label="position"
                                            row
                                            onChange={handleKick}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={
                                                    <Checkbox color="primary" />
                                                }
                                                label="Kick"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </div>

                                <div className="form__field">
                                    <FormControl component="fieldset">
                                        <FormGroup
                                            aria-label="position"
                                            row
                                            onChange={handleTempBan}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={
                                                    <Checkbox color="primary" />
                                                }
                                                label="Temp Ban"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </div>

                                <div className="form__field">
                                    <FormControl component="fieldset">
                                        <FormGroup
                                            aria-label="position"
                                            row
                                            onChange={handleFly}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={
                                                    <Checkbox color="primary" />
                                                }
                                                label="Fly"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </div>

                                <div className="form__field">
                                    <FormControl component="fieldset">
                                        <FormGroup
                                            aria-label="position"
                                            row
                                            onChange={handleClearChat}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={
                                                    <Checkbox color="primary" />
                                                }
                                                label="Clear Chat"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </div>

                                <div className="form__field">
                                    <FormControl component="fieldset">
                                        <FormGroup
                                            aria-label="position"
                                            row
                                            onChange={handleKeepInv}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={
                                                    <Checkbox color="primary" />
                                                }
                                                label="Keep Inv"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </div>

                                <div className="form__field">
                                    <FormControl component="fieldset">
                                        <FormGroup
                                            aria-label="position"
                                            row
                                            onChange={handleKeepExp}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={
                                                    <Checkbox color="primary" />
                                                }
                                                label="Keep Exp"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </div>

                                <div className="form__field">
                                    <FormControl component="fieldset">
                                        <FormGroup
                                            aria-label="position"
                                            row
                                            onChange={handleJail}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={
                                                    <Checkbox color="primary" />
                                                }
                                                label="Jail"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </div>

                                <div className="form__field">
                                    <FormControl component="fieldset">
                                        <FormGroup
                                            aria-label="position"
                                            row
                                            onChange={handleNickname}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={
                                                    <Checkbox color="primary" />
                                                }
                                                label="Nickname"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </div>

                                <div className="form__field">
                                    <FormControl component="fieldset">
                                        <FormGroup
                                            aria-label="position"
                                            row
                                            onChange={handleWorldEdit}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={
                                                    <Checkbox color="primary" />
                                                }
                                                label="World Edit"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </div>

                                <div className="form__field">
                                    <FormControl component="fieldset">
                                        <FormGroup
                                            aria-label="position"
                                            row
                                            onChange={handleEnderchest}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={
                                                    <Checkbox color="primary" />
                                                }
                                                label="Ender Chest"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </div>

                                <div className="form__field">
                                    <FormControl component="fieldset">
                                        <FormGroup
                                            aria-label="position"
                                            row
                                            onChange={handleGamemode}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={
                                                    <Checkbox color="primary" />
                                                }
                                                label="Gamemode"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </div>

                                <div className="form__field">
                                    <FormControl component="fieldset">
                                        <FormGroup
                                            aria-label="position"
                                            row
                                            onChange={handleColorNickname}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={
                                                    <Checkbox color="primary" />
                                                }
                                                label="Colored Nickname"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </div>

                                <div className="form__field">
                                    <FormControl component="fieldset">
                                        <FormGroup
                                            aria-label="position"
                                            row
                                            onChange={handleTp}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={
                                                    <Checkbox color="primary" />
                                                }
                                                label="Tp"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </div>
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="discount"
                                    label="Discount"
                                    fullWidth
                                    onChange={(e) => setDiscount(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <NumberFormat
                                    label="Price €"
                                    fullWidth
                                    variant="outlined"
                                    customInput={TextField}
                                    decimalScale={2}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    renderText={(formattedValue) => (
                                        <Text>{formattedValue}</Text>
                                    )}
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
                            Add Rank
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default AddRank;
