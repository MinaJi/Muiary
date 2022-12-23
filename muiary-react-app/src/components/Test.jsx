import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { storage } from "../firebase";
import {
  Typography,
  Box,
  Button,
  LinearProgress,
  Modal,
  Backdrop,
} from "@material-ui/core";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const UpLoadTest = () => {
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(100);

  const classes = useStyles(); //Material-ui
  const [cropper, setCropper] = useState();
  const [open, setOpen] = React.useState(false);
  const [openCircularProgress, setOpenCircularProgress] = React.useState(false); //処理中みたいモーダル

  const handleImage = (e) => {
    setError("");
    try {
      const image = e.target.files[0];
      setImageName(image.name); //アップロード時のファイル名で使用
      e.preventDefault();
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
      setOpen(true);
      e.target.value = null; //ファイル選択された内容をクリアする（クリアしないと同じファイルが編集できない）
    } catch (e) {
      e.target.value = null;
      setError("画像の切り取りをキャンセルまたは失敗しました");
      setOpen(false);
    }
  };

  const getCropData = async (e) => {
    e.preventDefault();
    if (typeof cropper !== "undefined") {
      //デフォルトのPNGはファイルサイズが大きいのでjpegにする
      let imagedata = await cropper.getCroppedCanvas().toDataURL("image/jpeg");
      //console.log(imagedata); //バイナリーが見たい人は出力すると見れます

      // アップロード処理
      console.log("アップロード処理");
      const storageRef = storage.ref("images/test/"); //どのフォルダの配下に入れるかを設定
      const imagesRef = storageRef.child(imageName); //ファイル名

      console.log("ファイルをアップする行為");
      const upLoadTask = imagesRef.putString(imagedata, "data_url");

      console.log("タスク実行前");
      setOpenCircularProgress(true);

      upLoadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("snapshot", snapshot);
          const percent =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percent + "% done");
          setProgress(percent);
        },
        (error) => {
          console.log("err", error);
          setError("ファイルアップに失敗しました。" + error);
          setProgress(100); //実行中のバーを消す
          setOpen(false);
          setOpenCircularProgress(false);
        },
        () => {
          setImageUrl("");
          upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImageUrl(downloadURL);
            setOpen(false);
            setOpenCircularProgress(false);
          });
        }
      );
    }
    return;
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCircularProgressClose = () => {
    setOpenCircularProgress(false);
  };

  return (
    <div>
      upload
      {error && <div variant="danger">{error}</div>}
      <h2>
        <Link to="/Dashboard">Dashboard</Link>
      </h2>
      <form>
        <input type="file" onChange={handleImage} />
      </form>
      {imageUrl && (
        <div>
          <img width="400px" src={imageUrl} alt="uploaded" />
        </div>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <h2 id="transition-modal-title" style={{ textAlign: "center" }}>
            画像の切り抜き
          </h2>
          <Cropper
            style={{ height: 400, width: "100%" }}
            initialAspectRatio={1}
            aspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            guides={true}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
          <Button
            variant="contained"
            size="large"
            fullWidth
            color="primary"
            className={classes.updateProfileBtn}
            onClick={getCropData}
          >
            選択範囲で反映
          </Button>

          <Button
            variant="contained"
            size="large"
            fullWidth
            className={classes.updateProfileBtn}
            onClick={handleClose}
          >
            キャンセル
          </Button>
        </div>
      </Modal>
      <Modal
        className={classes.modal}
        open={openCircularProgress}
        onClose={handleCircularProgressClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper} style={{ textAlign: "center" }}>
          <div>現在処理中です。</div>
          {progress !== 100 && <LinearProgressWithLabel value={progress} />}
        </div>
      </Modal>
    </div>
  );
};

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
export default UpLoadTest;
