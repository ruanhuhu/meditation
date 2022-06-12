import * as React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

function BasicSelect({ duration, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">时长</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={duration}
          label="时长"
          onChange={handleChange}
        >
          <MenuItem value={1}>1分钟</MenuItem>
          <MenuItem value={6}>6分钟</MenuItem>
          <MenuItem value={12}>12分钟</MenuItem>
          <MenuItem value={24}>24分钟</MenuItem>
          <MenuItem value={36}>36分钟</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function Timer({ duration, onFinish }) {
  const [time, setTime] = React.useState(duration * 60 + 3);

  const transformTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60 > 9 ? time % 60 : `0${time % 60}`;
    return `${minutes}:${seconds}`;
  };

  // 倒计时
  React.useEffect(() => {
    if (time < 0) {
      onFinish();
      return;
    }
    const interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  return <div className={styles.timer}>{transformTime(time)}</div>;
}

function addRecord({ duration }) {
  return new Promise((resolve, reject) => {
    const data = {
      duration,
      timestamp: Date.now(),
    };
    fetch("http://localhost:3000/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        return resolve(res);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
export default function Home() {
  const [duration, setDuration] = React.useState("6");
  const [start, setStart] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  // 设置时长
  const onDurationChange = (duration) => {
    setDuration(duration);
  };

  // 开始
  const onStartClick = () => {
    setStart(true);
  const audio = new Audio("/media/audio/yq.m4a");

    audio.play();
  };
  // 停止
  const onStopClick = () => {
    setStart(false);
  const audio = new Audio("/media/audio/yq.m4a");

    audio.play();
  };

  // 倒计时结束
  const onFinish = () => {
    setStart(false);
    // 记录时长
    addRecord({ duration })
      .then((res) => {
        console.log(res);
        if (res.code !== 200) {
          setOpenAlert(true);
        }
      })
      .catch((error) => {
        setOpenAlert(true);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Meditation</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Collapse in={openAlert}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Error !
        </Alert>
      </Collapse>
      {start ? (
        <>
          <Timer duration={duration} onFinish={onFinish} />
          <Button
            onClick={onStopClick}
            className={styles.startButton}
            variant="contained"
          >
            停止
          </Button>
        </>
      ) : (
        <>
          <BasicSelect duration={duration} onChange={onDurationChange} />
          <Button
            onClick={onStartClick}
            className={styles.startButton}
            variant="contained"
          >
            开始
          </Button>
        </>
      )}

      <audio className={styles.audio} controls src="/media/audio/yq.m4a">
        Your browser does not support the
        <code>audio</code> element.
      </audio>

      {/* <Link href="/history"></Link> */}
    </div>
  );
}
