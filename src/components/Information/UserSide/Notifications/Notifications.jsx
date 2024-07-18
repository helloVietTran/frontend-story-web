import React from 'react'
import classname from 'classnames/bind'
import { useSelector } from "react-redux";

import styles from './Notifications.module.scss';
import { SecondaryHeading } from '../../../Heading'

const cx = classname.bind(styles)

function Notifications() {
  const darkTheme = useSelector((state) => state.theme.darkTheme);

  const dark = darkTheme ? "dark" : "";
  const themeClasses = cx({ dark });
  return (
    <div className={`${cx('notifications')} ${themeClasses}`}>
         <SecondaryHeading 
          size={2.2}
          title='Thông báo'
          bottom={20}
        />
        <span>Chức năng tạm thời ngừng cung cấp</span>
    </div>
  )
}

export default Notifications;