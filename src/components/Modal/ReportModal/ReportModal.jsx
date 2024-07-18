import React, {useState} from 'react';
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import { reportApi } from '@/config/api';
import styles from "./ReportModal.module.scss";
import { PrimaryButton } from '@/components/Button';
 
const cx = classNames.bind(styles);

const ReportModal = ({
  onClick,
  storyName,
  atChapter,
}) => {

  const [report, setReport] = useState({
    type: "",
    description: "",
    storyName: storyName,
    atChapter: atChapter,
  })

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setReport({...report, [name]: value});// [name] để hiểu là tham số động, chứ không phải trường name
  }

  const handleSubmit = async()=>{
    try {
      await reportApi.reportErrorChapter(report);
      onClick(false);
    } catch (error) {
      console.log(error);
      onClick(false);
    }
  }

  return (
    <div className={cx('modal')}>
      <div className={cx('report-chapter')}>

        <h2>Báo lỗi</h2>
        <select 
          className='form-control' 
          name='type'
          onChange={handleChange}
        > 
          <option defaultValue={'-1'}>--Chọn loại lỗi--</option>
          <option value="0">Ảnh lỗi, không thấy ảnh</option>
          <option value="1">Chapter bị trùng</option>
          <option value="2">Chapter chưa dịch</option>
          <option value="3">Up sai truyện</option>
          <option value="4">Lỗi khác</option>
        </select>
        <p className='mt15 mb15'>
          Mô tả chính xác lỗi sẽ được thưởng 100 linh thạch, mô tả sai sẽ bị trừ 100 linh thạch
        </p>

        <input 
          placeholder='Mô tả...' 
          className='form-control' 
          name='description' 
          value={report.description}
          onChange={handleChange}
        />

        <div
          className={cx('report-action')}
        > 
          <PrimaryButton  
            title='Gửi'
            color='green'
            onClick={handleSubmit}
          />
          <PrimaryButton  
            title='Hủy'
            color='blue'
            onClick={() => onClick(false)}
          />
        </div>
      </div>
       
    </div>
  )
}
ReportModal.propTypes = {
  onClick: PropTypes.func.isRequired,
  storyName: PropTypes.string.isRequired,
  atChapter: PropTypes.string.isRequired,
}

export default ReportModal