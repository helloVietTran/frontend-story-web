import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Row from "@/components/Layout/Row/Row";
import Col from "@/components/Layout/Col/Col";

import styles from "./StoryDetailItem.module.scss";
import useTheme from '@/customHook/useTheme';

const cx = classNames.bind(styles);

const StoryDetailItem = ({
    label, icon, content
}) => {
const themeClassName = useTheme(cx);
  return (
   <div className={cx('story-detail-item', themeClassName)}>
     <Row>
        <Col sizeLg={4}>
            <FontAwesomeIcon icon={icon} />
            {label}
        </Col>
        <Col sizeLg={8}>
            <span>{content}</span>
        </Col>
    </Row>
   </div>
  )
}

StoryDetailItem.propTypes = {
    content: PropTypes.any,
    label: PropTypes.string,
    icon: PropTypes.object,
}

export default StoryDetailItem;