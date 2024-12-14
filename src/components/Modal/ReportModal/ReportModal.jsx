import React, {useState} from 'react';
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import styles from "./ReportModal.module.scss";
import  PrimaryButton from "@/components/Button/PrimaryButton/PrimaryButton";
import { reportChapterError } from '@/api/reportApi';
 
const cx = classNames.bind(styles);

const ReportModal = ({
  onClick,
  storyName,
  atChapter,
}) => {

  const reportMutate = useMutation({
    mutationFn: reportChapterError,
    onSuccess: (data) => {
      toast.success("Report thành công", {
        style:{
          fontSize: '14px'
        },
        duration: 3000,
        position: "top-center",
      });
      
    },
    onError: (error) => {
      toast.error("Vui lòng điền đầy đủ thông tin", {
        style:{
          fontSize: '14px'
        },
        duration: 3000,
        position: "top-center",
      });
     
    },
    onSettled: () => {
      onClick(false);
    }
  });

  const [report, setReport] = useState({
    type: "",
    description: "",
    storyName: storyName,
    atChapter: atChapter,
  })

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setReport({...report, [name]: value});// [name] là tham số động
  }

  const handleSubmit = async() => {
    reportMutate.mutate(report);
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
          <option defaultValue=''>--Chọn loại lỗi--</option>
          <option value="Ảnh lỗi, không thấy ảnh">Ảnh lỗi, không thấy ảnh</option>
          <option value="Chapter bị trùng">Chapter bị trùng</option>
          <option value="Chapter chưa dịch">Chapter chưa dịch</option>
          <option value="Up sai truyện">Up sai truyện</option>
          <option value="Lỗi khác">Lỗi khác</option>
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
  atChapter: PropTypes.number.isRequired,
}

export default ReportModal