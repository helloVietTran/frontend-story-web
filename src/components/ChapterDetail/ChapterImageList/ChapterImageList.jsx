import PropTypes from "prop-types";

import Image from "@/components/Image/Image";

const ChapterImageList = ({ data }) => {
  return (
    <>
      {data.data.map((item) => {
        return <Image 
          src={item.fileUrl} 
          key={item.fileName} 
          alt={item.fileName} 
          />;
      })}
    </>
  );
};

ChapterImageList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ChapterImageList;
