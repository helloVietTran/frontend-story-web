import classNames from 'classnames/bind';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

import styles from "./Countdown.module.scss"
const cx = classNames.bind(styles);

const Countdown = ({
    max,
    onClick
}) => {
  const [counter, setCounter] = useState(max);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (counter === 0) {
        setDisabled(false);
        return;
    }
    const timer = setInterval(() => {
        setCounter(prevCounter => prevCounter - 1);
    }, 1000);

    return () => clearInterval(timer);
}, [counter]);

  return (
     <Link className={disabled ? cx('disabled') : cx('active')} onClick={onClick}>
        Gửi lại {counter !== 0 ? <span>({counter})</span> : ""}
     </Link>
  )
}

export default Countdown