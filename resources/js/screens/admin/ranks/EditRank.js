import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    DialogContent,
    DialogTitle,
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Switch,
} from "@material-ui/core";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../../../components/public/loader/Loader";
import Message from "../../../components/public/alert/Message";
import {
    adminListRanks,
    editRank,
    getEditRankDetails,
} from "../../../actions/rankActions";
import {
    RANK_EDIT_RESET,
    RANK_GET_DETAILS_RESET,
} from "../../../constants/rankConstants";
import NumberFormat from "react-number-format";

const EditRank = ({ setOpenEditDialog, setRequestData, rankId }) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [kit, setKit] = useState("");
    const [money, setMoney] = useState("");
    const [protectionBlocks, setProtectionBlocks] = useState("");
    const [fullAccess, setFullAccess] = useState(0);
    const [editServer, setEditServer] = useState(0);
    const [bypassUri, setBypassUri] = useState(0);
    const [essentials, setEssentials] = useState(0);
    const [mute, setMute] = useState(0);
    const [kick, setKick] = useState(0);
    const [tempBan, setTempBan] = useState(0);
    const [fly, setFly] = useState(0);
    const [clearchat, setClearchat] = useState(0);
    const [keepInv, setKeepInv] = useState(0);
    const [keepExp, setKeepExp] = useState(0);
    const [jail, setJail] = useState(0);
    const [nickname, setNickname] = useState(0);
    const [worldEdit, setWorldEdit] = useState(0);
    const [enderchest, setEnderchest] = useState(0);
    const [gamemode, setGamemode] = useState(0);
    const [colorNickname, setColorNickname] = useState(0);
    const [tp, setTp] = useState(0);

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const rankGetEditDetails = useSelector((state) => state.rankGetEditDetails);
    const { loading, error, rank } = rankGetEditDetails;

    const rankEdit = useSelector((state) => state.rankEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = rankEdit;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: RANK_EDIT_RESET });
            dispatch({ type: RANK_GET_DETAILS_RESET });
        } else {
            if (!rank.name || rank.id != rankId) {
                dispatch(getEditRankDetails(rankId));
            } else {
                setName(rank.name);
                setType(rank.type);
                setPrice(rank.price);
                setDiscount(rank.discount);
                setKit(rank.kit);
                setMoney(rank.money);
                setProtectionBlocks(rank.protection_blocks);
                setFullAccess(rank.full_access);
                setEditServer(rank.edit_server);
                setBypassUri(rank.bypass_uri);
                setEssentials(rank.essentials);
                setMute(rank.mute);
                setKick(rank.kick);
                setTempBan(rank.temp_ban);
                setFly(rank.fly);
                setClearchat(rank.clear_chat);
                setKeepInv(rank.keep_inv);
                setKeepExp(rank.keep_exp);
                setJail(rank.jail);
                setNickname(rank.nickname);
                setWorldEdit(rank.world_edit);
                setEnderchest(rank.enderchat);
                setGamemode(rank.gamemode);
                setColorNickname(rank.color_nickname);
                setTp(rank.tp);
            }
        }

        if (successModal) {
            dispatch(adminListRanks());
        }
    }, [dispatch, rankId, rank, successEdit, successModal]);

    const handleFullAccess = (e) => {
        if (e.target.checked) {
            setFullAccess(1);
        } else {
            setFullAccess(0);
        }
    };

    const handleBypassUri = (e) => {
        if (e.target.checked) {
            setBypassUri(1);
        } else {
            setBypassUri(0);
        }
    };

    const handleEditServer = (e) => {
        if (e.target.checked) {
            setEditServer(1);
        } else {
            setEditServer(0);
        }
    };

    const handleEssentials = (e) => {
        if (e.target.checked) {
            setEssentials(1);
        } else {
            setEssentials(0);
        }
    };

    const handleMute = (e) => {
        if (e.target.checked) {
            setMute(1);
        } else {
            setMute(0);
        }
    };

    const handleKick = (e) => {
        if (e.target.checked) {
            setKick(1);
        } else {
            setKick(0);
        }
    };

    const handleTempBan = (e) => {
        if (e.target.checked) {
            setTempBan(1);
        } else {
            setTempBan(0);
        }
    };

    const handleFly = (e) => {
        if (e.target.checked) {
            setFly(1);
        } else {
            setFly(0);
        }
    };

    const handleClearChat = (e) => {
        if (e.target.checked) {
            setClearchat(1);
        } else {
            setClearchat(0);
        }
    };

    const handleKeepInv = (e) => {
        if (e.target.checked) {
            setKeepInv(1);
        } else {
            setKeepInv(0);
        }
    };

    const handleKeepExp = (e) => {
        if (e.target.checked) {
            setKeepExp(1);
        } else {
            setKeepExp(0);
        }
    };

    const handleJail = (e) => {
        if (e.target.checked) {
            setJail(1);
        } else {
            setJail(0);
        }
    };

    const handleNickname = (e) => {
        if (e.target.checked) {
            setNickname(1);
        } else {
            setNickname(0);
        }
    };

    const handleWorldEdit = (e) => {
        if (e.target.checked) {
            setWorldEdit(1);
        } else {
            setWorldEdit(0);
        }
    };

    const handleEnderchest = (e) => {
        if (e.target.checked) {
            setEnderchest(1);
        } else {
            setEnderchest(0);
        }
    };

    const handleGamemode = (e) => {
        if (e.target.checked) {
            setGamemode(1);
        } else {
            setGamemode(0);
        }
    };

    const handleColorNickname = (e) => {
        if (e.target.checked) {
            setColorNickname(1);
        } else {
            setColorNickname(0);
        }
    };

    const handleTp = (e) => {
        if (e.target.checked) {
            setTp(1);
        } else {
            setTp(0);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            editRank(
                rankId,
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
        setOpenEditDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Rank with name "${name}" has been updated`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Edit Rank</DialogTitle>
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
                                    name="type"
                                    label="Type"
                                    fullWidth
                                    value={type}
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
                                    value={name}
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
                                    value={kit}
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
                                    value={money}
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
                                    value={protectionBlocks}
                                    onChange={(e) =>
                                        setProtectionBlocks(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="form__wrapper">
                                <div className="form__field">
                                    <FormGroup row>
                                        <FormControlLabel
                                            value={fullAccess}
                                            name="fullAccess"
                                            control={
                                                <Checkbox
                                                    onChange={handleFullAccess}
                                                    checked={
                                                        fullAccess == 1
                                                            ? true
                                                            : false
                                                    }
                                                    color="primary"
                                                />
                                            }
                                            label="Full Access"
                                            labelPlacement="top"
                                        />
                                    </FormGroup>
                                </div>

                                <div className="form__field">
                                    <FormControlLabel
                                        value={editServer}
                                        name="editServer"
                                        control={
                                            <Checkbox
                                                onChange={handleEditServer}
                                                color="primary"
                                                checked={
                                                    editServer == 1
                                                        ? true
                                                        : false
                                                }
                                            />
                                        }
                                        label="Server Config"
                                        labelPlacement="top"
                                    />
                                </div>

                                <div className="form__field">
                                    <FormControlLabel
                                        value={bypassUri}
                                        name="bypassUri"
                                        control={
                                            <Checkbox
                                                onChange={handleBypassUri}
                                                color="primary"
                                                checked={
                                                    bypassUri == 1
                                                        ? true
                                                        : false
                                                }
                                            />
                                        }
                                        label="Bypass Uri"
                                        labelPlacement="top"
                                    />
                                </div>

                                <div className="form__field">
                                    <FormControlLabel
                                        value={essentials}
                                        name="essentials"
                                        control={
                                            <Checkbox
                                                onChange={handleEssentials}
                                                color="primary"
                                                checked={
                                                    essentials == 1
                                                        ? true
                                                        : false
                                                }
                                            />
                                        }
                                        label="Essentials"
                                        labelPlacement="top"
                                    />
                                </div>

                                <div className="form__field">
                                    <FormControlLabel
                                        value={mute}
                                        name="mute"
                                        control={
                                            <Checkbox
                                                onChange={handleMute}
                                                color="primary"
                                                checked={
                                                    mute == 1 ? true : false
                                                }
                                            />
                                        }
                                        label="Mute"
                                        labelPlacement="top"
                                    />
                                </div>

                                <div className="form__field">
                                    <FormControlLabel
                                        value={kick}
                                        name="kick"
                                        control={
                                            <Checkbox
                                                onChange={handleKick}
                                                color="primary"
                                                checked={
                                                    kick == 1 ? true : false
                                                }
                                            />
                                        }
                                        label="Kick"
                                        labelPlacement="top"
                                    />
                                </div>

                                <div className="form__field">
                                    <FormControlLabel
                                        value={tempBan}
                                        name="tempBan"
                                        control={
                                            <Checkbox
                                                onChange={handleTempBan}
                                                color="primary"
                                                checked={
                                                    tempBan == 1 ? true : false
                                                }
                                            />
                                        }
                                        label="Temp Ban"
                                        labelPlacement="top"
                                    />
                                </div>

                                <div className="form__field">
                                    <FormControlLabel
                                        value={fly}
                                        name="fly"
                                        control={
                                            <Checkbox
                                                onChange={handleFly}
                                                color="primary"
                                                checked={
                                                    fly == 1 ? true : false
                                                }
                                            />
                                        }
                                        label="Fly"
                                        labelPlacement="top"
                                    />
                                </div>

                                <div className="form__field">
                                    <FormControlLabel
                                        value={clearchat}
                                        name="clearchat"
                                        control={
                                            <Checkbox
                                                onChange={handleClearChat}
                                                color="primary"
                                                checked={
                                                    clearchat == 1
                                                        ? true
                                                        : false
                                                }
                                            />
                                        }
                                        label="Clear Chat"
                                        labelPlacement="top"
                                    />
                                </div>

                                <div className="form__field">
                                    <FormControlLabel
                                        value={keepInv}
                                        name="keepInv"
                                        control={
                                            <Checkbox
                                                onChange={handleKeepInv}
                                                color="primary"
                                                checked={
                                                    keepInv == 1 ? true : false
                                                }
                                            />
                                        }
                                        label="Keep Inv"
                                        labelPlacement="top"
                                    />
                                </div>

                                <div className="form__field">
                                    <FormControlLabel
                                        value={keepExp}
                                        name="keepExp"
                                        control={
                                            <Checkbox
                                                onChange={handleKeepExp}
                                                color="primary"
                                                checked={
                                                    keepExp == 1 ? true : false
                                                }
                                            />
                                        }
                                        label="Keep Exp"
                                        labelPlacement="top"
                                    />
                                </div>

                                <div className="form__field">
                                    <FormControlLabel
                                        value={jail}
                                        name="jail"
                                        control={
                                            <Checkbox
                                                onChange={handleJail}
                                                color="primary"
                                                checked={
                                                    jail == 1 ? true : false
                                                }
                                            />
                                        }
                                        label="Jail"
                                        labelPlacement="top"
                                    />
                                </div>

                                <div className="form__field">
                                    <FormControlLabel
                                        value={nickname}
                                        name="nickname"
                                        control={
                                            <Checkbox
                                                onChange={handleNickname}
                                                color="primary"
                                                checked={
                                                    nickname == 1 ? true : false
                                                }
                                            />
                                        }
                                        label="Nickname"
                                        labelPlacement="top"
                                    />
                                </div>

                                <div className="form__field">
                                    <FormControlLabel
                                        value={worldEdit}
                                        name="worldEdit"
                                        control={
                                            <Checkbox
                                                onChange={handleWorldEdit}
                                                color="primary"
                                                checked={
                                                    worldEdit == 1
                                                        ? true
                                                        : false
                                                }
                                            />
                                        }
                                        label="World Edit"
                                        labelPlacement="top"
                                    />
                                </div>

                                <div className="form__field">
                                    <FormControlLabel
                                        value={enderchest}
                                        name="enderchest"
                                        control={
                                            <Checkbox
                                                onChange={handleEnderchest}
                                                color="primary"
                                                checked={
                                                    enderchest == 1
                                                        ? true
                                                        : false
                                                }
                                            />
                                        }
                                        label="Ender Chest"
                                        labelPlacement="top"
                                    />
                                </div>

                                <div className="form__field">
                                    <FormControlLabel
                                        value={gamemode}
                                        name="gamemode"
                                        control={
                                            <Checkbox
                                                onChange={handleGamemode}
                                                color="primary"
                                                checked={
                                                    gamemode == 1 ? true : false
                                                }
                                            />
                                        }
                                        label="Gamemode"
                                        labelPlacement="top"
                                    />
                                </div>

                                <div className="form__field">
                                    <FormControlLabel
                                        value={colorNickname}
                                        name="colorNickname"
                                        control={
                                            <Checkbox
                                                onChange={handleColorNickname}
                                                color="primary"
                                                checked={
                                                    colorNickname == 1
                                                        ? true
                                                        : false
                                                }
                                            />
                                        }
                                        label="Colored Nickname"
                                        labelPlacement="top"
                                    />
                                </div>

                                <div className="form__field">
                                    <FormControlLabel
                                        value={tp}
                                        name="tp"
                                        control={
                                            <Checkbox
                                                onChange={handleTp}
                                                color="primary"
                                                checked={tp == 1 ? true : false}
                                            />
                                        }
                                        label="Tp"
                                        labelPlacement="top"
                                    />
                                </div>
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="discount"
                                    label="Discount"
                                    fullWidth
                                    value={discount}
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
                                    value={price}
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
                            Edit Rank
                        </Button>
                    </form>
                )}
            </DialogContent>
            <Divider />
        </div>
    );
};

export default EditRank;
